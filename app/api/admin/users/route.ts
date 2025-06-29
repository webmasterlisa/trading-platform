import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { getUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const adminId = request.cookies.get("admin-session")?.value
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const adminUser = await getUserById(Number(adminId))
    if (!adminUser || !adminUser.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    const query = `
      SELECT id, email, first_name, last_name, username, phone, country, 
             account_type, balance, demo_balance, is_verified, is_admin, created_at
      FROM users 
      ORDER BY created_at DESC
    `
    const users = await executeQuery(query)
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminId = request.cookies.get("admin-session")?.value
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const adminUser = await getUserById(Number(adminId))
    if (!adminUser || !adminUser.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { userId, updates } = await request.json()

    const allowedFields = ["balance", "demo_balance", "is_verified", "account_type"]
    const updateFields = Object.keys(updates).filter((key) => allowedFields.includes(key))

    if (updateFields.length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const setClause = updateFields.map((field) => `${field} = ?`).join(", ")
    const values = updateFields.map((field) => updates[field])

    const query = `UPDATE users SET ${setClause} WHERE id = ?`
    await executeQuery(query, [...values, userId])

    return NextResponse.json({ message: "User updated successfully" })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
