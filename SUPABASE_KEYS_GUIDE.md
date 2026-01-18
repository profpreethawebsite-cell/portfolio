# Which Supabase Keys to Use - Complete Guide

## 🔑 Two Types of Keys in Supabase

When you go to **Settings → API** in Supabase, you'll see:

### 1. **Project URL** (Public - Use This ✅)
- **Location:** Top of the page
- **Looks like:** `https://xxxxx.supabase.co`
- **Status:** ✅ Public/Visible
- **Use for:** Client-side code (NEXT_PUBLIC_*)

### 2. **Keys Section:**

#### a) **anon public** key (Public - Use This ✅)
- **Location:** Under "Project API keys" → **anon public**
- **Looks like:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
- **Status:** ✅ Public/Visible
- **Use for:** Client-side code (NEXT_PUBLIC_*)
- **Safe to expose:** Yes (it's designed to be public)

#### b) **service_role** key (Secret - DON'T Use This ❌)
- **Location:** Under "Project API keys" → **service_role**
- **Looks like:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
- **Status:** 🔒 Secret/Hidden (click to reveal)
- **Use for:** Server-side only (NEVER client-side!)
- **Safe to expose:** ❌ NO! Never expose this!

---

## ✅ What to Use for Your Website

### For Vercel Environment Variables:

Use these **PUBLIC** values:

1. **NEXT_PUBLIC_SUPABASE_URL:**
   - Use: **Project URL** (the public one)
   - Example: `https://abcdefghijklmnop.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY:**
   - Use: **anon public** key (the public one)
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTc2ODAwMCwiZXhwIjoxOTYxMzQ0MDAwfQ.xxxxx`

### ❌ What NOT to Use:

- **service_role** key - NEVER use this in client-side code!
- This key bypasses Row Level Security
- Only use in server-side code (API routes, server components)

---

## 📍 Where to Find Them

### Step-by-Step:

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select your project

2. **Go to Settings:**
   - Click gear icon ⚙️ → **Settings**
   - Click **API** in left sidebar

3. **Find Project URL:**
   - At the top: **"Project URL"**
   - Copy this value ✅

4. **Find anon public key:**
   - Scroll to **"Project API keys"** section
   - Find **"anon public"** row
   - Click **"Reveal"** or copy button
   - Copy this value ✅

5. **Ignore service_role:**
   - Don't click "Reveal" on service_role
   - Don't copy it
   - Leave it hidden ❌

---

## 🔒 Security Explanation

### Why anon key is safe:
- ✅ Designed to be public
- ✅ Respects Row Level Security (RLS)
- ✅ Can only do what RLS policies allow
- ✅ Safe to use in browser/client-side code

### Why service_role is dangerous:
- ❌ Bypasses all security
- ❌ Can do anything in your database
- ❌ Should NEVER be in client-side code
- ❌ Only for server-side operations

---

## ✅ Quick Checklist

For your `.env.local` and Vercel:

- [ ] **NEXT_PUBLIC_SUPABASE_URL** = Project URL (public)
- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY** = anon public key (public)
- [ ] ❌ NOT using service_role key
- [ ] ❌ NOT using any secret keys

---

## 📝 Example

### Correct Setup:

```env
# ✅ CORRECT - Use these
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTc2ODAwMCwiZXhwIjoxOTYxMzQ0MDAwfQ.xxxxx
```

### Wrong Setup:

```env
# ❌ WRONG - Don't use service_role!
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...service_role_key...  # ❌ NO!
```

---

## 🎯 Summary

**Use the PUBLIC/Visible ones:**
- ✅ Project URL (public)
- ✅ anon public key (public)

**Don't use the SECRET one:**
- ❌ service_role key (secret)

---

**That's it!** Use the public/visible values for your environment variables. 🎉
