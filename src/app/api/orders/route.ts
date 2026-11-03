import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import {
  fetchProductsByIds,
  getSettings,
  mapOrderRow,
  mapProductRow,
  parseId,
  productRef,
} from '@/lib/types';
import { createResponse, createErrorResponse, requireAuth, validateOrderData } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// POST /api/orders - Create new order (public)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();

    const body = await request.json();

    // Validate input data
    const validationErrors = validateOrderData(body);
    if (validationErrors.length > 0) {
      return createErrorResponse('Validation failed', 400, 'Validation Error', {
        details: validationErrors
      });
    }

    // Get product details
    const productId = parseId(String(body.productDetails.productId));
    if (!productId) {
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    const { data: productRow, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .maybeSingle();

    if (productError) throw productError;
    if (!productRow) {
      return createErrorResponse('Product not found', 404, 'Not Found');
    }
    const product = mapProductRow(productRow);

    // Get settings for pricing (data via helper)
    const settings = await getSettings();

    // Calculate pricing
    const basePrice = product.price;
    const customFee = body.productDetails.isCustom ? (settings.customTextPrice || 0) : 0;
    const shippingFee = settings.shippingFees[body.customerInfo.city] ?? 0;
    const totalPrice = basePrice + customFee + shippingFee;

    // Create new order (order_id est généré par la base de données)
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_info: {
          fullName: String(body.customerInfo.fullName).trim(),
          whatsappNumber: String(body.customerInfo.whatsappNumber).trim(),
          city: String(body.customerInfo.city).trim(),
          isTetouan: String(body.customerInfo.city).toLowerCase() === 'tetouan',
        },
        product_details: {
          productId: productId,
          size: body.productDetails.size ?? null,
          isCustom: body.productDetails.isCustom || false,
          customText: body.productDetails.customText?.trim() || null,
        },
        pricing: {
          basePrice,
          customFee,
          shippingFee,
          totalPrice,
          currency: body.pricing?.currency || 'MAD',
          exchangeRate: body.pricing?.exchangeRate || 10,
        },
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Populate product details for response (equivalent de populate() MongoDB)
    const order = mapOrderRow(data);
    order.productDetails.productId = productRef(product);

    return createResponse(order, 201);
  } catch (error) {
    console.error('Error creating order:', error);
    return createErrorResponse('Failed to create order', 500, 'Internal Server Error');
  }
}

// GET /api/orders - Get all orders (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    const supabase = getSupabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50') || 50, 100);
    const page = Math.max(parseInt(searchParams.get('page') || '1') || 1, 1);
    const skip = (page - 1) * limit;

    // Build query
    let query = supabase.from('orders').select('*', { count: 'exact' });
    if (status) {
      query = query.eq('status', status);
    }

    // Get orders with pagination
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    // Embed referenced products (populate equivalent)
    const rows = data ?? [];
    const productIds = rows
      .map((row: any) => {
        const ref = row.product_details?.productId;
        return ref != null ? String(ref) : '';
      })
      .filter(Boolean);
    const productsById = await fetchProductsByIds(supabase, productIds);
    const orders = rows.map((row: any) => {
      const order = mapOrderRow(row, productsById);
      const embedded = order.productDetails.productId;
      if (typeof embedded !== 'string') {
        order.productDetails.productId = productRef(embedded);
      }
      return order;
    });

    const total = count ?? orders.length;

    return createResponse({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return createErrorResponse('Failed to fetch orders', 500, 'Internal Server Error');
  }
}
