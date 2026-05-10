import React from 'react';
import Image from 'next/image';
import { Kitten } from '@/types';

interface Props {
  kitten: Kitten;
  onClick: () => void;
  onInquire: (name: string) => void;
}

export default function KittenCard({ kitten, onClick, onInquire }: Props) {
  const statusColors = {
    available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    reserved: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sold: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <div
      onClick={onClick}
      className="group glass rounded-2xl overflow-hidden cursor-pointer hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10"
    >
      <div className="relative h-56 overflow-hidden">
        {kitten.image_url ? (
          <Image src={kitten.image_url} alt={kitten.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
        ) : (
          <div className="w-full h-full bg-navy-mid flex items-center justify-center text-6xl">🐱</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        <span className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full border capitalize ${statusColors[kitten.status]}`}>
          {kitten.status}
        </span>
        {kitten.is_featured && (
          <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30">
            ✦ Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-white mb-1">{kitten.name}</h3>
        <p className="text-gray-400 text-sm mb-3 capitalize">{kitten.color}{kitten.pattern ? ` · ${kitten.pattern}` : ''} · {kitten.gender} · {kitten.age_weeks}w</p>
        <div className="flex items-center justify-between">
          <span className="text-gold font-semibold text-lg">${kitten.price_usd.toLocaleString()}</span>
          <button
            onClick={e => { e.stopPropagation(); onInquire(kitten.name); }}
            disabled={kitten.status === 'sold'}
            className="text-xs bg-gold/10 text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold hover:text-navy transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {kitten.status === 'sold' ? 'Sold' : 'Inquire'}
          </button>
        </div>
      </div>
    </div>
  );
}
