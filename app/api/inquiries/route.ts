import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendInquiryNotification, sendInquiryConfirmation } from '@/lib/resend';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ inquiries: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email, whatsapp, country, interest, kitten_name, message } = body;
    if (!full_name || !email || !country || !interest) return NextResponse.json({ error: 'Please fill all required fields.' }, { status: 400 });
    const { data, error } = await supabaseAdmin.from('inquiries').insert({ full_name, email, whatsapp, country, interest, kitten_name, message }).select().single();
    if (error) throw error;
    await Promise.allSettled([sendInquiryNotification(data), sendInquiryConfirmation(data)]);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 }); }
}
