import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { AdminStats } from '@/types';
import { Cat, CheckCircle, Clock, Mail, AlertCircle, Star, Images } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

async function getStats(): Promise<{ stats: AdminStats; recentInquiries: Record<string,string>[] }> {
  const [kittensRes, inquiriesRes, reviewsRes, galleryRes] = await Promise.all([
    supabaseAdmin.from('kittens').select('status'),
    supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('reviews').select('is_approved'),
    supabaseAdmin.from('gallery').select('id'),
  ]);
  const kittens = kittensRes.data || [];
  const allInq = await supabaseAdmin.from('inquiries').select('id,is_read');
  const allI = allInq.data || [];
  return {
    stats: {
      totalKittens: kittens.length,
      availableCount: kittens.filter(k => k.status === 'available').length,
      reservedCount: kittens.filter(k => k.status === 'reserved').length,
      totalInquiries: allI.length,
      unreadInquiries: allI.filter(i => !i.is_read).length,
      pendingReviews: (reviewsRes.data || []).filter(r => !r.is_approved).length,
      totalGallery: (galleryRes.data || []).length,
    },
    recentInquiries: inquiriesRes.data || [],
  };
}

export default async function AdminDashboard() {
  const { stats, recentInquiries } = await getStats();
  const cards = [
    { label: 'Total Kittens', value: stats.totalKittens, icon: Cat, color: 'text-gold bg-gold/10' },
    { label: 'Available', value: stats.availableCount, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-400/10' },
    { label: 'Reserved', value: stats.reservedCount, icon: Clock, color: 'text-amber-400 bg-amber-400/10' },
    { label: 'Inquiries', value: stats.totalInquiries, icon: Mail, color: 'text-blue-400 bg-blue-400/10' },
    { label: 'Unread', value: stats.unreadInquiries, icon: AlertCircle, color: 'text-red-400 bg-red-400/10' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: Star, color: 'text-purple-400 bg-purple-400/10' },
    { label: 'Gallery Photos', value: stats.totalGallery, icon: Images, color: 'text-pink-400 bg-pink-400/10' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass rounded-2xl border border-white/5 p-5">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${color}`}><Icon size={18} /></div>
            <p className="text-2xl font-semibold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold text-white">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-gold text-sm hover:underline">View all →</a>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-sm">No inquiries yet.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {recentInquiries.map((inq: Record<string,string>) => (
              <div key={inq.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {!inq.is_read && <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />}
                  <div>
                    <p className="font-medium text-white text-sm">{inq.full_name}</p>
                    <p className="text-xs text-gray-500">{inq.country} · {inq.interest}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex-shrink-0">{inq.created_at ? formatDistanceToNow(new Date(inq.created_at), { addSuffix: true }) : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
