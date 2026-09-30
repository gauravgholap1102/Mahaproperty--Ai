import { createClient } from '@supabase/supabase-js';

// Environment variable retrieval with safe fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mahaproperty-demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
