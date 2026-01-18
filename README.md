# Dr. J. Preetha Roselyn - Portfolio Website

A beautiful, professional portfolio website built with Next.js 16, TypeScript, Tailwind CSS, Supabase, and Framer Motion. This website showcases academic achievements, research work, publications, grants, and more.

## Features

- 🎨 **Modern Design** - Clean, professional, and responsive design
- ✨ **Smooth Animations** - Beautiful transitions powered by Framer Motion
- 🔐 **Admin Panel** - Easy content management with Supabase Authentication
- 📱 **Responsive** - Works seamlessly on all devices
- 🚀 **Fast Performance** - Built with Next.js for optimal performance
- 🗄️ **Supabase Backend** - PostgreSQL database, Storage, and Authentication
- 🌐 **Vercel Hosting** - Global CDN and automatic deployments

## Sections

- **Home** - Hero section with profile image and key achievements
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
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for gallery images)
- **Hosting**: Vercel
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier available)
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
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   Get these values from Supabase Dashboard → Settings → API

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Supabase Setup

See `SUPABASE_SETUP.md` for complete Supabase setup instructions.

Quick steps:
1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase/schema.sql`
3. Create admin user in Authentication
4. Set up Storage bucket for gallery
5. Add environment variables to `.env.local`

## Admin Panel

Access the admin panel at `/admin/login` using your Supabase Authentication credentials.

From the admin dashboard, you can:
- Add, edit, and delete grants
- Manage publications
- Update administration roles
- Manage patents, awards, and events
- Upload and manage gallery images
- Update profile information

## Deployment

### Deploy to Vercel (Recommended)

See `DEPLOYMENT.md` for complete deployment guide.

Quick steps:
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (Supabase URL and key)
4. Deploy!

Your site will be live in 2-3 minutes!

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
│   ├── Footer.tsx            # Footer component
│   └── SectionLayout.tsx     # Layout for section pages
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication context
├── lib/                     # Utility functions
│   ├── supabase.ts          # Supabase client
│   ├── supabase-utils.ts    # Supabase CRUD operations
│   └── storage-utils.ts      # Storage operations
├── supabase/                # Supabase files
│   └── schema.sql           # Database schema
├── types/                    # TypeScript types
│   └── index.ts             # Type definitions
└── public/                  # Static assets
```

## Updating Content

### Via Admin Panel (No Deployment Needed)
- Login to `/admin/login`
- Edit content directly
- Changes appear immediately

### Via Code (Requires Deployment)
- Edit code files
- Push to GitHub
- Vercel auto-deploys in 2-3 minutes

## Customization

- **Colors**: Edit Tailwind classes in components (default: indigo/purple)
- **Fonts**: Modify fonts in `app/layout.tsx`
- **Animations**: Adjust Framer Motion variants in components
- **Content**: Update via admin panel or directly in components

## Support

For issues or questions:
- Check `SUPABASE_SETUP.md` for backend setup
- Check `DEPLOYMENT.md` for deployment help
- Review Supabase documentation
- Review Vercel documentation

## License

This project is created for Dr. J. Preetha Roselyn's portfolio website.

---

Built with ❤️ using Next.js, Supabase, and Vercel
