import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data } = await supabaseAdmin
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  return NextResponse.json({ reviews: data || [] });
}
