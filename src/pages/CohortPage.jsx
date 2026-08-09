import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFoundPage from './NotFoundPage';
import {
  Cpu, ShieldCheck, Clock, Layers, Terminal, Bug, Wifi, Code2, Search, AlertTriangle,
  Key, Radio, FileText, Calendar, Eye, X, Sparkles, Rocket, Server, Database, Globe,
  CheckCircle2, ArrowRight, ChevronDown, Lock, Zap, GitBranch, Timer, ClipboardList,
  TrendingUp, Music, CreditCard, Video, Box, Cloud, Award, Satellite, Compass, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cohortService } from '../services/cohort';
import { COHORTS_METADATA } from '../data/cohortMetadata';

export default function CohortPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Layout states for individual cohorts
  const [activeWeek, setActiveWeek] = useState(1);
  const [openClass, setOpenClass] = useState(0); // webdevxai
  const [openDay, setOpenDay] = useState(0); // cyberxai
  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    async function loadCohorts() {
      try {
        setLoading(true);
        const result = await cohortService.getActiveCohorts();
        if (result.success && Array.isArray(result.data)) {
          setCohorts(result.data);
        } else {
          throw new Error(result.message || 'Failed to load cohorts');
        }
      } catch (err) {
        console.error('Error fetching cohorts:', err);
        setError(err.message || 'System error. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadCohorts();
  }, []);

  // Reset inner page states when slug changes
  useEffect(() => {
    setActiveWeek(1);
    setOpenClass(0);
    setOpenDay(0);
    setActiveTool(null);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-sans flex flex-col relative">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 font-mono text-xs uppercase tracking-widest font-bold">
            <span className="inline-block animate-pulse">Loading Cohort Details...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-sans flex flex-col relative">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-red-200 rounded-3xl p-8 text-center space-y-5 max-w-md shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-[#090909]">System Error</h3>
              <p className="text-xs text-black/70 leading-relaxed font-mono">
                {error}
              </p>
            </div>
            <div className="pt-2 font-mono">
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

  const backendCohort = cohorts.find(c => c.slug === slug);

  // If backend cohort is not found, return 404 page
  if (!backendCohort) {
    return <NotFoundPage />;
  }

  const metadata = COHORTS_METADATA[slug];

  // Combine data — backend business variables are authoritative
  const cohort = {
    ...metadata,
    id: backendCohort.id,
    slug: backendCohort.slug,
    title: backendCohort.title,
    price: backendCohort.price,
    status: backendCohort.status || 'ACTIVE',
  };

  const isCohortActive = cohort.status && cohort.status.toUpperCase() === 'ACTIVE';

  // MOTION CONTAINER VARIANTS
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  // ─────────────────────────────────────────────────────────────────────────
  // FALLBACK GENERIC LAYOUT
  // ─────────────────────────────────────────────────────────────────────────
  if (!metadata) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-sans flex flex-col overflow-x-hidden">
        <Navbar />

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-32 w-[32rem] h-[32rem] rounded-full bg-[#22C55E]/10 blur-[110px]" />
        </div>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 pt-24 sm:pt-36 pb-12 space-y-10 sm:space-y-14">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-[12px] sm:text-xs font-bold font-mono">
                <Cpu className="w-3 h-3" />
                ACTIVE COHORT
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[12px] sm:text-xs font-bold font-mono">
                Tuition ₹{cohort.price}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {cohort.title}
            </h1>

            <p className="text-base sm:text-lg text-black/70 leading-relaxed font-medium max-w-2xl">
              {backendCohort.description || 'Welcome to the cohort! Detailed structure and curriculum configurations are being prepared for launch.'}
            </p>

            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-800 text-xs font-bold font-mono max-w-2xl">
              This cohort page content is not fully configured yet. You can still register to reserve your seat!
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to={isCohortActive ? `/cohorts/register?cohort=${cohort.slug}` : '#'}
                className={`py-3.5 px-8 rounded-2xl font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg font-mono transition-all ${
                  isCohortActive
                    ? 'bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black'
                    : 'bg-black/15 text-black/40 cursor-not-allowed'
                }`}
                onClick={(e) => !isCohortActive && e.preventDefault()}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{isCohortActive ? `Register Now • ₹${cohort.price}` : 'Registrations Closed'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/cohorts"
                className="py-3.5 px-5 rounded-2xl hover:bg-black/5 text-[#090909] font-bold text-xs text-center border border-black/15 transition-all font-mono"
              >
                Back to Cohorts list
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CYBERSECURITY COHORT LAYOUT (cyberxai)
  // ─────────────────────────────────────────────────────────────────────────
  if (slug === 'cyberxai') {
    const activeWeekObj = cohort.weeksData.find((w) => w.week === activeWeek);

    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#0284C7] selection:text-white font-sans flex flex-col overflow-x-hidden">
        <Navbar />

        {/* AMBIENT BACKGROUND FIELD */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#0284C7]/15 blur-[110px]"
            animate={{ x: [0, -35, 0], y: [0, 30, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 -left-40 w-[26rem] h-[26rem] rounded-full bg-[#090909]/[0.05] blur-[110px]"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 pt-28 sm:pt-36 pb-10 space-y-20">

          {/* HERO */}
          <motion.div initial="hidden" animate="show" variants={container} className="max-w-3xl space-y-7">
            <motion.div variants={item} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/30 text-[#0284C7] text-xs font-bold font-mono">
                <ShieldCheck className="w-4 h-4" />
                4-WEEK CYBERSECURITY COHORT
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#090909] text-white text-xs font-bold font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                {cohort.launchDateText}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold font-mono">
                Tuition ₹{cohort.price}
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              {cohort.title}
            </motion.h1>

            <motion.p variants={item} className="text-base sm:text-lg text-black/70 font-medium max-w-xl">
              {cohort.tagline}
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to={isCohortActive ? `/cohorts/register?cohort=${cohort.slug}` : '#'}
                className={`group py-3.5 px-7 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-lg font-mono ${
                  isCohortActive
                    ? 'bg-[#090909] text-white hover:bg-[#0284C7]'
                    : 'bg-black/15 text-black/40 cursor-not-allowed'
                }`}
                onClick={(e) => !isCohortActive && e.preventDefault()}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{isCohortActive ? `Join Security Ops • ₹${cohort.price}` : 'Registrations Closed'}</span>
                <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
              </Link>
              <a
                href="#security-schedule"
                className="py-3.5 px-5 rounded-2xl hover:bg-black/5 text-[#090909] font-bold text-xs text-center border border-black/15 transition-all flex items-center justify-center gap-2 font-mono"
              >
                View 4-Week Schedule
                <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-black/10 text-xs font-mono">
              {[
                ['Launch Date', 'Sep 01, 2026', '#0284C7'],
                ['Tuition Fee', `₹${cohort.price}`, '#090909'],
                ['Duration', cohort.durationLabel, '#090909'],
                ['Lab Standard', cohort.labStandardLabel, '#15803D'],
              ].map(([label, value, color]) => (
                <div key={label}>
                  <span className="text-black/45 text-[10px] uppercase block">{label}</span>
                  <span className="text-sm font-bold" style={{ color }}>{value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* LIVE TERMINAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="bg-[#090D16] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-3 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="text-[11px] text-slate-400 font-mono ml-1 hidden xs:inline">root@turingwings-sec:~#</span>
              </div>
              <span className="text-[10px] font-bold text-[#38BDF8] font-mono flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                LIVE AI SOC TERMINAL
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono leading-relaxed overflow-x-auto">
              {cohort.terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.35, duration: 0.3 }}
                  style={{ color: line.color }}
                  className={line.bold ? 'font-bold' : ''}
                >
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + cohort.terminalLines.length * 0.35 }}
                className="inline-flex items-center gap-1 text-slate-500"
              >
                <span>$</span>
                <motion.span
                  className="w-1.5 h-3.5 bg-slate-400 inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              </motion.span>
            </div>
          </motion.div>

          {/* PROGRAM STRUCTURE */}
          <div className="space-y-4">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Program Structure</h2>
              <p className="text-xs sm:text-sm text-black/50">Four stages, building from fundamentals to autonomous agents.</p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={container}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {cohort.securityMatrix.map((m) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.code}
                    variants={item}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-2xl bg-white border border-black/10 space-y-1.5 shadow-xs text-center cursor-default"
                  >
                    <span className="w-9 h-9 mx-auto rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <span className="text-[10px] font-bold text-[#0284C7] font-mono block">{m.code}</span>
                    <h3 className="text-xs font-bold">{m.title}</h3>
                    <p className="text-[10px] text-black/60 leading-tight">{m.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Weekly Schedule */}
          <div id="security-schedule" className="space-y-10 pt-2">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Weekly Schedule</h2>
              <p className="text-xs sm:text-sm text-black/50">Four weeks, each one unlocking the next.</p>
            </div>

            {/* MOBILE Schedule View */}
            <div className="sm:hidden space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold px-0.5">
                <span style={{ color: '#0284C7' }}>WEEK {activeWeek} OF {cohort.weeksData.length}</span>
                <span className="text-black/40">{activeWeekObj?.title.split(' ').slice(0, 3).join(' ')}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#0284C7,#38BDF8)' }}
                  animate={{ width: `${(activeWeek / cohort.weeksData.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {cohort.weeksData.map((w) => {
                  const Icon = w.icon;
                  const isActive = w.week === activeWeek;
                  const isDone = w.week < activeWeek;
                  return (
                    <button
                      key={w.week}
                      onClick={() => { setActiveWeek(w.week); setOpenDay(0); }}
                      className="cursor-pointer flex flex-col items-center gap-1.5"
                    >
                      <motion.span
                        animate={{
                          backgroundColor: isActive ? '#090909' : isDone ? '#0284C7' : '#FFFFFF',
                          scale: isActive ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm"
                        style={{ borderColor: isActive || isDone ? 'transparent' : 'rgba(0,0,0,0.15)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: isActive || isDone ? '#FFFFFF' : '#0284C7' }} />
                      </motion.span>
                      <span className="text-[9px] font-mono font-bold" style={{ color: isActive ? '#0284C7' : 'rgba(0,0,0,0.35)' }}>
                        {w.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DESKTOP Schedule View */}
            <div className="hidden sm:flex items-start justify-between gap-0 max-w-2xl mx-auto">
              {cohort.weeksData.map((w, idx) => {
                const Icon = w.icon;
                const isActive = w.week === activeWeek;
                const isDone = w.week < activeWeek;
                return (
                  <React.Fragment key={w.week}>
                    <button
                      onClick={() => { setActiveWeek(w.week); setOpenDay(0); }}
                      className="cursor-pointer relative flex flex-col items-center gap-2.5 shrink-0 w-[100px]"
                    >
                      <motion.span
                        animate={{
                          backgroundColor: isActive ? '#090909' : isDone ? '#0284C7' : '#FFFFFF',
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm"
                        style={{ borderColor: isActive || isDone ? 'transparent' : 'rgba(0,0,0,0.15)' }}
                      >
                        {isActive && (
                          <motion.span
                            className="absolute inset-0 rounded-2xl"
                            style={{ boxShadow: '0 0 0 5px rgba(2,132,199,0.16)' }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}
                        <Icon
                          className="w-5 h-5 relative z-10"
                          style={{ color: isActive || isDone ? '#FFFFFF' : '#0284C7' }}
                        />
                      </motion.span>
                      <span
                        className="text-[9px] font-mono font-bold transition-colors"
                        style={{ color: isActive ? '#0284C7' : 'rgba(0,0,0,0.35)' }}
                      >
                        {w.code}
                      </span>
                      <span
                        className={`text-[11px] font-bold text-center leading-tight px-1 transition-colors ${
                          isActive ? 'text-[#090909]' : 'text-black/45'
                        }`}
                      >
                        {w.title.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </button>

                    {idx < cohort.weeksData.length - 1 && (
                      <div className="relative flex-1 h-[2px] mt-[26px] mx-2 rounded-full bg-black/10 overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: 'linear-gradient(90deg,#0284C7,#38BDF8)' }}
                          initial={false}
                          animate={{ width: w.week < activeWeek ? '100%' : '0%' }}
                          transition={{ duration: 0.45, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* ACTIVE OPS DETAILS */}
            <AnimatePresence mode="wait">
              {activeWeekObj && (
                <motion.div
                  key={activeWeekObj.week}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white border border-black/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-md"
                >
                  <div className="space-y-1.5 border-b border-black/10 pb-5">
                    <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest font-mono">
                      {activeWeekObj.code} — {activeWeekObj.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold">{activeWeekObj.title}</h3>
                    <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-2xl">{activeWeekObj.goal}</p>
                  </div>

                  {/* DAY LOG */}
                  <div className="relative">
                    <motion.div
                      key={`line-${activeWeekObj.week}`}
                      className="absolute left-[26px] sm:left-[28px] top-7 bottom-7 w-[2px] rounded-full"
                      style={{
                        background: 'linear-gradient(180deg,#0284C7,rgba(2,132,199,0.08))',
                        transformOrigin: 'top',
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                    />

                    <div className="space-y-4 sm:space-y-5">
                      {activeWeekObj.days.map((day, idx) => {
                        const Icon = day.icon;
                        const isOpen = openDay === idx;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + idx * 0.08, duration: 0.3, ease: 'easeOut' }}
                            className="relative flex gap-3 sm:gap-4"
                          >
                            <motion.button
                              onClick={() => setOpenDay(isOpen ? -1 : idx)}
                              whileTap={{ scale: 0.93 }}
                              aria-label={`Toggle Day ${idx + 1}`}
                              className="cursor-pointer relative z-10 w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
                              style={{
                                background: isOpen ? '#090909' : '#FFFFFF',
                                border: isOpen ? 'none' : '1px solid rgba(0,0,0,0.12)',
                                boxShadow: isOpen ? '0 8px 20px rgba(0,0,0,0.16)' : 'none',
                              }}
                            >
                              {isOpen && (
                                <motion.span
                                  className="absolute -inset-1 rounded-2xl"
                                  style={{ border: '1px solid rgba(2,132,199,0.4)' }}
                                  animate={{ opacity: [0.25, 0.75, 0.25], scale: [1, 1.06, 1] }}
                                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                />
                              )}
                              <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" style={{ color: isOpen ? '#38BDF8' : '#0284C7' }} />
                            </motion.button>

                            <div className="flex-1 min-w-0">
                              <button
                                onClick={() => setOpenDay(isOpen ? -1 : idx)}
                                className={`cursor-pointer w-full text-left rounded-2xl border p-4 sm:p-5 transition-colors duration-200 ${
                                  isOpen ? 'border-[#0284C7]/40 bg-[#FAF8F5]' : 'border-black/10 bg-white hover:border-black/20'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <span className="text-[10px] font-mono font-bold text-[#0284C7]">DAY {idx + 1}</span>
                                    <h4 className="text-sm font-bold leading-snug">{day.title}</h4>
                                    <p className="text-[11px] text-black/55 truncate">{day.theory}</p>
                                  </div>
                                  <motion.span
                                    animate={{ rotate: isOpen ? 90 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="shrink-0 text-black/35"
                                  >
                                    <ChevronDown className="w-4 h-4 -rotate-90" />
                                  </motion.span>
                                </div>
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 p-3.5 rounded-xl bg-[#090D16] border border-white/10">
                                      <span className="font-bold text-[#38BDF8] text-[11px] font-mono block mb-1">
                                        $ practical_lab --exec
                                      </span>
                                      <p className="text-[11px] text-slate-300 leading-relaxed">{day.practical}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* WEEKLY CHALLENGE */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 rounded-2xl bg-[#090909] text-white flex items-center justify-between gap-4 text-xs font-mono"
                  >
                    <div>
                      <span className="font-bold text-[#38BDF8] block">Week Deliverable</span>
                      <p className="text-white/75">{activeWeekObj.miniProject}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TOOLS & TICKER */}
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Tools & Technologies</h2>
              <p className="text-xs sm:text-sm text-black/50">Tap any tool to see how it's used in the cohort.</p>
            </div>

            <div className="relative -mx-4 sm:-mx-8">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

              <div className="overflow-hidden py-1">
                <motion.div
                  className="flex gap-3 w-max px-4 sm:px-8"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  {[...cohort.toolsList, ...cohort.toolsList].map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <motion.button
                        key={`${t.name}-${i}`}
                        onClick={() => setActiveTool(t)}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="cursor-pointer flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl bg-white border border-black/10 shadow-xs hover:border-[#0284C7]/40 hover:shadow-md transition-all shrink-0"
                      >
                        <span className="w-9 h-9 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5" />
                        </span>
                        <span className="text-left leading-tight">
                          <span className="text-xs font-bold block font-mono whitespace-nowrap">{t.name}</span>
                          <span className="text-[10px] text-black/50 block whitespace-nowrap">{t.desc}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>

          {/* TOOL MODAL */}
          <AnimatePresence>
            {activeTool && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setActiveTool(null)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4"
                >
                  <button
                    onClick={() => setActiveTool(null)}
                    className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-black/40 hover:bg-black/5 hover:text-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="w-12 h-12 rounded-2xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center">
                    {activeTool && <activeTool.icon className="w-6 h-6" />}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0284C7]">{activeTool?.desc}</span>
                    <h3 className="text-lg font-extrabold leading-snug">{activeTool?.name}</h3>
                  </div>
                  <p className="text-sm text-black/70 leading-relaxed">{activeTool?.mainUse}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTTOM BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-xl"
          >
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Reserve Your Seat</h2>
              <p className="text-xs text-black/70 leading-relaxed">
                4 weeks of live pentesting labs, Python security automation, and autonomous MCP agents.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <Link
                to={isCohortActive ? `/cohorts/register?cohort=${cohort.slug}` : '#'}
                className={`py-3.5 px-8 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg font-mono ${
                  isCohortActive
                    ? 'bg-[#090909] text-white hover:bg-[#0284C7]'
                    : 'bg-black/15 text-black/40 cursor-not-allowed'
                }`}
                onClick={(e) => !isCohortActive && e.preventDefault()}
              >
                <span>{isCohortActive ? `Register Now • ₹${cohort.price}` : 'Registrations Closed'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </main>

        <Footer />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // WEBDEV / ENGINEERING COHORT LAYOUT (webdevxai & Fallback default rich layout)
  // ─────────────────────────────────────────────────────────────────────────
  const activeWeekObj = cohort.weeksData.find((w) => w.week === activeWeek);
  const activeIndex = cohort.weeksData.findIndex((w) => w.week === activeWeek);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      {/* AMBIENT BACKGROUND FIELD */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-32 w-[32rem] h-[32rem] rounded-full bg-[#22C55E]/20 blur-[110px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#090909]/[0.06] blur-[110px]"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 pt-24 sm:pt-36 pb-8 sm:pb-10 space-y-14 sm:space-y-20">

        {/* HERO */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-3xl space-y-5 sm:space-y-7"
        >
          <motion.div variants={item} className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-[12px] sm:text-xs font-bold font-mono">
              <Cpu className="w-3 h-3 sm:w-4 sm:h-4" />
              4-WEEK FLAGSHIP COHORT
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#090909] text-white text-[12px] sm:text-xs font-bold font-mono">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#22C55E]" />
              {cohort.launchDateText}
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[12px] sm:text-xs font-bold font-mono">
              Tuition ₹{cohort.price}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.05]"
          >
            {cohort.title}
          </motion.h1>

          <motion.p variants={item} className="text-[15px] sm:text-lg text-black/70 font-medium max-w-xl leading-relaxed">
            {cohort.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
            <Link
              to={isCohortActive ? `/cohorts/register?cohort=${cohort.slug}` : '#'}
              className={`group py-3 sm:py-3.5 px-5 sm:px-7 rounded-2xl font-extrabold text-[13px] sm:text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-lg font-mono ${
                isCohortActive
                  ? 'bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black'
                  : 'bg-black/15 text-black/40 cursor-not-allowed'
              }`}
              onClick={(e) => !isCohortActive && e.preventDefault()}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span>{isCohortActive ? `Register For Cohort • ₹${cohort.price}` : 'Registrations Closed'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </Link>
            <a
              href="#curriculum-schedule"
              className="py-3 sm:py-3.5 px-4 sm:px-5 rounded-2xl hover:bg-black/5 text-[#090909] font-bold text-[13px] sm:text-xs text-center border border-black/15 transition-all flex items-center justify-center gap-2 font-mono"
            >
              View 4-Week Schedule
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-black/10 text-[13px] sm:text-xs font-mono"
          >
            {[
              ['Launch Date', 'Aug 25, 2026', '#15803D'],
              ['Tuition Fee', `₹${cohort.price}`, '#090909'],
              ['Duration', cohort.durationLabel, '#090909'],
              ['Projects', cohort.projectsLabel, '#15803D'],
            ].map(([label, value, color]) => (
              <div key={label}>
                <span className="text-black/45 text-[12px] sm:text-[10px] uppercase block">{label}</span>
                <span className="text-xs sm:text-sm font-bold" style={{ color }}>{value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* MISSION TIMELINE */}
        <div id="curriculum-schedule" className="space-y-6 sm:space-y-10">
          <div className="text-center space-y-1">
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-widest text-[#15803D] font-mono">THE FLIGHT PATH</span>
            <h2 className="text-xl sm:text-3xl font-extrabold">Four Weeks, One Trajectory</h2>
          </div>

          {/* Stepper */}
          <div className="relative">
            <div className="hidden sm:block relative px-8">
              <div className="absolute left-8 right-8 top-7 h-px bg-black/10" />
              <motion.div
                className="absolute left-8 top-7 h-px bg-[#15803D]"
                initial={false}
                animate={{ width: `calc(${(activeIndex / (cohort.weeksData.length - 1)) * 100}% - ${(activeIndex / (cohort.weeksData.length - 1)) * 4}rem)` }}
                transition={{ type: 'spring', stiffness: 110, damping: 22 }}
              />
              <div className="relative grid grid-cols-4 gap-2">
                {cohort.weeksData.map((w, idx) => {
                  const Icon = w.icon;
                  const isActive = w.week === activeWeek;
                  const isPast = idx < activeIndex;
                  return (
                    <button
                      key={w.week}
                      onClick={() => { setActiveWeek(w.week); setOpenClass(0); }}
                      className="flex flex-col items-center gap-3 group"
                    >
                      <motion.span
                        animate={{
                          scale: isActive ? 1.08 : 1,
                          backgroundColor: isActive || isPast ? '#15803D' : '#FFFFFF',
                          borderColor: isActive || isPast ? '#15803D' : 'rgba(0,0,0,0.15)',
                        }}
                        whileHover={{ scale: isActive ? 1.08 : 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        className="relative w-14 h-14 rounded-2xl border flex items-center justify-center shadow-sm"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="week-ring"
                            className="absolute -inset-1.5 rounded-[1.1rem] border border-[#15803D]/30"
                            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                          />
                        )}
                        <Icon className={`w-6 h-6 relative ${isActive || isPast ? 'text-white' : 'text-black/35'}`} />
                      </motion.span>
                      <div className="text-center">
                        <span className={`block text-[12px] font-mono font-bold uppercase tracking-wide ${isActive ? 'text-[#15803D]' : 'text-black/40'}`}>
                          Week {w.week}
                        </span>
                        <span className={`block text-sm font-bold ${isActive ? 'text-[#090909]' : 'text-black/50 group-hover:text-black/70'} transition-colors`}>
                          {w.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:hidden grid grid-cols-2 gap-2.5">
              {cohort.weeksData.map((w, idx) => {
                const Icon = w.icon;
                const isActive = w.week === activeWeek;
                const isPast = idx < activeIndex;
                return (
                  <button
                    key={w.week}
                    onClick={() => { setActiveWeek(w.week); setOpenClass(0); }}
                    className={`flex items-center gap-2.5 pl-2.5 pr-3 py-3 rounded-xl border transition-colors ${
                      isActive ? 'border-[#15803D] bg-[#15803D]' : isPast ? 'border-[#15803D]/40 bg-[#15803D]/5' : 'border-black/15 bg-white'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/15' : 'bg-black/5'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isPast ? 'text-[#15803D]' : 'text-black/40'}`} />
                    </span>
                    <span className="text-left leading-snug min-w-0">
                      <span className={`block text-[11px] font-mono font-bold uppercase ${isActive ? 'text-white/70' : 'text-black/40'}`}>
                        Week {w.week}
                      </span>
                      <span className={`block text-[13px] font-bold leading-snug ${isActive ? 'text-white' : 'text-black/70'}`}>
                        {w.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE WEEK DETAIL */}
          <AnimatePresence mode="wait">
            {activeWeekObj && (
              <motion.div
                key={activeWeekObj.week}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-5 sm:space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-black/10 pb-3 sm:pb-4">
                  <div>
                    <span className="text-[12px] sm:text-xs font-bold text-[#15803D] uppercase tracking-widest font-mono block">
                      Week 0{activeWeekObj.week} — {activeWeekObj.subtitle}
                    </span>
                    <h3 className="text-base sm:text-2xl font-extrabold leading-snug mt-0.5">{activeWeekObj.goal}</h3>
                  </div>
                </div>

                {/* CLASS MISSION LOG */}
                <div className="grid gap-3 sm:gap-3">
                  {activeWeekObj.classes.map((cls, idx) => {
                    const Icon = cls.icon;
                    const isOpen = openClass === idx;
                    return (
                      <motion.div
                        key={idx}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3, ease: 'easeOut' }}
                        className={`rounded-xl sm:rounded-2xl border overflow-hidden transition-colors duration-200 ${
                          isOpen ? 'border-[#15803D]/40 bg-white shadow-md' : 'border-black/10 bg-white/80 hover:border-black/20 hover:bg-white'
                        }`}
                      >
                        <button
                          onClick={() => setOpenClass(isOpen ? -1 : idx)}
                          className="w-full p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 text-left"
                        >
                          <span className="text-[12px] font-mono font-bold text-black/30 w-4 shrink-0 hidden sm:block">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <motion.span
                            animate={{ scale: isOpen ? 1.04 : 1 }}
                            transition={{ duration: 0.2 }}
                            className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              isOpen ? 'bg-[#15803D] text-white' : 'bg-[#22C55E]/10 text-[#15803D]'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                          </motion.span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] sm:text-sm font-bold leading-snug">{cls.title}</h4>
                            <p className="text-[12px] sm:text-xs text-black/55 leading-snug line-clamp-2 sm:truncate">{cls.objective}</p>
                          </div>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                            className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${isOpen ? 'bg-black/5 text-[#15803D]' : 'text-black/35'}`}
                          >
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: 'easeInOut' }}
                            >
                              <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-1.5 space-y-3 sm:space-y-3 text-xs text-black/80">
                                <div className="flex flex-wrap gap-1 sm:gap-1.5 font-mono">
                                  {cls.topics.map((t, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-black/10 text-[12px] sm:text-[11px] leading-snug">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                                <div className="p-2.5 sm:p-3 rounded-xl bg-[#22C55E]/[0.06] border border-[#22C55E]/20 flex items-start gap-2 sm:gap-2.5">
                                  <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15803D] shrink-0 mt-0.5" />
                                  <p className="text-[12px] sm:text-[11px] text-black/70 leading-relaxed">{cls.build}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* WEEKLY CHALLENGE */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#090909] text-white flex items-center justify-between gap-3 sm:gap-4 text-[13px] sm:text-xs font-mono"
                >
                  <div>
                    <span className="font-bold text-[#22C55E] block">Weekly Deliverable</span>
                    <p className="text-white/75">{activeWeekObj.challenge}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] shrink-0" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TOOLS & STACK */}
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-widest text-[#15803D] font-mono">STACK & TOOLS</span>
            <h2 className="text-xl sm:text-2xl font-extrabold">Technologies Mastered</h2>
            <p className="text-[13px] sm:text-xs text-black/50">Tap a tool to see how it's used.</p>
          </div>

          <div className="relative -mx-4 sm:-mx-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

            <div className="ticker-row overflow-hidden py-2">
              <motion.div
                className="flex gap-3 sm:gap-4 w-max px-4 sm:px-8"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              >
                {[...cohort.toolsList, ...cohort.toolsList].map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <motion.button
                      key={`${t.name}-${i}`}
                      onClick={() => setActiveTool(t)}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-3 pr-4 sm:pr-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-black/10 shadow-xs hover:border-[#15803D]/40 hover:shadow-md transition-all shrink-0"
                    >
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#22C55E]/10 text-[#15803D] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <span className="text-[13px] sm:text-xs font-bold font-mono whitespace-nowrap">{t.name}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* TOOL DETAIL MODAL */}
        <AnimatePresence>
          {activeTool && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setActiveTool(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-sm w-full shadow-2xl space-y-3 sm:space-y-4"
              >
                <button
                  onClick={() => setActiveTool(null)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-black/40 hover:bg-black/5 hover:text-black transition-colors"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#22C55E]/10 text-[#15803D] flex items-center justify-center">
                  {activeTool && <activeTool.icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                </span>
                <div>
                  <span className="text-[12px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[#15803D]">{activeTool?.desc}</span>
                  <h3 className="text-base sm:text-lg font-extrabold leading-snug">{activeTool?.name}</h3>
                </div>
                <p className="text-[14px] sm:text-sm text-black/70 leading-relaxed">{activeTool?.mainUse}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-black/10 rounded-3xl p-8 sm:p-12 text-center space-y-6 sm:space-y-7 shadow-xl"
        >
          <div className="space-y-2.5 max-w-md mx-auto">
            <span className="text-[12px] sm:text-xs font-bold text-[#15803D] uppercase tracking-widest font-mono">JOIN THE COHORT</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Become an AI Engineer</h2>
          </div>

          <div className="flex justify-center">
            <Link
              to={isCohortActive ? `/cohorts/register?cohort=${cohort.slug}` : '#'}
              className={`py-3.5 px-7 sm:px-8 rounded-2xl font-extrabold text-[13px] sm:text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg font-mono ${
                isCohortActive
                  ? 'bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black'
                  : 'bg-black/15 text-black/40 cursor-not-allowed'
              }`}
              onClick={(e) => !isCohortActive && e.preventDefault()}
            >
              <span>{isCohortActive ? `Register Now • ₹${cohort.price}` : 'Registrations Closed'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
