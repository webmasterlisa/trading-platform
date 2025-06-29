import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
    const user = await authenticateUser(email, password)
    if (!user || !user.is_admin) {
      return NextResponse.json({ error: "Invalid credentials or not admin" }, { status: 401 })
    }
    const response = NextResponse.json({
      message: "Login successful",
      user: { ...user, password: undefined },
    })
    // Set a secure, HTTP-only cookie with the admin's user ID
    response.cookies.set("admin-session", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
