# Deploy Your Website - Next Steps

## ✅ Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com/new
   - (Login if needed)

2. **Create New Repository:**
   - Repository name: `portfolio-website`
   - Description: `Portfolio website for Dr. J. Preetha Roselyn`
   - Choose: **Public** or **Private** (your choice)
   - ⚠️ **DO NOT** check "Initialize with README"
   - ⚠️ **DO NOT** add .gitignore or license
   - Click **"Create repository"**

3. **Copy the repository URL:**
   - You'll see a page with setup instructions
   - Copy the HTTPS URL (looks like: `https://github.com/YOUR_USERNAME/portfolio-website.git`)

---

## ✅ Step 2: Push to GitHub

Run these commands in your terminal (replace YOUR_USERNAME):

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll be asked to login to GitHub:
- Use your GitHub username and password
- Or use a Personal Access Token (if 2FA is enabled)

---

## ✅ Step 3: Deploy to Vercel (Easiest)

### Option A: Vercel (Recommended - Fastest)

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click **"Sign Up"** or **"Login"**
   - Choose **"Continue with GitHub"**

2. **Import Project:**
   - Click **"Add New"** → **"Project"**
   - Find your `portfolio-website` repository
   - Click **"Import"**

3. **Configure:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `.next` (auto)
   - Click **"Deploy"**

4. **Add Environment Variables:**
   - Before or after first deploy, go to **Settings** → **Environment Variables**
   - Add these (get from Firebase Console):
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     ```
   - Click **"Save"**
   - Redeploy if needed

5. **Wait 2-3 minutes:**
   - Your site will be live at: `https://portfolio-website.vercel.app`
   - Or a custom domain if you set one up

---

## ✅ Step 3 Alternative: Deploy to Firebase App Hosting

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project
   - Click **"App Hosting"** in left sidebar

2. **Get Started:**
   - Click **"Get started"** or **"Add app"**
   - Click **"Connect repository"**
   - Authorize Firebase to access GitHub
   - Select your `portfolio-website` repository
   - Select branch: `main`

3. **Configure:**
   - **Build command:** `npm run build`
   - **Output directory:** `.next`
   - **Node version:** `18` or `20`
   - Click **"Next"**

4. **Add Environment Variables:**
   - Add all your Firebase config variables
   - Click **"Save"**

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 5-10 minutes
   - Your site will be live!

---

## 🎉 After Deployment

### Your website will be live at:
- **Vercel:** `https://portfolio-website.vercel.app`
- **Firebase:** `https://your-project.web.app`

### Test your site:
1. Visit the live URL
2. Check all pages load correctly
3. Test admin login at: `your-url/admin/login`
4. Add some content via admin panel

---

## 🔄 Future Updates

After making changes:

```powershell
git add .
git commit -m "Description of changes"
git push origin main
```

**Vercel/Firebase will automatically:**
- Detect the push
- Build your app
- Deploy the new version
- Usually takes 2-5 minutes

---

## 🆘 Troubleshooting

### Push fails - Authentication:
- Use Personal Access Token instead of password
- Create at: https://github.com/settings/tokens

### Build fails:
- Check build logs in Vercel/Firebase
- Make sure environment variables are set
- Test build locally: `npm run build`

### Environment variables missing:
- Add them in hosting platform settings
- Redeploy after adding

---

**Ready? Let's deploy!** 🚀
