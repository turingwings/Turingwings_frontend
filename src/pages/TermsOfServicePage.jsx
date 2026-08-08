import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Scale, CheckCircle2, ShieldCheck, Mail, Clock, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="w-full min-h-screen relative bg-white text-[#090909] font-mono selection:bg-[#22C55E] selection:text-black">
      <Navbar />

      <main className="pt-24 sm:pt-32 lg:pt-36 pb-24 max-w-[1500px] mx-auto px-6 md:px-12 space-y-20 text-left">
        
        {/* Page Header */}
        <div className="space-y-6 border-b border-black/10 pb-12">
          <div className="space-y-3 max-w-3xl">
            <p className="eyebrow text-[#22C55E] font-bold flex items-center gap-2">
              <Scale className="w-4 h-4" /> 08 / TERMS & GOVERNANCE
            </p>
            <h1 className="section-title text-[#111]">
              Terms of Service & <br />
              <span className="text-[#666]">Platform Governance.</span>
            </h1>
            <p className="section-copy text-[#444] font-medium max-w-xl text-sm md:text-base leading-relaxed">
              Launch-ready legal terms establishing builder rights, intellectual property ownership, and platform governance for Turing Wings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-[#555]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#22C55E]" />
              <span>Effective Date: August 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#22C55E]" />
              <span>Version 2.0 Launch Governance</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111]">100% Builder Ownership</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              You own all intellectual property, source code, and applications created during our Buildathons and cohorts.
            </p>
          </div>

          <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111]">Fair Play & Conduct</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              All hackathon projects are evaluated fairly under transparent judging rubrics and code-of-conduct standards.
            </p>
          </div>

          <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111]">Responsible AI Use</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              AI engineering tools provided on our platform must be utilized for constructive development and learning.
            </p>
          </div>
        </div>

        {/* Full Document Sections */}
        <div className="space-y-12">
          {sections.map((sec) => (
            <article key={sec.id} id={sec.id} className="border-b border-black/10 pb-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#22C55E]">{sec.num}</span>
                <h2 className="text-2xl font-bold text-[#111] tracking-tight">{sec.title}</h2>
              </div>
              <div className="space-y-3 pl-7">
                {sec.content.map((p, i) => (
                  <p key={i} className="text-xs md:text-sm text-[#444] font-medium leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Legal Contact Panel */}
        <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <p className="eyebrow text-black/50">LEGAL & GOVERNANCE INQUIRIES</p>
            <h3 className="text-2xl font-bold text-[#111]">Questions regarding our Terms?</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              Reach out to our legal and governance team for clarifications regarding cohort terms or Buildathon sponsorships.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="mailto:contact@turingwings.org"
              className="button-primary text-xs"
            >
              <span>Email Legal Team</span>
              <Mail className="w-4 h-4 text-[#22C55E]" />
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-black/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[.15em] text-black transition hover:border-[#22C55E] hover:text-[#22C55E] bg-white"
            >
              Contact Command Center ↗
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
