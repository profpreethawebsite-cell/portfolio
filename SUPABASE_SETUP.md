# Supabase Setup Guide - Complete

Complete guide to set up Supabase backend for your portfolio website.

## Step 1: Create Supabase Project

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Click **"Start your project"** or **"Sign Up"**
   - Sign up with GitHub (recommended) or email

2. **Create New Project:**
   - Click **"New Project"**
   - Organization: Create new or select existing
   - Project name: `portfolio-website` (or your choice)
   - Database password: Create a strong password (save it!)
   - Region: Choose closest to you (e.g., `Southeast Asia (Singapore)` for India)
   - Pricing plan: **Free** (perfect for starting)
   - Click **"Create new project"**
   - Wait 2-3 minutes for setup

---

## Step 2: Get API Keys

1. **In your Supabase project dashboard:**
   - Go to **Settings** (gear icon) → **API**

2. **Copy these values:**
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

3. **Save them** - you'll need them for `.env.local`

---

## Step 3: Set Up Database Schema

1. **Go to SQL Editor:**
   - In Supabase dashboard, click **"SQL Editor"** in left sidebar
   - Click **"New query"**

2. **Run the Schema:**
   - Open `supabase/schema.sql` file from your project
   - Copy the entire contents
   - Paste into SQL Editor
   - Click **"Run"** (or press Ctrl+Enter)
   - Wait for success message

3. **Verify Tables Created:**
   - Go to **Table Editor** in left sidebar
   - You should see all tables:
     - profile
     - grants
     - publications
     - admin_roles
     - patents
     - awards
     - events
     - gallery

---

## Step 4: Set Up Storage

1. **Go to Storage:**
   - Click **"Storage"** in left sidebar
   - You should see `gallery` bucket (created by schema)

2. **If bucket doesn't exist:**
   - Click **"New bucket"**
   - Name: `gallery`
   - Public bucket: **Yes** (toggle on)
   - Click **"Create bucket"**

3. **Verify Policies:**
   - Click on `gallery` bucket
   - Go to **"Policies"** tab
   - Should see policies for read/write/delete
   - (These are created by the schema SQL)

---

## Step 5: Set Up Authentication

1. **Go to Authentication:**
   - Click **"Authentication"** in left sidebar
   - Click **"Users"** tab

2. **Create Admin User:**
   - Click **"Add user"** → **"Create new user"**
   - Email: `admin@example.com` (use your email)
   - Password: Create a strong password (save it!)
   - Auto Confirm User: **Yes** (toggle on)
   - Click **"Create user"**

3. **Note Credentials:**
   - Save email and password
   - You'll use these to login to `/admin/login`

---

## Step 6: Configure Environment Variables

1. **Create `.env.local` file:**
   - In your project root folder
   - Create file named `.env.local`

2. **Add Supabase config:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Get values from:**
   - Supabase Dashboard → Settings → API
   - Copy Project URL and anon/public key

4. **Important:**
   - Never commit `.env.local` to Git
   - It's already in `.gitignore`

---

## Step 7: Test Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test website:**
   - Visit: `http://localhost:3000`
   - Should load without errors

3. **Test admin login:**
   - Visit: `http://localhost:3000/admin/login`
   - Login with admin credentials
   - Should see dashboard

4. **Test adding content:**
   - Go to admin dashboard
   - Try adding a grant or publication
   - Should save successfully

---

## Step 8: Add Initial Profile Data (Optional)

1. **Go to Table Editor:**
   - Click **"Table Editor"** → **"profile"**

2. **Insert Profile:**
   - Click **"Insert"** → **"Insert row"**
   - Fill in:
     - id: `main`
     - name: `Dr. J. Preetha Roselyn`
     - title: `Professor`
     - department: `Department of Electrical and Electronics Engineering`
     - university: `SRM Institute of Science and Technology`
     - Add other fields as needed
   - Click **"Save"**

---

## Database Structure

### Tables Created:

1. **profile** - Main profile information (single row, id='main')
2. **grants** - Funded grants and projects
3. **publications** - Research publications
4. **admin_roles** - Administration roles
5. **patents** - Patents information
6. **patents** - Patents
7. **awards** - Awards and recognition
8. **events** - Organized events
9. **gallery** - Gallery images

### Storage Buckets:

1. **gallery** - For storing gallery images

---

## Security (Row Level Security)

✅ **Public Read Access:** Anyone can view content
✅ **Authenticated Write Access:** Only logged-in admins can add/edit/delete

This is configured automatically by the schema SQL.

---

## Troubleshooting

### "Invalid API key" error:
- Check `.env.local` has correct values
- Verify you copied the full anon key
- Restart dev server after changing `.env.local`

### "Table doesn't exist" error:
- Run the schema SQL again
- Check Table Editor to verify tables exist

### Can't login to admin:
- Verify user exists in Authentication → Users
- Check email/password are correct
- Make sure user is confirmed (Auto Confirm: Yes)

### Images not uploading:
- Check Storage bucket `gallery` exists
- Verify bucket is public
- Check Storage policies are set correctly

### Permission denied errors:
- Check Row Level Security policies
- Verify you're logged in
- Check user has authenticated role

---

## Next Steps

After setup:
1. ✅ Test admin login
2. ✅ Add some content via admin panel
3. ✅ Upload gallery images
4. ✅ Deploy to Vercel (see DEPLOYMENT.md)

---

## Quick Reference

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Project Settings:** Dashboard → Settings → API
- **SQL Editor:** Dashboard → SQL Editor
- **Table Editor:** Dashboard → Table Editor
- **Storage:** Dashboard → Storage
- **Authentication:** Dashboard → Authentication

---

**Your Supabase backend is now ready!** 🎉
