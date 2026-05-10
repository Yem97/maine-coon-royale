"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FacebookPost } from '@/types';
import { Plus, Trash2, Upload, Loader2, X, Facebook } from 'lucide-react';

export default function AdminFacebook() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ content: '', image_url: '', post_url: '', likes: 0 });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => { const r = await fetch('/api/facebook'); const d = await r.json(); setPosts(d.posts || []); };
  useEffect(() => { fetchPosts(); }, []);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'gallery-images');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await res.json();
    if (d.url) setForm(f => ({ ...f, image_url: d.url }));
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.content) return;
    await fetch('/api/facebook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowForm(false); setForm({ content: '', image_url: '', post_url: '', likes: 0 });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/facebook/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white">Facebook Posts</h1>
          <p className="text-gray-500 text-sm mt-1">Share updates that appear on your website.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-xl font-medium hover:bg-gold-light transition"><Plus size={18} /> Add Post</button>
      </div>
      {showForm && (
        <div className="glass rounded-2xl border border-gold/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2"><Facebook size={18} className="text-gold" />New Facebook Update</h3>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400 hover:text-white" /></button>
          </div>
          <textarea value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} rows={4} placeholder="What's new at the cattery? Share an update..." className="w-full px-4 py-3 rounded-xl bg-navy border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-gold placeholder-gray-600 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input value={form.post_url} onChange={e => setForm(f=>({...f,post_url:e.target.value}))} placeholder="Facebook post URL (optional)" className="px-3 py-2.5 rounded-xl bg-navy border border-white/10 text-white text-sm focus:outline-none focus:border-gold placeholder-gray-600" />
            <input type="number" value={form.likes} onChange={e => setForm(f=>({...f,likes:Number(e.target.value)}))} placeholder="Number of likes" className="px-3 py-2.5 rounded-xl bg-navy border border-white/10 text-white text-sm focus:outline-none focus:border-gold placeholder-gray-600" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            {form.image_url && <div className="w-16 h-16 rounded-xl overflow-hidden"><Image src={form.image_url} alt="" width={64} height={64} className="w-full h-full object-cover" /></div>}
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 text-sm glass border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 px-4 py-2 rounded-xl transition disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" />Uploading...</> : <><Upload size={14} />Add Photo</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={!form.content} className="bg-gold text-navy px-6 py-2.5 rounded-xl font-medium hover:bg-gold-light transition disabled:opacity-50">Post Update</button>
            <button onClick={() => setShowForm(false)} className="glass border border-white/10 text-gray-400 hover:text-white px-6 py-2.5 rounded-xl transition">Cancel</button>
          </div>
        </div>
      )}
      {posts.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl border border-gold/10"><Facebook size={48} className="mx-auto mb-4 text-gray-600" /><p className="text-gray-400">No posts yet. Share your first update!</p></div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => (
            <div key={p.id} className="glass rounded-2xl border border-gold/10 p-5 flex gap-4 hover:border-gold/20 transition">
              {p.image_url && <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden"><Image src={p.image_url} alt="" width={80} height={80} className="w-full h-full object-cover" /></div>}
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 text-sm leading-relaxed mb-2">{p.content}</p>
                <p className="text-gray-600 text-xs">❤️ {p.likes || 0} likes</p>
              </div>
              <button onClick={() => handleDelete(p.id!)} className="text-gray-600 hover:text-red-400 transition flex-shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
