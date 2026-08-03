import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.");
}

// Anon-key client — safe to use in both browser and SSR code. RLS policies
// on blog_posts/storage govern what it can actually read or write; once a
// user signs in via supabase.auth, this same client carries their session
// and gets the "authenticated" RLS grants.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
