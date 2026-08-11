import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-[#0E0E0E] flex flex-col justify-between selection:bg-[#22C55E] selection:text-black"
      style={{ fontFamily: "'Product Sans', 'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Product Sans is Google's own proprietary typeface and isn't licensed
          for public web embedding, so it's set first as a soft preference and
          Plus Jakarta Sans (openly licensed, near-identical geometric shape)
          is loaded as the real, reliable typeface for the whole page. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .enter-item {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .enter-in { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .enter-item { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <Navbar />

      <main className="py-24 sm:py-32 px-5 sm:px-6 md:px-12 max-w-[1500px] mx-auto w-full flex flex-col items-center justify-center text-center space-y-8 my-auto">
        <div className="space-y-4 max-w-xl">
          <p
            className={`enter-item ${loaded ? "enter-in" : ""} text-[#22C55E] font-bold text-[11px] sm:text-xs uppercase tracking-[0.14em]`}
          >
            404 Error / Page Not Found
          </p>

          <h1
            className={`enter-item ${loaded ? "enter-in" : ""} font-extrabold tracking-tight text-[#111] text-[clamp(3.5rem,16vw,7rem)] leading-none`}
            style={{ transitionDelay: "80ms" }}
          >
            404
          </h1>

          <h2
            className={`enter-item ${loaded ? "enter-in" : ""} text-xl sm:text-2xl md:text-3xl font-bold text-[#111] leading-snug`}
            style={{ transitionDelay: "160ms" }}
          >
            Lost in the Engineering Grid?
          </h2>

          <p
            className={`enter-item ${loaded ? "enter-in" : ""} text-xs sm:text-sm text-[#555] leading-relaxed`}
            style={{ transitionDelay: "230ms" }}
          >
            The page or route you are looking for does not exist or has been relocated within the Turing Wings platform.
          </p>
        </div>

        <div
          className={`enter-item ${loaded ? "enter-in" : ""} flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 w-full max-w-sm sm:max-w-none`}
          style={{ transitionDelay: "300ms" }}
        >
          <Link to="/" className="button-primary justify-center">
            Return to Homepage <span>↗</span>
          </Link>
          <Link
            to="/buildathons"
            className="rounded-full border border-black/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[.15em] text-black transition hover:border-[#22C55E] hover:text-[#22C55E] bg-white text-center"
          >
            Explore Buildathons ⚡
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}