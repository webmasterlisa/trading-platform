import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { executeQuery } from "./database"

const JWT_SECRET = "8f14e45fceea167a5a36dedd4bea2543" // hardcoded for local testing

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  username?: string
  phone?: string
  country?: string
  bitcoin_wallet?: string
  usdt_wallet?: string
  account_type: "demo" | "live"
  balance: number
  demo_balance: number
  is_verified: boolean
  is_admin: boolean
  created_at: string
  password?: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(userData: {
  email: string
  password: string
  first_name: string
  last_name: string
  username?: string
  phone?: string
  country?: string
}): Promise<User> {
  const hashedPassword = await hashPassword(userData.password)

  const query = `
    INSERT INTO users (email, password, first_name, last_name, username, phone, country)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  const result = (await executeQuery(query, [
    userData.email,
    hashedPassword,
    userData.first_name,
    userData.last_name,
    userData.username || null,
    userData.phone || null,
    userData.country || null,
  ])) as any

  return getUserById(result.insertId)
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const query = "SELECT * FROM users WHERE email = ?"
  const results = (await executeQuery(query, [email])) as User[]
  return results.length > 0 ? results[0] : null
}

export async function getUserById(id: number): Promise<User> {
  const query = "SELECT * FROM users WHERE id = ?"
  const results = (await executeQuery(query, [id])) as User[]
  if (results.length === 0) {
    throw new Error("User not found")
  }
  return results[0]
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password as any)
  if (!isValid) return null

  return user
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
