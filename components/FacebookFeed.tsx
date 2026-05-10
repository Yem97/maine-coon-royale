"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Facebook, Heart, ExternalLink } from 'lucide-react';
import { FacebookPost } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export default function FacebookFeed() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/facebook').then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <section id="facebook" className="py-24 bg-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs px-4 py-2 rounded-full mb-4 tracking-widest uppercase">✦ Latest Updates</div>
          <h2 className="font-display text-5xl font-semibold text-white mb-4">From Our Family</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Follow our journey — new litters, kitten milestones, and happy family updates.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="glass rounded-2xl h-64 animate-pulse border border-white/5" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 glass rounded-2xl border border-gold/10 max-w-md mx-auto p-10">
            <Facebook size={40} className="text-gold mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Facebook updates coming soon!</p>
            <p className="text-gray-500 text-xs mt-2">Connect your Facebook page from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all group">
                {post.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.image_url} alt="Facebook post" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Facebook size={14} className="text-blue-400" />
                    <span className="text-xs text-gray-500">{post.posted_at ? formatDistanceToNow(new Date(post.posted_at), { addSuffix: true }) : ''}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Heart size={12} className="text-red-400" /> {post.likes || 0} likes</span>
                    {post.post_url && (
                      <a href={post.post_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gold hover:underline">
                        View on Facebook <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
