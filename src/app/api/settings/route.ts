import { NextRequest } from 'next/server';
import { getSettings, mapSettingsRow } from '@/lib/types';
import { getSupabase } from '@/lib/supabase';
import { createResponse, createErrorResponse, requireAuth, validateSettingsData } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/settings - Get application settings (public)
export async function GET() {
  try {
    const settings = await getSettings();
    return createResponse(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return createErrorResponse('Failed to fetch settings', 500, 'Internal Server Error');
  }
}

// PUT /api/settings - Update application settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    const supabase = getSupabase();

    const body = await request.json();

    // Validate input data
    const validationErrors = validateSettingsData(body);
    if (validationErrors.length > 0) {
      return createErrorResponse('Validation failed', 400, 'Validation Error', {
        details: validationErrors
      });
    }

    // Only patch provided fields; upsert guarantees the single row (id = 1)
    const patch: Record<string, unknown> = {};
    if (body.customTextPrice !== undefined) {
      patch.custom_text_price = body.customTextPrice;
    }
    if (body.isOrderingEnabled !== undefined) {
      patch.is_ordering_enabled = body.isOrderingEnabled;
    }
    if (body.maintenanceMode !== undefined) {
      patch.maintenance_mode = body.maintenanceMode;
    }
    if (body.defaultCurrency !== undefined) {
      patch.default_currency = body.defaultCurrency;
    }
    if (body.exchangeRate !== undefined) {
      patch.exchange_rate = body.exchangeRate;
    }
    if (body.shippingFees) {
      patch.shipping_fees = body.shippingFees;
    }
    if (body.productPrices) {
      patch.product_prices = body.productPrices;
    }
    if (body.discountCodes) {
      patch.discount_codes = body.discountCodes;
    }
    if (body.contactInfo) {
      patch.contact_info = body.contactInfo;
    }
    if (body.socialMedia) {
      patch.social_media = body.socialMedia;
    }

    const { data, error } = await supabase
      .from('settings')
      .upsert({ id: 1, ...patch })
      .select()
      .single();

    if (error) throw error;

    return createResponse(mapSettingsRow(data));
  } catch (error) {
    console.error('Error updating settings:', error);
    return createErrorResponse('Failed to update settings', 500, 'Internal Server Error');
  }
}
