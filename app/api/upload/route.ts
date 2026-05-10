import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'kitten-images';
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) return NextResponse.json({ error: 'Only JPG, PNG, WebP allowed' }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Max 5MB' }, { status: 400 });
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = await file.arrayBuffer();
    const { error } = await supabaseAdmin.storage.from(bucket).upload(filename, buffer, { contentType: file.type });
    if (error) throw error;
    const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(filename);
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
