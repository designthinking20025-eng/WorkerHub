/*
  # LabourLink Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `profile_image` (text, optional)
      - `occupation` (text)
      - `location` (text)
      - `phone` (text)
      - `email` (text, optional)
      - `bio` (text, optional)
      - `years_of_experience` (integer)
      - `availability` (text)
      - `hourly_rate` (integer, optional)
      - `created_at` (timestamptz)
      
    - `skills`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `skill_name` (text)
      - `proficiency_level` (text)
      
    - `work_experience`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `company_name` (text)
      - `role` (text)
      - `duration` (text)
      - `description` (text, optional)
      - `start_date` (text)
      - `end_date` (text, optional)
      
    - `education`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `institution` (text)
      - `degree` (text)
      - `year` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (for browsing profiles)
    - Future: Add authenticated user policies when auth is implemented
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  profile_image text,
  occupation text NOT NULL,
  location text NOT NULL,
  phone text NOT NULL,
  email text,
  bio text,
  years_of_experience integer DEFAULT 0,
  availability text DEFAULT 'Available',
  hourly_rate integer,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name text NOT NULL,
  proficiency_level text DEFAULT 'Intermediate'
);

-- Create work_experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL,
  role text NOT NULL,
  duration text NOT NULL,
  description text,
  start_date text NOT NULL,
  end_date text
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  institution text NOT NULL,
  degree text NOT NULL,
  year text NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view work experience"
  ON work_experience FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view education"
  ON education FOR SELECT
  TO anon, authenticated
  USING (true);