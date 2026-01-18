# Quick Deployment Guide

## 🚀 Deployment Options

You have 3 ways to deploy:

### Option 1: Firebase App Hosting (Recommended) - Requires Git
### Option 2: Vercel (Easiest) - Requires Git  
### Option 3: Manual Build & Deploy - No Git needed

---

## 📦 Option 1: Firebase App Hosting

### Prerequisites:
- Git installed
- GitHub account
- Firebase project set up

### Steps:

1. **Install Git** (if not installed):
   - Download from: https://git-scm.com/download/win
   - Install with default settings

2. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Create new repository (don't initialize)
   - Copy the repository URL

4. **Push to GitHub:**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

5. **Deploy via Firebase Console:**
   - Go to Firebase Console > App Hosting
   - Click "Get started"
   - Connect your GitHub repository
   - Configure build settings
   - Add environment variables
   - Deploy!

---

## 🌐 Option 2: Vercel (Easiest)

### Prerequisites:
- Git installed
- GitHub account

### Steps:

1. **Install Git** (if not installed)

2. **Initialize and push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub, then:
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your repository
   - Add environment variables
   - Click "Deploy"
   - Done in 2-3 minutes!

---

## 🔧 Option 3: Manual Deployment (No Git)

### For Firebase Hosting (Static):

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Export static files:**
   - Update `next.config.ts` to add `output: 'export'`
   - Run `npm run build` again
   - Files will be in `out/` folder

3. **Deploy manually:**
   - Use Firebase Console > Hosting
   - Upload the `out/` folder contents

**Note:** This won't support SSR or admin panel fully. Use Option 1 or 2 for full functionality.

---

## ⚡ Quick Start (Recommended: Vercel)

### Fastest Way:

1. **Install Git:**
   - Download: https://git-scm.com/download/win
   - Install with defaults

2. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create GitHub Repo:**
   - Go to https://github.com/new
   - Name it: `portfolio-website`
   - Click "Create repository"
   - Copy the commands shown

4. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
   git branch -M main
   git push -u origin main
   ```

5. **Deploy to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New" > "Project"
   - Select your repository
   - Add environment variables (Firebase config)
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

---

## 🔑 Environment Variables to Add

When deploying, add these in your hosting platform:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Get these from Firebase Console > Project Settings > Your apps.

---

## 📝 Which Option to Choose?

- **Vercel**: Easiest, fastest, best for Next.js
- **Firebase App Hosting**: Good if you want everything in Firebase
- **Manual**: Only if you can't use Git

**Recommendation: Use Vercel (Option 2)** - It's the easiest and works perfectly with Next.js!

---

## 🆘 Need Help?

If you get stuck:
1. Check the detailed guide in `DEPLOYMENT_GUIDE.md`
2. Make sure Git is installed
3. Verify your Firebase config is correct
4. Check build logs for errors
