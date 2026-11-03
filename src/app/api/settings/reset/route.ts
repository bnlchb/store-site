import { NextRequest, NextResponse } from 'next/server';
import { parseId } from '@/lib/types';
import { getSupabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// DELETE /api/settings/reset - remove settings row (admin only)
export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const supabase = getSupabase();

  const id = parseId('1');
  if (id) {
    await supabase.from('settings').delete().eq('id', id);
  }
  return NextResponse.json({ ok: true });
}
