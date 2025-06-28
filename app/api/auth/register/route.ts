import { type NextRequest, NextResponse } from "next/server"
import { createUser, generateToken, getUserByEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    const { email, password, first_name, last_name, username, phone, country } = userData

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json({ error: "Email, password, first name, and last name are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 })
    }

    const user = await createUser({
      email,
      password,
      first_name,
      last_name,
      username,
      phone,
      country,
    })

    const token = generateToken(user)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user as any

    const response = NextResponse.json({
      message: "Registration successful",
      user: userWithoutPassword,
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
