"use client"
import React, { useState, useEffect } from 'react';
import { Review } from '@/types';
import { Star, Check, X, Trash2, Loader2, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyId, setReplyId] = useState<string|null>(null);
  const [replyText, setReplyText] = useState('');
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/admin/reviews'); const d = await r.json(); setReviews(d.reviews||[]); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const approve = async (id: string) => { await fetch(`/api/reviews/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_approved: true }) }); fetch_(); };
  const reject = async (id: string) => { if (!confirm('Delete this review?')) return; await fetch(`/api/reviews/${id}`, { method: 'DELETE' }); fetch_(); };
  const submitReply = async (id: string) => { setSaving(true); await fetch(`/api/reviews/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ admin_reply: replyText }) }); setReplyId(null); setReplyText(''); setSaving(false); fetch_(); };

  const pending = reviews.filter(r => !r.is_approved);
  const approved = reviews.filter(r => r.is_approved);

  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl font-semibold text-white">Reviews</h1><p className="text-gray-500 mt-1">Approve reviews and reply to customers.</p></div>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-white font-medium mb-4 flex items-center gap-2"><span className="w-2 h-2 bg-amber-400 rounded-full"></span>Pending Approval ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map(r => (
              <div key={r.id} className="glass rounded-2xl border border-amber-500/20 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= r.rating ? 'fill-gold text-gold' : 'text-gray-600'} />)}</div>
                      <span className="text-xs text-gray-500">· {r.reviewer_name} · {r.reviewer_country}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{r.review_text}</p>
                    {r.kitten_name && <p className="text-xs text-gold mt-1">Kitten: {r.kitten_name}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => approve(r.id)} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition" title="Approve"><Check size={16} /></button>
                    <button onClick={() => reject(r.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition" title="Delete"><X size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-white font-medium mb-4 flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span>Approved Reviews ({approved.length})</h2>
        {loading ? <div className="text-center py-10"><Loader2 className="animate-spin text-gold mx-auto" size={28} /></div> :
        approved.length === 0 ? <div className="glass rounded-2xl border border-white/5 p-10 text-center text-gray-400">No approved reviews yet.</div> : (
          <div className="space-y-3">
            {approved.map(r => (
              <div key={r.id} className="glass rounded-2xl border border-white/5 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= r.rating ? 'fill-gold text-gold' : 'text-gray-600'} />)}</div>
                      <span className="text-xs text-gray-500">· {r.reviewer_name} · {r.reviewer_country}</span>
                      {r.created_at && <span className="text-xs text-gray-600">· {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}</span>}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{r.review_text}</p>
                    {r.admin_reply && <div className="bg-gold/10 border border-gold/20 rounded-xl p-3 mt-2"><p className="text-xs text-gold font-medium mb-1">Your reply:</p><p className="text-xs text-gray-400">{r.admin_reply}</p></div>}
                    {replyId === r.id && (
                      <div className="mt-3 flex gap-2">
                        <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write your reply..." className="flex-1 px-3 py-2 rounded-xl bg-navy border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                        <button onClick={() => submitReply(r.id)} disabled={saving} className="bg-gold text-navy px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-70">{saving ? '...' : 'Reply'}</button>
                        <button onClick={() => setReplyId(null)} className="px-3 py-2 glass border border-white/10 rounded-xl text-gray-400 text-sm">Cancel</button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setReplyId(r.id); setReplyText(r.admin_reply||''); }} className="p-2 glass border border-white/10 rounded-lg text-gray-400 hover:text-gold transition" title="Reply"><MessageSquare size={15} /></button>
                    <button onClick={() => reject(r.id)} className="p-2 glass border border-white/10 rounded-lg text-gray-400 hover:text-red-400 transition" title="Delete"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
