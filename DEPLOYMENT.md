# Deploy to Vercel - Complete Guide

Deploy your portfolio website to Vercel with Supabase backend.

## Prerequisites

- [x] Code committed to Git
- [x] GitHub repository created
- [x] Code pushed to GitHub
- [x] Supabase project set up
- [x] Environment variables ready

---

## Step 1: Push Code to GitHub

If you haven't already:

```powershell
git add .
git commit -m "Migrate to Supabase backend"
git remote add origin https://github.com/profpreethawebsite-cell/portfolio-website.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up / Login

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click **"Sign Up"** or **"Login"**
   - Choose **"Continue with GitHub"** (recommended)

2. **Authorize Vercel:**
   - Authorize Vercel to access your GitHub account
   - Select repositories (or all repositories)

### 2.2 Import Project

1. **Add New Project:**
   - Click **"Add New"** → **"Project"**
   - Find your `portfolio-website` repository
   - Click **"Import"**

2. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `.next` (auto)
   - **Install Command:** `npm install` (auto)

### 2.3 Add Environment Variables

**IMPORTANT:** Add your Supabase credentials!

1. **Before deploying, click "Environment Variables"**
2. **Add these variables:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Get values from:**
   - Supabase Dashboard → Settings → API
   - Copy Project URL and anon/public key

4. **For each variable:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Environment: Production, Preview, Development (select all)
   - Click **"Save"**
   - Repeat for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.4 Deploy

1. **Click "Deploy"**
2. **Wait 2-3 minutes:**
   - Vercel will build your app
   - You'll see build progress
   - First build takes longer

3. **Deployment Complete:**
   - You'll see "Ready" status
   - Your site URL: `https://portfolio-website.vercel.app`
   - Or custom domain if configured

---

## Step 3: Verify Deployment

1. **Visit your live site:**
   - Click the deployment URL
   - Test all pages load correctly

2. **Test admin login:**
   - Go to: `https://your-site.vercel.app/admin/login`
   - Login with Supabase admin credentials
   - Should work perfectly!

3. **Test functionality:**
   - Add content via admin panel
   - Upload gallery images
   - Verify everything works

---

## Step 4: Set Up Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"** → **"Domains"**

2. **Add Domain:**
   - Enter your domain name
   - Click **"Add"**

3. **Configure DNS:**
   - Follow Vercel's DNS instructions
   - Add DNS records to your domain provider
   - Wait for propagation (can take up to 24 hours)

---

## Updating Your Website

### Method 1: Automatic (Recommended)

After making code changes:

```powershell
git add .
git commit -m "Update: description of changes"
git push origin main
```

**Vercel automatically:**
- Detects the push
- Builds your app
- Deploys new version
- Usually takes 2-3 minutes

### Method 2: Manual Redeploy

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Deployments"** tab
   - Click **"Redeploy"** on latest deployment

---

## Environment Variables Management

### Adding/Updating Variables:

1. **Go to Project Settings:**
   - Settings → Environment Variables

2. **Add or Edit:**
   - Add new variables
   - Update existing ones
   - Delete unused ones

3. **Redeploy:**
   - After changing variables, redeploy
   - Or wait for next automatic deployment

### Variable Scopes:

- **Production:** Live site
- **Preview:** Preview deployments
- **Development:** Local development (if using Vercel CLI)

---

## Monitoring & Logs

### View Build Logs:

1. **Go to Deployments:**
   - Click on any deployment
   - See build logs
   - Debug errors

### View Function Logs:

1. **Go to Functions:**
   - See serverless function logs
   - Monitor API routes

### Analytics:

1. **Go to Analytics:**
   - View site traffic
   - See performance metrics
   - Monitor usage

---

## Troubleshooting

### Build Fails:

1. **Check build logs:**
   - Go to Deployments → Failed deployment
   - Read error messages

2. **Common issues:**
   - Missing environment variables → Add them
   - Build errors → Fix code
   - Dependency issues → Check `package.json`

3. **Test locally first:**
   ```bash
   npm run build
   ```
   Fix errors before pushing

### Environment Variables Not Working:

1. **Verify variables are set:**
   - Settings → Environment Variables
   - Check all are added

2. **Redeploy after adding:**
   - Add variables
   - Redeploy manually

### Site Not Loading:

1. **Check deployment status:**
   - Make sure deployment completed
   - Check it's not still building

2. **Clear cache:**
   - Clear browser cache
   - Try incognito mode

### Admin Login Not Working:

1. **Check Supabase:**
   - Verify user exists
   - Check credentials
   - Verify Supabase URL/key are correct

2. **Check environment variables:**
   - Verify they're set in Vercel
   - Redeploy if needed

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages work
- [ ] Admin login works
- [ ] Can add content via admin
- [ ] Images upload correctly
- [ ] Supabase connection works
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)

---

## Vercel Features

### Automatic HTTPS:
- ✅ SSL certificates automatically
- ✅ Secure by default

### Edge Network:
- ✅ Global CDN
- ✅ Fast loading worldwide

### Preview Deployments:
- ✅ Every PR gets preview URL
- ✅ Test before merging

### Analytics:
- ✅ Built-in analytics
- ✅ Performance monitoring

---

## Cost

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Preview deployments
- ✅ Custom domains

### Paid Plans:
- Start at $20/month for more features
- Free tier is perfect for portfolio sites!

---

## Summary

**Your website is now live on Vercel!** 🎉

- **URL:** `https://portfolio-website.vercel.app`
- **Backend:** Supabase (PostgreSQL + Storage + Auth)
- **Hosting:** Vercel (Global CDN)
- **Updates:** Automatic on Git push

**Next Steps:**
1. Share your website!
2. Add content via admin panel
3. Set up custom domain (optional)
4. Monitor analytics

---

**Need help?** Check Vercel documentation or Supabase docs!
