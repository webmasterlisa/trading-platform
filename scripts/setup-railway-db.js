const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Railway MySQL connection string
const DATABASE_URL = 'mysql://root:mbgRzkCXEvcUJAXApUMskKvjIxFHEwpd@tramway.proxy.rlwy.net:21794/railway';

async function setupDatabase() {
  let connection;
  
  try {
    console.log('Connecting to Railway MySQL database...');
    connection = await mysql.createConnection(DATABASE_URL);
    console.log('Connected successfully!');

    // Read and execute the SQL script
    const fs = require('fs');
    const sqlScript = fs.readFileSync('./scripts/create-database.sql', 'utf8');
    
    // Split the script into individual statements
    const statements = sqlScript.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log('Executed:', statement.substring(0, 50) + '...');
      }
    }

    // Create admin user with proper password hash
    const adminPassword = 'admin123'; // Change this to your desired admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const adminUser = {
      email: 'admin@mexohub.org',
      password: hashedPassword,
      first_name: 'Admin',
      last_name: 'User',
      username: 'admin',
      is_admin: true,
      account_type: 'live',
      balance: 100000.00
    };

    // Insert or update admin user
    await connection.execute(`
      INSERT INTO users (email, password, first_name, last_name, username, is_admin, account_type, balance) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        password = VALUES(password),
        is_admin = VALUES(is_admin),
        balance = VALUES(balance)
    `, [adminUser.email, adminUser.password, adminUser.first_name, adminUser.last_name, adminUser.username, adminUser.is_admin, adminUser.account_type, adminUser.balance]);

    console.log('✅ Database setup completed successfully!');
    console.log('📧 Admin email: admin@mexohub.org');
    console.log('🔑 Admin password: admin123');
    console.log('⚠️  Please change the admin password after first login!');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase(); 