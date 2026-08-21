import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FONT_STACK =
  "'Product Sans', 'Google Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeDirection, setActiveDirection] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const directions = [
    {
      num: "01",
      title: "ENGINEERING",
      copy: "Intelligent systems, AI-native software, autonomous agents, Model Context Protocol, and more."
    },
    {
      num: "02",
      title: "CREATION",
      copy: "Film, animation, design, storytelling, and creative AI media."
    },
    {
      num: "03",
      title: "AUTOMATION",
      copy: "Workflows, intelligent operations, agentic automation, and business systems."
    },
    {
      num: "04",
      title: "EXPLORATION",
      copy: "Experiments, games, emerging technologies, and ideas that don't have a category yet."
    }
  ];

  const team = [
    { name: "Sahith Akula", role: "Backend & AI Systems" },
    { name: "Manoj Kumar", role: "Backend & Architecture" },
    { name: "Pandu Ranga", role: "Frontend & UI Design" },
    { name: "Ratnakar", role: "Cybersecurity Operations" }
  ];

  return (
    <div
      className="w-full min-h-screen relative bg-[#FAFAFA] text-[#090909] selection:bg-black selection:text-white font-product-sans"
      style={{ fontFamily: FONT_STACK }}
    >
      <style>{`
        .story-enter {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .story-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <Navbar />

      <main className="pt-28 sm:pt-36 lg:pt-44 pb-28 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 space-y-32 sm:space-y-44 text-left">

        {/* MOMENT 01 — OPENING STATEMENT */}
        <section className={`story-enter ${loaded ? "story-in" : ""} space-y-8 border-b border-black/10 pb-20 sm:pb-28`}>
          <h1 className="text-[clamp(2.6rem,8.5vw,6.5rem)] font-extrabold tracking-[-0.03em] text-[#090909] uppercase leading-[0.94] max-w-5xl">
            WE'RE BUILDING FOR WHAT'S NEXT.
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#333] leading-relaxed max-w-3xl pt-2">
            Technology is changing faster than traditional systems can adapt. Turing Wings exists as a space to explore, experiment, and work with what comes next.
          </p>
        </section>

        {/* MOMENT 02 — WHY WE STARTED (HUMAN ORIGIN) */}
        <section className="space-y-10 border-b border-black/10 pb-20 sm:pb-28">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/40 block">
            WHY WE STARTED
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#090909] leading-tight">
                Yesterday's tools can't build tomorrow.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-xl text-[#333] font-medium leading-relaxed border-l-2 border-black/20 pl-6 sm:pl-8">
              <p>
                The way we build software, automate work, create media, and solve problems is changing constantly.
              </p>
              <p>
                We didn't want to build another place that simply teaches people yesterday's tools.
              </p>
              <p className="text-[#090909] font-bold">
                We wanted to create a place where people can experiment with what's next.
              </p>
            </div>
          </div>
        </section>

        {/* MOMENT 03 — THE BIG IDEA (HIGH-IMPACT TYPOGRAPHY & WHITESPACE) */}
        <section className="py-8 sm:py-14 border-b border-black/10 pb-20 sm:pb-28">
          <div className="space-y-10 max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold tracking-[-0.03em] text-[#090909] uppercase leading-[0.96]">
                DON'T JUST LEARN WHAT AI CAN DO.
              </h2>
              <h2 className="text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold tracking-[-0.03em] text-[#666666] uppercase leading-[0.96]">
                FIND OUT WHAT YOU CAN DO WITH IT.
              </h2>
            </div>

            <p className="text-lg sm:text-2xl text-[#333] font-medium max-w-2xl leading-relaxed pt-2">
              Turing Wings is about moving beyond simply consuming technology toward experimenting, creating, and making things real.
            </p>
          </div>
        </section>

        {/* MOMENT 04 — THE DIRECTIONS (SPATIAL / EDITORIAL EXPLORATION) */}
        <section className="space-y-12 border-b border-black/10 pb-20 sm:pb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/40 block mb-2">
                DOMAINS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090909] uppercase">
                THERE'S MORE THAN ONE WAY FORWARD.
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-black/50">
              EXPLORATION MATRIX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {directions.map((d, idx) => (
              <div
                key={d.num}
                onMouseEnter={() => setActiveDirection(idx)}
                className={`border-t-2 pt-6 space-y-4 transition-all duration-300 cursor-pointer ${
                  activeDirection === idx ? "border-black translate-y-[-2px]" : "border-black/20"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold text-black/40">
                  <span>{d.num}</span>
                  <span className="uppercase">DIRECTION</span>
                </div>

                <h3 className="text-2xl font-extrabold tracking-tight text-[#090909]">
                  {d.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#444] font-medium leading-relaxed pt-1">
                  {d.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* MOMENT 05 — HOW WE WORK (CONCISE KINETIC PHILOSOPHY) */}
        <section className="space-y-8 border-b border-black/10 pb-20 sm:pb-28">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/40 block">
            HOW WE WORK
          </span>

          <div className="space-y-8 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#090909] uppercase leading-none">
              LEARN. EXPERIMENT. BREAK THINGS. BUILD AGAIN. SHIP.
            </h2>

            <p className="text-base sm:text-xl text-[#333] font-medium leading-relaxed max-w-2xl">
              We believe understanding comes from doing. Our experiences are designed around experimentation, real work, feedback, iteration, and shipping.
            </p>
          </div>
        </section>

        {/* MOMENT 06 — THE PEOPLE (HUMAN TEAM PRESENTATION) */}
        <section className="space-y-12 border-b border-black/10 pb-20 sm:pb-28">
          <div className="border-b border-black/10 pb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/40 block mb-2">
              TEAM
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090909] uppercase">
              BUILT BY BUILDERS.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="border-t border-black/20 pt-5 space-y-2">
                <h3 className="text-xl font-extrabold text-[#090909]">{member.name}</h3>
                <p className="text-xs font-mono font-bold text-black/60 uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL MOMENT — THE CLOSING */}
        <section className="py-12 text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#090909] uppercase leading-none">
              THIS IS TURING WINGS.
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-[#666666] tracking-tight">
              And we're only getting started.
            </p>
          </div>

          <div className="pt-6 flex justify-center">
            <Link
              to="/cohorts"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#090909] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-black/80 transition-all shadow-xl min-h-[44px] touch-action-manipulation"
            >
              <span>EXPLORE TURING WINGS</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
