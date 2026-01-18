# Firebase Storage Setup Guide

## Quick Answer: Do NOT Select Storage in `firebase init`

**Firebase Storage doesn't need CLI setup!** It's configured directly in the Firebase Console.

## What to Select in `firebase init`:

✅ **App Hosting** - For deployment
✅ **Firestore** - For database rules

❌ **Storage** - Skip this (set up in Console)

## Setting Up Storage in Firebase Console:

### Step 1: Enable Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **"Storage"** in the left sidebar
4. Click **"Get started"**
5. Choose **"Start in production mode"**
6. Click **"Next"**
7. Select the same location as your Firestore database
8. Click **"Done"**

### Step 2: Set Storage Security Rules

1. In Storage, click on **"Rules"** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to gallery images
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated admins can upload
    }
    
    // Allow read/write for authenticated users (admin)
    match /{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Admin write only
    }
  }
}
```

3. Click **"Publish"**

### Step 3: Test Image Upload

1. Go to your admin panel: `/admin/login`
2. Login with your admin credentials
3. Navigate to **"Gallery"** section
4. Click **"Add Image"**
5. Upload a test image
6. Verify it appears in Firebase Storage Console

## How It Works:

1. **Admin uploads image** → Image goes to Firebase Storage (`gallery/` folder)
2. **Storage returns URL** → URL is saved to Firestore (`gallery` collection)
3. **Website displays images** → Reads URLs from Firestore and displays them

## Storage Structure:

```
Storage Root
└── gallery/
    ├── 1234567890_abc123.jpg
    ├── 1234567891_def456.png
    └── ...
```

## Image Limits:

- **Max file size:** 5MB (configurable in code)
- **Supported formats:** JPG, PNG, GIF, WebP
- **Storage location:** `gallery/` folder in Firebase Storage

## Admin Gallery Features:

✅ Upload images with drag & drop
✅ Add captions and categories
✅ Preview before upload
✅ Delete images (removes from both Storage and Firestore)
✅ Automatic image path generation
✅ Image optimization handled by Next.js Image component

## Troubleshooting:

### "Permission denied" when uploading:
- Check Storage Rules allow `write: if request.auth != null`
- Make sure you're logged in to admin panel
- Verify Storage is enabled in Firebase Console

### Images not displaying:
- Check Storage Rules allow `read: if true`
- Verify image URLs are saved correctly in Firestore
- Check browser console for errors

### Upload fails:
- Check file size (max 5MB)
- Verify file is an image format
- Check Firebase Storage quota/limits

## Cost Considerations:

- **Free tier:** 5GB storage, 1GB/day downloads
- **Pricing:** $0.026/GB storage, $0.12/GB downloads
- **Recommendation:** Optimize images before upload to save storage

---

**That's it!** Storage is now ready for your gallery images. No CLI setup needed! 🎉
