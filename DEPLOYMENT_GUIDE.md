# Deployment & Update Guide

Complete guide for hosting and updating your portfolio website.

## 🚀 Deployment Options

You have two main options:

### Option 1: Firebase App Hosting (Recommended for Full-Stack)
- ✅ Supports SSR (Server-Side Rendering)
- ✅ Integrated with Firebase services
- ✅ Automatic builds from GitHub
- ✅ Preview deployments

### Option 2: Vercel (Also Great for Next.js)
- ✅ Excellent Next.js support
- ✅ Automatic deployments
- ✅ Free tier available
- ✅ Easy setup

---

## 📦 Option 1: Deploy to Firebase App Hosting

### Initial Setup (One Time)

#### Step 1: Push Code to GitHub

1. **Create a GitHub repository:**
   ```bash
   # If you haven't initialized git yet
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create repository on GitHub:**
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it (e.g., `portfolio-website`)
   - Don't initialize with README
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Connect to Firebase App Hosting

1. **Go to Firebase Console:**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click **"App Hosting"** in the left sidebar

2. **Connect Repository:**
   - Click **"Get started"** or **"Add app"**
   - Click **"Connect repository"**
   - Authorize Firebase to access GitHub
   - Select your repository
   - Select the branch (usually `main`)

3. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Output directory:** `.next`
   - **Node version:** `18` or `20`
   - **Root directory:** `/` (or leave empty)

4. **Add Environment Variables:**
   - Go to **Settings** > **Environment variables**
   - Add all your Firebase config:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

5. **Deploy:**
   - Click **"Deploy"** or it will auto-deploy
   - Wait for build to complete (5-10 minutes first time)
   - Your site will be live at: `https://your-project.web.app`

### Updating the Website (After Making Changes)

#### Method 1: Automatic (Recommended)

1. **Make your changes** in your code editor
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. **Firebase automatically:**
   - Detects the push
   - Builds your app
   - Deploys the new version
   - Usually takes 5-10 minutes

#### Method 2: Manual Deploy

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy using Firebase CLI:**
   ```bash
   firebase deploy --only hosting
   ```

---

## 🌐 Option 2: Deploy to Vercel (Alternative)

### Initial Setup

1. **Push to GitHub** (same as above)

2. **Go to Vercel:**
   - Visit [Vercel](https://vercel.com)
   - Sign up/login with GitHub

3. **Import Project:**
   - Click **"Add New"** > **"Project"**
   - Select your GitHub repository
   - Click **"Import"**

4. **Configure:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `.next` (auto)

5. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add all your Firebase config variables:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     ```

6. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Your site is live!

### Updating on Vercel

1. **Make changes** in your code
2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin main
   ```
3. **Vercel automatically:**
   - Detects changes
   - Builds and deploys
   - Usually takes 2-3 minutes

---

## 🔄 Workflow: Making Updates

### Daily Workflow:

1. **Edit files** in your code editor
   - Example: Update content in `components/Hero.tsx`
   - Or add new grants via admin panel

2. **Test locally:**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000`
   - Check everything works

3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update hero section with new image"
   git push origin main
   ```

4. **Wait for deployment:**
   - Check Firebase Console or Vercel dashboard
   - See deployment progress
   - Site updates automatically!

### Updating Content via Admin Panel

**No deployment needed!** Content changes via admin panel are instant:

1. Go to `/admin/login`
2. Login with your credentials
3. Edit content (grants, publications, etc.)
4. Changes appear immediately on the live site
5. No code deployment required!

### Updating Code/Design

**Requires deployment:**

1. Edit code files
2. Test locally
3. Push to GitHub
4. Wait for auto-deployment

---

## 📝 Quick Reference Commands

### Git Commands (for updates):

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your update description"

# Push to GitHub
git push origin main
```

### Build Commands:

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Test production build locally
npm start
```

---

## 🔍 Checking Deployment Status

### Firebase App Hosting:
- Go to Firebase Console > App Hosting
- See deployment history
- Check build logs
- View live URL

### Vercel:
- Go to Vercel Dashboard
- See deployment history
- Check build logs
- View live URL

---

## 🎯 Best Practices

### 1. Always Test Locally First
```bash
npm run dev
```
Test your changes before pushing!

### 2. Use Descriptive Commit Messages
```bash
git commit -m "Add profile image to hero section"
```
Not: `git commit -m "update"`

### 3. Check Build Logs
If deployment fails, check the build logs for errors.

### 4. Environment Variables
Make sure all environment variables are set in your hosting platform.

### 5. Content vs Code
- **Content changes** (via admin): Instant, no deployment
- **Code changes** (editing files): Requires deployment

---

## 🐛 Troubleshooting

### Build Fails:
1. Check build logs in Firebase/Vercel
2. Test build locally: `npm run build`
3. Fix any errors
4. Push again

### Environment Variables Missing:
1. Go to hosting platform settings
2. Add missing variables
3. Redeploy

### Changes Not Showing:
1. Clear browser cache (Ctrl+Shift+R)
2. Check if deployment completed
3. Verify you pushed to correct branch

### Admin Panel Not Working:
1. Check Firebase Authentication is enabled
2. Verify Firestore rules allow writes
3. Check browser console for errors

---

## 📱 Custom Domain (Optional)

### Firebase:
1. Go to App Hosting > Settings
2. Click "Add custom domain"
3. Follow instructions

### Vercel:
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records

---

## 🎉 Summary

**For Content Updates:**
- Use admin panel → Instant updates, no deployment needed

**For Code Updates:**
1. Edit files
2. Test locally (`npm run dev`)
3. Push to GitHub (`git push`)
4. Auto-deploys in 5-10 minutes

**That's it!** Your website is live and easy to update! 🚀
