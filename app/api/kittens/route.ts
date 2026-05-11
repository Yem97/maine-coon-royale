import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('kittens').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ kittens: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, gender, age_weeks, color, pattern, price_usd, status, description, image_url, is_featured } = body;
    if (!name || !gender || !age_weeks || !color || !price_usd) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    const { data, error } = await supabaseAdmin.from('kittens').insert({ name, gender, age_weeks: Number(age_weeks), color, pattern, price_usd: Number(price_usd), status: status || 'available', description, image_url, is_featured: is_featured || false }).select().single();
    if (error) throw error;
    return NextResponse.json({ kitten: data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
