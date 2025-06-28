import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || !decoded.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const query = `
      SELECT t.*, u.email, u.first_name, u.last_name
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
      LIMIT 100
    `

    const transactions = await executeQuery(query)
    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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

    const { user_id, type, amount, currency, payment_method, description } = await request.json()

    const query = `
      INSERT INTO transactions (user_id, type, amount, currency, payment_method, description, status)
      VALUES (?, ?, ?, ?, ?, ?, 'completed')
    `

    await executeQuery(query, [user_id, type, amount, currency || "USD", payment_method, description])

    // Update user balance if it's a deposit or withdrawal
    if (type === "deposit") {
      await executeQuery("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, user_id])
    } else if (type === "withdrawal") {
      await executeQuery("UPDATE users SET balance = balance - ? WHERE id = ?", [amount, user_id])
    }

    return NextResponse.json({ message: "Transaction created successfully" })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
