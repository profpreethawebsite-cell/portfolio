-- Migration script to add new fields to profile table
-- Run this in Supabase SQL Editor if you already have a profile table

-- Add new columns to profile table
ALTER TABLE profile 
ADD COLUMN IF NOT EXISTS years_of_experience INTEGER,
ADD COLUMN IF NOT EXISTS research_interests TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS college_url TEXT,
ADD COLUMN IF NOT EXISTS scholars_count INTEGER;

-- Update existing profile data with default values if needed
UPDATE profile 
SET 
  years_of_experience = COALESCE(years_of_experience, 20),
  scholars_count = COALESCE(scholars_count, 11)
WHERE id = 'main';
