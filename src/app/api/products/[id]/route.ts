import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { mapProductRow, parseId, productInputToRow } from '@/lib/types';
import { createResponse, createErrorResponse, requireAuth, validateProductData } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/products/[id] - Get single product (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabase();

    const id = parseId(params.id);
    if (!id) {
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    return createResponse(mapProductRow(data));
  } catch (error) {
    console.error('Error fetching product:', error);
    return createErrorResponse('Failed to fetch product', 500, 'Internal Server Error');
  }
}

// PUT /api/products/[id] - Update product (admin only)
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
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    const body = await request.json();

    // Validate input data
    const validationErrors = validateProductData(body);
    if (validationErrors.length > 0) {
      return createErrorResponse('Validation failed', 400, 'Validation Error', {
        details: validationErrors
      });
    }

    const { data, error } = await supabase
      .from('products')
      .update(productInputToRow(body, true))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    return createResponse(mapProductRow(data));
  } catch (error) {
    console.error('Error updating product:', error);
    return createErrorResponse('Failed to update product', 500, 'Internal Server Error');
  }
}

// DELETE /api/products/[id] - Delete product (admin only)
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
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return createErrorResponse('Product not found', 404, 'Not Found');
    }

    return createResponse({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return createErrorResponse('Failed to delete product', 500, 'Internal Server Error');
  }
}
