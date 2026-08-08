import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, Quote, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function ReviewsSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const reviews = [
    {
      name: "Aarav Sharma",
      role: "Engineering Student & Creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "Turing Wings transformed how I think about building software. Vibe Coding allowed me to build a functional AI SaaS prototype in just 3 days!",
      badge: "Vibe Coding Cohort",
      badgeColor: isLight ? "bg-amber-50 text-amber-800 border-amber-200" : "bg-amber-500/10 text-amber-300 border-amber-500/30"
    },
    {
      name: "Priya Patel",
      role: "UI/UX Freelancer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "I had zero backend coding experience. The AI Web Creation bootcamp made modern development so simple, practical, and inspiring.",
      badge: "Web Creation Bootcamp",
      badgeColor: isLight ? "bg-yellow-50 text-yellow-800 border-yellow-200" : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
    },
    {
      name: "Rohan Verma",
      role: "Buildathon Winner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "The buildathons are high-energy and hands-on. I met amazing collaborators and launched our first MVP live in front of mentors!",
      badge: "Buildathon Sprint",
      badgeColor: isLight ? "bg-amber-50 text-amber-800 border-amber-200" : "bg-amber-500/15 text-amber-200 border-amber-500/35"
    },
    {
      name: "Ananya Gupta",
      role: "Design Student & Builder",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment: "Learning by creating is 100% real here. No endless boring theory — just pure building with modern AI workflows and tools.",
      badge: "AI Tools & Workflows",
      badgeColor: isLight ? "bg-yellow-50 text-yellow-800 border-yellow-200" : "bg-yellow-500/15 text-yellow-200 border-yellow-500/35"
    }
  ];

  return (
    <section
      id="reviews"
      className={`py-20 md:py-28 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-800" : "bg-transparent text-slate-100"
      }`}
    >
      {/* Static Ambient Gold Glows */}
      <div className={`absolute top-1/3 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        isLight ? "bg-amber-300/30" : "bg-amber-500/15"
      }`} />
      
      <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        isLight ? "bg-yellow-300/30" : "bg-yellow-500/15"
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border inline-block mb-4 shadow-sm ${
            isLight ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-amber-500/10 border-amber-500/30 text-amber-300"
          }`}>
            CREATOR TESTIMONIALS
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif italic leading-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            What <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Creators & Students</span> Say
          </h2>
          <p className={`text-base sm:text-lg mt-4 leading-relaxed ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Hear from beginners, students, and innovators who built their first digital products using Turing Wings AI workflows.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`rounded-3xl p-7 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative group text-left border overflow-hidden ${
                isLight ? "bg-white border-slate-200 hover:border-amber-500/50" : "bg-slate-900 border-amber-500/20 hover:border-amber-400/50"
              }`}
            >
              {/* Background Quote Icon Accent */}
              <Quote className={`absolute top-6 right-6 w-16 h-16 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity ${
                isLight ? "text-slate-900" : "text-amber-400"
              }`} />

              <div className="relative z-10">
                {/* Top Rating & Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${review.badgeColor}`}>
                    {review.badge}
                  </span>
                </div>

                {/* Comment Quote */}
                <p className={`text-sm sm:text-base leading-relaxed italic mb-6 ${
                  isLight ? "text-slate-700" : "text-slate-200"
                }`}>
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className={`pt-4 border-t flex items-center gap-3 relative z-10 ${isLight ? "border-slate-100" : "border-slate-800"}`}>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
                <div>
                  <h4 className={`text-sm font-bold font-serif italic ${isLight ? "text-slate-900" : "text-white"}`}>
                    {review.name}
                  </h4>
                  <p className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA Callout Banner with Shimmer Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-8 sm:p-12 text-center text-slate-950 relative overflow-hidden shadow-2xl shadow-amber-500/20"
        >
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/15 border border-slate-950/20 text-slate-950 text-xs font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Movement</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif italic text-slate-950">
              Join 500+ Confident Creators Building Today
            </h3>
            <p className="text-slate-950/90 font-medium text-sm sm:text-base">
              Start your journey from learning to creating. Master AI-powered workflows, vibe coding, and launch real digital projects.
            </p>
            
            <div className="pt-2 flex justify-center">
              <LayeredMetallicGoldButton
                text="Start Building Now"
                to="/portal/auth/v1/account-access"
                size="md"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
