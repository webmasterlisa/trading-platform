import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    // Check if environment variables are set
    const databaseUrl = process.env.DATABASE_URL;
    const jwtSecret = "8f14e45fceea167a5a36dedd4bea2543"; // hardcoded for local testing
    const nodeEnv = process.env.NODE_ENV;

    if (!databaseUrl) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not set',
        env: { nodeEnv, hasJwtSecret: !!jwtSecret }
      }, { status: 500 });
    }

    // Test database connection
    const connection = await mysql.createConnection(databaseUrl);
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    
    await connection.end();

    return NextResponse.json({ 
      success: true,
      message: 'Database connection successful',
      test: rows,
      env: { nodeEnv, hasJwtSecret: !!jwtSecret }
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET
      }
    }, { status: 500 });
  }
} 