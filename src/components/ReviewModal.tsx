'use client';

import React, { useState } from 'react';
import { X, Star, CheckCircle, Sparkles } from 'lucide-react';
import { SERVICES } from '@/data/services';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: {
    author: string;
    rating: number;
    date: string;
    location: string;
    serviceId: string;
    comment: string;
  }) => void;
  preselectedServiceId?: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onAddReview,
  preselectedServiceId
}: ReviewModalProps) {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'house-deep-cleaning');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    onAddReview({
      author: author.trim(),
      location: location.trim() || 'Verified US Customer',
      serviceId,
      rating,
      date: 'Just now',
      comment: comment.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white/95 backdrop-blur-2xl border border-amber-200/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl shadow-amber-500/10 relative text-stone-800">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 p-1.5 rounded-xl hover:bg-amber-100/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Review Submitted!</h3>
            <p className="text-xs text-stone-500">
              Thank you for sharing your experience. Your verified review is now live on NorthStar Property Care.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Verified Homeowner Feedback</span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
              Share Your Experience
            </h3>
            <p className="text-xs text-stone-500">
              Your honest feedback helps fellow property owners select the best maintenance services.
            </p>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Overall Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-115 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-500 drop-shadow-sm'
                          : 'text-stone-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-bold text-amber-700">
                  {hoverRating || rating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Service Received
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} (from ${s.startingPrice})
                  </option>
                ))}
              </select>
            </div>

            {/* Name & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City & State / ZIP
                </label>
                <input
                  type="text"
                  placeholder="e.g. Denver, CO"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe technician professionalism, quality of work, and pricing transparency..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/30 transition-all hover:-translate-y-0.5"
              >
                Post Verified Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
