"use client"
import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function InquiryForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      full_name: (form.elements.namedItem('full_name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
      interest: (form.elements.namedItem('interest') as HTMLSelectElement).value,
      kitten_name: (form.elements.namedItem('kitten_name') as HTMLInputElement).value || null,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error || 'Something went wrong'); }
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  const inp = "w-full px-4 py-3 rounded-xl bg-navy-mid border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-white placeholder-gray-600 transition text-sm";
  const lbl = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    <div className="glass rounded-2xl border border-gold/20 p-8">
      {status === 'success' ? (
        <div className="text-center py-10">
          <CheckCircle className="mx-auto mb-4 text-gold" size={52} />
          <h3 className="font-display text-2xl font-semibold mb-2 text-white">Thank you!</h3>
          <p className="text-gray-400">We received your inquiry and will respond within 24 hours.</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-gold hover:underline text-sm">Send another inquiry</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className={lbl}>Full Name *</label><input name="full_name" type="text" required placeholder="Jane Smith" className={inp} /></div>
            <div><label className={lbl}>Country *</label><input name="country" type="text" required placeholder="United States" className={inp} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className={lbl}>Email Address *</label><input name="email" type="email" required placeholder="jane@email.com" className={inp} /></div>
            <div><label className={lbl}>WhatsApp Number</label><input name="whatsapp" type="tel" placeholder="+1 555 000 0000" className={inp} /></div>
          </div>
          <div>
            <label className={lbl}>I am Interested In *</label>
            <select name="interest" required className={inp}>
              <option value="">Select an option...</option>
              <option value="Available Kitten">An available kitten</option>
              <option value="Waiting List">Join the waiting list</option>
              <option value="Specific Kitten">A specific kitten</option>
              <option value="General Info">General information</option>
            </select>
          </div>
          <div><label className={lbl}>Specific Kitten (optional)</label><input id="kitten_field" name="kitten_name" type="text" placeholder="Leave blank if joining waiting list" className={inp} /></div>
          <div><label className={lbl}>Message</label><textarea name="message" rows={4} placeholder="Tell us about yourself and your home..." className={`${inp} resize-none`} /></div>
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 rounded-xl p-4 text-sm border border-red-500/20">
              <AlertCircle size={16} />{errorMsg}
            </div>
          )}
          <button type="submit" disabled={status === 'loading'}
            className="w-full bg-gold text-navy py-4 rounded-xl font-medium text-base hover:bg-gold-light transition flex items-center justify-center gap-2 disabled:opacity-70">
            {status === 'loading' ? <><Loader2 size={18} className="animate-spin" />Sending...</> : 'Send Inquiry ✦'}
          </button>
        </form>
      )}
    </div>
  );
}
