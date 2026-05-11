"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Crown, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError('Invalid email or password.'); setLoading(false); return; }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)' }} />
      <div className="relative glass rounded-2xl border border-gold/20 p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <Crown size={32} className="text-gold mx-auto mb-3" />
          <h1 className="font-display text-3xl font-semibold text-white mb-1">Maine Coon Royale</h1>
          <p className="text-gray-500 text-sm">Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl bg-navy-mid border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-white placeholder-gray-600 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-navy-mid border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-white placeholder-gray-600 text-sm" />
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 bg-red-500/10 rounded-xl p-3 text-sm border border-red-500/20"><AlertCircle size={15} />{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full bg-gold text-navy py-3 rounded-xl font-medium hover:bg-gold-light transition flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 size={16} className="animate-spin" />Signing in...</> : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-600 mt-6">Authorized breeders only</p>
      </div>
    </div>
  );
}
