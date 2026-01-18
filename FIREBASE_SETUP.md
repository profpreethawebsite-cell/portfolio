# Firebase Setup Guide - Step by Step

Follow these steps to set up Firebase for your portfolio website.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `portfolio-website` (or any name you prefer)
4. Click **"Continue"**
5. **Disable Google Analytics** (optional - you can enable it later if needed)
6. Click **"Create project"**
7. Wait for project creation (about 30 seconds)
8. Click **"Continue"**

## Step 2: Get Firebase Configuration

1. In your Firebase project dashboard, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register app:
   - App nickname: `Portfolio Website` (optional)
   - **Do NOT** check "Also set up Firebase Hosting"
   - Click **"Register app"**
6. You'll see your Firebase configuration. It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdefghijklmnop"
   };
   ```

## Step 3: Create .env.local File

1. In your project root folder (`C:\Users\kamle\portfolio-website`), create a file named `.env.local`
2. Copy the following and replace with your actual values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

**Important:** Replace all the placeholder values with your actual Firebase config values!

## Step 4: Enable Authentication

1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"** (if you see this button)
3. Click on **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Enable** the first toggle (Email/Password)
6. Click **"Save"**

## Step 5: Create Admin User

1. Still in Authentication, click on **"Users"** tab
2. Click **"Add user"**
3. Enter:
   - **Email**: `admin@example.com` (use your actual email)
   - **Password**: Create a strong password (save this!)
4. Click **"Add user"**
5. **IMPORTANT:** Save these credentials! You'll use them to log in to `/admin/login`

## Step 6: Create Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set rules later)
4. Click **"Next"**
5. Select a **location** closest to you (e.g., `asia-south1` for India)
6. Click **"Enable"**
7. Wait for database creation (about 1 minute)

## Step 7: Set Firestore Security Rules

1. In Firestore Database, click on **"Rules"** tab
2. Replace the existing rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all collections
    match /{collection}/{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users (admin)
    match /{collection}/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 8: Set Up Storage (REQUIRED - for Gallery Images)

**Important:** Storage is needed for uploading gallery images!

1. In Firebase Console, click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Click **"Next"**
5. Use the same location as Firestore
6. Click **"Done"**
7. Go to **"Rules"** tab
8. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

9. Click **"Publish"**

## Step 9: Create Initial Collections (Optional)

You can create collections manually or let the admin panel create them. To create manually:

1. Go to **Firestore Database** > **Data** tab
2. Click **"Start collection"**
3. Collection ID: `grants` → Click **"Next"**
4. Add a test document:
   - Document ID: `auto` (or click "Auto-ID")
   - Add fields:
     - `title` (string): "Test Grant"
     - `fundingAgency` (string): "DST"
     - `period` (string): "2020-2023"
     - `status` (string): "completed"
   - Click **"Save"**

Repeat for other collections:
- `publications`
- `adminRoles`
- `patents`
- `awards`
- `events`
- `gallery`
- `profile` (create as a document with ID: `main`)

## Step 10: Test Your Setup

1. Make sure your `.env.local` file has all the correct values
2. Restart your dev server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000` - website should load
4. Visit `http://localhost:3000/admin/login`
5. Login with the admin credentials you created in Step 5
6. You should see the admin dashboard!

## Quick Reference: What Each Service Does

- **Firestore Database**: Stores all your content (grants, publications, etc.)
- **Authentication**: Secures the admin panel login
- **Storage**: Stores gallery images (optional)

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Authentication > Settings > Authorized domains
- Add `localhost` if not already there

### "Permission denied" when reading data
- Check Firestore Rules are published correctly
- Make sure rules allow `read: if true`

### "Permission denied" when writing data
- Make sure you're logged in to admin panel
- Check Firestore Rules allow `write: if request.auth != null`

### Can't login to admin
- Verify user exists in Authentication > Users
- Check email/password are correct
- Make sure Email/Password is enabled

## Next Steps

After Firebase is set up:
1. ✅ Test the website loads
2. ✅ Test admin login works
3. ✅ Add your first grant/publication via admin panel
4. ✅ Verify it appears on the website
5. ✅ Start adding all your content!

---

**Need help?** Check the main README.md or SETUP_GUIDE.md for more details.
