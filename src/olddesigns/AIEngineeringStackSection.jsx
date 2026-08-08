import React, { useState } from "react";
import { Cpu, Layers, Bot, ArrowUpRight } from "lucide-react";

const TECH_STACK = [
  { name: "React & Next.js", category: "Frontend", role: "60 FPS Responsive UI & Server Components" },
  { name: "Node.js & Express", category: "Backend", role: "High-Throughput Microservice APIs" },
  { name: "MongoDB & Postgres", category: "Databases", role: "Distributed Persistent Schemas" },
  { name: "Docker & Vercel", category: "DevOps", role: "Automated CI/CD Deployment Pipelines" },
  { name: "Stripe Payments", category: "Payments", role: "Global Subscriptions & Checkout" },
  { name: "Discord & WebSockets", category: "Realtime", role: "Peer-to-Peer Live Collaboration" },
];

const AI_TOOLS = [
  { name: "Claude Sonnet", category: "AI LLM", role: "Deep Architectural Reasoning & Complex Refactoring" },
  { name: "Cursor AI", category: "IDE Agent", role: "Context-Aware Agentic Coding in Editor" },
  { name: "ChatGPT (GPT-4o)", category: "AI Assistant", role: "Fast Prototyping & Algorithmic Design" },
  { name: "Google Gemini", category: "Multimodal", role: "Large Context Window & Document Analysis" },
  { name: "v0 & Lovable", category: "UI AI", role: "Rapid Generative Interface Wireframing" },
  { name: "LangChain & MCP", category: "Agent Protocol", role: "Model Context Protocol Tool Integration" },
];

export default function AIEngineeringStackSection() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="py-24 bg-slate-100/70 text-slate-900 relative selection:bg-amber-500 selection:text-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Section 3 — The Modern AI Engineering Stack</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Technology Stack × AI Assistants
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Rather than teaching isolated tools, Turing Wings shows you how to combine a strong engineering stack with AI assistants to ship production-ready software efficiently.
          </p>
        </div>

        {/* Two Equal Halves: Tech Stack & AI Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Half 1: Technology Stack */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-600" /> Core Engineering Stack
              </h3>
              <span className="text-xs font-mono text-slate-500">6 Key Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TECH_STACK.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveItem(item)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-700 font-bold">{item.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Half 2: AI Tools */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-600" /> AI Tools & Agents
              </h3>
              <span className="text-xs font-mono text-slate-500">6 AI Assistants</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_TOOLS.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveItem(item)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-700 font-bold">{item.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Hover Explanation Overlay */}
        {activeItem && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center text-xs text-amber-800 font-mono animate-in fade-in">
            <span className="font-bold text-slate-900">{activeItem.name} ({activeItem.category}):</span> {activeItem.role}
          </div>
        )}

      </div>
    </section>
  );
}
