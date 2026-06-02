# 🎯 Complete Full-Stack Deployment Guide

## Project Structure

```
FarrelBerwyn/A-Automation  (Main Repository)
├── frontend/
│   ├── src/
│   ├── .github/workflows/deploy.yml  (Auto-deploy to GitHub Pages)
│   ├── vite.config.ts                (base: '/A-Automation/')
│   └── .env.production               (Links to backend API)
│
└── Macintech/  (Project Root - Your Workspace)
    ├── frontend/       (Already deployed to GitHub Pages)
    ├── backend/        (To be deployed separately)
    └── BACKEND_DEPLOYMENT_GUIDE.md
```

---

## 🚀 Full Deployment Roadmap

### Stage 1: Frontend ✅ (Already Done)
- [x] Frontend deployed to GitHub Pages
- [x] URL: https://farrelberwyn.github.io/A-Automation/
- [x] Admin routes configured
- [x] Auto-deploy workflow setup

### Stage 2: Backend (This Step)
- [ ] Deploy backend to Render.com or Railway.app  
- [ ] Configure database (PostgreSQL)
- [ ] Get backend API URL
- [ ] Update frontend API configuration

### Stage 3: Integration
- [ ] Test frontend ↔ backend communication
- [ ] Verify auth flows
- [ ] Monitor logs and errors

---

## 🔧 Backend Deployment Options

### Option A: Render.com (Recommended for Beginners)

**Advantages:**
- Free tier available
- Automatic PostgreSQL database
- Simple UI
- GitHub integration

**Cost:**
- Free tier: Perfect for testing
- Production: ~$7/month

**Steps:**

1. **Sign Up**
   - Go to https://render.com
   - Sign in with GitHub
   - Authorize FarrelBerwyn/A-Automation

2. **Create Backend Service**
   - Dashboard → "New +" → "Web Service"
   - Connect repository: `FarrelBerwyn/A-Automation`
   - Branch: `main`
   - Runtime: `Node`

3. **Configure Build & Deploy**
   - Name: `a-automation-backend`
   - Root Directory: `Macintech/backend`
   - Build Command:
     ```
     npm install && npm run prisma:generate && npm run build
     ```
   - Start Command:
     ```
     npm start
     ```

4. **Environment Variables**
   - Click "Advanced"
   - Add variables:
     ```
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://farrelberwyn.github.io/A-Automation
     JWT_SECRET=<generate-with-openssl>
     ```

5. **Add PostgreSQL Database**
   - Click "Create PostgreSQL"
   - Instance: free-tier
   - Database: `a_automation`
   - Render auto-sets `DATABASE_URL`

6. **Deploy**
   - Render auto-deploys
   - Your URL: `https://a-automation-backend.onrender.com`

---

### Option B: Railway.app

**Advantages:**
- Clean, modern UI
- Generous free tier
- GitHub integration
- Automatic deployments

**Cost:**
- Free tier: $5/month credits
- Pay-as-you-go after

**Steps:**

1. **Sign Up**
   - Go to https://railway.app
   - Sign in with GitHub
   - Create new project

2. **Add Services**
   - Click "Add Service" → "GitHub Repo"
   - Select: `FarrelBerwyn/A-Automation`
   - Branch: `main`

3. **Configure Backend Service**
   - Name: `backend`
   - Root: `Macintech/backend`
   - Build command: `npm install && npm run prisma:generate && npm run build`
   - Start command: `npm start`

4. **Add PostgreSQL**
   - Click "Add" → "PostgreSQL"
   - Railway auto-configures everything

5. **Environment Variables**
   - Auto from PostgreSQL: `DATABASE_URL`
   - Add manually:
     ```
     NODE_ENV=production
     FRONTEND_URL=https://farrelberwyn.github.io/A-Automation
     JWT_SECRET=generate-secure-key
     ```

6. **Deploy**
   - Railway auto-deploys on push
   - Your URL shown in dashboard

---

### Option C: Vercel (Advanced)

**Advantages:**
- Optimized for Node.js
- Serverless option
- Great performance

**Steps:**
- Similar to Render
- Vercel → New Project → GitHub repo
- Configure build & environment
- Deploy

---

## 🔐 Generate JWT Secret

```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Or use online: https://generate-random.org/
# (use at least 32 random characters)
```

Example: `a3f8d2e1c9b4f6a7e2d1c3b8f9e4d5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0`

---

## 📝 Update Frontend Configuration

After getting backend URL, update `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url-here/api
VITE_USE_MOCK_API=false
```

