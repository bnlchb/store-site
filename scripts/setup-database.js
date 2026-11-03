#!/usr/bin/env node

/**
 * Database Setup Script for Originalfit / ENSA OFFLINE STORE (Supabase)
 *
 * Seeds / resets the Supabase PostgreSQL database with sample data.
 * Run with: npm run setup-db | npm run seed-db | npm run reset-db
 *
 * Required environment (.env or .env.local at the project root):
 *   SUPABASE_URL              — Dashboard > Project Settings > API
 *   SUPABASE_SERVICE_ROLE_KEY — required to delete/insert (bypasses RLS)
 *   SUPABASE_ANON_KEY         — fallback (read-only via RLS)
 *
 * SQL schema to run once in Supabase > SQL Editor: supabase/schema.sql
 */

const path = require('path');
const dotenv = require('dotenv');

// Environment variables — loaded from .env.local (local dev) and .env (production/deploy).
// Precedence mirrors Next.js: .env.local overrides .env. Aucun secret dans le code.
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { createClient } = require('@supabase/supabase-js');
const sampleData = require('../src/lib/sample-data.json');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const KEY = SERVICE_KEY || ANON_KEY;

if (!SUPABASE_URL || !KEY) {
  console.error('\n❌ SUPABASE_URL / SUPABASE_ANON_KEY manquants.');
  console.error('   Créez un fichier .env à la racine du projet avec :');
  console.error('   SUPABASE_URL=https://VOTRE-PROJET.supabase.co');
  console.error('   SUPABASE_ANON_KEY=votre-anon-key');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key');
  console.error('   (URL et clés : Supabase Dashboard > Project Settings > API)');
  console.error('   Créez d\'abord le schéma : Supabase > SQL Editor > supabase/schema.sql');
  process.exit(1);
}

if (!SERVICE_KEY) {
  console.error('\n⚠️  SUPABASE_SERVICE_ROLE_KEY absente : seul le mode lecture/verification fonctionnera,');
  console.error('    le seed/reset (écritures via la clé anon) sera rejeté par RLS.');
}

console.log('Loading environment variables...');
console.log('SUPABASE_URL:', SUPABASE_URL ? 'Set' : 'Not set');
console.log('Auth mode:', SERVICE_KEY ? 'service_role' : 'anon');

const supabase = createClient(SUPABASE_URL, KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function productToRow(p) {
  return {
    name: p.name,
    description: p.description ?? null,
    price: p.price,
    images: p.images,
    sizes: p.sizes,
    category: p.category ?? null,
    is_customizable: p.isCustomizable || false,
    custom_price: p.customPrice || 0,
    is_active: p.isActive !== undefined ? p.isActive : true,
    stock: p.stock || 0,
    tags: p.tags || [],
  };
}

function settingsToRow(s) {
  return {
    id: 1,
    product_prices: s.productPrices,
    custom_text_price: s.customTextPrice,
    shipping_fees: s.shippingFees,
    discount_codes: s.discountCodes,
    default_currency: s.defaultCurrency || 'MAD',
    exchange_rate: s.exchangeRate || 10,
    is_ordering_enabled: s.isOrderingEnabled !== undefined ? s.isOrderingEnabled : true,
    maintenance_mode: s.maintenanceMode || false,
    contact_info: s.contactInfo,
    social_media: s.socialMedia,
  };
}

// ---------- stats / helpers ----------

async function getStats() {
  const { count: products } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: activeProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  const { count: orders } = await supabase.from('orders').select('*', { count: 'exact', head: true });
  const { count: communityTexts } = await supabase.from('community_texts').select('*', { count: 'exact', head: true });
  const { data: settingsRow } = await supabase.from('settings').select('id').eq('id', 1).maybeSingle();
  return {
    products: products ?? 0,
    activeProducts: activeProducts ?? 0,
    orders: orders ?? 0,
    communityTexts: communityTexts ?? 0,
    settings: settingsRow ? 1 : 0,
  };
}

async function resetDatabase() {
  console.log('🗑️ Deleting all rows...');
  const errors = [];
  const res1 = await supabase.from('community_texts').delete().gt('id', 0);
  if (res1.error) errors.push('community_texts: ' + res1.error.message);
  const res2 = await supabase.from('products').delete().gt('id', 0);
  if (res2.error) errors.push('products: ' + res2.error.message);
  const res3 = await supabase.from('orders').delete().gt('id', 0);
  if (res3.error) errors.push('orders: ' + res3.error.message);
  const res4 = await supabase.from('settings').delete().gt('id', 0);
  if (res4.error) errors.push('settings: ' + res4.error.message);
  if (errors.length) {
    console.error('\n❌ Reset partiel — erreurs :');
    errors.forEach((e) => console.error('   -', e));
    process.exit(1);
  }
  console.log('✅ Reset complete');
}

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...');

  const { error: productsError } = await supabase.from('products').insert(sampleData.products.map(productToRow));
  if (productsError) throw productsError;
  console.log(`✅ Inserted ${sampleData.products.length} products`);

  const { error: settingsError } = await supabase.from('settings').upsert(settingsToRow(sampleData.settings));
  if (settingsError) throw settingsError;
  console.log('✅ Inserted settings');

  const { error: textsError } = await supabase.from('community_texts').insert(
    sampleData.communityTexts.map((t) => ({
      text: t.text,
      category: t.category,
      is_approved: t.isApproved,
      submitted_by: t.submittedBy,
      usage_count: t.usageCount,
    }))
  );
  if (textsError) throw textsError;
  console.log(`✅ Inserted ${sampleData.communityTexts.length} community texts`);

  console.log('🎉 Seeding complete!');
}

