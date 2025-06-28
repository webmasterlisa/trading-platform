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
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = decoded.id

    // Get user data
    const userQuery = "SELECT * FROM users WHERE id = ?"
    const users = await executeQuery(userQuery, [userId]) as any[]
    
    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = users[0]

    // Get recent transactions
    const transactionsQuery = `
      SELECT * FROM transactions 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 10
    `
    const transactions = await executeQuery(transactionsQuery, [userId]) as any[]

    // Get recent trades
    const tradesQuery = `
      SELECT * FROM trades 
      WHERE user_id = ? 
      ORDER BY opened_at DESC 
      LIMIT 10
    `
    const trades = await executeQuery(tradesQuery, [userId]) as any[]

    // Calculate today's P&L
    const today = new Date().toISOString().split('T')[0]
    const todayTradesQuery = `
      SELECT SUM(profit_loss) as total_pnl 
      FROM trades 
      WHERE user_id = ? AND DATE(opened_at) = ? AND status = 'closed'
    `
    const todayPnlResult = await executeQuery(todayTradesQuery, [userId, today]) as any[]
    const todayPnl = todayPnlResult[0]?.total_pnl || 0

    // Calculate total profit
    const totalProfitQuery = `
      SELECT SUM(profit_loss) as total_profit 
      FROM trades 
      WHERE user_id = ? AND status = 'closed'
    `
    const totalProfitResult = await executeQuery(totalProfitQuery, [userId]) as any[]
    const totalProfit = totalProfitResult[0]?.total_profit || 0

    // Count open positions
    const openPositionsQuery = `
      SELECT COUNT(*) as open_count 
      FROM trades 
      WHERE user_id = ? AND status = 'open'
    `
    const openPositionsResult = await executeQuery(openPositionsQuery, [userId]) as any[]
    const openPositions = openPositionsResult[0]?.open_count || 0

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        account_type: user.account_type,
        balance: user.balance,
        demo_balance: user.demo_balance,
        is_verified: user.is_verified,
        is_admin: user.is_admin
      },
      stats: {
        accountBalance: user.account_type === 'demo' ? user.demo_balance : user.balance,
        todayPnl: todayPnl,
        totalProfit: totalProfit,
        openPositions: openPositions
      },
      recentTransactions: transactions,
      recentTrades: trades
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 