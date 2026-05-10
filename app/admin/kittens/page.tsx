"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Kitten } from '@/types';
import { Plus, Pencil, Trash2, Loader2, X, Upload } from 'lucide-react';

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-navy border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-white placeholder-gray-600 text-sm";

function KittenFormModal({ kitten, onClose }: { kitten: Kitten | null; onClose: () => void }) {
  const isEdit = !!kitten;
  const [form, setForm] = useState({ name: kitten?.name||'', gender: kitten?.gender||'female', age_weeks: kitten?.age_weeks?.toString()||'', color: kitten?.color||'', pattern: kitten?.pattern||'', price_usd: kitten?.price_usd?.toString()||'', status: kitten?.status||'available', description: kitten?.description||'', image_url: kitten?.image_url||'', is_featured: kitten?.is_featured||false });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string|boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'kitten-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) set('image_url', data.url); else setError('Upload failed');
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const url = isEdit ? `/api/kittens/${kitten!.id}` : '/api/kittens';
    const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { const d = await res.json(); setError(d.error||'Save failed'); setSaving(false); return; }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative glass rounded-2xl border border-gold/20 w-full max-w-lg max-h-[90vh] overflow-y-auto z-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2 className="font-semibold text-white">{isEdit ? 'Edit Kitten' : 'Add New Kitten'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Photo</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-navy-mid border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                {form.image_url ? <Image src={form.image_url} alt="preview" width={64} height={64} className="w-full h-full object-cover" /> : <span className="text-2xl">🐱</span>}
              </div>
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                className="flex items-center gap-2 text-sm px-4 py-2 glass border border-white/10 rounded-xl text-gray-400 hover:text-white transition disabled:opacity-50">
                {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Upload Photo</>}
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImage} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Luna" className={inputClass} /></div>
            <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Gender *</label><select required value={form.gender} onChange={e => set('gender', e.target.value)} className={inputClass}><option value="female">Female</option><option value="male">Male</option></select></div>
            <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Status *</label><select required value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option></select></div>
            <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Age (weeks) *</label><input required type="number" min={1} value={form.age_weeks} onChange={e => set('age_weeks', e.target.value)} placeholder="8" className={inputClass} /></div>
            <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Price (USD) *</label><input required type="number" min={0} value={form.price_usd} onChange={e => set('price_usd', e.target.value)} placeholder="1200" className={inputClass} /></div>
            <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Color *</label><input required value={form.color} onChange={e => set('color', e.target.value)} placeholder="Silver Tabby" className={inputClass} /></div>
            <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Pattern</label><input value={form.pattern} onChange={e => set('pattern', e.target.value)} placeholder="Classic Tabby" className={inputClass} /></div>
          </div>
          <div><label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe the kitten's personality..." className={`${inputClass} resize-none`} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="rounded" /><label htmlFor="featured" className="text-sm text-gray-400">Feature on homepage</label></div>
          {error && <p className="text-red-400 text-sm bg-red-500/10 rounded-xl p-3 border border-red-500/20">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-gold text-navy py-3 rounded-xl font-medium hover:bg-gold-light transition flex items-center justify-center gap-2 disabled:opacity-70">
              {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : isEdit ? 'Save Changes' : 'Add Kitten'}
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 glass border border-white/10 rounded-xl text-gray-400 hover:text-white transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminKittens() {
  const [kittens, setKittens] = useState<Kitten[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Kitten | null>(null);

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/kittens'); const d = await r.json(); setKittens(d.kittens||[]); setLoading(false); };
  useEffect(() => { fetch_(); }, []);
  const handleClose = () => { setModal(false); setEditing(null); fetch_(); };

  const statusColors: Record<string,string> = { available: 'bg-emerald-500/20 text-emerald-400', reserved: 'bg-amber-500/20 text-amber-400', sold: 'bg-gray-500/20 text-gray-400' };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-semibold text-white">Kittens</h1><p className="text-gray-500 mt-1">Add, edit or remove your kittens.</p></div>
        <button onClick={() => { setEditing(null); setModal(true); }} className="flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-xl font-medium hover:bg-gold-light transition"><Plus size={18} />Add Kitten</button>
      </div>
      {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : kittens.length === 0 ? (
        <div className="glass rounded-2xl border border-white/5 p-16 text-center"><p className="text-5xl mb-4">🐱</p><p className="text-gray-400">No kittens yet. Add your first one!</p></div>
      ) : (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/5 bg-white/2"><th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wide">Kitten</th><th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wide">Details</th><th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wide">Price</th><th className="text-left px-5 py-3.5 text-xs text-gray-500 uppercase tracking-wide">Status</th><th className="px-5 py-3.5"></th></tr></thead>
              <tbody className="divide-y divide-white/5">
                {kittens.map(k => (
                  <tr key={k.id} className="hover:bg-white/2 transition">
                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg overflow-hidden bg-navy-mid flex-shrink-0">{k.image_url ? <Image src={k.image_url} alt={k.name} width={40} height={40} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-lg">🐱</div>}</div><span className="font-medium text-white">{k.name}</span></div></td>
                    <td className="px-5 py-4 text-gray-400 capitalize">{k.color} · {k.gender} · {k.age_weeks}w</td>
                    <td className="px-5 py-4 text-white font-medium">${k.price_usd.toLocaleString()}</td>
                    <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[k.status]}`}>{k.status}</span></td>
                    <td className="px-5 py-4"><div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(k); setModal(true); }} className="p-2 rounded-lg text-gray-400 hover:text-gold hover:bg-gold/10 transition"><Pencil size={15} /></button>
                      <button onClick={async () => { if (!confirm(`Delete ${k.name}?`)) return; await fetch(`/api/kittens/${k.id}`, { method: 'DELETE' }); fetch_(); }} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 size={15} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modal && <KittenFormModal kitten={editing} onClose={handleClose} />}
    </div>
  );
}
