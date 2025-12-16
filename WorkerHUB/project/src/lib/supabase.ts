import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  full_name: string;
  profile_image: string | null;
  occupation: string;
  location: string;
  phone: string;
  email: string | null;
  bio: string | null;
  years_of_experience: number;
  availability: string;
  hourly_rate: number | null;
  created_at: string;
}

export interface Skill {
  id: string;
  profile_id: string;
  skill_name: string;
  proficiency_level: string;
}

export interface WorkExperience {
  id: string;
  profile_id: string;
  company_name: string;
  role: string;
  duration: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
}
