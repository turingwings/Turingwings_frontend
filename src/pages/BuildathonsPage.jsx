import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BuildathonsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://turingwings-backend.onrender.com/api/events";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchPublishedEvents();
  }, []);

  const fetchPublishedEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Error fetching published events:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-white text-[#090909] font-mono selection:bg-[#22C55E] selection:text-black">
      <Navbar />

      <main className="pt-24 sm:pt-32 lg:pt-36 pb-24 max-w-[1500px] mx-auto px-6 md:px-12 space-y-16 text-left">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <p className="eyebrow text-[#22C55E] font-bold">04 / EVENT ENGINE</p>
          <h1 className="section-title text-[#111]">
            Buildathons & <br />
            <span className="text-[#555]">Hackathons Directory.</span>
          </h1>
          <p className="section-copy text-[#444] font-medium max-w-xl">
            Explore live hackathons and buildathons created on Turing Wings. Click any event card to open its dedicated standalone event portal.
          </p>
        </div>

        {/* Events Cards Grid */}
        {loading ? (
          <div className="py-24 text-center text-[#111] text-xs uppercase tracking-widest font-bold">
            Fetching live hackathons & buildathons...
          </div>
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
                {/* Event Card Header Image */}
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

                {/* Event Body Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#111] group-hover:text-[#22C55E] transition-colors line-clamp-1">
                      {evt.name}
                    </h3>
                    <p className="text-xs text-[#444] font-medium line-clamp-2 leading-relaxed">
                      {evt.tagline || evt.shortDescription || "Build next-generation applications in this innovation sprint."}
                    </p>
                  </div>

                  {/* Tracks Badges */}
                  {evt.tracks && evt.tracks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {evt.tracks.slice(0, 3).map((trk, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-black/15 text-[#111] text-[10px] font-bold">
                          {trk.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Meta Stats */}
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#333] font-bold">
                    <div className="text-[#111]">
                      {evt.registrations?.length || 0} Registered
                    </div>
                    <div className="text-[#555]">
                      {evt.schedule?.eventStart ? new Date(evt.schedule.eventStart).toLocaleDateString() : "TBD"}
                    </div>
                  </div>

                  {/* Open Separate Event Portal Button */}
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
