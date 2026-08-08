import React from "react";
import { Code, Quote, CheckCircle2 } from "lucide-react";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

const TOPICS = [
  { title: "AI-Native Software Development", desc: "Build full-stack applications leveraging LLM agents from day one." },
  { title: "AI-Assisted Product Design", desc: "Generate wireframes and UI components in minutes using v0 & Lovable." },
  { title: "AI Coding Workflows", desc: "Master Cursor AI, Sonnet 3.7, and multi-file prompt engineering." },
  { title: "Authentication & Payments", desc: "Deploy secure auth schemes, JWTs, and Stripe recurring payment gates." },
  { title: "AI Integrations & APIs", desc: "Connect OpenAI, Anthropic, and custom vector search embeddings." },
  { title: "Deployment & DevOps", desc: "Containerize microservices with Docker and deploy to Vercel/Render." },
  { title: "AI Agents & Automations", desc: "Construct autonomous background agent swarms using MCP protocols." },
  { title: "AI-Powered Cyber Security", desc: "Scan vulnerabilities, block prompt injection, and secure zero-trust APIs." },
  { title: "Modern Engineering Workflows", desc: "Experience the exact agile workflows used by leading modern tech teams." },
];

const TESTIMONIALS = [
  {
    name: "Ratnakar Karasala",
    role: "Lead Security Mentor",
    quote: "Turing Wings changed how I approach software security. I built a zero-trust threat scanner in 48 hours using AI agents.",
  },
  {
    name: "Sahith Akula",
    role: "Backend Architect",
    quote: "Learning multi-agent swarm architecture here accelerated my development speed by 12x. The portfolio-driven approach is incredible.",
  },
];

export default function LearnToBuildSection() {
  return (
    <section className="py-24 bg-white text-slate-900 relative selection:bg-amber-500 selection:text-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
            <Code className="w-3.5 h-3.5 text-amber-600" />
            <span>Section 4 — Learn to Build with AI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            What You Will Build & Master
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Instead of passive video lectures, you learn by building real production-ready applications with hands-on AI-first engineering workflows.
          </p>
        </div>

        {/* Interactive Topic Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 transition-all space-y-3 group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/20">
                  0{idx + 1}
                </span>
                <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof Testimonials */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
              Social Proof & Outcome Showcase
            </span>
            <h3 className="text-2xl font-bold text-slate-900">Student & Mentor Outcomes</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
                <Quote className="w-8 h-8 text-amber-500/40" />
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{t.name}</span>
                  <span className="text-amber-700 font-mono font-bold">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center pt-6">
          <LayeredMetallicGoldButton
            text="Explore Our Flagship Cohorts"
            href="#cohorts"
            size="md"
          />
        </div>

      </div>
    </section>
  );
}
