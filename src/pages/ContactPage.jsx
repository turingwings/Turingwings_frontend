import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, Send, ShieldCheck, RefreshCw, Check,
  AlertCircle, X, Cpu, Lock, Layout, Award,
  ChevronDown, Clock, Users, Zap, BrainCircuit
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedMember, setSelectedMember] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 4 Lead Mentors
  const teamMembers = [
    {
      num: "01",
      id: "sahith-akula",
      name: "Sahith Akula",
      role: "Backend Lead",
      icon: Cpu,
      phone: "+91 98765 43211",
      email: "sahith.akula@turingwings.org",
      bio: "High-performance serverless backends & microservices architecture.",
      skills: ["Node.js", "PostgreSQL", "Go", "Docker"]
    },
    {
      num: "02",
      id: "ratnakar",
      name: "Ratnakar",
      role: "Cybersecurity Lead",
      icon: Lock,
      phone: "+91 98765 43210",
      email: "ratnakar.cyber@turingwings.org",
      bio: "Zero-trust security architecture & cloud penetration testing.",
      skills: ["Zero-Trust", "Pen Testing", "Cloud Sec"]
    },
    {
      num: "03",
      id: "manoj-kumar",
      name: "Manoj Kumar",
      role: "Full Stack Lead",
      icon: Layout,
      phone: "+91 98765 43212",
      email: "manoj.kumar@turingwings.org",
      bio: "React & Next.js frontend systems with modern AI integrations.",
      skills: ["React & Next", "AI UI", "Tailwind"]
    },
    {
      num: "04",
      id: "manikanta",
      name: "Manikanta",
      role: "AI & ML Systems Lead",
      icon: BrainCircuit,
      phone: "+91 98765 43213",
      email: "manikanta@turingwings.org",
      bio: "LLM agent orchestration, RAG architectures & model pipelines.",
      skills: ["LLM Agents", "RAG Pipelines", "PyTorch"]
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: "How do I apply for a flagship Turing Wings cohort?",
      a: "Select your desired cohort on the homepage or reach out directly to the lead mentor via the contact form on this page. Our team will review your background and guide you through onboarding."
    },
    {
      q: "Can I participate in Buildathons as a beginner?",
      a: "Yes! All Turing Wings Buildathons feature beginner-friendly tracks, live mentor office hours, and step-by-step guidance from our lead mentors."
    },
    {
      q: "How quickly will a mentor respond to my message?",
      a: "Our leadership team maintains a strict 24-hour response SLA on business days for all student and sponsor inquiries."
    },
    {
      q: "Can organizations partner or sponsor a Buildathon?",
      a: "Absolutely. Select 'Buildathon Sponsorship' in the subject field below or email contact@turingwings.org to discuss custom tracks and talent recruitment."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyCaptcha = () => {
    if (captchaVerified) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaVerified(true);
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!captchaVerified) {
      setErrorMessage("Please complete the security verification step.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      });
      setCaptchaVerified(false);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen relative bg-white text-[#090909] font-mono selection:bg-[#22C55E] selection:text-black">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-28 max-w-[1500px] mx-auto px-6 md:px-12 space-y-24 text-left">
        
        {/* Header Hero Section */}
        <div className="space-y-8 border-b border-black/10 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <p className="eyebrow text-black/50">06 / GET IN TOUCH WITH LEADERSHIP</p>

              <h1 className="section-title text-[#111]">
                Direct Connect to <br />
                <span className="text-[#666]">Turing Wings Mentors.</span>
              </h1>

              <p className="section-copy text-[#444] font-medium max-w-xl text-sm md:text-base leading-relaxed">
                Reach out directly to our 4 lead mentors or dispatch a message to our central command center below.
              </p>
            </div>

            {/* Platform Stats Badges */}
            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-4 text-center space-y-1">
                <Clock className="w-5 h-5 text-[#22C55E] mx-auto" />
                <div className="text-lg font-bold text-[#111]">24h</div>
                <div className="text-[10px] text-[#666] uppercase font-bold tracking-wider">SLA Response</div>
              </div>

              <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-4 text-center space-y-1">
                <Users className="w-5 h-5 text-[#22C55E] mx-auto" />
                <div className="text-lg font-bold text-[#111]">4 Mentors</div>
                <div className="text-[10px] text-[#666] uppercase font-bold tracking-wider">Direct Access</div>
              </div>

              <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-4 text-center space-y-1">
                <Zap className="w-5 h-5 text-[#22C55E] mx-auto" />
                <div className="text-lg font-bold text-[#111]">100%</div>
                <div className="text-[10px] text-[#666] uppercase font-bold tracking-wider">Builder Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Mentors Simple Horizontal Row with Circular Cards */}
        <div className="space-y-8">
          <div className="border-b border-black/10 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#111] tracking-tight">Technical Mentorship Lead Row</h2>
              <p className="text-xs text-[#555] mt-1">Direct contact for cohort leads</p>
            </div>
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">4 Mentors</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => {
              const Icon = member.icon;
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="bg-[#F8F8F8] border border-black/10 hover:border-[#22C55E] rounded-3xl p-6 flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Circle Card Badge */}
                  <div className="relative w-24 h-24 rounded-full bg-white border border-black/15 flex flex-col items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-[#22C55E] transition-all">
                    <Icon className="w-8 h-8 text-[#22C55E]" />
                    <span className="text-[10px] font-bold text-[#666] mt-1">{member.num}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#111] group-hover:text-[#22C55E] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-bold text-[#22C55E]">{member.role}</p>
                    <p className="text-xs text-[#555] font-medium line-clamp-2 pt-1">
                      {member.bio}
                    </p>
                  </div>

                  {/* Direct Contact Chips */}
                  <div className="pt-2 w-full space-y-1.5 text-[11px] font-bold text-[#333]">
                    <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl bg-white border border-black/10 truncate">
                      <Phone className="w-3 h-3 text-[#22C55E] shrink-0" />
                      <span className="truncate">{member.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl bg-white border border-black/10 truncate">
                      <Mail className="w-3 h-3 text-[#22C55E] shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-8 space-y-6">
              <p className="eyebrow text-black/50">MESSAGE COMMAND CENTER</p>

              <h3 className="text-3xl font-bold text-[#111] tracking-tight">
                Send Us a Message
              </h3>

              <p className="text-xs text-[#444] leading-relaxed">
                Whether you are a student developer looking to join a flagship cohort, or an organization wanting to sponsor a Buildathon sprint, our leadership team is ready to connect.
              </p>

              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Email Command</h4>
                    <p className="text-xs text-[#555] font-medium mt-0.5">contact@turingwings.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Guaranteed Response</h4>
                    <p className="text-xs text-[#555] font-medium mt-0.5">Within 24 Hours on Business Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111]">Message Dispatched!</h3>
                  <p className="text-xs text-[#555] max-w-md mx-auto">
                    Thank you for contacting Turing Wings. A lead mentor will review your transmission and reply via email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="button-primary mt-4"
                  >
                    Send Another Message <span>↗</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-xs font-medium focus:border-[#22C55E] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-xs font-medium focus:border-[#22C55E] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Subject Category</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-xs font-medium focus:border-[#22C55E] focus:outline-none transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Cohort Application">Cohort Application Question</option>
                      <option value="Buildathon Sponsorship">Buildathon Sponsorship</option>
                      <option value="Technical Mentorship">Technical Mentorship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Your Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your question or build intent..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-xs font-medium focus:border-[#22C55E] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Security Verification Step */}
                  <div className="p-4 rounded-2xl bg-white border border-black/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleVerifyCaptcha}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                          captchaVerified
                            ? "bg-[#22C55E] border-[#22C55E] text-black"
                            : "border-black/30 hover:border-[#22C55E]"
                        }`}
                      >
                        {captchaLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#22C55E]" />
                        ) : captchaVerified ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : null}
                      </button>
                      <span className="text-xs font-bold text-[#111]">I am not a robot</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-[#666] font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      <span>Security Verified</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary w-full justify-center text-center text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Transmitting Message...
                      </span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4 text-[#22C55E]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="space-y-8 pt-8">
          <div className="border-b border-black/10 pb-4">
            <p className="eyebrow text-black/50">BUILDER FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111] tracking-tight mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-6 cursor-pointer hover:border-[#22C55E] transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-[#111]">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-[#22C55E] transition-transform duration-300 shrink-0 ${openFaq === index ? "rotate-180" : ""}`} />
                </div>
                {openFaq === index && (
                  <p className="text-xs text-[#555] leading-relaxed pt-2 border-t border-black/10 animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Mentor Modal Popup */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-black/10 rounded-3xl p-8 max-w-lg w-full space-y-6 relative shadow-2xl text-left font-mono"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#f8f8f8] hover:bg-black/10 text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white border border-black/15 flex items-center justify-center text-[#22C55E] shadow-sm">
                  {React.createElement(selectedMember.icon, { className: "w-7 h-7" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111]">{selectedMember.name}</h3>
                  <p className="text-xs text-[#22C55E] font-bold">{selectedMember.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Mentorship Focus</h4>
                <p className="text-xs text-[#444] leading-relaxed">{selectedMember.bio}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Technical Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((sk, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-[#f8f8f8] border border-black/10 text-black text-[10px] font-bold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 space-y-2 text-xs font-bold text-[#111]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#22C55E]" />
                  <span>{selectedMember.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#22C55E]" />
                  <span>{selectedMember.email}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
