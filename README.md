# 🏗️ A-Automation: Full-Stack Platform

Complete automation platform with landing page, admin dashboard, and backend API.

## 🌐 Live Website

- **Landing Page**: https://farrelberwyn.github.io/A-Automation/
- **Admin Dashboard**: https://farrelberwyn.github.io/A-Automation/admin/dashboard
- **Repository**: https://github.com/FarrelBerwyn/A-Automation

## 📚 Documentation

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick overview & URLs
- **[FULL_DEPLOYMENT_GUIDE.md](./FULL_DEPLOYMENT_GUIDE.md)** - Complete setup instructions
- **[FINAL_SETUP_GUIDE.md](./FINAL_SETUP_GUIDE.md)** - GitHub Pages troubleshooting
- **[BACKEND_DEPLOYMENT_GUIDE.md](./BACKEND_DEPLOYMENT_GUIDE.md)** - Backend deployment steps

## 🚀 Quick Start

### 1. Frontend (Already Deployed ✅)
Your website is live at: https://farrelberwyn.github.io/A-Automation/

### 2. Deploy Backend
See **[FULL_DEPLOYMENT_GUIDE.md](./FULL_DEPLOYMENT_GUIDE.md)** to deploy backend to Render or Railway

### 3. Local Development

**Frontend:**
```bash
npm install
npm run dev  # Runs on http://localhost:5173
```

**Backend:**
```bash
cd ../backend
npm install
npm run dev  # Runs on http://localhost:3000
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Deployment**: GitHub Pages (Frontend) + Render/Railway (Backend)

## 📋 Project Features

### Landing Page
- Service showcase
- Lead capture form
- FAQ section
- Responsive design

### Admin Dashboard
- Lead management
- Dashboard statistics
- Settings configuration
- User authentication

### Backend API
- RESTful endpoints
- JWT authentication
- PostgreSQL database
- CORS enabled

## 🔄 Deployment Workflow

Every commit to `main`:
1. GitHub Actions builds frontend
2. Deploy to GitHub Pages
3. Backend redeploys to Render/Railway
4. Database migrations auto-run

## 🐛 Troubleshooting

### Frontend Issues
- Check: [FINAL_SETUP_GUIDE.md](./FINAL_SETUP_GUIDE.md)

### Backend Issues
- Check: [FULL_DEPLOYMENT_GUIDE.md](./FULL_DEPLOYMENT_GUIDE.md)

### Common Problems
- Check: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

## 📞 Support

For detailed setup instructions, see the documentation files above.

## 🎯 Next Steps

1. Deploy backend (see FULL_DEPLOYMENT_GUIDE.md)
2. Get backend URL
3. Update `.env.production` with API URL
4. Push changes
5. Test integration

---

**Framework Details:**
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
