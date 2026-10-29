// Supabase public client configuration.
// Keep the database/storage RLS policies in supabase.sql enabled.
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

window.SITE_CONFIG = {
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_PUBLISHABLE_KEY,
  storageBucket: "portfolio-images"
};
