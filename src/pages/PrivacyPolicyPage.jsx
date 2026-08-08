import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowUpRight, Mail, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = [
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

  return (
    <div className="w-full min-h-screen relative bg-white text-[#090909] font-mono selection:bg-[#22C55E] selection:text-black">
      <Navbar />

      <main className="pt-24 sm:pt-32 lg:pt-36 pb-24 max-w-[1500px] mx-auto px-6 md:px-12 space-y-20 text-left">
        
        {/* Page Header */}
        <div className="space-y-6 border-b border-black/10 pb-12">
          <div className="space-y-3 max-w-3xl">
            <p className="eyebrow text-[#22C55E] font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> 07 / PRIVACY & DATA TRANSPARENCY
            </p>
            <h1 className="section-title text-[#111]">
              Privacy Policy & <br />
              <span className="text-[#666]">Data Protection.</span>
            </h1>
            <p className="section-copy text-[#444] font-medium max-w-xl text-sm md:text-base leading-relaxed">
              Transparent, launch-ready privacy standards governing how Turing Wings protects student data, AI workflows, and project submissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-[#555]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#22C55E]" />
              <span>Effective Date: August 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#22C55E]" />
              <span>Zero-Trust Security Compliant</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111]">100% Code Ownership</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              You retain full intellectual property rights over every line of code and product idea created during our cohorts and Buildathons.
            </p>
          </div>

          <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111]">Encrypted & Secure</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              All communications and project submissions are protected by TLS 1.3 encryption and zero-trust role-based access control.
            </p>
          </div>

          <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#111]">No Hidden Data Sales</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              We never sell or rent your personal information, prompts, or code telemetry to third-party advertisers or external models.
            </p>
          </div>
        </div>

        {/* Full Document Policy Sections */}
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

        {/* Contact DPO Panel */}
        <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <p className="eyebrow text-black/50">DATA PRIVACY INQUIRIES</p>
            <h3 className="text-2xl font-bold text-[#111]">Have questions about your data?</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              Our Data Protection Officer and cybersecurity team are available to assist with data access requests, deletion, or privacy inquiries.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="mailto:privacy@turingwings.org"
              className="button-primary text-xs"
            >
              <span>Email Privacy Team</span>
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
