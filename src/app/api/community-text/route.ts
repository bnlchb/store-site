import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { createResponse, createErrorResponse } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

// GET /api/community-text - Get approved community texts (public)
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();

    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    let query = supabase
      .from('community_texts')
      .select('id, text, category, usage_count')
      .eq('is_approved', true);
    if (category) {
      query = query.eq('category', category);
    }

    // Get approved texts (most used first), then emulate Mongo $sample(6)
    const { data, error } = await query.order('usage_count', { ascending: false }).limit(60);

    if (error) throw error;

    const texts = ((data ?? []) as any[])
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 6)
      .map((row: any) => ({
        _id: String(row.id),
        text: row.text,
        category: row.category,
        usageCount: Number(row.usage_count ?? 0),
      }));

    return createResponse(texts);
  } catch (error) {
    console.error('Error fetching community texts:', error);
    return createErrorResponse('Failed to fetch community texts', 500);
  }
}

// POST /api/community-text - Submit new community text (for future admin approval)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();

    const body = await request.json();
    const { text, category } = body;

    // Simple validation
    if (!text || !category || text.length > 50) {
      return createErrorResponse('Invalid text or category', 400);
    }

    // Generate anonymous ID based on timestamp and random
    const anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const { data, error } = await supabase
      .from('community_texts')
      .insert({
        text: String(text).trim(),
        category,
        submitted_by: anonymousId,
        is_approved: false, // Requires admin approval
      })
      .select('id')
      .single();

    if (error) throw error;

    return createResponse({
      message: 'Text submitted for review!',
      id: String(data.id),
      _id: String(data.id),
    });
  } catch (error) {
    console.error('Error submitting community text:', error);
    return createErrorResponse('Failed to submit text', 500);
  }
}
