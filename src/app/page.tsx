'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Sparkles, MessageSquare, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UserDashboard() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ response: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;

    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, review }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setReview('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
      </div>

      <div className="z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 mb-4">
                  <MessageSquare className="w-6 h-6 text-indigo-400" />
                </div>
                <h1 className="text-2xl font-bold mb-2">We value your feedback</h1>
                <p className="text-slate-400 text-sm">Tell us about your experience</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={cn(
                            "w-8 h-8 transition-colors duration-200",
                            (hoveredRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-600"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-400 h-5">
                    {hoveredRating === 1 && "Poor"}
                    {hoveredRating === 2 && "Fair"}
                    {hoveredRating === 3 && "Good"}
                    {hoveredRating === 4 && "Very Good"}
                    {hoveredRating === 5 && "Excellent!"}
                  </span>
                </div>

                <div className="space-y-2">
                  <label htmlFor="review" className="text-sm font-medium text-slate-300">
                    Your thoughts
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us what you liked or how we can improve..."
                    className="w-full glass-input rounded-xl p-3 text-sm placeholder:text-slate-500 text-slate-200 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !rating}
                  className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                <ThumbsUp className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                Thank You!
              </h2>
              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                <p className="text-slate-300 italic">"{result.response}"</p>
              </div>

              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Submit another review
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 text-slate-600 text-xs text-center">
        Powered by AI • <a href="/admin" className="hover:text-slate-400 transition-colors">Admin Login</a>
      </div>
    </div>
  );
}
