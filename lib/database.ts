import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mexohub_trading",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

let connection: mysql.Connection | null = null

export async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig)
      console.log("Database connected successfully")
    } catch (error) {
      console.error("Database connection failed:", error)
      throw error
    }
  }
  return connection
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const conn = await getConnection()
    const [results] = await conn.execute(query, params)
    return results
  } catch (error) {
    console.error("Query execution failed:", error)
    throw error
  }
}

export async function closeConnection() {
  if (connection) {
    await connection.end()
    connection = null
  }
}
