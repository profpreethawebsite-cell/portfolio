# Dr. J. Preetha Roselyn - Portfolio Website

A beautiful, professional portfolio website built with Next.js 16, TypeScript, Tailwind CSS, Firebase, and Framer Motion. This website showcases academic achievements, research work, publications, grants, and more.

## Features

- 🎨 **Modern Design** - Clean, professional, and responsive design
- ✨ **Smooth Animations** - Beautiful transitions powered by Framer Motion
- 🔐 **Admin Panel** - Easy content management with Firebase Authentication
- 📱 **Responsive** - Works seamlessly on all devices
- 🚀 **Fast Performance** - Built with Next.js for optimal performance
- 🔥 **Firebase Integration** - Database, Authentication, and Storage support

## Sections

- **Home** - Hero section with key achievements
- **About** - Professional background and specialization
- **Funded Grants** - Research grants and funded projects
- **Publications** - International publications and research papers
- **Administration** - Leadership roles and administrative positions
- **Patents** - Patents and intellectual property
- **Awards** - Recognition and awards received
- **Events** - Organized conferences, workshops, and seminars
- **Gallery** - Photo gallery from events and activities
- **Contact** - Contact form and information

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage (for gallery images)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created (if not, see Firebase Setup below)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project" and follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to Authentication
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

3. **Create Firestore Database**
   - Go to Firestore Database
   - Click "Create Database"
   - Start in production mode (you can change rules later)
   - Choose your preferred location

4. **Set Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read access to all collections
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

5. **Get Firebase Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Click the web icon (</>) to add a web app
   - Copy the configuration values to your `.env.local` file

6. **Create Admin User**
   - Go to Authentication > Users
   - Click "Add user"
   - Create an admin account with email and password
   - Use these credentials to log in to `/admin/login`

## Firebase Collections Structure

The website uses the following Firestore collections:

- `grants` - Funded grants and projects
- `publications` - Research publications
- `adminRoles` - Administration roles
- `patents` - Patents information
- `awards` - Awards and recognition
- `events` - Organized events
- `gallery` - Gallery images
- `profile` - Main profile data (document ID: "main")

## Admin Panel

Access the admin panel at `/admin/login` using your Firebase Authentication credentials.

From the admin dashboard, you can:
- Add, edit, and delete grants
- Manage publications
- Update administration roles
- Manage patents, awards, and events
- Upload and manage gallery images
- Update profile information

## Adding More Admin Pages

To add admin pages for other sections (patents, awards, etc.), follow the pattern used in `app/admin/grants/page.tsx`:

1. Import the corresponding Firebase utility functions
2. Use the same state management pattern
3. Create forms matching the data structure
4. Use `ProtectedRoute` component to secure the page

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init
   ```
   - Select Hosting
   - Select your Firebase project
   - Set public directory to `.next`
   - Configure as single-page app: No
   - Set up automatic builds: Yes

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

## Project Structure

```
portfolio-website/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   ├── grants/              # Grants page
│   ├── publications/        # Publications page
│   ├── administration/      # Administration page
│   ├── patents/             # Patents page
│   ├── awards/              # Awards page
│   ├── events/              # Events page
│   ├── gallery/             # Gallery page
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Navigation.tsx       # Navigation bar
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # About section
│   ├── Footer.tsx           # Footer component
│   └── SectionLayout.tsx    # Layout for section pages
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication context
├── lib/                     # Utility functions
│   ├── firebase.ts          # Firebase configuration
│   └── firebase-utils.ts    # Firebase CRUD operations
├── types/                   # TypeScript types
│   └── index.ts             # Type definitions
└── public/                  # Static assets
```

## Customization

- **Colors**: Edit Tailwind classes in components to change color scheme (default: indigo/purple)
- **Fonts**: Modify fonts in `app/layout.tsx`
- **Animations**: Adjust Framer Motion variants in components
- **Content**: Update content directly in components or via admin panel

## Support

For issues or questions, please contact the development team or create an issue in the repository.

## License

This project is created for Dr. J. Preetha Roselyn's portfolio website.

---

Built with ❤️ using Next.js and Firebase
