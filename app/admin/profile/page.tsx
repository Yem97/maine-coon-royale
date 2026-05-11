"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { AdminProfile } from '@/types';
import { Upload, Loader2, CheckCircle, User } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => setProfile(d.profile));
  }, []);

  const set = (k: string, v: string | number) => setProfile(p => p ? { ...p, [k]: v } : p);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'gallery-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json();
    if (d.url) set('avatar_url', d.url);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = "w-full px-4 py-3 rounded-xl bg-navy border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-white text-sm placeholder-gray-600";
  const lbl = "block text-xs text-gray-400 uppercase tracking-wide mb-1.5";

  if (!profile) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Update your cattery info — changes appear instantly on the website.</p>
      </div>
      <div className="glass rounded-2xl border border-gold/20 p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gold/20 flex-shrink-0">
            {profile.avatar_url
              ? <Image src={profile.avatar_url} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-navy-mid flex items-center justify-center"><User size={32} className="text-gray-600" /></div>
            }
          </div>
          <div>
            <p className="text-white font-medium mb-2">Profile Photo</p>
            <p className="text-gray-500 text-xs mb-3">Appears on your About section.</p>
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-2 text-sm glass border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 px-4 py-2 rounded-xl transition disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Change Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 space-y-4">
          <div><label className={lbl}>Business Name</label><input value={profile.full_name} onChange={e => set('full_name', e.target.value)} className={inp} /></div>
          <div><label className={lbl}>Tagline</label><input value={profile.tagline} onChange={e => set('tagline', e.target.value)} placeholder="e.g. Premium Home-Bred Maine Coon Kittens" className={inp} /></div>
          <div><label className={lbl}>About / Bio</label><textarea value={profile.bio} onChange={e => set('bio', e.target.value)} rows={5} className={`${inp} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Location</label><input value={profile.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Texas, USA" className={inp} /></div>
            <div><label className={lbl}>Years Breeding</label><input type="number" min={0} value={profile.years_breeding} onChange={e => set('years_breeding', Number(e.target.value))} className={inp} /></div>
          </div>
          <div><label className={lbl}>Happy Families / Kittens Placed</label><input type="number" min={0} value={profile.kittens_placed} onChange={e => set('kittens_placed', Number(e.target.value))} className={inp} /></div>
        </div>
        <div className="border-t border-white/5 pt-6 space-y-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Contact & Social</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Email</label><input type="email" value={profile.email || ''} onChange={e => set('email', e.target.value)} placeholder="hello@cattery.com" className={inp} /></div>
            <div><label className={lbl}>WhatsApp</label><input value={profile.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} placeholder="+1 555 000 0000" className={inp} /></div>
          </div>
          <div><label className={lbl}>Facebook Page URL</label><input value={profile.facebook_url || ''} onChange={e => set('facebook_url', e.target.value)} placeholder="https://facebook.com/yourpage" className={inp} /></div>
          <div><label className={lbl}>Instagram URL</label><input value={profile.instagram_url || ''} onChange={e => set('instagram_url', e.target.value)} placeholder="https://instagram.com/yourhandle" className={inp} /></div>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-gold text-navy px-8 py-3 rounded-xl font-medium hover:bg-gold-light transition disabled:opacity-70">
            {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : 'Save Changes'}
          </button>
          {saved && <div className="flex items-center gap-2 text-emerald-400 text-sm"><CheckCircle size={16} />Saved!</div>}
        </div>
      </div>
    </div>
  );
}
