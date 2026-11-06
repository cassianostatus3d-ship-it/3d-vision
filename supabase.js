
const SUPABASE_URL = "COLOCA_AQUI_O_TEU_PROJECT_URL";
const SUPABASE_KEY = "COLOCA_AQUI_A_TUA_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
