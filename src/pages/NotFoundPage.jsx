import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-[#090909] flex flex-col justify-between font-mono selection:bg-[#22C55E] selection:text-black">
      <Navbar />

      <main className="py-32 px-6 md:px-12 max-w-[1500px] mx-auto w-full flex flex-col items-center justify-center text-center space-y-8 my-auto">
        <div className="space-y-4 max-w-xl">
          <p className="eyebrow text-[#22C55E] font-bold">404 ERROR / PAGE NOT FOUND</p>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#111]">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
            Lost in the Engineering Grid?
          </h2>

          <p className="text-xs md:text-sm text-[#555] leading-relaxed">
            The page or route you are looking for does not exist or has been relocated within the Turing Wings platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/" className="button-primary">
            Return to Homepage <span>↗</span>
          </Link>
          <Link to="/buildathons" className="rounded-full border border-black/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[.15em] text-black transition hover:border-[#22C55E] hover:text-[#22C55E] bg-white">
            Explore Buildathons ⚡
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
