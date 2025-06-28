-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE,
    phone VARCHAR(20),
    country VARCHAR(100),
    bitcoin_wallet VARCHAR(255),
    usdt_wallet VARCHAR(255),
    account_type ENUM('demo', 'live') DEFAULT 'demo',
    balance DECIMAL(15,2) DEFAULT 50000.00,
    demo_balance DECIMAL(15,2) DEFAULT 50000.00,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal', 'trade', 'bonus') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_hash VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create trades table
CREATE TABLE IF NOT EXISTS trades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    type ENUM('buy', 'sell') NOT NULL,
    amount DECIMAL(15,8) NOT NULL,
    open_price DECIMAL(15,8) NOT NULL,
    close_price DECIMAL(15,8),
    stop_loss DECIMAL(15,8),
    take_profit DECIMAL(15,8),
    leverage INT DEFAULT 1,
    profit_loss DECIMAL(15,2) DEFAULT 0,
    status ENUM('open', 'closed', 'cancelled') DEFAULT 'open',
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (email, password, first_name, last_name, username, is_admin, account_type, balance) 
VALUES ('admin@mexohub.org', '$2b$10$rQZ9QmjlQXW8iGwHlXe4/.vK8YqZ9QmjlQXW8iGwHlXe4/.vK8YqZ9', 'Admin', 'User', 'admin', TRUE, 'live', 100000.00)
ON DUPLICATE KEY UPDATE email = email;

-- Insert default settings
INSERT INTO admin_settings (setting_key, setting_value, description) VALUES
('site_name', 'MexoHub', 'Website name'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode'),
('min_deposit', '10', 'Minimum deposit amount'),
('max_withdrawal', '50000', 'Maximum withdrawal amount per day'),
('demo_balance', '50000', 'Default demo account balance')
ON DUPLICATE KEY UPDATE setting_key = setting_key;
