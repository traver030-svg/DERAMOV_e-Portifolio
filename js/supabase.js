
const SUPABASE_URL = "https://snwzjgfzdeyujhlykzbi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_dLjdx4jgc5XpMbDfz3B9IQ_f_nGcznB";

if (!window.supabase) {
    throw new Error("Supabase library has not loaded.");
}

window.portfolioSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Supabase connection client initialized.");

