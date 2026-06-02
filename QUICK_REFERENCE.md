# 📖 Quick Reference - Backend & Frontend Deployment

## URLs After Setup

| Component | URL |
|-----------|-----|
| **🌐 Website (Landing)** | https://farrelberwyn.github.io/A-Automation/ |
| **🔐 Admin Login** | https://farrelberwyn.github.io/A-Automation/admin/login |
| **📊 Dashboard** | https://farrelberwyn.github.io/A-Automation/admin/dashboard |
| **📋 Leads** | https://farrelberwyn.github.io/A-Automation/admin/leads |
| **⚙️ Settings** | https://farrelberwyn.github.io/A-Automation/admin/settings |
| **💻 Backend API** | `https://your-service.onrender.com` (after deploy) |
| **📦 Repository** | https://github.com/FarrelBerwyn/A-Automation |

---

## 🚀 Deployment Checklist

### Frontend (GitHub Pages) ✅
- [x] Repository created & pushed
- [x] GitHub Actions workflow setup
- [x] Auto-deploy enabled
- [x] Live at: https://farrelberwyn.github.io/A-Automation/

### Backend (Render.com or Railway.app) ⏳
- [ ] Service created
- [ ] PostgreSQL database added
- [ ] Environment variables configured
- [ ] Service deployed
- [ ] Get backend URL
- [ ] Update frontend `.env.production`

### Integration ⏳
- [ ] Frontend calls backend API
- [ ] Authentication working
- [ ] Database operations functioning

---

## 🔗 Environment Variables Needed

### Backend (Render/Railway)
```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://farrelberwyn.github.io/A-Automation
JWT_SECRET=your-secure-random-string
DATABASE_URL=auto-set-by-service
```

### Frontend (`.env.production`)
```
VITE_API_URL=https://your-backend-url.com/api
VITE_USE_MOCK_API=false
```

---

## 📝 3-Step Backend Setup

### Step 1: Choose Platform
- **Render.com** (Recommended) - https://render.com
- **Railway.app** - https://railway.app
- **Vercel** - https://vercel.com

### Step 2: Connect Repository
1. Sign up with GitHub
2. Select repo: `FarrelBerwyn/A-Automation`
3. Branch: `main`
4. Root Directory: `Macintech/backend`

### Step 3: Configure & Deploy
1. Build: `npm install && npm run prisma:generate && npm run build`
2. Start: `npm start`
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

---

## 🧪 Quick Tests

### Test 1: Website Loading
```bash
curl https://farrelberwyn.github.io/A-Automation/
```

### Test 2: Admin Page
Visit: https://farrelberwyn.github.io/A-Automation/admin

### Test 3: Backend API
```bash
curl https://your-backend-url.com/api
```

---

## 🐛 Quick Fixes

| Error | Solution |
|-------|----------|
| 404 on GitHub Pages | Wait 2 min, hard refresh, check settings |
| CORS error | Verify `FRONTEND_URL` on backend |
| Database error | Check `DATABASE_URL`, ensure PostgreSQL running |
| Build fails | Check backend logs in Render/Railway dashboard |
| API not responding | Check backend service status, view logs |

---

## 📚 All Routes

### Frontend Routes (GitHub Pages)
- `/` - Landing page
- `/admin/login` - Login
- `/admin/dashboard` - Dashboard
- `/admin/leads` - Leads list
- `/admin/leads/:id` - Lead detail
- `/admin/settings` - Settings

### Backend Routes (`/api`)
- `POST /auth/register` - Create account
- `POST /auth/login` - Login  
- `GET /leads` - List leads
- `POST /leads` - Create lead
- `GET /leads/:id` - Lead detail
- `PUT /leads/:id` - Update lead
- `DELETE /leads/:id` - Delete lead

---

## 🎯 Next: Deploy Backend Now

👉 **READ:** [FULL_DEPLOYMENT_GUIDE.md](./FULL_DEPLOYMENT_GUIDE.md)

Choose Render or Railway, follow the steps, and your full-stack app is ready!

---

**Still need help?**
- Frontend troubleshooting: [FINAL_SETUP_GUIDE.md](./frontend/FINAL_SETUP_GUIDE.md)
- Backend troubleshooting: [BACKEND_DEPLOYMENT_GUIDE.md](./BACKEND_DEPLOYMENT_GUIDE.md)
