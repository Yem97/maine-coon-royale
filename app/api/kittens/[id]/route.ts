import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    if (body.age_weeks) body.age_weeks = Number(body.age_weeks);
    if (body.price_usd) body.price_usd = Number(body.price_usd);
    const { data, error } = await supabaseAdmin.from('kittens').update(body).eq('id', params.id).select().single();
    if (error) throw error;
    return NextResponse.json({ kitten: data });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: k } = await supabaseAdmin.from('kittens').select('image_url').eq('id', params.id).single();
    if (k?.image_url?.includes('supabase')) {
      const path = k.image_url.split('/kitten-images/')[1];
      if (path) await supabaseAdmin.storage.from('kitten-images').remove([path]);
    }
    const { error } = await supabaseAdmin.from('kittens').delete().eq('id', params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
