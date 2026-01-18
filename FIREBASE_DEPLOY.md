# Deploy to Firebase App Hosting - Complete Guide

## ✅ Prerequisites Checklist

- [x] Git installed
- [x] Code committed locally
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Firebase project created
- [ ] Firebase App Hosting configured

---

## Step 1: Push Code to GitHub

### 1.1 Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com/new
   - Login if needed

2. **Create Repository:**
   - Repository name: `portfolio-website`
   - Description: `Portfolio website for Dr. J. Preetha Roselyn`
   - Choose **Public** or **Private**
   - ⚠️ **DO NOT** check "Initialize with README"
   - ⚠️ **DO NOT** add .gitignore or license
   - Click **"Create repository"**

3. **Copy the repository URL:**
   - You'll see: `https://github.com/YOUR_USERNAME/portfolio-website.git`
   - Copy this URL

### 1.2 Push Your Code

Run these commands in your terminal (replace `YOUR_USERNAME`):

```powershell
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll be asked to authenticate:
- Use your GitHub username and password
- Or use a Personal Access Token (if you have 2FA enabled)
- Create token at: https://github.com/settings/tokens (if needed)

---

## Step 2: Set Up Firebase App Hosting

### 2.1 Go to Firebase Console

1. **Visit Firebase Console:**
   - Go to: https://console.firebase.google.com/
   - Select your Firebase project
   - (Create one if you haven't: https://console.firebase.google.com/)

### 2.2 Enable App Hosting

1. **Navigate to App Hosting:**
   - In the left sidebar, click **"App Hosting"**
   - If you don't see it, click **"Build"** section first

2. **Get Started:**
   - Click **"Get started"** or **"Add app"**
   - You'll see options for different platforms

3. **Select Web App:**
   - Choose **"Web"** platform
   - Or if App Hosting is directly available, proceed

---

## Step 3: Connect GitHub Repository

### 3.1 Connect Repository

1. **Click "Connect repository":**
   - You'll see GitHub integration options

2. **Authorize Firebase:**
   - Click **"Authorize Firebase"** or **"Continue with GitHub"**
   - Authorize Firebase to access your GitHub account
   - Select the repositories you want to give access to
   - Or select "All repositories" (you can limit later)

3. **Select Your Repository:**
   - Find `portfolio-website` in the list
   - Click on it to select

4. **Select Branch:**
   - Choose `main` branch
   - Click **"Next"** or **"Continue"**

---

## Step 4: Configure Build Settings

### 4.1 Build Configuration

You'll see build configuration options:

1. **App ID:**
   - Firebase will auto-generate one
   - Or you can use an existing web app ID

2. **Build Settings:**
   - **Build command:** `npm run build`
   - **Output directory:** `.next`
   - **Root directory:** `/` (or leave empty)
   - **Node version:** Select `18` or `20` (recommended: 20)

3. **Click "Next"** or **"Continue"**

### 4.2 Environment Variables

**IMPORTANT:** Add your Firebase configuration here!

1. **Go to Environment Variables section:**
   - You'll see a form to add variables

2. **Add these variables** (get from Firebase Console > Project Settings):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
   ```

3. **How to get these values:**
   - Go to Firebase Console
   - Click gear icon ⚙️ → **"Project settings"**
   - Scroll to **"Your apps"** section
   - Click on your web app (or create one)
   - Copy the `firebaseConfig` values

4. **Click "Save"** or **"Continue"**

---

## Step 5: Deploy!

### 5.1 Initial Deployment

1. **Review Settings:**
   - Check all configuration is correct
   - Verify environment variables are added

2. **Click "Deploy"** or **"Create app"**

3. **Wait for Build:**
   - First build takes 5-10 minutes
   - You'll see build progress
   - Don't close the browser!

4. **Build Complete:**
   - You'll see "Deployment successful"
   - Your site URL will be shown
   - Usually: `https://your-project.web.app` or similar

### 5.2 Access Your Site

- **Live URL:** Click the URL shown in Firebase Console
- **Admin Panel:** `https://your-project.web.app/admin/login`
- **Test all pages** to make sure everything works

---

## Step 6: Set Up Custom Domain (Optional)

1. **In App Hosting:**
   - Click on your app
   - Go to **"Settings"** tab
   - Scroll to **"Custom domains"**

2. **Add Domain:**
   - Click **"Add custom domain"**
   - Enter your domain name
   - Follow DNS setup instructions

3. **Verify:**
   - Add DNS records as instructed
   - Wait for verification (can take up to 24 hours)

---

## 🔄 Updating Your Website

### Method 1: Automatic (Recommended)

After making code changes:

```powershell
# Make your changes
# Then commit and push:
git add .
git commit -m "Update: description of changes"
git push origin main
```

**Firebase automatically:**
- Detects the push to GitHub
- Starts a new build
- Deploys the new version
- Usually takes 5-10 minutes

### Method 2: Manual Trigger

1. **Go to Firebase Console:**
   - App Hosting → Your app
   - Click **"Deploy"** or **"Redeploy"**

2. **Select branch:**
   - Choose `main` branch
   - Click **"Deploy"**

---

## 📊 Monitoring Deployments

### View Deployment History:

1. **In App Hosting:**
   - Click on your app
   - See **"Deployments"** tab
   - View all past deployments
   - See build logs for each

### Check Build Logs:

1. **Click on a deployment**
2. **View logs:**
   - See build progress
   - Check for errors
   - Debug issues

---

## 🆘 Troubleshooting

### Build Fails:

1. **Check build logs:**
   - Go to App Hosting → Deployments
   - Click on failed deployment
   - Read error messages

2. **Common issues:**
   - Missing environment variables → Add them
   - Build command wrong → Check it's `npm run build`
   - Node version mismatch → Use Node 18 or 20
   - Missing dependencies → Check `package.json`

3. **Test locally first:**
   ```powershell
   npm run build
   ```
   Fix any errors before pushing

### Environment Variables Not Working:

1. **Verify variables are set:**
   - App Hosting → Settings → Environment Variables
   - Make sure all 6 Firebase variables are there

2. **Redeploy after adding:**
   - Add variables
   - Click "Redeploy"

### Can't Connect GitHub:

1. **Re-authorize:**
   - Go to GitHub Settings → Applications
   - Revoke Firebase access
   - Try connecting again

2. **Check repository access:**
   - Make sure Firebase has access to your repo
   - Check repository is public or Firebase has access

### Site Not Loading:

1. **Check deployment status:**
   - Make sure deployment completed
   - Check it's not still building

2. **Verify URL:**
   - Check the correct URL in Firebase Console
   - Try clearing browser cache

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages work
- [ ] Admin login works (`/admin/login`)
- [ ] Can add content via admin panel
- [ ] Images load properly
- [ ] Firebase connection works
- [ ] Environment variables are set

---

## 🎉 Success!

Your portfolio website is now live on Firebase App Hosting!

**Your site URL:** `https://your-project.web.app`

**Next Steps:**
1. Test all functionality
2. Add content via admin panel
3. Share your website!
4. Set up custom domain (optional)

---

**Need help?** Check Firebase Console for detailed logs and error messages!