Commit and push:
```bash
cd Macintech/frontend
git add .env.production
git commit -m "Update backend API URL"
git push origin main
```

Frontend auto-rebuilds and deploys!

---

## ✅ Verification Checklist

After deployment:

- [ ] Backend service running (check Render/Railway dashboard)
- [ ] PostgreSQL database connected
- [ ] No error logs in backend
- [ ] Frontend loads at: https://farrelberwyn.github.io/A-Automation/
- [ ] Admin login page accessible
- [ ] API calls work (check browser Network tab)

---

## 🧪 Testing Backend API

### Test 1: Health Check
```bash
curl https://your-backend-url.com/api/auth/health
# Should return: success or ok
```

### Test 2: Create Lead (Mock API)
```bash
curl -X POST https://your-backend-url.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "whatsapp": "+62812345678",
    "serviceType": "TRAINING",
    "projectDetail": "Test project"
  }'
```

### Test 3: Frontend Integration
1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to admin login page
4. Watch for API calls
5. Check for errors

---

## 🐛 Common Issues

### Issue: 502 Bad Gateway
**Cause:** Backend not running or crashed

**Fix:**
1. Check backend logs in Render/Railway
2. Verify database connection
3. Check `DATABASE_URL` environment variable
4. Restart service

### Issue: CORS Error
**Cause:** Frontend URL not in CORS whitelist

**Fix:**
1. Check `FRONTEND_URL` environment variable on backend
2. Value must be: `https://farrelberwyn.github.io/A-Automation`
3. Restart service after change

### Issue: Database Connection Error
**Cause:** `DATABASE_URL` not set or invalid

**Fix:**
1. Render: Database auto-created, check if connected
2. Railway: Check PostgreSQL service running
3. Verify `DATABASE_URL` in environment
4. Format: `postgresql://user:pass@host:port/db`

### Issue: Migrations Failed
**Cause:** Database schema mismatch

**Fix:**
```bash
# In backend folder:
npm run prisma:migrate
npm run prisma:seed
```

---

## 📊 Monitoring & Logs

### Render Logs
- Dashboard → Service name → Logs tab
- Shows all console output
- Live updates

### Railway Logs
- Project dashboard → Service → Logs
- Real-time streaming
- Filter by error level

### Frontend Deployment Logs
- https://github.com/FarrelBerwyn/A-Automation/actions
- Select "Deploy to GitHub Pages" workflow
- Click latest run
- View job logs

---

## 🔄 Continuous Deployment Workflow

After initial setup:

1. **Make Changes**
   ```bash
   # Backend changes
   cd Macintech/backend
   git add .
   git commit -m "Your changes"
   git push origin main

   # Frontend changes
   cd ../frontend
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Automatic Deployment**
   - GitHub Actions detects push
   - Backend redeploys on Render/Railway
   - Frontend rebuilds & deploys to Pages
   - Changes live in 2-3 minutes

3. **Monitor**
   - Check Render/Railway logs
   - Check GitHub Actions
   - Verify website updated

---

## 📚 Project URLs

| Component | URL |
|-----------|-----|
| **Website** | https://farrelberwyn.github.io/A-Automation/ |
| **Admin Dashboard** | https://farrelberwyn.github.io/A-Automation/admin |
| **Repository** | https://github.com/FarrelBerwyn/A-Automation |
| **GitHub Actions** | https://github.com/FarrelBerwyn/A-Automation/actions |
| **Backend** | https://your-backend-url.com (set after deploy) |

---

## 🆘 Need Help?

### Documentation
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Prisma ORM: https://www.prisma.io/docs
- Express.js: https://expressjs.com

### Still Having Issues?
1. Check logs in Render/Railway dashboard
2. Check GitHub Actions workflow logs
3. Check browser DevTools (F12) for frontend errors
4. Verify all environment variables are set
5. Try restarting the service

---

## ✨ Next Steps

1. **Choose Deployment Platform** (Render or Railway recommended)
2. **Deploy Backend** (follow above steps)
3. **Get Backend URL** (from dashboard)
4. **Update Frontend** `.env.production`
5. **Push Changes** (auto-deploys)
6. **Test Integration** (verify everything works)
7. **Monitor** (keep logs open during development)

---

**Congratulations! You now have a full-stack production deployment! 🎉**

Your website with backend API is ready at:
```
Frontend: https://farrelberwyn.github.io/A-Automation/
Backend: https://your-backend-url.com/api
```
