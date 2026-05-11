import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('facebook_posts').select('*').order('posted_at', { ascending: false }).limit(6);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, image_url, post_url, likes, posted_at } = body;
    if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 });
    const { data, error } = await supabaseAdmin.from('facebook_posts').insert({ content, image_url, post_url, likes, posted_at: posted_at || new Date().toISOString() }).select().single();
    if (error) throw error;
    return NextResponse.json({ post: data }, { status: 201 });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
