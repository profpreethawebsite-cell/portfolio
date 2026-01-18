# Fix Vercel Build Error - Troubleshooting Guide

## 🔍 Build Works Locally, Fails in Vercel

If `npm run build` works locally but fails in Vercel, it's usually an environment variable issue.

---

## ✅ Step 1: Check Vercel Build Logs

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project

2. **Go to Deployments:**
   - Click **"Deployments"** tab
   - Click on the **failed deployment** (red X)

3. **Read the Error:**
   - Scroll through build logs
   - Look for the actual error message
   - Common errors:
     - "Invalid supabaseUrl"
     - "Environment variable not found"
     - "Failed to fetch"

---

## ✅ Step 2: Verify Environment Variables

### Check Variables Are Set:

1. **Go to Settings:**
   - Settings → Environment Variables

2. **Verify Both Exist:**
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Check Values:**
   - Click on each variable
   - Verify:
     - URL starts with `https://`
     - URL ends with `.supabase.co`
     - Key is the **anon public** key (not service_role)
     - No extra spaces or quotes

### Common Mistakes:

❌ **Missing `https://` in URL:**
- Wrong: `xxxxx.supabase.co`
- Right: `https://xxxxx.supabase.co`

❌ **Using service_role key:**
- Wrong: Using secret service_role key
- Right: Use anon public key

❌ **Extra spaces:**
- Wrong: ` https://xxxxx.supabase.co ` (spaces)
- Right: `https://xxxxx.supabase.co`

❌ **Quotes in value:**
- Wrong: `"https://xxxxx.supabase.co"`
- Right: `https://xxxxx.supabase.co`

---

## ✅ Step 3: Re-add Environment Variables

If variables are missing or wrong:

1. **Get Correct Values from Supabase:**
   - Go to Supabase Dashboard
   - Settings → API
   - Copy **Project URL** (starts with `https://`)
   - Copy **anon public** key (long string)

2. **Add/Update in Vercel:**
   - Settings → Environment Variables
   - Delete old variables if wrong
   - Add new:
     - Name: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: Your Supabase URL
     - Environments: ✅ Production ✅ Preview ✅ Development
     - Save

   - Add second:
     - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: Your anon public key
     - Environments: ✅ Production ✅ Preview ✅ Development
     - Save

---

## ✅ Step 4: Redeploy

**IMPORTANT:** After adding/updating variables, redeploy!

### Option A: Manual Redeploy
1. Go to Deployments
2. Click three dots (⋯) on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### Option B: Trigger via Git
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## ✅ Step 5: Check Build Logs Again

After redeploy:

1. **Watch the build:**
   - Go to Deployments
   - Click on new deployment
   - Watch build progress

2. **If still failing:**
   - Read the error message carefully
   - Check which step failed
   - Common issues:
     - Environment variables not loaded
     - Invalid URL format
     - Missing dependencies

---

## 🆘 Common Errors & Fixes

### Error: "Invalid supabaseUrl"

**Fix:**
- Check URL starts with `https://`
- Check URL ends with `.supabase.co`
- No spaces or quotes
- Copy directly from Supabase Dashboard

### Error: "Environment variable not found"

**Fix:**
- Verify variables are added in Vercel
- Check variable names are exact:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure Production environment is selected
- Redeploy after adding

### Error: "Failed to fetch" or Network Error

**Fix:**
- Check Supabase project is active
- Verify URL is correct
- Check Supabase project hasn't been paused
- Try accessing Supabase Dashboard to confirm project is active

### Error: Build timeout

**Fix:**
- Usually means build is taking too long
- Check for infinite loops in code
- Verify dependencies are correct
- Try clearing Vercel cache

---

## 📝 Quick Checklist

- [ ] Read Vercel build logs for actual error
- [ ] Verified environment variables exist in Vercel
- [ ] Checked URL format (starts with https://)
- [ ] Verified using anon public key (not service_role)
- [ ] No extra spaces or quotes in values
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed after adding/updating variables
- [ ] Checked Supabase project is active

---

## 🔍 Still Not Working?

### Get More Info:

1. **Share the exact error:**
   - Copy the full error from Vercel build logs
   - Check which line/step failed

2. **Check Supabase:**
   - Verify project is active
   - Check API keys are correct
   - Test Supabase connection

3. **Test Locally:**
   - Make sure `.env.local` has correct values
   - Run `npm run build` locally
   - Should work if values are correct

---

**Most likely issue:** Environment variables not set correctly in Vercel. Double-check the values and redeploy!
