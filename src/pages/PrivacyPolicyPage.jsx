import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, FileText, Mail, Clock, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Reveals a block once it scrolls into view.
 */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

const RevealBlock = React.forwardRef(function RevealBlock(
  { as: Tag = "div", delay = 0, className = "", children, ...rest },
  forwardedRef
) {
  const [ref, visible] = useReveal();

  const setRefs = (node) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Tag
      ref={setRefs}
      className={`reveal-block ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

const SECTIONS = [
  {
    num: "01",
    id: "introduction",
    title: "Introduction & Commitment",
    content: [
      "Turing Wings ('we', 'our', or 'us') is committed to protecting your privacy and ensuring transparency in how your personal data and project telemetry are collected, processed, and secured.",
      "This Privacy Policy applies to all services, student cohorts, AI engineering workflows, and Buildathons hosted on the Turing Wings platform."
    ]
  },
  {
    num: "02",
    id: "collection",
    title: "Information We Collect",
    content: [
      "Personal Identification Data: Name, email address, contact numbers, and optional social/GitHub handles provided during cohort or Buildathon registration.",
      "Project & Code Telemetry: Code repositories, prompt submissions, agent execution logs, and project metadata submitted during live hackathons and Buildathons.",
      "Technical & Device Logs: IP address, browser metadata, operating system details, and session diagnostics collected for system security and performance optimization."
    ]
  },
  {
    num: "03",
    id: "usage",
    title: "How We Use Your Information",
    content: [
      "Cohort & Buildathon Execution: Onboarding builders, evaluating hackathon submissions, issuing certificates, and facilitating mentor communication.",
      "Platform Security & Optimization: Monitoring infrastructure performance, detecting unauthorized access, and maintaining continuous platform reliability.",
      "Communication: Sending essential platform updates, cohort schedules, and responses to your contact inquiries."
    ]
  },
  {
    num: "04",
    id: "ai-rights",
    title: "AI Model & Prompt Data Rights",
    content: [
      "Your Code Belongs to You: Turing Wings does not claim ownership over the code repositories, proprietary algorithms, or product ideas you build on our platform.",
      "No Unauthorized AI Training: We do not sell or license your private code submissions or prompts to third parties for external AI model training without explicit consent."
    ]
  },
  {
    num: "05",
    id: "security",
    title: "Data Security & Infrastructure",
    content: [
      "Encryption in Transit & Rest: All platform data is encrypted using TLS 1.3 in transit and AES-256 for data stored at rest.",
      "Zero-Trust Architecture: Access to production databases and student telemetry is governed by strict zero-trust role-based access control (RBAC) and monitored by our cybersecurity leadership."
    ]
  },
  {
    num: "06",
    id: "rights",
    title: "Your Data Rights & Choices",
    content: [
      "Access & Portability: You have the right to request a copy of all personal data and project records associated with your account.",
      "Rectification & Erasure: You may request the correction or permanent deletion of your account and personal data at any time by contacting our Data Protection Officer."
    ]
  }
];

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "100% Code Ownership",
    copy: "You retain full intellectual property rights over every line of code and product idea created during our cohorts and Buildathons."
  },
  {
    icon: Lock,
    title: "Encrypted & Secure",
    copy: "All communications and project submissions are protected by TLS 1.3 encryption and zero-trust role-based access control."
  },
  {
    icon: Eye,
    title: "No Hidden Data Sales",
    copy: "We never sell or rent your personal information, prompts, or code telemetry to third-party advertisers or external models."
  }
];

export default function PrivacyPolicyPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Track which section is in view so the table of contents can
  // highlight where the reader actually is.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    const nodes = Object.values(sectionRefs.current).filter(Boolean);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeId));

  return (
    <div
      className="w-full min-h-screen relative bg-white text-[#0E0E0E] selection:bg-[#22C55E] selection:text-black"
      style={{ fontFamily: "'Product Sans', 'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Product Sans is Google's own proprietary typeface and isn't licensed
          for public web embedding, so it's set first as a soft preference and
          Plus Jakarta Sans (openly licensed, near-identical geometric shape)
          is loaded as the real, reliable typeface for the whole page. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .reveal-block {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .hero-enter {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.55s ease-out, transform 0.55s ease-out;
        }
        .hero-enter.hero-in { opacity: 1; transform: translateY(0); }

        .toc-link { position: relative; }
        .toc-link::before {
          content: "";
          position: absolute;
          left: -17px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #22C55E;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .toc-link.active::before { transform: scaleY(1); }

        @media (prefers-reduced-motion: reduce) {
          .reveal-block, .hero-enter { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12">

        {/* Document Header */}
        <div className={`hero-enter ${loaded ? "hero-in" : ""} space-y-5 sm:space-y-6 border-b border-black/10 pb-8 sm:pb-12 mb-10 sm:mb-14`}>
          <div className="space-y-3 max-w-3xl">
            <p className="text-[#22C55E] font-bold flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.14em]">
              <ShieldCheck className="w-4 h-4 shrink-0" /> 07 / Privacy &amp; Data Transparency
            </p>
            <h1 className="font-extrabold tracking-tight text-[#111] text-[clamp(1.9rem,6vw,3.25rem)] leading-[1.08]">
              Privacy Policy &amp;
              <br />
              <span className="text-[#666]">Data Protection.</span>
            </h1>
            <p className="text-[#444] font-medium max-w-xl text-sm sm:text-base leading-relaxed">
              Transparent, launch-ready privacy standards governing how Turing Wings protects student data, AI workflows, and project submissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 sm:pt-4 text-[11px] sm:text-xs font-bold text-[#555]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>Effective Date: August 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>Zero-Trust Security Compliant</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {HIGHLIGHTS.map((h, i) => (
            <RevealBlock
              key={h.title}
              delay={i * 90}
              className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-5 sm:p-6 space-y-2 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
                <h.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111]">{h.title}</h3>
              <p className="text-xs text-[#555] leading-relaxed">{h.copy}</p>
            </RevealBlock>
          ))}
        </div>

        {/* Mobile / tablet: collapsible jump-to-section control */}
        <div className="lg:hidden mb-8">
          <button
            type="button"
            onClick={() => setTocOpen((v) => !v)}
            className="w-full flex items-center justify-between rounded-xl border border-black/10 bg-[#F8F8F8] px-4 py-3 text-sm font-bold text-[#111]"
            aria-expanded={tocOpen}
          >
            <span>Section {SECTIONS[activeIndex]?.num} — {SECTIONS[activeIndex]?.title}</span>
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
          </button>
          {tocOpen && (
            <div className="mt-2 rounded-xl border border-black/10 divide-y divide-black/5 overflow-hidden">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setTocOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold ${
                    activeId === s.id ? "text-[#22C55E] bg-[#F8F8F8]" : "text-[#333]"
                  }`}
                >
                  <span className="text-xs font-bold text-black/40">{s.num}</span>
                  {s.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Document body: sticky contents + sections */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">

          {/* Desktop table of contents */}
          <nav className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/40">On this page</p>
              <ul className="space-y-3 border-l border-black/10 pl-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`toc-link block text-sm font-semibold leading-snug transition-colors ${
                        activeId === s.id ? "active text-[#111]" : "text-[#888] hover:text-[#111]"
                      }`}
                    >
                      <span className="text-black/40 font-bold mr-1">{s.num}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sections */}
          <div className="space-y-8 sm:space-y-12 max-w-3xl">
            {SECTIONS.map((sec) => (
              <RevealBlock
                key={sec.id}
                as="article"
                id={sec.id}
                ref={(node) => { sectionRefs.current[sec.id] = node; }}
                className="scroll-mt-28 border-b border-black/10 pb-8 sm:pb-10 space-y-3 sm:space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#22C55E] pt-1 shrink-0">{sec.num}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111] tracking-tight leading-snug">
                    {sec.title}
                  </h2>
                </div>
                <div className="space-y-3 pl-7">
                  {sec.content.map((p, i) => (
                    <p key={i} className="text-xs sm:text-sm text-[#444] font-medium leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Contact DPO Panel */}
        <RevealBlock className="mt-14 sm:mt-20 bg-[#F8F8F8] border border-black/10 rounded-3xl p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <p className="text-black/50 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold">Data Privacy Inquiries</p>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111]">Have questions about your data?</h3>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Our Data Protection Officer and cybersecurity team are available to assist with data access requests, deletion, or privacy inquiries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full md:w-auto">
            <a
              href="mailto:privacy@turingwings.org"
              className="button-primary text-xs justify-center w-full sm:w-auto"
            >
              <span>Email Privacy Team</span>
              <Mail className="w-4 h-4 text-[#22C55E]" />
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-black/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[.15em] text-black transition hover:border-[#22C55E] hover:text-[#22C55E] bg-white text-center w-full sm:w-auto"
            >
              Contact Command Center ↗
            </Link>
          </div>
        </RevealBlock>

      </main>

      <Footer />
    </div>
  );
}