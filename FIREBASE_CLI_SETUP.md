# Firebase CLI Setup Guide - UPDATED

## ✅ CORRECT SELECTION FOR YOUR USE CASE:

Since you're using **Firebase as backend** and want **full-stack deployment**, select:

✅ **App Hosting** - **SELECT THIS!** (Perfect for Next.js full-stack)
✅ **Firestore** - **SELECT THIS!** (For database security rules)

❌ **Hosting** (regular) - Skip (App Hosting replaces it)
❌ **Storage** - **Don't select here!** (Set up in Firebase Console, not CLI)
❌ **Functions** - Not needed
❌ **Data Connect** - Not needed
❌ **Genkit** - Not needed

**Note:** Firebase Storage doesn't need CLI setup - configure it directly in Firebase Console!

## Why App Hosting?

- ✅ Supports **Server-Side Rendering (SSR)**
- ✅ Supports **API routes**
- ✅ Perfect for **Next.js full-stack apps**
- ✅ Integrated with Firebase services
- ✅ Automatic scaling
- ✅ GitHub integration for CI/CD

## Quick Setup Steps:

1. **Select App Hosting:**
   - Arrow to "App Hosting"
   - Press **Space** to select
   - You'll see: ❯◉ App Hosting

2. **Select Firestore:**
   - Arrow to "Firestore"
   - Press **Space** to select
   - You'll see: ❯◉ Firestore

3. **Press Enter** to continue

## Configuration Prompts:

### App Hosting:
- **Source directory:** `.` (current directory) or press Enter
- **Build output directory:** `.next`
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **GitHub integration:** `Y` (recommended) or `N`

### Firestore:
- **Rules file:** `firestore.rules` (default)
- **Indexes file:** `firestore.indexes.json` (default)

## After Setup:

1. **Update Firestore Rules** - See `FIREBASE_APP_HOSTING_SETUP.md`
2. **Configure App Hosting in Firebase Console:**
   - Go to Firebase Console > App Hosting
   - Connect your GitHub repository
   - Set environment variables
   - Configure build settings

3. **Deploy:**
   ```bash
   firebase deploy --only firestore:rules
   ```

## Full Guide:

See `FIREBASE_APP_HOSTING_SETUP.md` for complete instructions!

---

**You're all set!** App Hosting is the perfect choice for your Next.js + Firebase full-stack portfolio! 🚀
