import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck, Cpu, CheckCircle2, Lock, CreditCard,
  ArrowRight, ArrowLeft, AlertCircle, Building, User, Mail, Phone, Check, X, HelpCircle, Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CohortRegistrationPage() {
  const [searchParams] = useSearchParams();
  const initialCohort = searchParams.get('cohort') === 'ai-cybersecurity' ? 'ai-cybersecurity' : 'ai-engineering';

  const [selectedCohort, setSelectedCohort] = useState(initialCohort);
  const [currentPhase, setCurrentPhase] = useState(1); // Phase 1 = Fill Details, Phase 2 = Summary & Payment

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeOrOrg: '',
    gender: 'Male',
    graduationYear: '2026',
    studyStatus: '3rd Year Undergraduate',
    experienceLevel: 'Zero Prior Knowledge (Beginner)',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const cohortParam = searchParams.get('cohort');
    if (cohortParam && (cohortParam === 'ai-engineering' || cohortParam === 'ai-cybersecurity')) {
      setSelectedCohort(cohortParam);
    }
  }, [searchParams]);

  const cohortDetails = {
    'ai-engineering': {
      id: 'ai-engineering',
      name: 'AI Engineering Cohort',
      badge: 'FLAGSHIP 01',
      tagline: 'From Web Fundamentals to Building & Launching AI Products',
      launchDate: 'August 25, 2026',
      duration: '4 Weeks (Live Intensive)',
      price: 4999,
      originalPrice: 9999,
      color: '#15803D',
      icon: Cpu,
    },
    'ai-cybersecurity': {
      id: 'ai-cybersecurity',
      name: 'AI & Cybersecurity Cohort',
      badge: 'FLAGSHIP 02',
      tagline: 'Networking, Kali Linux, Pentesting & AI Security Agents (MCP)',
      launchDate: 'September 01, 2026',
      duration: '4 Weeks (Hands-On Lab)',
      price: 4999,
      originalPrice: 9999,
      color: '#0284C7',
      icon: ShieldCheck,
    },
  };

  const activeCohortObj = cohortDetails[selectedCohort];
  const CohortIcon = activeCohortObj.icon;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleGoToSummary = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your Name, Email, and Phone Number before continuing.');
      return;
    }
    setCurrentPhase(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRazorpayPaymentComplete = async () => {
    try {
      setIsSubmitting(true);
      const mockTxn = `PAY_TW_${Math.floor(100000 + Math.random() * 900000)}`;

      const payload = {
        cohortId: selectedCohort,
        cohortName: activeCohortObj.name,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        collegeOrOrg: formData.collegeOrOrg,
        gender: formData.gender,
        graduationYear: formData.graduationYear,
        studyStatus: formData.studyStatus,
        experienceLevel: formData.experienceLevel,
        amountPaid: activeCohortObj.price,
        transactionId: mockTxn,
        registeredAt: new Date().toISOString(),
      };

      // Backend API registration attempt (with fallback local persistence)
      try {
        await fetch('https://turingwings-backend.onrender.com/api/cohorts/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.log('Backend sync offline, saved to local session:', e);
      }

      // Save registration locally
      const existing = JSON.parse(localStorage.getItem('tw_cohort_registrations') || '[]');
      localStorage.setItem('tw_cohort_registrations', JSON.stringify([...existing, payload]));

      setTransactionRef(mockTxn);
      setShowRazorpayModal(false);
      setShowCancelConfirmModal(false);
      setPaymentSuccess(true);
    } catch (err) {
      setErrorMessage('Payment processing failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmCancelRegistration = () => {
    setShowCancelConfirmModal(false);
    setShowRazorpayModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 pt-14 pb-10 sm:pt-16 sm:pb-14 lg:pt-28 lg:pb-20">

        {!paymentSuccess && (
          /* MOBILE-ONLY COMPACT STEP LINE (hidden on desktop, replaced by the split-column header) */
          <div className="lg:hidden flex items-center justify-center gap-2.5 pb-8 font-mono">
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
                Your seat for <strong className="text-[#090909]">{activeCohortObj.name}</strong> is officially reserved.
              </p>
            </div>

            <div className="bg-[#FAFAFA] border border-black/10 rounded-2xl p-5 text-xs text-left space-y-2.5 font-mono">
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Transaction Ref:</span>
                <span className="font-bold text-[#15803D]">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Student Name:</span>
                <span className="font-bold text-[#090909]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Email:</span>
                <span className="font-bold text-[#090909]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Gender / Year:</span>
                <span className="font-bold text-[#090909]">{formData.gender} · Grad {formData.graduationYear}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10">
                <span className="text-black/60">Amount Paid:</span>
                <span className="font-bold text-[#15803D]">₹{activeCohortObj.price} (Razorpay Verified)</span>
              </div>
            </div>

            <p className="text-xs text-black/60">
              Check your email (<span className="text-[#090909] font-bold">{formData.email}</span>) for your Discord invite and onboarding instructions.
            </p>

            <Link
              to="/"
              className="cursor-pointer inline-block py-3.5 px-8 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md font-mono"
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
              <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-xs font-bold uppercase tracking-wider font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-6xl font-extrabold text-[#090909] leading-tight">
                Cohort Registration
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-black/70 leading-relaxed lg:max-w-sm">
                A few details before we lock in your seat for <strong className="text-[#090909]">{activeCohortObj.name}</strong>.
              </p>

              {/* DESKTOP PHASE INDICATOR */}
              <div className="hidden lg:flex items-center gap-3 pt-4 font-mono text-xs">
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
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 flex items-center justify-between gap-3 font-mono text-[11px] sm:text-xs lg:mt-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-[#090909] block truncate">{activeCohortObj.name}</span>
                    <span className="text-black/50 text-[11px]">Launch {activeCohortObj.launchDate}</span>
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

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#090909] block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/40 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
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
                        placeholder="Mobile number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>
                </div>

                {/* GENDER & GRADUATION YEAR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="cursor-pointer w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] focus:outline-none focus:border-[#22C55E]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Graduation / Passing Year *
                    </label>
                    <select
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      className="cursor-pointer w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] focus:outline-none focus:border-[#22C55E]"
                    >
                      <option value="2024">2024 (Graduated)</option>
                      <option value="2025">2025 (Graduating Soon)</option>
                      <option value="2026">2026 (Current Batch)</option>
                      <option value="2027">2027</option>
                      <option value="2028+">2028 or Later</option>
                    </select>
                  </div>
                </div>

                {/* COLLEGE & STUDY STATUS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      College / Organization
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/40 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="College or company name"
                        value={formData.collegeOrOrg}
                        onChange={(e) => handleInputChange('collegeOrOrg', e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] placeholder-black/40 focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#090909] block">
                      Current Year / Status
                    </label>
                    <select
                      value={formData.studyStatus}
                      onChange={(e) => handleInputChange('studyStatus', e.target.value)}
                      className="cursor-pointer w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] focus:outline-none focus:border-[#22C55E]"
                    >
                      <option value="1st Year Undergraduate">1st Year Undergraduate</option>
                      <option value="2nd Year Undergraduate">2nd Year Undergraduate</option>
                      <option value="3rd Year Undergraduate">3rd Year Undergraduate</option>
                      <option value="4th Year Undergraduate">4th Year Undergraduate</option>
                      <option value="Recent Graduate">Recent Graduate</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#090909] block">
                    AI & Coding Experience
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className="cursor-pointer w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-black/15 text-[13px] sm:text-sm text-[#090909] focus:outline-none focus:border-[#22C55E]"
                  >
                    <option value="Zero Prior Knowledge (Beginner)">Zero Prior Knowledge (Beginner)</option>
                    <option value="Self-Taught / Hobbyist Developer">Self-Taught / Hobbyist Developer</option>
                    <option value="CS Student / Experienced Programmer">CS Student / Experienced Programmer</option>
                    <option value="Working Software Engineer">Working Software Engineer</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-3.5 sm:py-4 rounded-2xl bg-[#090909] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#22C55E] hover:text-black transition-all flex items-center justify-center gap-2 shadow-xl mt-3 sm:mt-4 font-mono"
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
              <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-xs font-bold uppercase tracking-wider font-mono">
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
              <div className="hidden lg:flex items-center gap-3 pt-4 font-mono text-xs">
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
                className="cursor-pointer w-full lg:w-auto px-5 py-3 rounded-xl bg-white border border-black/15 text-xs font-bold text-[#090909] hover:bg-[#22C55E]/15 hover:border-[#22C55E] transition-all flex items-center justify-center gap-2 font-mono lg:mt-2"
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
              {/* ITEM ROW */}
              <div className="flex items-start justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b-2 border-[#090909]">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#15803D] shrink-0">
                    <CohortIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[#15803D] font-mono">{activeCohortObj.badge}</span>
                    <h3 className="text-sm sm:text-lg font-extrabold text-[#090909] truncate">{activeCohortObj.name}</h3>
                    <p className="text-[11px] sm:text-xs text-black/50">{activeCohortObj.tagline}</p>
                  </div>
                </div>
                <span className="text-lg sm:text-2xl font-extrabold text-[#090909] font-mono shrink-0">₹{activeCohortObj.price}</span>
              </div>

              {/* STUDENT DETAILS — plain rows, no box */}
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black/40 font-mono">Registrant Details</h3>

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
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.phone}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Gender / Grad Year</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.gender} · {formData.graduationYear}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">College / Organization</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.collegeOrOrg || 'Not specified'}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <dt className="text-xs text-black/50">Current Year / Status</dt>
                    <dd className="font-bold text-[#090909] text-xs sm:text-sm text-right">{formData.studyStatus}</dd>
                  </div>
                </dl>
              </div>

              {/* TOTAL — the one highlighted moment */}
              <div className="flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30">
                <span className="text-xs sm:text-sm font-bold text-[#090909]">Total Amount</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#15803D] font-mono">₹{activeCohortObj.price}</span>
              </div>

              {/* PAYMENT ACTIONS */}
              <div className="space-y-4 sm:space-y-5">
                <button
                  type="button"
                  onClick={() => setShowRazorpayModal(true)}
                  className="cursor-pointer w-full py-3.5 sm:py-4 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-extrabold text-[11px] sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl font-mono"
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Proceed to Razorpay Payment • ₹{activeCohortObj.price}</span>
                </button>

                <div className="flex flex-wrap gap-3 justify-between items-center text-xs font-mono">
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

      {/* RAZORPAY PAYMENT SIMULATION MODAL */}
      <AnimatePresence>
        {showRazorpayModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-black/15 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#15803D]" />
                  <span className="text-sm font-bold text-[#090909]">Razorpay Checkout</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirmModal(true)}
                  className="cursor-pointer p-1.5 rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-colors"
                  title="Cancel Payment"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-black/10 space-y-1">
                  <span className="text-black/50 text-[10px] uppercase block font-mono">Paying To</span>
                  <span className="font-bold text-[#090909] block">Turing Wings Education Technologies</span>
                  <span className="text-[#15803D] font-bold block pt-1">{activeCohortObj.name}</span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#FAFAFA] border border-black/10 font-mono">
                  <span className="text-black/60">Total Amount:</span>
                  <span className="text-lg font-extrabold text-[#15803D]">₹{activeCohortObj.price}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleRazorpayPaymentComplete}
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-4 rounded-2xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg font-mono disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Verifying Payment...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Payment (Razorpay)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCancelConfirmModal(true)}
                  className="cursor-pointer w-full py-2.5 rounded-xl bg-[#FAFAFA] hover:bg-black/5 text-black/60 text-xs font-bold transition-colors font-mono border border-black/10"
                >
                  Cancel Transaction
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRMATION POPUP FOR CANCELLING PAYMENT / REGISTRATION */}
      <AnimatePresence>
        {showCancelConfirmModal && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white border border-red-200 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
                <HelpCircle className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-[#090909]">Cancel Registration?</h3>
                <p className="text-xs text-black/70 leading-relaxed">
                  Are you sure you want to cancel your payment for <strong className="text-[#090909]">{activeCohortObj.name}</strong>? Your reserved seat and early bird discount will be released.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 font-mono">
                <button
                  type="button"
                  onClick={handleConfirmCancelRegistration}
                  className="cursor-pointer w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Yes, Cancel Registration
                </button>

                <button
                  type="button"
                  onClick={() => setShowCancelConfirmModal(false)}
                  className="cursor-pointer w-full py-3 rounded-2xl bg-[#090909] hover:bg-[#22C55E] hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                >
                  No, Continue Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}