# Quick Start Guide - Supabase + Vercel

Get your portfolio website up and running quickly!

## 🚀 Quick Setup (5 Steps)

### Step 1: Set Up Supabase (5 minutes)

1. **Create Account:**
   - Go to https://supabase.com
   - Sign up (free)

2. **Create Project:**
   - Click "New Project"
   - Name: `portfolio-website`
   - Set database password
   - Choose region
   - Wait 2-3 minutes

3. **Run Database Schema:**
   - Go to SQL Editor
   - Copy contents of `supabase/schema.sql`
   - Paste and click "Run"

4. **Create Admin User:**
   - Go to Authentication → Users
   - Click "Add user"
   - Email: your email
   - Password: strong password
   - Auto Confirm: Yes
   - Save credentials!

5. **Get API Keys:**
   - Settings → API
   - Copy Project URL and anon key

---

### Step 2: Configure Environment Variables

1. **Create `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. **Paste your Supabase values**

---

### Step 3: Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000
Test admin: http://localhost:3000/admin/login

---

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Setup Supabase backend"
git remote add origin https://github.com/profpreethawebsite-cell/portfolio-website.git
git push -u origin main
```

---

### Step 5: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Import** your repository
4. **Add environment variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Click "Deploy"**
6. **Wait 2-3 minutes**
7. **Your site is live!** 🎉

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema run
- [ ] Admin user created
- [ ] `.env.local` configured
- [ ] Local test successful
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added in Vercel
- [ ] Site is live!

---

## 📚 Detailed Guides

- **Supabase Setup:** See `SUPABASE_SETUP.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Full Documentation:** See `README.md`

---

## 🆘 Troubleshooting

### Build fails:
- Check `.env.local` has correct values
- Verify Supabase project is active
- Check database schema was run

### Can't login:
- Verify user exists in Supabase Auth
- Check credentials are correct
- Make sure user is confirmed

### Site not loading:
- Check Vercel deployment status
- Verify environment variables are set
- Check build logs for errors

---

**That's it!** Your portfolio website is now live with Supabase backend! 🚀
