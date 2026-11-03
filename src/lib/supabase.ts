import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Client Supabase — variables exclusivement via l'environnement (.env / .env.local).
//   SUPABASE_URL           : URL du projet (Supabase > Project Settings > API)
//   SUPABASE_ANON_KEY      : clé "anon public" (utilisée côté serveur uniquement,
//                            limitée par les policies RLS)
//   SUPABASE_SERVICE_ROLE_KEY (recommandée) : clé secrète "service_role" qui
//                            contourne RLS — nécessaire pour les opérations admin
//                            (création/modification/suppression produits,
//                            commandes, réglages). Ne jamais l'exposer au client.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(
      'SUPABASE_URL manquant : définissez-le dans le fichier .env ' +
      '(Supabase Dashboard > Project Settings > API).'
    );
  }

  const key = serviceKey || anonKey;
  if (!key) {
    throw new Error(
      'SUPABASE_ANON_KEY (ou SUPABASE_SERVICE_ROLE_KEY) manquant : ' +
      'définissez-le dans le fichier .env (Supabase Dashboard > Project Settings > API).'
    );
  }

  console.log('Using Supabase:', url ? 'Set' : 'Not set', '-', serviceKey ? 'service_role' : 'anon');

  client = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return client;
}
