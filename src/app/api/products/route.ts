import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { mapProductRow, productInputToRow } from '@/lib/types';
import { createResponse, createErrorResponse, requireAuth, validateProductData } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/products - Get all active products (public)
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50') || 50, 100);
    const page = Math.max(parseInt(searchParams.get('page') || '1') || 1, 1);
    const skip = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      // Recherche simple type ILIKE sur nom + description (sécurisée :
      // on retire les caractères spéciaux de PostgREST).
      const clean = search.replace(/[,()%*]/g, ' ').trim();
      if (clean) {
        query = query.or(`name.ilike.%${clean}%,description.ilike.%${clean}%`);
      }
    }

    // Get products with pagination
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    const products = (data ?? []).map(mapProductRow);
    const total = count ?? products.length;

    return createResponse({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return createErrorResponse('Failed to fetch products', 500, 'Internal Server Error');
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    const supabase = getSupabase();

    const body = await request.json();

    // Validate input data
    const validationErrors = validateProductData(body);
    if (validationErrors.length > 0) {
      return createErrorResponse('Validation failed', 400, 'Validation Error', {
        details: validationErrors
      });
    }

    // Create new product
    const { data, error } = await supabase
      .from('products')
      .insert(productInputToRow(body))
      .select()
      .single();

    if (error) throw error;

    return createResponse(mapProductRow(data), 201);
  } catch (error) {
    console.error('Error creating product:', error);
    return createErrorResponse('Failed to create product', 500, 'Internal Server Error');
  }
}
