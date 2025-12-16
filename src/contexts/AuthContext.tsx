import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type UserType = 'job_seeker' | 'employer' | null;

interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  user_type: UserType;
  avatar_url?: string;
  bio?: string;
}

interface AuthContextType {
  session: Session | null;
  user: UserProfile | null;
  userType: UserType;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string, userType: UserType) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserType: (type: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setUser(profile as UserProfile);
          setUserType(profile.user_type);
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);

      if (newSession?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', newSession.user.id)
          .maybeSingle();

        if (profile) {
          setUser(profile as UserProfile);
          setUserType(profile.user_type);
        }
      } else {
        setUser(null);
        setUserType(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string, type: UserType) => {
    if (!type) throw new Error('Please select a user type');

    const { data: { user: newUser }, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!newUser) throw new Error('Signup failed');

    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: newUser.id,
        full_name: fullName,
        phone,
        user_type: type,
      });

    if (profileError) throw profileError;

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', newUser.id)
      .maybeSingle();

    if (profile) {
      setUser(profile as UserProfile);
      setUserType(profile.user_type);
    }
  };

  const signIn = async (emailOrPhone: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailOrPhone,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, userType, loading, signUp, signIn, signOut, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
