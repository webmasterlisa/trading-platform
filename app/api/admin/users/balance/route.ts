import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || !decoded.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { userId, balance, demoBalance, reason } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if user exists
    const userQuery = "SELECT * FROM users WHERE id = ?"
    const users = await executeQuery(userQuery, [userId]) as any[]
    
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = users[0]

    // Update balances
    const updateFields = []
    const updateValues = []

    if (balance !== undefined) {
      updateFields.push("balance = ?")
      updateValues.push(balance)
    }

    if (demoBalance !== undefined) {
      updateFields.push("demo_balance = ?")
      updateValues.push(demoBalance)
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: "No balance values provided" }, { status: 400 })
    }

    updateValues.push(userId)
    const updateQuery = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`
    await executeQuery(updateQuery, updateValues)

    // Log the balance change as a transaction
    const transactionData = {
      user_id: userId,
      type: "balance_adjustment",
      amount: balance !== undefined ? balance - user.balance : 0,
      currency: "USD",
      payment_method: "admin_adjustment",
      description: reason || "Balance adjustment by admin",
      status: "completed"
    }

    const transactionQuery = `
      INSERT INTO transactions (user_id, type, amount, currency, payment_method, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    await executeQuery(transactionQuery, [
      transactionData.user_id,
      transactionData.type,
      transactionData.amount,
      transactionData.currency,
      transactionData.payment_method,
      transactionData.description,
      transactionData.status
    ])

    return NextResponse.json({ 
      message: "User balance updated successfully",
      oldBalance: user.balance,
      newBalance: balance !== undefined ? balance : user.balance,
      oldDemoBalance: user.demo_balance,
      newDemoBalance: demoBalance !== undefined ? demoBalance : user.demo_balance
    })
  } catch (error) {
    console.error("Error updating user balance:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 