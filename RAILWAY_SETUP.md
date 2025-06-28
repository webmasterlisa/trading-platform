# Railway Deployment Setup Guide

## 🚀 Quick Setup Steps

### 1. Environment Variables in Railway
Add these environment variables in your Railway project dashboard:

```
DATABASE_URL=mysql://root:mbgRzkCXEvcUJAXApUMskKvjIxFHEwpd@tramway.proxy.rlwy.net:21794/railway
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=production
```

### 2. Set Up Database
Once your Railway app is deployed, run this command locally to set up the database:

```bash
node scripts/setup-railway-db.js
```

This will:
- Create all necessary database tables
- Create an admin user with credentials:
  - Email: `admin@mexohub.org`
  - Password: `admin123`

### 3. Access Your App
- Your app will be available at the Railway-provided URL
- Login with admin credentials to access the admin panel
- Create regular user accounts for testing

### 4. Admin Panel
- Go to `/admin` to access the admin panel
- Manage users, approve transactions, and edit balances
- Change the admin password after first login

## 🔧 Troubleshooting

### Build Issues
- If you see pnpm errors, make sure `pnpm-lock.yaml` is removed
- Railway should automatically use npm

### Database Connection Issues
- Verify the DATABASE_URL is correct
- Check that the MySQL service is running in Railway

### Login Issues
- Make sure the database setup script has been run
- Verify JWT_SECRET is set correctly

## 📧 Support
If you encounter any issues, check the Railway logs in your project dashboard. 