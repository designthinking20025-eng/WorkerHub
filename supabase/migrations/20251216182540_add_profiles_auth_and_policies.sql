/*
  # Add Authentication and Policies to Profiles Table

  1. Changes
    - Add `user_id` column to profiles table linking to auth.users
    - Add unique constraint to ensure one profile per user
    - Create policies for authenticated users to manage their profiles
    
  2. Security Policies
    - INSERT: Authenticated users can create their own profile
    - UPDATE: Authenticated users can update their own profile
    - DELETE: Authenticated users can delete their own profile
    - SELECT: Public read access (already exists)
    
  3. Notes
    - This links the profiles table to the authentication system
    - Each user can have only one profile in the profiles table
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
    CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_id_key ON profiles(user_id);
  END IF;
END $$;

CREATE POLICY "Authenticated users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = skills.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update their skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = skills.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete their skills"
  ON skills FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = skills.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert their work experience"
  ON work_experience FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = work_experience.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update their work experience"
  ON work_experience FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = work_experience.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete their work experience"
  ON work_experience FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = work_experience.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert their education"
  ON education FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = education.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can update their education"
  ON education FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = education.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can delete their education"
  ON education FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = education.profile_id
      AND profiles.user_id = auth.uid()
    )
  );