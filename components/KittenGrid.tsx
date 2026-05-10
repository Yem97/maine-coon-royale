"use client"
import React, { useState } from 'react';
import { Kitten } from '@/types';
import KittenCard from './KittenCard';
import KittenModal from './KittenModal';

const FILTERS = ['All', 'Available', 'Reserved', 'Male', 'Female'];

export default function KittenGrid({ kittens }: { kittens: Kitten[] }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Kitten | null>(null);

  const filtered = kittens.filter(k => {
    if (filter === 'All') return true;
    if (filter === 'Available') return k.status === 'available';
    if (filter === 'Reserved') return k.status === 'reserved';
    if (filter === 'Male') return k.gender === 'male';
    if (filter === 'Female') return k.gender === 'female';
    return true;
  });

  const handleInquire = (name: string) => {
    setSelected(null);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      const el = document.getElementById('kitten_field') as HTMLInputElement;
      if (el) el.value = name;
    }, 300);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-light border transition-all ${
              filter === f ? 'bg-gold text-navy border-gold font-medium' : 'glass text-gray-400 border-white/10 hover:border-gold/40 hover:text-gold'
            }`}>
            {f}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🐱</p>
          <p className="text-gray-400">No kittens found. Join the waiting list below.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(k => (
            <KittenCard key={k.id} kitten={k} onClick={() => setSelected(k)} onInquire={handleInquire} />
          ))}
        </div>
      )}
      {selected && <KittenModal kitten={selected} onClose={() => setSelected(null)} onInquire={handleInquire} />}
    </>
  );
}
