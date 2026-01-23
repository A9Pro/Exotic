// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '(exists)' : '(missing)');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection (for development)
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('products').select('count');
    
    if (error) {
      console.error('❌ Supabase connection error:', error);
      return { success: false, error };
    }
    
    console.log('✅ Supabase connected successfully!');
    return { success: true, data };
  } catch (err) {
    console.error('❌ Supabase connection failed:', err);
    return { success: false, error: err };
  }
}