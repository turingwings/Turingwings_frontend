import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Scale, CheckCircle2, ShieldCheck, Mail, Clock, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Small hook that flips a section's "in-view" state the first time it
 * crosses the viewport, so content settles into place as you scroll
 * instead of dumping everything on screen at once.
 */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who've asked for less motion.
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

function RevealBlock({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal-block ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function TermsOfServicePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Kick off the page-load sequence a tick after mount so the
    // transition actually fires instead of starting in its end state.
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const sections = [
    {
      num: "01",
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        "By accessing, registering for, or participating in any Turing Wings cohorts, AI engineering modules, or Buildathons, you agree to be bound by these Terms of Service.",
        "If you are registering on behalf of an organization or educational institution, you represent that you have the authority to bind that entity to these terms."
      ]
    },
    {
      num: "02",
      id: "cohorts-buildathons",
      title: "Cohorts & Buildathons Participation",
      content: [
        "Eligibility & Conduct: Participants must maintain professional standards, follow our community guidelines, and refrain from abusive, unauthorized, or disruptive behavior during live sessions and sprint events.",
        "Original Work & Plagiarism: All project submissions, repository links, and code implementations submitted during Buildathons must be the original work of the registered team or individual."
      ]
    },
    {
      num: "03",
      id: "intellectual-property",
      title: "Intellectual Property & Code Ownership",
      content: [
        "Your IP Belongs to You: Builders retain 100% intellectual property ownership over all code, application architectures, and product ideas created during Turing Wings events.",
        "Turing Wings Brand & Curriculum: All Turing Wings platform software, curriculum materials, brand logos, and original media remain the exclusive property of Turing Wings."
      ]
    },
    {
      num: "04",
      id: "acceptable-use",
      title: "Acceptable Use & System Integrity",
      content: [
        "No Malicious Exploits: You agree not to attempt security penetration, automated scraping, or denial-of-service attacks against Turing Wings servers, backend APIs, or sub-domains.",
        "Responsible AI Usage: AI agent workflows and code execution pipelines provided on the platform must be used strictly for lawful software development and learning purposes."
      ]
    },
    {
      num: "05",
      id: "disclaimers",
      title: "Disclaimers & Limitation of Liability",
      content: [
        "As-Is Service Provision: Turing Wings services and Buildathons are provided on an 'as is' and 'as available' basis without warranties of any kind.",
        "Limitation of Damages: In no event shall Turing Wings or its mentors be liable for indirect, incidental, or consequential damages arising from platform usage or event participation."
      ]
    },
    {
      num: "06",
      id: "termination-governing",
      title: "Termination & Governing Law",
      content: [
        "Account Termination: We reserve the right to suspend or terminate access for any user found violating platform integrity or code of conduct rules.",
        "Governing Law: These terms shall be governed by and construed in accordance with applicable laws without regard to conflict of law principles."
      ]
    }
  ];

  const highlights = [
    {
      icon: CheckCircle2,
      title: "100% Builder Ownership",
      copy: "You own all intellectual property, source code, and applications created during our Buildathons and cohorts."
    },
    {
      icon: ShieldCheck,
      title: "Fair Play & Conduct",
      copy: "All hackathon projects are evaluated fairly under transparent judging rubrics and code-of-conduct standards."
    },
    {
      icon: Lock,
      title: "Responsible AI Use",
      copy: "AI engineering tools provided on our platform must be utilized for constructive development and learning."
    }
  ];

  return (
    <div className="w-full min-h-screen relative bg-white text-[#090909] font-mono selection:bg-[#22C55E] selection:text-black">
      {/* Scoped styles: page-load + scroll-reveal motion, kept intentionally simple */}
      <style>{`
        .reveal-block {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-enter {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.55s ease-out, transform 0.55s ease-out;
        }
        .hero-enter.hero-in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-block, .hero-enter {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <Navbar />

      <main className="pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 max-w-[1500px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12 space-y-14 sm:space-y-20 text-left">

        {/* Page Header */}
        <div
          className={`hero-enter ${loaded ? "hero-in" : ""} space-y-5 sm:space-y-6 border-b border-black/10 pb-8 sm:pb-12`}
        >
          <div className="space-y-3 max-w-3xl">
            <p className="eyebrow text-[#22C55E] font-bold flex items-center gap-2 text-[11px] sm:text-xs">
              <Scale className="w-4 h-4 shrink-0" /> 08 / TERMS &amp; GOVERNANCE
            </p>
            <h1 className="font-sans font-extrabold tracking-tight text-[#111] text-[clamp(1.9rem,6vw,3.25rem)] leading-[1.08]">
              Terms of Service &amp;
              <br />
              <span className="text-[#666]">Platform Governance.</span>
            </h1>
            <p className="text-[#444] font-medium max-w-xl text-sm sm:text-base leading-relaxed">
              Launch-ready legal terms establishing builder rights, intellectual property ownership, and platform governance for Turing Wings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 sm:pt-4 text-[11px] sm:text-xs font-bold text-[#555]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>Effective Date: August 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>Version 2.0 Launch Governance</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((h, i) => (
            <RevealBlock
              key={h.title}
              delay={i * 90}
              className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-5 sm:p-6 space-y-2 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
                <h.icon className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-[#111]">{h.title}</h3>
              <p className="text-xs text-[#555] leading-relaxed">{h.copy}</p>
            </RevealBlock>
          ))}
        </div>

        {/* Full Document Sections */}
        <div className="space-y-8 sm:space-y-12">
          {sections.map((sec) => (
            <RevealBlock
              key={sec.id}
              as="article"
              id={sec.id}
              className="border-b border-black/10 pb-8 sm:pb-10 space-y-3 sm:space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-[#22C55E] pt-1 shrink-0">{sec.num}</span>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#111] tracking-tight leading-snug">
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

        {/* Legal Contact Panel */}
        <RevealBlock className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <p className="eyebrow text-black/50 text-[11px] sm:text-xs">LEGAL &amp; GOVERNANCE INQUIRIES</p>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#111]">Questions regarding our Terms?</h3>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Reach out to our legal and governance team for clarifications regarding cohort terms or Buildathon sponsorships.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full md:w-auto">
            <a
              href="mailto:contact@turingwings.org"
              className="button-primary text-xs justify-center w-full sm:w-auto"
            >
              <span>Email Legal Team</span>
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