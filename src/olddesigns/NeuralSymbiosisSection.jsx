import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, Shield, Terminal, Layout, Layers, Check, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function NeuralSymbiosisSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTrack, setActiveTrack] = useState("ui");

  const tracks = {
    ui: {
      title: "Generative UI & Spatial Systems",
      lead: "Pandu Ranga — Lead UI & Spatial Design",
      codeSnippet: `// Human Intent: Build 3D Glassmorphism Interface
const SpatialCard = ({ title, neuralAgent }) => {
  const { theme } = useTheme();
  return (
    <div className="backdrop-blur-md border border-amber-500/30 shadow-2xl">
      <Canvas3D particleEngine="60fps" />
      <NeuralAgentStream id={neuralAgent.id} />
    </div>
  );
};`,
      speed: "12x Fast-Track Velocity",
      highlights: ["React 19 & Tailwind", "HTML5 3D Particle Canvas", "Glassmorphism Aesthetics"],
    },
    cyber: {
      title: "Offensive & Defensive Cyber Shield",
      lead: "Ratnakar — Cybersecurity Lead Mentor",
      codeSnippet: `// Human Intent: Autonomous Threat Defense Loop
async function auditZeroTrustShield(endpoint) {
  const threatVector = await NeuralAgent.scanVulnerabilities(endpoint);
  if (threatVector.detected) {
    await Firewall.deployQuantumShield(threatVector.ip);
    return { status: "SECURED", timeMs: 4 };
  }
}`,
      speed: "Zero-Latency Threat Shield",
      highlights: ["Offensive Security Scans", "Zero Trust Architecture", "Real-Time Packet Auditing"],
    },
    agents: {
      title: "Autonomous AI Agent Swarms",
      lead: "Sahith Akula — Backend Lead Mentor",
      codeSnippet: `// Human Intent: Orchestrate Multi-Agent Swarm
const SwarmEngine = new AgentSwarm({
  architect: "Claude-3.7-Sonnet",
  coder: "Cursor-Agent-V2",
  tester: "Jest-Neural-Validator",
});
await SwarmEngine.executeSprint("Build Full Authentication API");`,
      speed: "Multi-Agent Concurrent Build",
      highlights: ["Multi-Agent Orchestration", "Automated Test Generation", "Zero-Boilerplate Code"],
    },
    backend: {
      title: "Distributed Backend & ML Pipelines",
      lead: "Manoj Kumar — Backend & Marketing Lead",
      codeSnippet: `// Human Intent: High-Scale Vector Database Pipeline
const NeuralPipeline = new Pipeline({
  vectorDb: "Pinecone-Enterprise",
  model: "Embedding-V3",
});
await NeuralPipeline.streamEmbeddings(dataset, { chunkMs: 12 });`,
      speed: "Sub-10ms Query Latency",
      highlights: ["Vector Database Search", "High-Throughput Microservices", "Distributed Cache Clusters"],
    },
  };

  return (
    <section
      id="symbiosis"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">


          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            NEURAL{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              SYMBIOSIS.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            Human vision provides the spark, strategy, and aesthetics—while AI neural swarms execute the code, tests, and deployment infrastructure.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {Object.keys(tracks).map((key) => {
            const isActive = activeTrack === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTrack(key)}
                className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-extrabold transition-all text-center ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-lg"
                    : isLight
                    ? "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100"
                    : "bg-slate-900/80 border-amber-500/20 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {tracks[key].title.split("&")[0]}
              </button>
            );
          })}
        </div>

        {/* Active Track Neural Simulator Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl p-8 sm:p-12 border backdrop-blur-md shadow-2xl ${
              isLight
                ? "bg-white/95 border-[#d8d0be] shadow-amber-500/5"
                : "bg-[#0e1118]/95 border-[#e2b740]/40 shadow-amber-500/15"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              {/* Left Side: Track Information */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-black uppercase text-[#e2b740] tracking-wider block">
                  LEAD MENTOR: {tracks[activeTrack].lead}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  {tracks[activeTrack].title}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-[#e2b740]">
                    ⚡ {tracks[activeTrack].speed}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  {tracks[activeTrack].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#e2b740]" />
                      <span className={`text-xs sm:text-sm font-medium ${
                        isLight ? "text-slate-800" : "text-slate-200"
                      }`}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <LayeredMetallicGoldButton
                    text="Explore Track Architecture"
                    to="/portal/services/v2/program-catalog"
                    size="md"
                  />
                </div>
              </div>

              {/* Right Side: Pseudo-Code & Architecture Visualizer Box */}
              <div className="lg:col-span-6">
                <div className={`rounded-2xl p-6 border font-mono text-xs overflow-x-auto shadow-2xl relative ${
                  isLight ? "bg-slate-950 text-amber-300 border-slate-800" : "bg-[#070910] text-amber-300 border-amber-500/30"
                }`}>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] text-slate-400 font-bold ml-2">neural_symbiosis_engine.ts</span>
                  </div>

                  <pre className="leading-relaxed">
                    <code>{tracks[activeTrack].codeSnippet}</code>
                  </pre>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
