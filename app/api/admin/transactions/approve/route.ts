import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || !decoded.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { transactionId, action, adminNote } = await request.json()

    if (!transactionId || !action) {
      return NextResponse.json({ error: "Transaction ID and action are required" }, { status: 400 })
    }

    if (!["approve", "decline"].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Must be 'approve' or 'decline'" }, { status: 400 })
    }

    // Get transaction details
    const transactionQuery = "SELECT * FROM transactions WHERE id = ?"
    const transactions = await executeQuery(transactionQuery, [transactionId]) as any[]
    
    if (transactions.length === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    const transaction = transactions[0]
    const newStatus = action === "approve" ? "completed" : "failed"

    // Update transaction status
    const updateQuery = `
      UPDATE transactions 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `
    await executeQuery(updateQuery, [newStatus, transactionId])

    // If approved, update user balance
    if (action === "approve") {
      if (transaction.type === "deposit") {
        await executeQuery(
          "UPDATE users SET balance = balance + ? WHERE id = ?",
          [transaction.amount, transaction.user_id]
        )
      } else if (transaction.type === "withdrawal") {
        // Check if user has sufficient balance
        const userQuery = "SELECT balance FROM users WHERE id = ?"
        const users = await executeQuery(userQuery, [transaction.user_id]) as any[]
        
        if (users.length > 0 && users[0].balance >= transaction.amount) {
          await executeQuery(
            "UPDATE users SET balance = balance - ? WHERE id = ?",
            [transaction.amount, transaction.user_id]
          )
        } else {
          // Revert transaction status if insufficient balance
          await executeQuery(
            "UPDATE transactions SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [transactionId]
          )
          return NextResponse.json({ error: "Insufficient balance for withdrawal" }, { status: 400 })
        }
      }
    }

    // Add admin note if provided
    if (adminNote) {
      await executeQuery(
        "UPDATE transactions SET description = CONCAT(COALESCE(description, ''), ' | Admin: ', ?) WHERE id = ?",
        [adminNote, transactionId]
      )
    }

    return NextResponse.json({ 
      message: `Transaction ${action}d successfully`,
      status: newStatus
    })
  } catch (error) {
    console.error("Error processing transaction approval:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 