// ---------- main ----------

async function main() {
  console.log('🚀 Originalfit Database Setup (Supabase)');
  console.log('=========================================\n');

  let stats;
  try {
    stats = await getStats();
  } catch (error) {
    console.error('\n❌ Impossible de joindre Supabase :', error.message);
    console.error('   Vérifiez SUPABASE_URL / clés dans le fichier .env');
    process.exit(1);
  }

  console.log('📊 Current stats:');
  console.log(`   Products: ${stats.products} (active: ${stats.activeProducts})`);
  console.log(`   Orders: ${stats.orders}`);
  console.log(`   Community texts: ${stats.communityTexts}`);
  console.log(`   Settings row: ${stats.settings ? 'yes' : 'no'}`);

  const args = process.argv.slice(2);

  if (args.includes('--reset')) {
    await resetDatabase();
    console.log('\n✅ Database reset completed.');
    return;
  }

  const force = args.includes('--force');

  if (!force && (stats.products > 0 || stats.communityTexts > 0)) {
    console.log('\n⚠️  Database is not empty!');
    console.log('   To seed with sample data, use: npm run seed-db -- --force');
    console.log('   To reset database, use: npm run reset-db');
    return;
  }

  if (force) {
    await resetDatabase();
  }

  try {
    await seedDatabase();
    console.log('\n✅ Database setup completed successfully!');
    console.log('\n🎉 You can now:');
    console.log('   • Visit http://localhost:3000 to see the website');
    console.log('   • Visit /admin and login with ADMIN_USERNAME / ADMIN_PASSWORD');
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message || error);
    if (!SERVICE_KEY) {
      console.error('   Astuce : les écritures admin nécessitent SUPABASE_SERVICE_ROLE_KEY dans le .env.');
    }
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Originalfit Database Setup (Supabase)

Usage:
  npm run setup-db           # Seed database (only if empty)
  npm run seed-db            # Seed database with sample data
  npm run seed-db -- --force # Force seed (delete existing rows, then seed)
  npm run reset-db           # Reset database (delete all rows)

Environment Variables Required (.env / .env.local):
  SUPABASE_URL=https://VOTRE-PROJET.supabase.co
  SUPABASE_ANON_KEY=votre-anon-key
  SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key   (recommandé pour le seed/reset)

SQL schema: supabase/schema.sql  (à exécuter une fois dans Supabase > SQL Editor)
  `);
  process.exit(0);
}

main();
