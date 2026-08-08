import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Cpu, Rocket, Server, Database, Globe, Layers, CheckCircle2, ArrowRight,
  Sparkles, ChevronDown, Lock, Zap, Calendar, GitBranch, Timer,
  ClipboardList, TrendingUp, Music, CreditCard, Video, Box, Cloud, Award,
  Satellite, Compass, Plus, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiEngineeringCohortPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [openClass, setOpenClass] = useState(0);
  const [activeTool, setActiveTool] = useState(null);

  const weeksData = [
    {
      week: 1,
      icon: Rocket,
      title: 'Liftoff',
      subtitle: 'Web Fundamentals to Your First Live App',
      goal: 'Understand web architecture, plan with AI, build interactive UI, publish to Vercel.',
      classes: [
        {
          icon: Globe,
          title: 'How the Internet & Web Apps Work',
          objective: 'Master request-response cycles, DNS, hosting, and frontend-backend architecture.',
          topics: ['DNS & HTTP Requests', 'Frontend vs Backend vs Database', 'Request-Response Lifecycle'],
          build: 'Interactive Web Request Lifecycle visualizer.',
        },
        {
          icon: ClipboardList,
          title: 'AI Product Planning & PRD Generation',
          objective: 'Use AI to generate PRD/TRD documents, user stories, and task breakdowns.',
          topics: ['Git/GitHub Workflow', 'Context Windows & Tokens', 'PRD/TRD Specification Generation'],
          build: 'AI-assisted PRD & TRD documentation suite.',
        },
        {
          icon: Timer,
          title: 'FocusFlow Pomodoro App',
          objective: 'Build an interactive app with HTML, CSS, JavaScript, Timers, and LocalStorage.',
          topics: ['DOM Events & State Management', 'LocalStorage Data Persistence', 'UI Micro-Animations'],
          build: 'FocusFlow productivity application with custom themes.',
        },
        {
          icon: GitBranch,
          title: 'Git & Production Deployment',
          objective: 'Version control your code with Git & deploy to GitHub Pages.',
          topics: ['Git Commits & Branching', 'GitHub Repositories', 'GitHub Pages Deployment'],
          build: 'Live GitHub Pages application with documentation.',
        },
        {
          icon: Sparkles,
          title: 'Modern React & Portfolio Launch',
          objective: 'Build and ship a professional React portfolio using v0 and Cursor.',
          topics: ['React Components & Props', 'State Management', 'Vercel Cloud Deployment'],
          build: 'Production React Developer Portfolio shipped live to Vercel.',
        },
      ],
      challenge: 'Ship FocusFlow + Developer Portfolio live on Vercel.',
    },
    {
      week: 2,
      icon: Cpu,
      title: 'Engine Room',
      subtitle: 'APIs, Cloud Databases & Authentication SaaS',
      goal: 'Build Express REST APIs, persist data in Supabase & MongoDB, deploy SaaS.',
      classes: [
        {
          icon: Server,
          title: 'Building Express REST APIs',
          objective: 'Build server-side HTTP endpoints with Express.js.',
          topics: ['Client vs Server', 'REST Methods (GET/POST)', 'Express Router & Middleware'],
          build: 'Backend API connected to frontend contact form.',
        },
        {
          icon: Database,
          title: 'Cloud Databases with MongoDB Atlas',
          objective: 'Persist application data in MongoDB Atlas cloud database.',
          topics: ['SQL vs NoSQL', 'MongoDB Collections & Schemas', 'Database CRUD Operations'],
          build: 'Admin Dashboard fetching live MongoDB records.',
        },
        {
          icon: Lock,
          title: 'Render Cloud Deployment & JWT Auth',
          objective: 'Deploy Express server to Render and implement JWT authentication.',
          topics: ['Render Cloud Hosting', 'Environment Variables', 'JWT Token Authentication'],
          build: 'Secure user login & session verification.',
        },
        {
          icon: TrendingUp,
          title: 'SaaS Finance Tracker',
          objective: 'Build a full-stack financial tracker SaaS with Supabase PostgreSQL.',
          topics: ['Supabase Row-Level Security', 'Multi-Tenant Data Isolation', 'Dashboard Analytics'],
          build: 'Complete SaaS Finance Tracker with authentication & database storage.',
        },
      ],
      challenge: 'Deploy Personal Finance SaaS with JWT & Supabase to production.',
    },
    {
      week: 3,
      icon: Compass,
      title: 'Altitude',
      subtitle: 'Cloud Media Storage, Payments & AI Products',
      goal: 'Integrate Cloudinary media, Razorpay payments, launch AI Study Companion SaaS.',
      classes: [
        {
          icon: Music,
          title: 'Spotify Clone & Firebase Auth',
          objective: 'Build music app layout with Firebase authentication and Firestore database.',
          topics: ['Firebase Google Auth', 'Firestore Collections', 'User Music Metadata'],
          build: 'Spotify-style music player with user accounts.',
        },
        {
          icon: CreditCard,
          title: 'Cloudinary Media & Razorpay Payment',
          objective: 'Upload audio to Cloudinary and integrate Razorpay monetization checkout.',
          topics: ['Object Media Storage', 'Audio Streaming Pipeline', 'Razorpay Payment Gateway'],
          build: 'Premium Subscription tier with Razorpay verification.',
        },
        {
          icon: Sparkles,
          title: 'AI Study Companion Product',
          objective: 'Build an AI-powered SaaS product consuming LLM APIs.',
          topics: ['OpenAI / Claude API Integration', 'Prompt Optimization', 'Cost Management'],
          build: 'AI Study Companion SaaS deployed live on Vercel.',
        },
      ],
      challenge: 'Ship Spotify Clone + AI Product live to production.',
    },
    {
      week: 4,
      icon: Satellite,
      title: 'Flight Systems',
      subtitle: 'Real-Time Streaming, Docker & Cloud Launch',
      goal: 'WebSockets & WebRTC, Docker containers, Google Cloud deployment, Demo Day.',
      classes: [
        {
          icon: Video,
          title: 'Real-Time Streaming with Socket.IO & WebRTC',
          objective: 'Build real-time live chat and video streaming.',
          topics: ['WebSockets vs HTTP', 'Socket.IO Broadcasting', 'WebRTC Video Pipelines'],
          build: 'Live streaming platform with real-time viewer chat.',
        },
        {
          icon: Box,
          title: 'Docker Containerization & Google Cloud',
          objective: 'Package application into Docker container and deploy to Google Cloud.',
          topics: ['Dockerfiles & Images', 'Container Isolation', 'Google Cloud Run Deployment'],
          build: 'Containerized real-time app running on Google Cloud.',
        },
        {
          icon: Award,
          title: 'CI/CD, Cloudflare Turnstile & Solo Demo Day',
          objective: 'Automate deployments with GitHub Actions and present capstone project.',
          topics: ['GitHub Actions CI/CD', 'Cloudflare DDoS Protection', 'Capstone Demo Day'],
          build: 'Final Solo Capstone Project presentation.',
        },
      ],
      challenge: 'Deploy containerized Capstone product live on Google Cloud.',
    },
  ];

  const toolsList = [
    {
      name: 'Antigravity & Cursor', desc: 'AI Coding Tools', icon: Sparkles,
      mainUse: 'AI pair-programming inside your editor. You describe what you want in plain language, review the generated code line by line, and ship faster without losing understanding of what was built.',
    },
    {
      name: 'React 18 & Node.js', desc: 'Full-Stack Engine', icon: Cpu,
      mainUse: 'The core engine behind every project in the cohort — React powers the interfaces you build, Node.js powers the servers that run behind them.',
    },
    {
      name: 'MongoDB & Supabase', desc: 'Cloud Databases', icon: Database,
      mainUse: 'Where your application data actually lives. MongoDB for flexible NoSQL collections, Supabase for a managed Postgres database with built-in auth and row-level security.',
    },
    {
      name: 'Firebase & Cloudinary', desc: 'Auth & Media Storage', icon: Cloud,
      mainUse: 'Firebase handles user sign-in and real-time data; Cloudinary stores and streams images, audio, and video so your app never has to manage files itself.',
    },
    {
      name: 'Razorpay Gateway', desc: 'Monetization', icon: CreditCard,
      mainUse: 'Turns your project into a real business. You wire up checkout, verify payments server-side, and unlock premium features on successful transactions.',
    },
    {
      name: 'Socket.IO & WebRTC', desc: 'Real-Time Systems', icon: Video,
      mainUse: 'Powers anything that has to update instantly — live chat, notifications, and peer-to-peer video streaming without page refreshes.',
    },
    {
      name: 'Docker & Google Cloud', desc: 'Container Launch', icon: Box,
      mainUse: 'Packages your app and everything it needs into one portable container, then ships that container to run reliably on Google Cloud infrastructure.',
    },
    {
      name: 'GitHub Actions', desc: 'CI/CD Automation', icon: GitBranch,
      mainUse: 'Automates the boring part of shipping — every push is tested and deployed automatically, the way production engineering teams actually work.',
    },
  ];

  const activeWeekObj = weeksData.find((w) => w.week === activeWeek);
  const activeIndex = weeksData.findIndex((w) => w.week === activeWeek);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

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

        {/* HERO — cardless, sits directly in the background field, clear of navbar */}
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
              Launch — August 25, 2026
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[12px] sm:text-xs font-bold font-mono">
              Tuition ₹4,999
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.05]"
          >
            AI Engineering
            <br />
            <span className="text-[#15803D]">Cohort</span>
          </motion.h1>

          <motion.p variants={item} className="text-[15px] sm:text-lg text-black/70 font-medium max-w-xl leading-relaxed">
            From web fundamentals to building, deploying, securing, and launching real AI products — live, in four weeks.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
            <Link
              to="/cohorts/register?cohort=ai-engineering"
              className="group py-3 sm:py-3.5 px-5 sm:px-7 rounded-2xl bg-[#090909] text-white font-extrabold text-[13px] sm:text-xs uppercase tracking-wider hover:bg-[#22C55E] hover:text-black transition-all text-center flex items-center justify-center gap-2 shadow-lg font-mono"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              Register For Cohort • ₹4,999
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
              ['Tuition Fee', '₹4,999', '#090909'],
              ['Duration', '4 Weeks Live', '#090909'],
              ['Projects', '5+ Shipped SaaS', '#15803D'],
            ].map(([label, value, color]) => (
              <div key={label}>
                <span className="text-black/45 text-[12px] sm:text-[10px] uppercase block">{label}</span>
                <span className="text-xs sm:text-sm font-bold" style={{ color }}>{value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* MISSION TIMELINE — the 4 weeks as a flight path, not tabs */}
        <div id="curriculum-schedule" className="space-y-6 sm:space-y-10">
          <div className="text-center space-y-1">
            <span className="text-[12px] sm:text-xs font-bold uppercase tracking-widest text-[#15803D] font-mono">THE FLIGHT PATH</span>
            <h2 className="text-xl sm:text-3xl font-extrabold">Four Weeks, One Trajectory</h2>
          </div>

          {/* Path — horizontal on desktop, compact scroll stepper on mobile */}
          <div className="relative">
            {/* Desktop / tablet: horizontal path */}
            <div className="hidden sm:block relative px-8">
              <div className="absolute left-8 right-8 top-7 h-px bg-black/10" />
              <motion.div
                className="absolute left-8 top-7 h-px bg-[#15803D]"
                initial={false}
                animate={{ width: `calc(${(activeIndex / (weeksData.length - 1)) * 100}% - ${(activeIndex / (weeksData.length - 1)) * 4}rem)` }}
                transition={{ type: 'spring', stiffness: 110, damping: 22 }}
              />
              <div className="relative grid grid-cols-4 gap-2">
                {weeksData.map((w, idx) => {
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

            {/* Mobile: 2x2 grid stepper — no horizontal scrolling to hunt for */}
            <div className="sm:hidden grid grid-cols-2 gap-2.5">
              {weeksData.map((w, idx) => {
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

                {/* CLASS MISSION LOG — icon-led cards, click to expand */}
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

        {/* TOOLS & STACK — animated ticker, click a tool for its main use */}
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
                {[...toolsList, ...toolsList].map((t, i) => {
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
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
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
              to="/cohorts/register?cohort=ai-engineering"
              className="py-3.5 px-7 sm:px-8 rounded-2xl bg-[#090909] text-white font-extrabold text-[13px] sm:text-xs uppercase tracking-wider hover:bg-[#22C55E] hover:text-black transition-all flex items-center gap-2 shadow-lg font-mono"
            >
              Register Now • ₹4,999
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}