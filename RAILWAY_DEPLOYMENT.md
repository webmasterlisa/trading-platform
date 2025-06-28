# Railway Deployment Guide for Trading Platform

## 🚀 Quick Deploy to Railway

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure your repository is public or you have Railway Pro

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your trading platform repository
5. Railway will automatically detect it's a Next.js app

### Step 3: Add Database
1. In your Railway project, click "New"
2. Select "Database" → "MySQL"
3. Railway will create a MySQL database for you
4. Copy the database connection details

### Step 4: Configure Environment Variables
In your Railway project settings, add these environment variables:

```env
DB_HOST=your-railway-mysql-host
DB_USER=your-railway-mysql-user
DB_PASSWORD=your-railway-mysql-password
DB_NAME=your-railway-mysql-database
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
```

### Step 5: Set Up Database Schema
1. Go to your Railway MySQL database
2. Click "Connect" → "MySQL"
3. Run the SQL from `scripts/create-database.sql`

### Step 6: Create Admin User
After database setup, create admin user:

```sql
INSERT INTO users (email, password, first_name, last_name, username, is_admin, account_type, balance) 
VALUES ('admin@mexohub.org', '$2b$10$wzZP/GMg7s1LZEWm8L0RauGWJq1TPRHhqr5GEMr.W98OUPv/8FstW', 'Admin', 'User', 'admin', TRUE, 'live', 100000.00);
```

## 🔧 Railway Configuration

### Build Settings
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Health Check**: `/`

### Environment Variables
Railway will automatically set:
- `PORT` - Railway assigns this
- `RAILWAY_STATIC_URL` - Your app's URL

You need to set:
- `DB_HOST` - From Railway MySQL
- `DB_USER` - From Railway MySQL
- `DB_PASSWORD` - From Railway MySQL
- `DB_NAME` - From Railway MySQL
- `JWT_SECRET` - Your secret key

## 📊 Monitoring

### Railway Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment status
- View environment variables

### Health Checks
- Railway automatically checks `/` endpoint
- App will restart if health check fails

## 🔄 Automatic Deployments

### GitHub Integration
- Every push to main branch triggers deployment
- Railway builds and deploys automatically
- Zero-downtime deployments

### Custom Domains
1. Go to Railway project settings
2. Click "Domains"
3. Add your custom domain
4. Railway provides SSL automatically

## 💰 Pricing

### Free Tier
- $5 credit monthly
- Perfect for development/testing
- Auto-sleeps after inactivity

### Pro Plan
- $20/month
- Always-on deployments
- Custom domains
- Team collaboration

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Railway logs
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database Connection Fails**
   - Verify environment variables
   - Check database is running
   - Ensure database schema is created

3. **App Won't Start**
   - Check `npm start` command
   - Verify PORT environment variable
   - Check application logs

### Getting Help
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Railway Docs: [docs.railway.app](https://docs.railway.app)
- GitHub Issues: Your repository

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] MySQL database added
- [ ] Environment variables configured
- [ ] Database schema imported
- [ ] Admin user created
- [ ] App deployed successfully
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Health checks passing

## 🎉 Success!

Your trading platform will be live at:
`https://your-app-name.railway.app`

**Admin Login:**
- Email: `admin@mexohub.org`
- Password: `admin123`

**Test User:**
- Email: `test@example.com`
- Password: `test123` 