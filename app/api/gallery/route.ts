import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('gallery').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ photos: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image_url, title, description, category } = body;
    if (!image_url) return NextResponse.json({ error: 'Image URL required' }, { status: 400 });
    const { data, error } = await supabaseAdmin.from('gallery').insert({ image_url, title, description, category }).select().single();
    if (error) throw error;
    return NextResponse.json({ photo: data }, { status: 201 });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
