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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Review Submitted!</h3>
            <p className="text-xs text-slate-400">
              Thank you for sharing your experience. Your verified review is now live on NorthStar Property Care.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Verified Homeowner Feedback</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Submit a Verified Review
            </h3>
            <p className="text-xs text-slate-400">
              Your honest feedback helps fellow homeowners choose the right property maintenance services.
            </p>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-400 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Service selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Service Received
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael R."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  City, State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Denver, CO"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Review & Details
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the technician's promptness, quality of work, and pricing transparency..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
              >
                Publish Review Live
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
