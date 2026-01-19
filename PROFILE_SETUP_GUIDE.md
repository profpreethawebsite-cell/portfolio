# Profile Data Setup Guide

This guide explains how to set up and manage all profile information from the admin dashboard instead of hardcoding it.

## Step 1: Update Database Schema

Run the migration SQL to add new fields to your profile table:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file `supabase/profile_migration.sql`
3. Copy and paste the SQL into the SQL Editor
4. Click **Run** to execute

Alternatively, you can run the updated schema from `supabase/schema.sql` which includes all the new fields.

## Step 2: Add Initial Profile Data

1. Go to **Supabase Dashboard** → **Table Editor** → **profile**
2. If a profile row doesn't exist, click **Insert** → **Insert row**
3. Set `id` to `main`
4. Fill in the following fields (or update existing row):

### Basic Information:
- **name**: `Dr. J. Preetha Roselyn`
- **title**: `Professor`
- **department**: `Department of Electrical and Electronics Engineering`
- **university**: `SRM Institute of Science and Technology`
- **email**: `preethaj@srmist.edu.in`
- **linkedin_url**: `https://www.linkedin.com/in/preetha-roselyn-17911916/`
- **college_url**: `https://www.srmist.edu.in/faculty/dr-j-preetha-roselyn/`

### Experience & Stats:
- **years_of_experience**: `20`
- **scholars_count**: `11`

### Text Fields:
- **bio**: Your professional bio/description
- **experience**: Detailed professional experience description
- **research_interests**: `Model-based development, digital twin, grid integration issues of PV and Wind, Energy management system in microgrid, building management systems, and zero downtime approach in industries.`

### Arrays (use Supabase array format):
- **qualifications**: 
  ```
  ["B.E (EEE) from Madras University, 2002", "M.S (By Research) from Anna University, 2007", "Ph.D from SRM University, 2015"]
  ```
- **specialization**: 
  ```
  ["Voltage stability", "Machine Learning", "Artificial Intelligence", "Grid integration issues of renewable energy", "Building automation", "Microgrid"]
  ```
- **achievements**: 
  ```
  ["Established NI ACADEMY AND RESEARCH CENTRE in SRM Institute of Science and Technology", "Published 55 international publications", "Published 1 book: GA based placement of FACTS devices for voltage stability Enhancement", "Published patents in building automation and underwater AUVs", "Chairman of MTS India Section", "Faculty mentor of SRM Marine Technology Society student chapter (Best student chapter award 2019)", "Received IEEE publication award, John P Craven mentor international award", "Honorary Rosalind member of London Journals Press"]
  ```

### Optional Fields:
- **phone**: Phone number if available
- **address**: Full address
- **profile_image**: URL to profile image (defaults to `/profile-image.png` if not set)

5. Click **Save**

## Step 3: Edit Profile from Admin Dashboard

1. **Login to Admin Dashboard**: Go to `/admin/login`
2. **Navigate to Profile**: Click on **Profile** in the dashboard
3. **Edit Fields**: 
   - All basic information fields are editable
   - For arrays (Qualifications, Specialization, Achievements):
     - Click **Add** button to add new items
     - Edit existing items directly in the input fields
     - Click the **X** button to remove items
4. **Save Changes**: Click **Save Profile** button at the bottom

## Available Profile Fields

### Basic Information:
- Name
- Title
- Department
- University
- Bio
- Email
- Phone
- Address

### Experience & Statistics:
- Years of Experience (number)
- PhD Scholars Count (number)
- Professional Experience (detailed text)

### Research:
- Research Interests (text)

### Arrays (can add/remove items):
- Qualifications (array of strings)
- Areas of Specialization (array of strings)
- Key Achievements (array of strings)

### Links:
- LinkedIn URL
- College Profile URL
- Profile Image URL

## How It Works

- **Hero Component**: Fetches profile data and displays name, title, department, university, and statistics
- **About Component**: Fetches and displays qualifications, specialization, achievements, experience, and research interests
- **Contact Page**: Uses profile email, LinkedIn, and college URLs from database
- **Footer**: Uses profile name, title, department, university, and contact links from database

All data is now dynamic and editable from the admin dashboard!

## Notes

- If profile data is not found in database, components will use fallback default values
- Arrays (qualifications, specialization, achievements) can be managed dynamically - add/remove as needed
- All changes are saved immediately to Supabase database
- The profile is a single row with `id = 'main'`
