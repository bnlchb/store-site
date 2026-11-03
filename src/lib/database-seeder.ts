import { getSupabase } from '@/lib/supabase';
import { productInputToRow } from '@/lib/types';
import sampleData from '@/lib/sample-data.json';

// ============================================================
// Seeder Supabase — insère produits, réglages et textes commun
// d'exemple. Exécuté via /api/seed ou par scripts/setup-database.js.
// Le schéma SQL se trouve dans supabase/schema.sql.
// ============================================================

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    const supabase = getSupabase();
    console.log('✅ Supabase client ready');

    // Clear existing data
    await supabase.from('community_texts').delete().gt('id', 0);
    await supabase.from('settings').delete().gt('id', 0);
    await supabase.from('products').delete().gt('id', 0);
    console.log('🗑️ Cleared existing data');

    // Insert sample products
    const { error: productsError } = await supabase
      .from('products')
      .insert(sampleData.products.map((p) => productInputToRow(p)));
    if (productsError) throw productsError;
    console.log(`✅ Inserted ${sampleData.products.length} products`);

    // Insert sample settings (single row, id = 1)
    const s = sampleData.settings;
    const { error: settingsError } = await supabase.from('settings').upsert({
      id: 1,
      product_prices: s.productPrices,
      custom_text_price: s.customTextPrice,
      shipping_fees: s.shippingFees,
      discount_codes: s.discountCodes,
      default_currency: s.defaultCurrency,
      exchange_rate: s.exchangeRate,
      is_ordering_enabled: s.isOrderingEnabled,
      maintenance_mode: s.maintenanceMode,
      contact_info: s.contactInfo,
      social_media: s.socialMedia,
    });
    if (settingsError) throw settingsError;
    console.log('✅ Inserted settings');

    // Insert sample community texts
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

    console.log('🎉 Database seeding completed successfully!');

    return {
      products: sampleData.products.length,
      settings: 1,
      communityTexts: sampleData.communityTexts.length,
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Function to check if database is empty
export async function isDatabaseEmpty(): Promise<boolean> {
  try {
    const supabase = getSupabase();

    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    const { count: settingsCount } = await supabase
      .from('settings')
      .select('*', { count: 'exact', head: true });

    return (productCount ?? 0) === 0 && (settingsCount ?? 0) === 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return false;
  }
}

// Function to get database stats
export async function getDatabaseStats() {
  try {
    const supabase = getSupabase();

    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    const { count: activeProductCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);
    const { count: settingsCount } = await supabase
      .from('settings')
      .select('*', { count: 'exact', head: true });

    return {
      products: productCount ?? 0,
      activeProducts: activeProductCount ?? 0,
      settings: settingsCount ?? 0,
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
}
