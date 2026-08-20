import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuilderOfTheCohort from '../components/BuilderOfTheCohort';
import {
  Cpu, ShieldCheck, Clock, ArrowRight, AlertCircle, Layers, Terminal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cohortService } from '../services/cohort';
import { COHORTS_METADATA } from '../data/cohortMetadata';

const FONT_STACK =
  "'Product Sans', 'Google Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function WebDevDiagram() {
  return (
    <svg viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-48 rounded-xl border border-black/10 bg-[#FAF9F6]">
      <rect width="480" height="200" rx="10" fill="#F8F9FA" />
      <pattern id="web-dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#E2E8F0" />
      </pattern>
      <rect width="480" height="200" rx="10" fill="url(#web-dots)" />
      
      {/* Node 1: Client UI */}
      <rect x="25" y="60" width="100" height="80" rx="8" fill="#FFFFFF" stroke="#090909" strokeWidth="1.5" />
      <text x="75" y="95" textAnchor="middle" fill="#090909" fontSize="10" fontWeight="700" fontFamily="monospace">CLIENT UI</text>
      <text x="75" y="112" textAnchor="middle" fill="#71717A" fontSize="8" fontFamily="monospace">REACT / NEXT</text>

      {/* Connection 1 -> 2 */}
      <path d="M125 100 H165" stroke="#090909" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="145" cy="100" r="3" fill="#090909" />

      {/* Node 2: Agent Core */}
      <rect x="165" y="45" width="150" height="110" rx="10" fill="#090909" />
      <text x="240" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="monospace">AGENT RUNTIME</text>
      <text x="240" y="102" textAnchor="middle" fill="#A1A1AA" fontSize="9" fontFamily="monospace">CLAUDE + MCP</text>
      <text x="240" y="120" textAnchor="middle" fill="#22C55E" fontSize="8" fontWeight="700" fontFamily="monospace">● ACTIVE EXECUTION</text>

      {/* Connection 2 -> 3 */}
      <path d="M315 100 H355" stroke="#090909" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="335" cy="100" r="3" fill="#090909" />

      {/* Node 3: Supabase / DB */}
      <rect x="355" y="60" width="100" height="80" rx="8" fill="#FFFFFF" stroke="#090909" strokeWidth="1.5" />
      <text x="405" y="95" textAnchor="middle" fill="#090909" fontSize="10" fontWeight="700" fontFamily="monospace">SUPABASE</text>
      <text x="405" y="112" textAnchor="middle" fill="#71717A" fontSize="8" fontFamily="monospace">POSTGRES / RAG</text>
    </svg>
  );
}

