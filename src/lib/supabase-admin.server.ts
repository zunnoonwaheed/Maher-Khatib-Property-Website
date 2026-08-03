import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS entirely. Server-only: the `.server.ts`
// suffix keeps this out of the client bundle (see eslint.config.js). Not
// currently used by any route — the blog admin panel relies on the signed-in
// user's own session plus RLS grants instead. Reserved for future
// server-side/background work that genuinely needs to bypass RLS.
export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
