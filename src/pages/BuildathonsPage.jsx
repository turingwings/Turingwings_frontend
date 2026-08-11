import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FONT_STACK =
  "'Product Sans', 'Google Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ─────────────────────────────────────────────────────────────────────────
   CUBE-NET LOADER — flat cross folds into a box, holds, unfolds, repeats.
   Fixed 3s cycle. Pure CSS 3D transforms, no framer-motion needed.
   ───────────────────────────────────────────────────────────────────────── */
function CubeNetLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 sm:py-28">
      <div
        className="relative"
        style={{
          width: "clamp(90px, 26vw, 130px)",
          height: "clamp(90px, 26vw, 130px)",
          perspective: "700px",
        }}
      >
        <div
          className="cw-scene"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "clamp(30px, 9vw, 44px)",
            height: "clamp(30px, 9vw, 44px)",
            transformStyle: "preserve-3d",
            marginTop: "calc(clamp(30px, 9vw, 44px) / -2)",
            marginLeft: "calc(clamp(30px, 9vw, 44px) / -2)",
          }}
        >
          <div className="cw-face" style={{ backgroundColor: "#0A0A0A" }} />
          <div className="cw-face cw-top" style={{ backgroundColor: "#22C55E" }} />
          <div className="cw-face cw-bottom" style={{ backgroundColor: "#171717" }} />
          <div
            className="cw-face cw-left"
            style={{ backgroundColor: "#F4F4F4", border: "1px solid rgba(0,0,0,0.1)" }}
          />
          <div className="cw-face cw-right" style={{ backgroundColor: "#2E2E2E" }} />
        </div>

        <div
          className="cw-shadow"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "6%",
            width: "60%",
            height: "14%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "9999px",
          }}
        />
      </div>

      <p
        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-center px-4"
        style={{ color: "rgba(9,9,9,0.4)", fontFamily: FONT_STACK }}
      >
        Fetching live hackathons &amp; buildathons
      </p>

      <style>{`
        .cw-face {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          backface-visibility: hidden;
        }
        .cw-top {
          transform-origin: bottom center;
          animation: cwFoldTop 3s ease-in-out infinite;
        }
        .cw-bottom {
          transform-origin: top center;
          animation: cwFoldBottom 3s ease-in-out infinite;
        }
        .cw-left {
          transform-origin: right center;
          animation: cwFoldLeft 3s ease-in-out infinite;
        }
        .cw-right {
          transform-origin: left center;
          animation: cwFoldRight 3s ease-in-out infinite;
        }
        .cw-scene {
          animation: cwSpin 3s ease-in-out infinite;
        }
        .cw-shadow {
          animation: cwShadow 3s ease-in-out infinite;
        }

        @keyframes cwFoldTop {
          0%, 10%   { transform: translateY(-100%) rotateX(0deg); }
          38%, 76%  { transform: translateY(-100%) rotateX(-90deg); }
          100%      { transform: translateY(-100%) rotateX(0deg); }
        }
        @keyframes cwFoldBottom {
          0%, 10%   { transform: translateY(100%) rotateX(0deg); }
          38%, 76%  { transform: translateY(100%) rotateX(90deg); }
          100%      { transform: translateY(100%) rotateX(0deg); }
        }
        @keyframes cwFoldLeft {
          0%, 10%   { transform: translateX(-100%) rotateY(0deg); }
          38%, 76%  { transform: translateX(-100%) rotateY(90deg); }
          100%      { transform: translateX(-100%) rotateY(0deg); }
        }
        @keyframes cwFoldRight {
          0%, 10%   { transform: translateX(100%) rotateY(0deg); }
          38%, 76%  { transform: translateX(100%) rotateY(-90deg); }
          100%      { transform: translateX(100%) rotateY(0deg); }
        }
        @keyframes cwSpin {
          0%   { transform: rotateX(-16deg) rotateY(-18deg); }
          50%  { transform: rotateX(-16deg) rotateY(30deg); }
          100% { transform: rotateX(-16deg) rotateY(-18deg); }
        }
        @keyframes cwShadow {
          0%, 10%  { opacity: 0.5; transform: translateX(-50%) scaleX(1); }
          38%, 76% { opacity: 0.85; transform: translateX(-50%) scaleX(0.72); }
          100%     { opacity: 0.5; transform: translateX(-50%) scaleX(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cw-top, .cw-bottom, .cw-left, .cw-right, .cw-scene, .cw-shadow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────── */
const MIN_LOADER_MS = 3000; // loader always completes one full 3s cycle

export default function BuildathonsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://adminwing.onrender.com/api/events";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchPublishedEvents();
  }, []);

  const fetchPublishedEvents = async () => {
    const startedAt = Date.now();
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Error fetching published events:", err);
    } finally {
      const elapsed = Date.now() - startedAt;
      const remaining = MIN_LOADER_MS - elapsed;
      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen relative bg-white text-[#090909] selection:bg-[#22C55E] selection:text-black"
      style={{ fontFamily: FONT_STACK }}
    >
      <Navbar />

      <main className="pt-24 sm:pt-32 lg:pt-36 pb-24 max-w-[1500px] mx-auto px-6 md:px-12 space-y-16 text-left">

           {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111]">
            Buildathons & Hackathons Directory
          </h1>
          <p className="section-copy text-[#444] font-medium max-w-xl">
            Explore live hackathons and buildathons created on Turing Wings. Click any event card to open its dedicated standalone event portal.
          </p>
        </div>


        {/* Events Cards Grid */}
        {loading ? (
          <CubeNetLoader />
        ) : events.length === 0 ? (
          <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-[#111]">No Live Events Available</h3>
            <p className="text-xs text-[#444] font-medium max-w-md mx-auto">
              Check back soon! New AI Buildathons and Hackathons are launched regularly by Turing Wings leads.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => (
              <article
                key={evt._id}
                className="bg-[#F8F8F8] border border-black/10 hover:border-[#22C55E] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full bg-[#111] overflow-hidden">
                  <img
                    src={
                      evt.thumbnail ||
                      evt.heroBanner ||
                      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={evt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#090909] text-white shadow-md">
                      {evt.type || "Hackathon"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-[#22C55E] border border-[#22C55E]/40 shadow-sm">
                      {evt.status || "Published"}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#111] group-hover:text-[#22C55E] transition-colors line-clamp-1">
                      {evt.name}
                    </h3>
                    <p className="text-xs text-[#444] font-medium line-clamp-2 leading-relaxed">
                      {evt.tagline || evt.shortDescription || "Build next-generation applications in this innovation sprint."}
                    </p>
                  </div>

                  {evt.tracks && evt.tracks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {evt.tracks.slice(0, 3).map((trk, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-black/15 text-[#111] text-[10px] font-bold">
                          {trk.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#333] font-bold">
                    <div className="text-[#111]">
                      {evt.registrations?.length || 0} Registered
                    </div>
                    <div className="text-[#555]">
                      {evt.schedule?.eventStart ? new Date(evt.schedule.eventStart).toLocaleDateString() : "TBD"}
                    </div>
                  </div>

                  <Link
                    to={`/events/${evt.slug}`}
                    className="button-primary w-full justify-center mt-2 text-center text-white"
                  >
                    <span>Open Standalone Event Webpage</span>
                    <span className="text-[#22C55E]">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}