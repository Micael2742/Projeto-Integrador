// =====================================================================
// BEESIDE — CLIENTE SUPABASE
// Troque as duas linhas abaixo pelos dados do SEU projeto Supabase:
// Dashboard do projeto > Project Settings > API
// =====================================================================
const SUPABASE_URL = "https://vysiojltlaqfglclcwnwm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rKx54wS3Fu4Hmt-InEBwhg_CE2pvyiI";

// O objeto global "supabase" vem do script carregado no <head>/<body> das páginas:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const beeside = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
