# 🚀 Blog App Deployment Guide - Render

This guide will help you deploy your full-stack blog application with AI Writing Assistant to Render.

## 📋 Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Repository** - Your code should be in a GitHub repository
3. **MySQL Database** - You'll need a MySQL database (we'll use PlanetScale or Render's managed PostgreSQL)

## 🗄️ Database Setup

### Option 1: PlanetScale (MySQL - Recommended)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database called `blog`
3. Get your connection string from the dashboard
4. Keep the connection details for later

### Option 2: Render PostgreSQL (Alternative)
1. In Render dashboard, create a new PostgreSQL database
2. Note the connection details
3. You'll need to update your schema for PostgreSQL syntax

## 🔙 Backend Deployment

### Step 1: Prepare Repository
1. Ensure your code is pushed to GitHub
2. Your `api` folder should be in the root of your repository

### Step 2: Create Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

   **Basic Settings:**
   - **Name**: `your-blog-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Environment Variables
Add these environment variables in Render:

```
NODE_ENV=production
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**Important Notes:**
- Replace database credentials with your actual values
- Generate a strong JWT_SECRET (use a password generator)
- You'll update FRONTEND_URL after deploying the frontend

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for the build to complete
3. Note your backend URL: `https://your-blog-api.onrender.com`

## 🎨 Frontend Deployment

### Step 1: Create Static Site on Render
1. In Render dashboard, click **"New"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the static site:

   **Basic Settings:**
   - **Name**: `your-blog-frontend`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### Step 2: Environment Variables
Add these environment variables:

```
REACT_APP_API_URL=https://your-blog-api.onrender.com/api
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

**Replace with your actual values:**
- Use your backend URL from Step 4 above
- Use your actual Gemini API key

### Step 3: Deploy
1. Click **"Create Static Site"**
2. Wait for the build to complete
3. Note your frontend URL: `https://your-blog-frontend.onrender.com`

### Step 4: Update Backend CORS
1. Go back to your backend service in Render
2. Update the `FRONTEND_URL` environment variable
3. Set it to your actual frontend URL: `https://your-blog-frontend.onrender.com`
4. Trigger a new deploy of your backend

## 📊 Database Schema Setup

You'll need to create your database tables. Connect to your database and run:

```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  desc TEXT NOT NULL,
  img VARCHAR(255),
  cat VARCHAR(255),
  date DATETIME,
  uid INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔧 Environment Variables Reference

### Backend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DB_HOST` | Database host | `aws.connect.psdb.cloud` |
| `DB_USER` | Database username | `your_username` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_NAME` | Database name | `blog` |
| `DB_PORT` | Database port | `3306` |
| `JWT_SECRET` | JWT signing secret | `your_very_long_random_secret` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-frontend.onrender.com` |

### Frontend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://your-api.onrender.com/api` |
| `REACT_APP_GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Code is pushed to GitHub
- [ ] Database is set up and accessible
- [ ] Environment variables are ready
- [ ] Build commands work locally

### Backend Deployment
- [ ] Web Service created on Render
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] API endpoints accessible

### Frontend Deployment
- [ ] Static Site created on Render
- [ ] Environment variables configured
- [ ] Build successful
- [ ] Site loads correctly

### Post-deployment
- [ ] Frontend can connect to backend
- [ ] Database operations work
- [ ] AI Writing Assistant functions
- [ ] User authentication works
- [ ] File uploads work
- [ ] CORS configured correctly

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `FRONTEND_URL` in backend matches your actual frontend URL
- Check that credentials are enabled in CORS config

**2. Database Connection Issues**
- Verify all database environment variables
- Check if your database allows external connections
- Ensure SSL settings match your database requirements

**3. API Connection Issues**
- Check that `REACT_APP_API_URL` points to your backend
- Ensure the backend is running and accessible
- Verify environment variables are set correctly

**4. AI Features Not Working**
- Check `REACT_APP_GEMINI_API_KEY` is set correctly
- Verify the API key is valid and has proper permissions
- Check browser console for detailed error messages

**5. Build Failures**
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Checking Logs
1. Go to your service in Render dashboard
2. Click on "Logs" tab
3. Look for error messages during build or runtime

## 🔒 Security Notes

1. **Never commit sensitive data** like API keys or database passwords
2. **Use strong JWT secrets** - generate random strings of 64+ characters
3. **Enable HTTPS only** - Render provides this by default
4. **Regular updates** - Keep dependencies updated
5. **Environment variables only** - Never hardcode secrets

## 🎯 Performance Tips

1. **Enable caching** - Configure appropriate cache headers
2. **Optimize images** - Consider using image optimization services
3. **Database indexing** - Add indexes to frequently queried columns
4. **CDN usage** - Consider using a CDN for static assets

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render documentation
3. Check your service logs
4. Ensure all environment variables are correctly set

---

**🎉 Once deployed, your blog will be live at:**
- **Frontend**: `https://your-blog-frontend.onrender.com`
- **Backend**: `https://your-blog-api.onrender.com`

Your users can register, login, create articles, and use the AI Writing Assistant powered by Google Gemini! 