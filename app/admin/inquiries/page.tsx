"use client"
import React, { useState, useEffect } from 'react';
import { Inquiry } from '@/types';
import { Mail, MessageCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string|null>(null);

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/inquiries'); const d = await r.json(); setInquiries(d.inquiries||[]); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: true }) });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
  };

  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl font-semibold text-white">Inquiries</h1><p className="text-gray-500 mt-1">All client inquiries and waiting list signups.</p></div>
      {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : inquiries.length === 0 ? (
        <div className="glass rounded-2xl border border-white/5 p-16 text-center"><p className="text-5xl mb-4">📬</p><p className="text-gray-400">No inquiries yet.</p></div>
      ) : (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
          {inquiries.map(inq => (
            <div key={inq.id} className={!inq.is_read ? 'bg-gold/5' : ''}>
              <div className="px-6 py-4 flex items-center gap-4">
                <div className="flex-shrink-0">{!inq.is_read ? <span className="w-2.5 h-2.5 bg-gold rounded-full block" /> : <span className="w-2.5 h-2.5 bg-gray-700 rounded-full block" />}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-white">{inq.full_name}</p>
                    <span className="text-xs text-gray-500">{inq.country}</span>
                    <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{inq.interest}</span>
                    {inq.kitten_name && <span className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{inq.kitten_name}</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{inq.email}{inq.whatsapp ? ` · ${inq.whatsapp}` : ''} · {inq.created_at ? formatDistanceToNow(new Date(inq.created_at), { addSuffix: true }) : ''}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={`mailto:${inq.email}`} className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition" title="Email"><Mail size={16} /></a>
                  {inq.whatsapp && <a href={`https://wa.me/${inq.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition" title="WhatsApp"><MessageCircle size={16} /></a>}
                  {!inq.is_read && <button onClick={() => markRead(inq.id)} className="p-2 rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition" title="Mark read"><Check size={16} /></button>}
                  <button onClick={() => setExpanded(expanded === inq.id ? null : inq.id)} className="p-2 rounded-lg text-gray-400 hover:bg-white/5 transition">{expanded === inq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
                </div>
              </div>
              {expanded === inq.id && inq.message && (
                <div className="px-6 pb-4 ml-7">
                  <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-400 border-l-2 border-gold/30">{inq.message}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
