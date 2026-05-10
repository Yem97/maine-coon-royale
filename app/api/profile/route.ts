import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('admin_profile').select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { data: existing } = await supabaseAdmin.from('admin_profile').select('id').single();
    if (!existing) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    const { data, error } = await supabaseAdmin.from('admin_profile').update({ ...body, updated_at: new Date().toISOString() }).eq('id', existing.id).select().single();
    if (error) throw error;
    return NextResponse.json({ profile: data });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
