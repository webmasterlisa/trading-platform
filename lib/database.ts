import mysql from "mysql2/promise"

// [NOTE] Hardcoded for local testing due to .env restrictions
const dbUrl = 'mysql://root:mbgRzkCXEvcUJAXApUMskKvjIxFHEwpd@tramway.proxy.rlwy.net:21794/railway';

const dbConfig = {
  host: "mysql.railway.internal",
  user: "root",
  password: "mbgRzkCXEvcUJAXApUMskKvjIxFHEwpd",
  database: "railway",
  port: 3306,
}

let connection: mysql.Connection | null = null

export async function getConnection() {
  if (!connection) {
    try {
      // Always use the hardcoded dbUrl for local testing
      connection = await mysql.createConnection(dbUrl)
      console.log("Database connected successfully (hardcoded dbUrl)")
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
