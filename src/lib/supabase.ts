import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

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
