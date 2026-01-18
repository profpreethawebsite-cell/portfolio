# Firebase App Hosting Setup Guide

Firebase App Hosting is perfect for Next.js full-stack applications! It supports:
- ✅ Server-side rendering (SSR)
- ✅ API routes
- ✅ Full-stack deployment
- ✅ Automatic builds and deployments

## Firebase CLI Setup - Select These:

When running `firebase init`, select:

✅ **App Hosting** - For full-stack Next.js deployment
✅ **Firestore** - For database security rules

❌ **Hosting** (regular) - Skip this (App Hosting replaces it)
❌ **Functions** - Not needed
❌ **Data Connect** - Not needed
❌ **Genkit** - Not needed

## Step-by-Step Setup

### 1. During `firebase init`:

**Select App Hosting:**
- Use arrow keys to highlight "App Hosting"
- Press **Space** to select
- Press **Enter** to continue

**Select Firestore:**
- Use arrow keys to highlight "Firestore"
- Press **Space** to select
- Press **Enter** to continue

### 2. App Hosting Configuration:

When prompted:

1. **"What do you want to use as your source directory?"**
   - Answer: `.` (current directory) or press Enter

2. **"What do you want to use as your build output directory?"**
   - Answer: `.next` (for Next.js)

3. **"What command should be run to build your app?"**
   - Answer: `npm run build`

4. **"What command should be run to start your app?"**
   - Answer: `npm start`

5. **"Set up automatic builds and deploys with GitHub?"**
   - Answer: `Y` (Yes) if you want CI/CD
   - Answer: `N` (No) if you want manual deploys

### 3. Firestore Configuration:

1. **"What file should be used for Firestore Rules?"**
   - Answer: `firestore.rules` (default)

2. **"What file should be used for Firestore indexes?"**
   - Answer: `firestore.indexes.json` (default)

## Files Created

After setup, you'll have:
- `firebase.json` - Firebase configuration
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore indexes
- `.firebaserc` - Project configuration

## Update firebase.json

Make sure your `firebase.json` looks like this:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}
```

**Note:** For App Hosting, the configuration is managed through Firebase Console, not firebase.json. The firebase.json is mainly for Firestore.

## Update Firestore Rules

Edit `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access
    match /{collection}/{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users
    match /{collection}/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

## Deploy to Firebase App Hosting

### First Time Setup:

1. **Link your GitHub repository** (if you selected automatic builds):
   - Go to Firebase Console > App Hosting
   - Click "Connect repository"
   - Authorize Firebase to access your GitHub
   - Select your repository

2. **Configure build settings:**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Node version: `18` or `20`

3. **Set environment variables:**
   - Go to App Hosting > Settings > Environment variables
   - Add all your Firebase config variables:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Manual Deploy:

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy to App Hosting (if configured)
firebase deploy --only hosting
```

**Note:** App Hosting deployments are typically done through the Firebase Console or via GitHub integration.

## Next.js Configuration for App Hosting

Make sure your `next.config.ts` is configured for production:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Recommended for App Hosting
  // or
  // output: undefined, // Default - also works
};

export default nextConfig;
```

## Benefits of App Hosting

1. **Full-stack support** - SSR and API routes work perfectly
2. **Automatic scaling** - Handles traffic spikes
3. **Integrated with Firebase** - Same project, easy management
4. **GitHub integration** - Auto-deploy on push
5. **Custom domains** - Easy domain setup
6. **Preview deployments** - Test before production

## Troubleshooting

### Build fails:
- Check Node version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Firebase Console

### Environment variables not working:
- Make sure they're set in App Hosting settings
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding variables

### SSR not working:
- Verify `output: 'standalone'` in next.config.ts
- Check that you're using App Hosting, not regular Hosting
- Ensure API routes are in `app/api/` directory

## Comparison: App Hosting vs Regular Hosting

| Feature | App Hosting | Regular Hosting |
|---------|-------------|-----------------|
| SSR Support | ✅ Yes | ❌ No |
| API Routes | ✅ Yes | ❌ No |
| Full-stack | ✅ Yes | ❌ Static only |
| Next.js | ✅ Perfect fit | ⚠️ Static export only |
| Cost | Pay as you go | Free tier available |

## Next Steps

1. ✅ Complete `firebase init` with App Hosting selected
2. ✅ Configure Firestore rules
3. ✅ Set up GitHub integration (optional)
4. ✅ Add environment variables in Firebase Console
5. ✅ Push to GitHub or deploy manually
6. ✅ Your site will be live!

---

**You made the right choice!** App Hosting is perfect for your Next.js + Firebase full-stack portfolio website! 🚀
