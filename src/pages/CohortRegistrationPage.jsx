import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck, Cpu, CheckCircle2, Lock, CreditCard,
  ArrowRight, ArrowLeft, AlertCircle, Building, User, Mail, Phone, Check, X, HelpCircle, Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useRazorpay from '../hooks/useRazorpay';
import { cohortService } from '../services/cohort';
import { paymentService } from '../services/payment';

const FONT_STACK =
  "'Product Sans', 'Google Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ─────────────────────────────────────────────────────────────────────────
   SECURE CHECKOUT LOADER — concentric pulse rings around a lock, ties into
   the SSL / encrypted-checkout theme of this page. Distinct from the
   cube-fold loader used elsewhere. Pure CSS, responsive via clamp().
   ───────────────────────────────────────────────────────────────────────── */
function SecureCheckoutLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-7 py-16 sm:py-24 px-6">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 'clamp(88px, 24vw, 128px)',
          height: 'clamp(88px, 24vw, 128px)',
        }}
      >
        <span className="scl-ring scl-ring-1" />
        <span className="scl-ring scl-ring-2" />
        <span className="scl-ring scl-ring-3" />

        <div className="scl-core" style={{ backgroundColor: '#090909' }}>
          <Lock className="scl-lock" style={{ color: '#ffffff' }} strokeWidth={2} />
        </div>
      </div>

      <div className="text-center space-y-1.5 max-w-xs px-2">
        <p
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
          style={{ color: '#090909' }}
        >
          Preparing Secure Registration
        </p>
        <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'rgba(9,9,9,0.45)' }}>
          Establishing an encrypted connection to your cohort…
        </p>
      </div>

      <style>{`
        .scl-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1.5px solid #22C55E;
          opacity: 0;
          animation: sclRing 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .scl-ring-2 { animation-delay: 0.65s; }
        .scl-ring-3 { animation-delay: 1.3s; }

        @keyframes sclRing {
          0%   { transform: scale(0.55); opacity: 0.85; }
          75%  { opacity: 0; }
          100% { transform: scale(1.18); opacity: 0; }
        }

        .scl-core {
          position: relative;
          z-index: 2;
          width: 40%;
          height: 40%;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 26px rgba(9, 9, 9, 0.28);
          animation: sclPulse 2.4s ease-in-out infinite;
        }
        @keyframes sclPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.09); }
        }

        .scl-lock {
          width: 42%;
          height: 42%;
        }

        @media (prefers-reduced-motion: reduce) {
          .scl-ring, .scl-core {
            animation: none !important;
          }
          .scl-ring { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}

export default function CohortRegistrationPage() {
  const [searchParams] = useSearchParams();
  const slugParam = searchParams.get('cohort');

  const [cohort, setCohort] = useState(null);
  const [cohortLoadingState, setCohortLoadingState] = useState('loading'); // 'loading' | 'ready' | 'not_found' | 'inactive' | 'error'
  const [currentPhase, setCurrentPhase] = useState(1); // Phase 1 = Fill Details, Phase 2 = Summary & Payment

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    collegeName: '',
    stream: '',
    branch: '',
    currentYear: '1st Year',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const isRazorpayLoaded = useRazorpay();

  useEffect(() => {
    async function fetchCohort() {
      if (!slugParam) {
        setCohortLoadingState('not_found');
        return;
      }
      try {
        setCohortLoadingState('loading');
        const result = await cohortService.getCohortBySlug(slugParam);
        if (result.success && result.data) {
          const fetchedCohort = result.data;
          setCohort(fetchedCohort);
          if (fetchedCohort.status && fetchedCohort.status.toUpperCase() === 'ACTIVE') {
            setCohortLoadingState('ready');
          } else {
            setCohortLoadingState('inactive');
          }
        } else {
          setCohortLoadingState('not_found');
        }
      } catch (err) {
        console.error('Error loading cohort:', err);
        if (err.status === 404) {
          setCohortLoadingState('not_found');
        } else {
          setCohortLoadingState('error');
          setErrorMessage(err.message || 'System error. Please try again later.');
        }
      }
    }
    fetchCohort();
  }, [slugParam]);

  const cohortMetadata = {
    'webdevxai': {
      badge: 'FLAGSHIP 01',
      tagline: 'From Web Fundamentals to Building & Launching AI Products',
      launchDate: 'August 25, 2026',
      duration: '4 Weeks (Live Intensive)',
      color: '#22C55E',
      icon: Cpu,
    },
    'cyberxai': {
      badge: 'FLAGSHIP 02',
      tagline: 'Networking, Kali Linux, Pentesting & AI Security Agents (MCP)',
      launchDate: 'September 01, 2026',
      duration: '4 Weeks (Hands-On Lab)',
      color: '#0284C7',
      icon: ShieldCheck,
    },
  };

  const activeCohortMeta = cohortMetadata[slugParam] || {
    badge: 'NEW COHORT',
    tagline: cohort?.description || 'Build state-of-the-art applications',
    launchDate: cohort ? new Date(cohort.created_at).toLocaleDateString() : 'Coming Soon',
    duration: '4 Weeks',
    color: '#22C55E',
    icon: Cpu,
  };

  const CohortIcon = activeCohortMeta.icon;
  const isCohortInactive = cohortLoadingState === 'inactive';

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    const trimmedName = formData.fullName.trim();
    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return 'Full Name must be between 3 and 100 characters.';
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      return 'Full Name must contain only letters and spaces.';
    }

    const trimmedEmail = formData.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }

    const trimmedMobile = formData.mobileNumber.trim();
    if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      return 'Please enter a valid 10-digit Indian mobile number.';
    }

    const trimmedCollege = formData.collegeName.trim();
    if (trimmedCollege.length < 3 || trimmedCollege.length > 150) {
      return 'College Name must be between 3 and 150 characters.';
    }

    const trimmedStream = formData.stream.trim();
    if (!trimmedStream) {
      return 'Stream is required.';
    }
    if (trimmedStream.length > 50) {
      return 'Stream must be less than 50 characters.';
    }

    const trimmedBranch = formData.branch.trim();
    if (trimmedBranch && trimmedBranch.length > 50) {
      return 'Branch must be less than 50 characters.';
    }

    const validYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Alumni"];
    if (!validYears.includes(formData.currentYear)) {
      return 'Please select a valid year / status.';
    }

    return null;
  };

  const handleGoToSummary = (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    }
    setCurrentPhase(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const verifyPaymentOnBackend = async (razorpayResponse) => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const payload = {
        fullName: formData.fullName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        collegeName: formData.collegeName.trim(),
        stream: formData.stream.trim(),
        branch: formData.branch.trim() || undefined,
        currentYear: formData.currentYear,
        cohortId: cohort.id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
      };

      const verificationResponse = await paymentService.verifyPayment(payload);
      if (verificationResponse.success && verificationResponse.data) {
        setSuccessData(verificationResponse.data);
        setPaymentSuccess(true);
      } else {
        throw new Error(verificationResponse.message || 'Payment verification failed.');
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      const paymentId = razorpayResponse.razorpay_payment_id;
      setErrorMessage(
        err.message ||
        `Payment verification failed. If your account was debited, please contact manual support with Payment ID: ${paymentId}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!isRazorpayLoaded) {
      setErrorMessage('Razorpay SDK is still loading. Please wait or refresh the page.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const orderResponse = await paymentService.createOrder(cohort.id);
      if (!orderResponse.success || !orderResponse.data) {
        throw new Error(orderResponse.message || 'Failed to create order on server.');
      }

      const orderData = orderResponse.data;

      const options = {
        key: orderData.razorpayKey,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Turing Wings',
        description: `${cohort.title} Registration`,
        prefill: {
          name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          contact: formData.mobileNumber.trim()
        },
        handler: async function (response) {
          await verifyPaymentOnBackend(response);
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            setErrorMessage('Payment process cancelled by the user.');
          }
        },
        theme: {
          color: activeCohortMeta.color || '#22C55E'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        setIsSubmitting(false);
        setErrorMessage(resp.error.description || 'Payment failed. Please try again.');
      });
      rzp.open();
    } catch (err) {
      console.error('Error initiating Razorpay checkout:', err);
      setErrorMessage(err.message || 'System error. Please try again later.');
      setIsSubmitting(false);
    }
  };

  if (cohortLoadingState === 'loading') {
    return (
      <div
        className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black flex flex-col relative"
        style={{ fontFamily: FONT_STACK }}
      >
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <SecureCheckoutLoader />
        </main>
        <Footer />
      </div>
    );
  }

  if (cohortLoadingState === 'not_found') {
    return (
      <div
        className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black flex flex-col relative"
        style={{ fontFamily: FONT_STACK }}
      >
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-red-200 rounded-3xl p-8 text-center space-y-5 max-w-md shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-[#090909]">Cohort Not Found</h3>
              <p className="text-xs text-black/70 leading-relaxed">
                The cohort you are trying to register for does not exist or has been removed.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/cohorts"
                className="cursor-pointer inline-block w-full py-3 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                Back to Cohorts
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cohortLoadingState === 'error') {
    return (
      <div
        className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black flex flex-col relative"
        style={{ fontFamily: FONT_STACK }}
      >
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-red-200 rounded-3xl p-8 text-center space-y-5 max-w-md shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-[#090909]">System Error</h3>
              <p className="text-xs text-black/70 leading-relaxed">
                {errorMessage || 'System error. Please try again later.'}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => window.location.reload()}
                className="cursor-pointer inline-block w-full py-3 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                Reload Page
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black flex flex-col"
      style={{ fontFamily: FONT_STACK }}
    >
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 pt-14 pb-10 sm:pt-16 sm:pb-14 lg:pt-28 lg:pb-20">

        {!paymentSuccess && (
          /* MOBILE-ONLY COMPACT STEP LINE (hidden on desktop, replaced by the split-column header) */
          <div className="lg:hidden flex items-center justify-center gap-2.5 pb-8">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-[10px] font-bold uppercase tracking-wider">
              <Lock className="w-3 h-3" />
              SSL Secured
            </span>
            <span className="text-black/20">•</span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-black/60">
              <span className={`w-1.5 h-1.5 rounded-full ${currentPhase >= 1 ? 'bg-[#090909]' : 'bg-black/20'}`} />
              <span className={`w-1.5 h-1.5 rounded-full ${currentPhase >= 2 ? 'bg-[#090909]' : 'bg-black/20'}`} />
              Step {currentPhase} of 2
            </span>
          </div>
        )}

        {paymentSuccess ? (
          /* PAYMENT SUCCESS CONFIRMATION RECEIPT */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-[#22C55E] rounded-3xl p-6 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 border border-[#22C55E] flex items-center justify-center text-[#15803D] mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090909]">Welcome to Turing Wings!</h2>
              <p className="text-sm text-black/70">
                Your seat for <strong className="text-[#090909]">{cohort?.title}</strong> is officially reserved.
              </p>
            </div>

            <div className="bg-[#FAFAFA] border border-black/10 rounded-2xl p-5 text-xs text-left space-y-2.5">
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Payment ID:</span>
                <span className="font-bold text-[#15803D]">{successData?.paymentId || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Registration ID:</span>
                <span className="font-bold text-black/80">{successData?.registrationId || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Student ID:</span>
                <span className="font-bold text-black/80">{successData?.studentId || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Student Name:</span>
                <span className="font-bold text-[#090909]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Email:</span>
                <span className="font-bold text-[#090909]">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Mobile Number:</span>
                <span className="font-bold text-[#090909]">{formData.mobileNumber}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">College & Branch:</span>
                <span className="font-bold text-[#090909]">{formData.collegeName} {formData.branch ? `(${formData.branch})` : ''}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10">
                <span className="text-black/60">Amount Paid:</span>
                <span className="font-bold text-[#15803D]">₹{cohort?.price} (Razorpay Verified)</span>
              </div>
            </div>

            {successData?.invoiceUrl && (
              <div className="pt-2">
                <a
                  href={successData.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl border border-[#22C55E] text-[#15803D] bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
                >
                  <span>Download / View Invoice ↗</span>
                </a>
              </div>
            )}

            <p className="text-xs text-black/60">
              Check your email (<span className="text-[#090909] font-bold">{formData.email}</span>) for your Discord invite and onboarding instructions.
            </p>

            <Link
              to="/"
              className="cursor-pointer inline-block py-3.5 px-8 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Return to Homepage
            </Link>
          </motion.div>

        ) : currentPhase === 1 ? (

          /* PHASE 1 — LEFT: HEADING + PROGRESS, RIGHT: FORM (stacks on mobile) */
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-28">

            {/* LEFT COLUMN — INTRO */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-8 lg:space-y-10 mb-10 lg:mb-0"
            >
              <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-6xl font-extrabold text-[#090909] leading-tight">
                Cohort Registration
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-black/70 leading-relaxed lg:max-w-sm">
                A few details before we lock in your seat for <strong className="text-[#090909]">{cohort?.title}</strong>.
              </p>

              {/* DESKTOP PHASE INDICATOR */}
              <div className="hidden lg:flex items-center gap-3 pt-4 text-xs">
                <button
                  onClick={() => setCurrentPhase(1)}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    currentPhase === 1
                      ? 'bg-[#090909] text-white font-bold border-[#090909] shadow-md'
                      : 'bg-[#22C55E]/15 border-[#22C55E]/40 text-[#15803D] hover:bg-[#22C55E]/25'
                  }`}
                >
                  <span>1. Student Details</span>
                </button>
                <span className="text-black/30 font-bold">→</span>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-black/5 border-black/10 text-black/40">
                  <span>2. Summary & Payment</span>
                </div>
              </div>

              {/* ENROLLING COHORT STRIP */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 flex items-center justify-between gap-3 text-[11px] sm:text-xs lg:mt-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-[#090909] block truncate">{cohort?.title}</span>
                    <span className="text-black/50 text-[11px]">Launch {activeCohortMeta.launchDate}</span>
                  </div>
                </div>
                <Link to="/cohorts" className="cursor-pointer text-[11px] font-bold text-[#15803D] hover:underline shrink-0">
                  Change ↗
                </Link>
              </div>
            </motion.div>

            {/* RIGHT COLUMN — FORM */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 lg:pt-2"
            >
              <form onSubmit={handleGoToSummary} className="space-y-4 sm:space-y-6 lg:space-y-7">

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {isCohortInactive && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Registrations are closed for this cohort.</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#090909] block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/40 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      disabled={isCohortInactive}
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/40 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        disabled={isCohortInactive}
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/40 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        disabled={isCohortInactive}
                        placeholder="Mobile number"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      College Name *
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/40 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        disabled={isCohortInactive}
                        placeholder="College name"
                        value={formData.collegeName}
                        onChange={(e) => handleInputChange('collegeName', e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Stream (e.g. B.Tech, B.Sc) *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isCohortInactive}
                      placeholder="Degree stream"
                      value={formData.stream}
                      onChange={(e) => handleInputChange('stream', e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Branch (Optional, e.g. CSE, ECE)
                    </label>
                    <input
                      type="text"
                      disabled={isCohortInactive}
                      placeholder="Specialization branch"
                      value={formData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Current Year *
                    </label>
                    <select
                      value={formData.currentYear}
                      disabled={isCohortInactive}
                      onChange={(e) => handleInputChange('currentYear', e.target.value)}
                      className="cursor-pointer w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] focus:outline-none focus:border-[#22C55E]"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="Alumni">Alumni</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCohortInactive}
                  className="cursor-pointer w-full py-3.5 sm:py-4 rounded-2xl bg-[#090909] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#22C55E] hover:text-black transition-all flex items-center justify-center gap-2 shadow-xl mt-3 sm:mt-4 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>Continue to Registration Summary</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>

        ) : (

          /* PHASE 2 — LEFT: HEADING, RIGHT: SUMMARY (no card, invoice-style, stacks on mobile) */
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-28">

            {/* LEFT COLUMN — HEADING + EDIT */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-8 lg:space-y-10 mb-10 lg:mb-0"
            >
              <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-6xl font-extrabold text-[#090909] leading-tight">
                Review Your Registration
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-black/70 leading-relaxed lg:max-w-sm">
                Double-check everything below, then complete payment to secure your spot.
              </p>

              {/* DESKTOP PHASE INDICATOR */}
              <div className="hidden lg:flex items-center gap-3 pt-4 text-xs">
                <button
                  onClick={() => setCurrentPhase(1)}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border bg-[#22C55E]/15 border-[#22C55E]/40 text-[#15803D] hover:bg-[#22C55E]/25 transition-all"
                >
                  <span>1. Student Details</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
                <span className="text-black/30 font-bold">→</span>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-[#090909] text-white font-bold border-[#090909] shadow-md">
                  <span>2. Summary & Payment</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPhase(1)}
                className="cursor-pointer w-full lg:w-auto px-5 py-3 rounded-xl bg-white border border-black/15 text-xs font-bold text-[#090909] hover:bg-[#22C55E]/15 hover:border-[#22C55E] transition-all flex items-center justify-center gap-2 lg:mt-2"
              >
                <Edit3 className="w-4 h-4 text-[#15803D]" />
                <span>Edit Details</span>
              </button>
            </motion.div>

            {/* RIGHT COLUMN — SUMMARY (no container, invoice-style) */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 lg:pt-2 space-y-7 sm:space-y-9 lg:space-y-10"
            >
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ITEM ROW */}
              <div className="flex items-start justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b-2 border-[#090909]">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#15803D] shrink-0">
                    <CohortIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[#15803D]">{activeCohortMeta.badge}</span>
                    <h3 className="text-sm sm:text-lg font-extrabold text-[#090909] truncate">{cohort?.title}</h3>
                    <p className="text-[11px] sm:text-xs text-black/50">{activeCohortMeta.tagline}</p>
                  </div>
                </div>
                <span className="text-lg sm:text-2xl font-extrabold text-[#090909] shrink-0">₹{cohort?.price}</span>
              </div>

              {/* STUDENT DETAILS — plain rows, no box */}
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black/40">Registrant Details</h3>

                <dl className="divide-y divide-black/10">
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Full Name</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.fullName}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Email Address</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right break-all">{formData.email}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Phone Number</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.mobileNumber}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">College Name</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.collegeName}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Stream / Branch</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.stream} {formData.branch ? `· ${formData.branch}` : ''}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Current Year</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.currentYear}</dd>
                  </div>
                </dl>
              </div>

              {/* TOTAL — the one highlighted moment */}
              <div className="flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30">
                <span className="text-xs sm:text-sm font-bold text-[#090909]">Total Amount</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#15803D]">₹{cohort?.price}</span>
              </div>

              {/* PAYMENT ACTIONS */}
              <div className="space-y-4 sm:space-y-5">
                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-3.5 sm:py-4 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-extrabold text-[11px] sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl disabled:cursor-not-allowed disabled:opacity-90 relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <span className="pcl-spinner" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Proceed to Razorpay Payment • ₹{cohort?.price}</span>
                    </>
                  )}
                </button>

                <div className="flex flex-wrap gap-3 justify-between items-center text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(1)}
                    className="cursor-pointer text-black/60 hover:text-[#090909] font-bold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Edit Student Details</span>
                  </button>

                  <span className="text-black/40 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>SSL Encrypted</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </main>

      <Footer />

      <style>{`
        .pcl-spinner {
          width: 15px;
          height: 15px;
          border-radius: 9999px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          animation: pclSpin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes pclSpin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcl-spinner { animation: none; }
        }
      `}</style>
    </div>
  );
}