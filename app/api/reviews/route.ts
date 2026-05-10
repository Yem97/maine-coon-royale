import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reviews: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reviewer_name, reviewer_country, reviewer_email, rating, review_text, kitten_name } = body;
    if (!reviewer_name || !reviewer_country || !rating || !review_text) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    const { data, error } = await supabaseAdmin.from('reviews').insert({ reviewer_name, reviewer_country, reviewer_email, rating: Number(rating), review_text, kitten_name, is_approved: false }).select().single();
    if (error) throw error;
    return NextResponse.json({ review: data }, { status: 201 });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
