"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types';
import { Plus, Trash2, Loader2, Upload } from 'lucide-react';

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetch_ = async () => { setLoading(true); const r = await fetch('/api/gallery'); const d = await r.json(); setPhotos(d.photos||[]); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'gallery-images');
    const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
    const { url } = await uploadRes.json();
    if (url) await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image_url: url, title }) });
    setTitle(''); fetch_(); setUploading(false);
  };

  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl font-semibold text-white">Gallery</h1><p className="text-gray-500 mt-1">Upload photos to your public gallery.</p></div>
      <div className="glass rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="text-white font-medium mb-4">Upload New Photo</h2>
        <div className="flex gap-3 flex-wrap">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Photo title (optional)" className="flex-1 min-w-48 px-4 py-2.5 rounded-xl bg-navy border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 bg-gold text-navy px-5 py-2.5 rounded-xl font-medium hover:bg-gold-light transition disabled:opacity-70">
            {uploading ? <><Loader2 size={16} className="animate-spin" />Uploading...</> : <><Upload size={16} /><Plus size={14} />Upload Photo</>}
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} />
        </div>
      </div>
      {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : photos.length === 0 ? (
        <div className="glass rounded-2xl border border-white/5 p-16 text-center"><p className="text-5xl mb-4">📷</p><p className="text-gray-400">No photos yet. Upload your first one!</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-white/5 hover:border-gold/20 transition">
              <Image src={photo.image_url} alt={photo.title||'Gallery photo'} width={300} height={300} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all flex items-center justify-center">
                <button onClick={async () => { if (!confirm('Delete this photo?')) return; await fetch(`/api/gallery/${photo.id}`, { method: 'DELETE' }); fetch_(); }}
                  className="opacity-0 group-hover:opacity-100 transition p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
              {photo.title && <div className="absolute bottom-0 left-0 right-0 bg-navy/80 px-3 py-2 text-xs text-white truncate">{photo.title}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
