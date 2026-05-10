"use client"
import React, { useEffect, useState } from 'react';
import { Star, Loader2, CheckCircle } from 'lucide-react';
import { Review } from '@/types';

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}>
          <Star size={24} className={`transition-colors ${n <= (hover || value) ? 'fill-gold text-gold' : 'text-gray-600'}`} />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(d => { setReviews(d.reviews || []); setLoading(false); });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = {
      reviewer_name: (form.elements.namedItem('reviewer_name') as HTMLInputElement).value,
      reviewer_country: (form.elements.namedItem('reviewer_country') as HTMLInputElement).value,
      reviewer_email: (form.elements.namedItem('reviewer_email') as HTMLInputElement).value,
      kitten_name: (form.elements.namedItem('kitten_name') as HTMLInputElement).value,
      review_text: (form.elements.namedItem('review_text') as HTMLTextAreaElement).value,
      rating,
    };
    await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSubmitting(false);
    setSubmitted(true);
    setShowForm(false);
  }

  const inp = "w-full px-4 py-3 rounded-xl bg-navy-mid border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-white placeholder-gray-600 transition text-sm";

  return (
    <section id="reviews" className="py-20 bg-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">What Families Say</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Real experiences from families who welcomed a Maine Coon Royale kitten into their home.</p>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gold" size={32} /></div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No reviews yet — be the first to share your experience!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map(r => (
              <div key={r.id} className="glass rounded-2xl p-6 border border-gold/10 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(n => <Star key={n} size={14} className={n <= r.rating ? 'fill-gold text-gold' : 'text-gray-600'} />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-4">"{r.review_text}"</p>
                {r.admin_reply && (
                  <div className="bg-gold/5 border border-gold/20 rounded-xl p-3 mb-4">
                    <p className="text-xs text-gold font-medium mb-1">✦ Response from Maine Coon Royale</p>
                    <p className="text-xs text-gray-400">{r.admin_reply}</p>
                  </div>
                )}
                <div className="border-t border-white/5 pt-4">
                  <p className="font-medium text-white text-sm">{r.reviewer_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.reviewer_country}{r.kitten_name ? ` · Adopted ${r.kitten_name}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {submitted ? (
          <div className="text-center">
            <CheckCircle className="mx-auto mb-3 text-gold" size={36} />
            <p className="text-gray-400 text-sm">Thank you! Your review will appear after approval.</p>
          </div>
        ) : showForm ? (
          <div className="max-w-xl mx-auto glass rounded-2xl border border-gold/20 p-8">
            <h3 className="font-display text-2xl text-white mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Your Name *</label><input name="reviewer_name" required placeholder="Jane Smith" className={inp} /></div>
                <div><label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Country *</label><input name="reviewer_country" required placeholder="USA" className={inp} /></div>
              </div>
              <div><label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Email</label><input name="reviewer_email" type="email" placeholder="jane@email.com" className={inp} /></div>
              <div><label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Kitten Name (optional)</label><input name="kitten_name" placeholder="Which kitten did you adopt?" className={inp} /></div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Rating *</label>
                <StarPicker value={rating} onChange={setRating} />
              </div>
              <div><label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Your Review *</label><textarea name="review_text" required rows={4} placeholder="Tell others about your experience..." className={`${inp} resize-none`} /></div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="flex-1 bg-gold text-navy py-3 rounded-xl font-medium hover:bg-gold-light transition disabled:opacity-70 flex items-center justify-center gap-2">
                  {submitting ? <><Loader2 size={16} className="animate-spin" />Submitting...</> : 'Submit Review'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 glass border border-white/10 rounded-xl text-gray-400 hover:text-white transition">Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <button onClick={() => setShowForm(true)} className="glass border border-gold/30 text-gold px-8 py-3 rounded-full hover:bg-gold/10 transition font-medium">
              ✦ Leave a Review
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
