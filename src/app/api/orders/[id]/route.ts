import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import {
  fetchProductsByIds,
  mapOrderRow,
  parseId,
  productRef,
} from '@/lib/types';
import { createResponse, createErrorResponse, requireAuth } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/orders/[id] - Get single order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabase();

    const id = parseId(params.id);
    if (!id) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    // Populate product details for response (name, images, price)
    const order = mapOrderRow(data);
    const ref = data.product_details?.productId;
    const productsById = await fetchProductsByIds(supabase, [ref != null ? String(ref) : '']);
    const product = productsById.get(String(ref));
    if (product) {
      order.productDetails.productId = productRef(product, true);
    }

    return createResponse(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return createErrorResponse('Failed to fetch order', 500, 'Internal Server Error');
  }
}

// PUT /api/orders/[id] - Update order (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    const supabase = getSupabase();

    const id = parseId(params.id);
    if (!id) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    const body = await request.json();

    // Validate status if provided
    const validStatuses = ['pending', 'contacted', 'printed', 'delivering', 'delivered', 'finished'];
    if (body.status && !validStatuses.includes(body.status)) {
      return createErrorResponse('Invalid order status', 400, 'Validation Error');
    }

    const { data: existing, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!existing) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    // Build the JSONB patches (Mongo style subdocuments)
    const customerInfo = { ...(existing.customer_info ?? {}) };
    if (body.customerInfo?.fullName) {
      customerInfo.fullName = String(body.customerInfo.fullName).trim();
    }
    if (body.customerInfo?.whatsappNumber) {
      customerInfo.whatsappNumber = String(body.customerInfo.whatsappNumber).trim();
    }
    if (body.customerInfo?.city) {
      customerInfo.city = String(body.customerInfo.city).trim();
      customerInfo.isTetouan = customerInfo.city.toLowerCase() === 'tetouan';
    }

    const productDetails = { ...(existing.product_details ?? {}) };
    if (body.productDetails?.size) {
      productDetails.size = body.productDetails.size;
    }
    if (body.productDetails?.customText !== undefined) {
      productDetails.customText = body.productDetails.customText?.trim() || null;
    }

    const patch: Record<string, unknown> = {
      customer_info: customerInfo,
      product_details: productDetails,
    };
    if (body.status) {
      patch.status = body.status;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(patch)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    // Populate product details for response (name, images)
    const order = mapOrderRow(data);
    const ref = data.product_details?.productId;
    if (ref != null) {
      const productsById = await fetchProductsByIds(supabase, [String(ref)]);
      const product = productsById.get(String(ref));
      if (product) {
        order.productDetails.productId = productRef(product);
      }
    }

    return createResponse(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return createErrorResponse('Failed to update order', 500, 'Internal Server Error');
  }
}

// DELETE /api/orders/[id] - Delete order (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    const supabase = getSupabase();

    const id = parseId(params.id);
    if (!id) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    const { data, error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return createErrorResponse('Order not found', 404, 'Not Found');
    }

    return createResponse({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return createErrorResponse('Failed to delete order', 500, 'Internal Server Error');
  }
}
