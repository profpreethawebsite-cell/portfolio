# Setup Guide - Initial Configuration

This guide will help you set up the Firebase database with initial data structure.

## Step 1: Firebase Project Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Add your Firebase config to `.env.local`

## Step 2: Create Firestore Collections

You can create collections manually or use Firebase Console. The following collections are needed:

### Collections Structure:

1. **grants** - For funded grants
   ```json
   {
     "title": "Optimal energy management system in shipboard power system with solar PV",
     "fundingAgency": "DST",
     "amount": "Amount if available",
     "period": "2020-2023",
     "status": "completed",
     "description": "Description of the grant"
   }
   ```

2. **publications** - For research publications
   ```json
   {
     "title": "Publication Title",
     "authors": "Author names",
     "journal": "Journal Name",
     "year": 2024,
     "doi": "DOI if available",
     "link": "Link to publication"
   }
   ```

3. **adminRoles** - For administration roles
   ```json
   {
     "title": "Chairman",
     "organization": "MTS India Section",
     "period": "2020 - Present",
     "description": "Role description"
   }
   ```

4. **patents** - For patents
   ```json
   {
     "title": "Patent Title",
     "patentNumber": "Patent Number",
     "area": "Building automation",
     "status": "granted",
     "year": 2020
   }
   ```

5. **awards** - For awards and recognition
   ```json
   {
     "title": "IEEE Publication Award",
     "organization": "IEEE",
     "year": 2019,
     "description": "Award description"
   }
   ```

6. **events** - For organized events
   ```json
   {
     "title": "Conference Name",
     "type": "conference",
     "date": "2024-01-15",
     "location": "Location",
     "description": "Event description"
   }
   ```

7. **gallery** - For gallery images
   ```json
   {
     "url": "Image URL",
     "caption": "Image caption",
     "category": "Events",
     "createdAt": "2024-01-15T00:00:00Z"
   }
   ```

8. **profile** - Main profile document (document ID: "main")
   ```json
   {
     "name": "Dr. J. Preetha Roselyn",
     "title": "Professor",
     "department": "Department of Electrical and Electronics Engineering",
     "university": "SRM Institute of Science and Technology",
     "bio": "Bio text",
     "qualifications": ["B.E (EEE) from Madras University, 2002", "..."],
     "experience": "20 years",
     "specialization": ["Voltage stability", "..."],
     "achievements": ["Achievement 1", "..."],
     "email": "email@example.com",
     "phone": "+91-XXXXXXXXXX",
     "address": "Full address"
   }
   ```

## Step 3: Add Initial Data

### Option A: Using Firebase Console (Easiest)

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Enter collection name (e.g., "grants")
4. Add documents manually using the structure above

### Option B: Using Admin Panel

1. Start the development server: `npm run dev`
2. Go to `/admin/login`
3. Login with your Firebase Auth credentials
4. Use the admin dashboard to add data

## Step 4: Set Up Authentication

1. Go to Authentication in Firebase Console
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Click "Add user" to create an admin account
5. Use this email/password to log in to `/admin/login`

## Step 5: Configure Storage (Optional - for Gallery Images)

1. Go to Storage in Firebase Console
2. Click "Get Started"
3. Start in production mode
4. Set up security rules (adjust as needed):
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

## Step 6: Security Rules

Update Firestore Security Rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access
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

## Sample Data

You can start by adding a few sample items in each collection to see how the website displays them. The website will automatically fetch and display all data from Firebase.

## Testing

1. Visit `http://localhost:3000` to see the public website
2. Visit `http://localhost:3000/admin/login` to access admin panel
3. Test adding, editing, and deleting items from the admin panel

## Troubleshooting

- **Can't login to admin**: Make sure you've created a user in Firebase Authentication
- **Data not showing**: Check Firestore security rules allow read access
- **Can't add/edit data**: Check Firestore security rules allow write access for authenticated users
- **Images not loading**: Make sure Storage is configured and security rules allow read access

## Next Steps

1. Customize colors and styling in components
2. Add your actual content via admin panel
3. Upload gallery images
4. Deploy to production (Vercel or Firebase Hosting)

---

For more details, see the main README.md file.