function CyberDiagram() {
  return (
    <svg viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-48 rounded-xl border border-black/10 bg-[#FAF9F6]">
      <rect width="480" height="200" rx="10" fill="#F8F9FA" />
      <pattern id="cyber-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1"/>
      </pattern>
      <rect width="480" height="200" rx="10" fill="url(#cyber-grid)" />

      <rect x="20" y="25" width="440" height="150" rx="8" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="35" y="42" fill="#94A3B8" fontSize="8" fontWeight="700" fontFamily="monospace">PERIMETER_DEFENSE_GRID</text>

      {/* Recon Node */}
      <rect x="40" y="60" width="100" height="80" rx="8" fill="#FFFFFF" stroke="#090909" strokeWidth="1.5" />
      <text x="90" y="95" textAnchor="middle" fill="#090909" fontSize="10" fontWeight="700" fontFamily="monospace">KALI / NMAP</text>
      <text x="90" y="112" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="monospace">RECON / PROBE</text>

      {/* Connection */}
      <path d="M140 100 H175" stroke="#090909" strokeWidth="1.5" />

      {/* SOC Agent */}
      <rect x="175" y="45" width="140" height="110" rx="10" fill="#090909" />
      <text x="245" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="monospace">SOC AGENT</text>
      <text x="245" y="102" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">OLLAMA + BURP</text>
      <text x="245" y="120" textAnchor="middle" fill="#22C55E" fontSize="8" fontWeight="700" fontFamily="monospace">ENCRYPTED TELEMETRY</text>

      {/* Connection */}
      <path d="M315 100 H350" stroke="#090909" strokeWidth="1.5" />

      {/* Target Node */}
      <rect x="350" y="60" width="95" height="80" rx="8" fill="#FFFFFF" stroke="#090909" strokeWidth="1.5" />
      <text x="397" y="95" textAnchor="middle" fill="#090909" fontSize="10" fontWeight="700" fontFamily="monospace">MCP GATEWAY</text>
      <text x="397" y="122" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="monospace">HARDENED LAB</text>
    </svg>
  );
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const mergeCohortData = (backendCohort, idx) => {
  const slug = backendCohort.slug;
  const meta = COHORTS_METADATA[slug] || {
    flagship: 'NEW PROGRAM',
    icon: Cpu,
    tagline: 'Master state-of-the-art software engineering',
    stats: [{ icon: Clock, label: '4 Weeks' }],
    tools: [],
    ctaLabel: 'ENTER PROGRAM',
  };

  const totalSeats = Number(backendCohort.totalSeats || backendCohort.total_seats || 70);
  const seatsBooked = Number(backendCohort.seatsBooked || 0);
  const seatsRemaining = backendCohort.seatsRemaining !== undefined && backendCohort.seatsRemaining !== null
    ? Number(backendCohort.seatsRemaining)
    : Math.max(0, totalSeats - seatsBooked);

  return {
    ...meta,
    ...backendCohort,
    number: String(idx + 1).padStart(2, '0'),
    uuid: backendCohort.id,
    id: slug,
    title: backendCohort.title,
    description: backendCohort.description,
    price: backendCohort.currentPricing ? backendCohort.currentPricing.price : backendCohort.price,
    totalSeats,
    seatsBooked,
    seatsRemaining,
    curriculumPath: `/cohorts/${slug}`,
    registerPath: `/cohorts/register?cohort=${slug}`,
  };
};

/* ─────────────────────────────────────────────────────────────────────────
   EDITORIAL PROGRAM CARD
   ───────────────────────────────────────────────────────────────────────── */
function CohortCard({ cohort }) {
  const isSoldOut = cohort.isSoldOut || (cohort.seatsRemaining !== undefined && cohort.seatsRemaining <= 0);
  const currentPrice = cohort.currentPricing ? cohort.currentPricing.price : cohort.price;
  const currentTierName = cohort.currentPricing ? cohort.currentPricing.name : 'Founding Seats';
  const isFoundingActive = currentTierName.toLowerCase().includes('founding') && !isSoldOut;

  const foundingSeatsLeft = cohort.currentPricing ? cohort.currentPricing.seatsRemaining : cohort.seatsRemaining;
  const seatsRemaining = cohort.seatsRemaining !== undefined ? cohort.seatsRemaining : 70;

  const foundingPrice = cohort.pricingTiers && cohort.pricingTiers[0] ? cohort.pricingTiers[0].price : 499;
  const regularPrice = cohort.pricingTiers && cohort.pricingTiers[1] ? cohort.pricingTiers[1].price : 599;

  const isWebDev = cohort.slug === 'webdevxai' || cohort.slug === 'full-stack-batch-1';

  return (
    <motion.div variants={cardEntranceVariants} className="h-full">
      <div className="h-full flex flex-col justify-between rounded-2xl border border-black/12 bg-white overflow-hidden p-6 sm:p-8 space-y-6 shadow-sm hover:border-black/30 transition-all duration-300">
        
        {/* 1. Header: Program Number + Enrolling Status */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 font-mono">
          <span className="text-xs font-bold uppercase tracking-widest text-black/50">
            PROGRAM {cohort.number}
          </span>
          <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isSoldOut ? 'text-red-600' : 'text-[#15803D]'}`}>
            <span className={`w-2 h-2 rounded-full ${isSoldOut ? 'bg-red-600' : 'bg-[#22C55E] animate-pulse'}`} />
            {isSoldOut ? 'SOLD OUT' : 'ENROLLING NOW'}
          </span>
        </div>

        {/* 2. Program Title (PRIMARY VISUAL FOCUS) */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090909] font-sans tracking-tight leading-tight">
            {cohort.title}
          </h2>
          <p className="text-xs sm:text-sm text-black/60 font-sans leading-relaxed">
            {cohort.description}
          </p>
        </div>

        {/* 3. Program Artwork Diagram */}
        <div className="py-2">
          {isWebDev ? <WebDevDiagram /> : <CyberDiagram />}
        </div>

        {/* 4. Technologies & Format Specs */}
        <div className="space-y-2.5 font-mono text-xs border-t border-black/10 pt-4">
          <div className="flex justify-between items-center text-black/60">
            <span className="uppercase text-[10px] font-bold tracking-wider text-black/40">STACK</span>
            <span className="font-bold text-[#090909] text-right truncate max-w-[240px]">
              {cohort.tools && cohort.tools.length > 0 ? cohort.tools.slice(0, 4).join(' · ') : 'Cursor · Claude · Supabase'}
            </span>
          </div>
          <div className="flex justify-between items-center text-black/60">
            <span className="uppercase text-[10px] font-bold tracking-wider text-black/40">FORMAT</span>
            <span className="font-bold text-[#090909]">4 Weeks Intensive · Live Engineering</span>
          </div>
        </div>

        {/* 5. Pricing & Seat Availability Block (Restrained, Editorial) */}
        <div className="py-3 px-4 rounded-xl bg-[#F8F9FA] border border-black/10 font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-black/50 border-b border-black/10 pb-1.5">
            <span>CAPACITY & PRICING</span>
            <span className="text-[#15803D]">{cohort.totalSeats || 70} SEATS TOTAL</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className={`p-2.5 rounded-lg border transition-all ${isFoundingActive ? 'bg-white border-black/20 text-[#090909] shadow-xs' : 'bg-black/5 border-transparent text-black/40 line-through'}`}>
              <span className="text-[9px] uppercase font-bold text-black/40 block tracking-wider">FOUNDING TIER</span>
              <span className="text-sm font-extrabold block">₹{foundingPrice}</span>
              <span className="text-[9px] text-black/50 block font-sans">
                {isFoundingActive ? `${foundingSeatsLeft} seats remaining` : 'Claimed'}
              </span>
            </div>

            <div className={`p-2.5 rounded-lg border transition-all ${!isFoundingActive && !isSoldOut ? 'bg-white border-black/20 text-[#090909] shadow-xs' : 'bg-black/5 border-transparent text-black/40'}`}>
              <span className="text-[9px] uppercase font-bold text-black/40 block tracking-wider">STANDARD TIER</span>
              <span className="text-sm font-extrabold block">₹{regularPrice}</span>
              <span className="text-[9px] text-black/50 block font-sans">
                {isSoldOut ? 'Sold out' : (isFoundingActive ? 'Unlocks after founding' : `${seatsRemaining} seats remaining`)}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-black/70 pt-0.5 text-center font-bold font-sans">
            {isSoldOut ? (
              <span className="text-red-600">Registration closed · 70/70 Seats Filled</span>
            ) : isFoundingActive ? (
              <span className="text-[#090909]">Founding access · {foundingSeatsLeft} seats remaining at ₹{foundingPrice}</span>
            ) : (
              <span className="text-[#090909]">Standard access · {seatsRemaining} seats remaining at ₹{regularPrice}</span>
            )}
          </div>
        </div>

        {/* 6. CTA */}
        <div className="pt-2 flex gap-3">
          <Link to={cohort.curriculumPath} className="flex-1">
            <div className="w-full py-3.5 px-4 rounded-xl bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-extrabold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 min-h-[44px]">
              <span>ENTER PROGRAM</span>
              <span>→</span>
            </div>
          </Link>
          {!isSoldOut && (
            <Link to={cohort.registerPath} className="flex-1">
              <div className="w-full py-3.5 px-4 rounded-xl bg-white border border-black/20 text-[#090909] hover:border-black font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center min-h-[44px]">
                <span>ENROLL · ₹{currentPrice}</span>
              </div>
            </Link>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export default function CohortsListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [loadingState, setLoadingState] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchCohorts() {
      try {
        setLoadingState('loading');
        const result = await cohortService.getActiveCohorts();
        if (result.success && Array.isArray(result.data)) {
          const merged = result.data.map((c, idx) => mergeCohortData(c, idx));
          setCohorts(merged);
          setLoadingState('ready');
        } else {
          throw new Error(result.message || 'Failed to fetch cohorts.');
        }
      } catch (err) {
        console.error('Error loading cohorts:', err);
        setLoadingState('error');
        setErrorMessage(err.message || 'System error. Please try again later.');
      }
    }
    fetchCohorts();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black flex flex-col relative"
      style={{ fontFamily: FONT_STACK }}
    >
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        
        {/* Header Section */}
        <div className="space-y-4 pb-12 sm:pb-16 border-b border-black/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/50">
              TURING WINGS ACADEMY
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#090909] tracking-tight leading-tight">
            Engineering Programs
          </h1>
          <p className="text-sm sm:text-base text-black/70 max-w-xl leading-relaxed">
            Intensive, project-driven engineering cohorts designed to turn developers into AI-native builders and security engineers.
          </p>
        </div>

        {/* Programs Grid */}
        {loadingState === 'loading' ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/40">Loading engineering programs...</p>
          </div>
        ) : loadingState === 'error' ? (
          <div className="my-12 p-8 rounded-3xl bg-red-50 border border-red-200 text-center space-y-4 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-xs font-bold text-red-700">{errorMessage}</p>
            <button onClick={() => window.location.reload()} className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider">
              Retry Connection
            </button>
          </div>
        ) : (
          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12"
          >
            {cohorts.map((cohort) => (
              <CohortCard key={cohort.id} cohort={cohort} />
            ))}
          </motion.div>
        )}

        {/* Builder of the Cohort Section */}
        <div className="pt-20">
          <BuilderOfTheCohort />
        </div>

      </main>

      <Footer />
    </div>
  );
}