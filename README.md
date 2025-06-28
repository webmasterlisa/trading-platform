# Trading Platform

A modern trading platform built with Next.js, featuring real-time data, admin management, and comprehensive trading tools.

## 🚀 Quick Deploy to Railway

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository
5. Railway will auto-detect Next.js and deploy

### 3. Add MySQL Database
1. In Railway project, click "New"
2. Select "Database" → "MySQL"
3. Railway creates database automatically

### 4. Configure Environment Variables
Add these in Railway project settings:
```env
DB_HOST=your-railway-mysql-host
DB_USER=your-railway-mysql-user
DB_PASSWORD=your-railway-mysql-password
DB_NAME=your-railway-mysql-database
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### 5. Set Up Database
1. Go to Railway MySQL database
2. Click "Connect" → "MySQL"
3. Run SQL from `scripts/create-database.sql`

### 6. Create Admin User
```sql
INSERT INTO users (email, password, first_name, last_name, username, is_admin, account_type, balance) 
VALUES ('admin@mexohub.org', '$2b$10$wzZP/GMg7s1LZEWm8L0RauGWJq1TPRHhqr5GEMr.W98OUPv/8FstW', 'Admin', 'User', 'admin', TRUE, 'live', 100000.00);
```

## 🔐 Login Credentials

### Admin Access
- **Email:** `admin@mexohub.org`
- **Password:** `admin123`

### Test User
- **Email:** `test@example.com`
- **Password:** `test123`

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- MySQL/MariaDB
- XAMPP (for local database)

### Setup
```bash
# Install dependencies
npm install

# Set up database
# Import scripts/create-database.sql to your MySQL database

# Create admin user (run the SQL command above)

# Start development server
npm run dev
```

### Environment Variables (Local)
Create `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mexohub_trading
DB_PORT=3306
JWT_SECRET=your-secret-key
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── admin/            # Admin panel
│   └── ...
├── components/            # React components
├── lib/                  # Utilities and database
├── scripts/              # Database setup scripts
└── public/               # Static assets
```

## 🎯 Features

### User Features
- ✅ Real-time dashboard with live data
- ✅ Account balance management
- ✅ Transaction history
- ✅ Trading interface
- ✅ Deposit/Withdrawal system
- ✅ Demo and Live account types

### Admin Features
- ✅ User management
- ✅ Balance adjustments
- ✅ Transaction approval system
- ✅ System settings
- ✅ Real-time statistics

### Technical Features
- ✅ Next.js 15 with App Router
- ✅ MySQL database integration
- ✅ JWT authentication
- ✅ Responsive design
- ✅ Real-time data fetching
- ✅ Admin role management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Dashboard
- `GET /api/dashboard/stats` - User dashboard statistics
- `GET /api/dashboard/transactions` - User transaction history

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users` - Update user
- `PUT /api/admin/users/balance` - Update user balance
- `GET /api/admin/transactions` - Get all transactions
- `POST /api/admin/transactions/approve` - Approve/decline transactions

## 🚀 Deployment

### Railway (Recommended)
- Automatic deployments from GitHub
- Built-in MySQL database
- SSL certificates included
- Custom domains supported

### Other Options
- Vercel (free tier available)
- Render (alternative to Railway)
- DigitalOcean App Platform

## 📊 Database Schema

### Tables
- `users` - User accounts and balances
- `transactions` - Deposit/withdrawal history
- `trades` - Trading history
- `admin_settings` - System configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For deployment help:
- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)

For technical issues:
- Check the logs in Railway dashboard
- Verify environment variables
- Ensure database schema is imported 