import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elmmrexuquztjisupyys.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbW1yZXh1cXV6dGppc3VweXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDIzMzgsImV4cCI6MjA4MTQ3ODMzOH0.L0-VWnUVPOUVgp7Lj6jj5UgZRxkoGmK1f5DJPlIht-0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    flowType: 'implicit'
  }
});

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
