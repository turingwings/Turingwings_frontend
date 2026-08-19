import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { referralService } from '../services/referral';
import { markEmailCaptured } from '../utils/referralStorage';

export default function ReferralEmailModal({ isOpen, onClose, creatorCode }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const response = await referralService.captureEmail(cleanEmail, creatorCode);
      
      markEmailCaptured(cleanEmail);
      setSubmitted(true);
      setStatusMessage(response.message || 'Thank you for connecting with Turing Wings!');

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('[ReferralEmailModal] Error capturing email:', err);
      // Graceful fallback — don't break the user experience
      markEmailCaptured(cleanEmail);
      setSubmitted(true);
      setStatusMessage('Thank you for connecting with Turing Wings!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 selection:bg-[#22C55E] selection:text-black">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          className="relative w-full max-w-md bg-[#090909] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all touch-action-manipulation"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            /* SUCCESS STATE */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/40 text-[#22C55E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white">Welcome to Turing Wings</h3>
                <p className="text-xs text-white/70 leading-relaxed max-w-xs mx-auto">
                  {statusMessage}
                </p>
              </div>
            </div>
          ) : (
            /* EMAIL FORM */
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Turing Wings</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Stay Connected with Turing Wings
                </h2>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Enter your email to unlock cohort updates, event access, and early developer invites.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/80 block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-base sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E] transition-all min-h-[44px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full py-3.5 rounded-xl bg-[#22C55E] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#22C55E]/20 min-h-[44px] touch-action-manipulation"
                >
                  {loading ? (
                    <span>Connecting...</span>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-[11px] text-white/40 text-center">
                By continuing you agree to receive Turing Wings updates. You can unsubscribe at any time.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
