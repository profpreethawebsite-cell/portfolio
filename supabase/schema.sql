-- Supabase Database Schema for Portfolio Website
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profile table (single row)
CREATE TABLE IF NOT EXISTS profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  university TEXT NOT NULL,
  bio TEXT,
  qualifications TEXT[],
  experience TEXT,
  specialization TEXT[],
  achievements TEXT[],
  email TEXT,
  phone TEXT,
  address TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grants table
CREATE TABLE IF NOT EXISTS grants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  funding_agency TEXT NOT NULL,
  amount TEXT,
  period TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ongoing', 'completed')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Publications table
CREATE TABLE IF NOT EXISTS publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  journal TEXT NOT NULL,
  year INTEGER NOT NULL,
  doi TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patents table
CREATE TABLE IF NOT EXISTS patents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  patent_number TEXT,
  area TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('filed', 'granted')),
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards table
CREATE TABLE IF NOT EXISTS awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('conference', 'workshop', 'seminar', 'other')),
  date TEXT NOT NULL,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_grants_status ON grants(status);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);
CREATE INDEX IF NOT EXISTS idx_patents_status ON patents(status);
CREATE INDEX IF NOT EXISTS idx_awards_year ON awards(year);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patents ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access
CREATE POLICY "Public read access for profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access for grants" ON grants FOR SELECT USING (true);
CREATE POLICY "Public read access for publications" ON publications FOR SELECT USING (true);
CREATE POLICY "Public read access for admin_roles" ON admin_roles FOR SELECT USING (true);
CREATE POLICY "Public read access for patents" ON patents FOR SELECT USING (true);
CREATE POLICY "Public read access for awards" ON awards FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);

-- RLS Policies: Allow authenticated users to write
CREATE POLICY "Authenticated users can insert profile" ON profile FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update profile" ON profile FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert grants" ON grants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update grants" ON grants FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete grants" ON grants FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert publications" ON publications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update publications" ON publications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete publications" ON publications FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert admin_roles" ON admin_roles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update admin_roles" ON admin_roles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete admin_roles" ON admin_roles FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert patents" ON patents FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update patents" ON patents FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete patents" ON patents FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert awards" ON awards FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update awards" ON awards FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete awards" ON awards FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update events" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete events" ON events FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for gallery bucket
CREATE POLICY "Public read access for gallery images" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');
