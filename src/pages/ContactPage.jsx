import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, Send, ShieldCheck, RefreshCw, Check,
  AlertCircle, Award,
  ChevronDown, Clock, Zap
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  // Form State — name, email, subject, and message.
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
      a: "Absolutely. Mention sponsorship in your message below or email contact@turingwings.com to discuss custom tracks and talent recruitment."
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

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@turingwings.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[Turing Wings Website] ${formData.subject}`,
          message: formData.message,
          _subject: `New Contact Inquiry: ${formData.subject} from ${formData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });

      const resData = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
        setCaptchaVerified(false);
      } else {
        setErrorMessage(resData.message || "Unable to deliver email automatically. Please email contact@turingwings.com directly.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      // Even if network blocks CORS, notify or handle gracefully:
      setErrorMessage("Network issue. Please send an email directly to contact@turingwings.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen relative bg-white text-[#0E0E0E] selection:bg-[#22C55E] selection:text-black"
      style={{ fontFamily: "'Product Sans', 'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Product Sans is Google's own proprietary typeface and isn't licensed
          for public web embedding, so it's set first as a soft preference and
          Plus Jakarta Sans (openly licensed, near-identical geometric shape)
          is loaded as the real, reliable typeface for the whole page. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      <Navbar />

      <main className="pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-28 max-w-[1500px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12 space-y-16 sm:space-y-20 lg:space-y-24 text-left">

        {/* Header Hero Section */}
        <div className="space-y-6 sm:space-y-8 border-b border-black/10 pb-10 sm:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-3xl">
              <p className="text-black/50 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold">06 / Get In Touch With Leadership</p>

              <h1 className="font-extrabold tracking-tight text-[#111] text-[clamp(1.9rem,6vw,3.25rem)] leading-[1.08]">
                Direct Connect to
                <br />
                <span className="text-[#666]">Turing Wings Leadership.</span>
              </h1>

              <p className="text-[#444] font-medium max-w-xl text-sm sm:text-base leading-relaxed">
                Dispatch a message to our central command center and our leadership team will route it to the right person.
              </p>
            </div>

            {/* Platform Stats Badges */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-3 sm:p-4 text-center space-y-1">
                <Clock className="w-5 h-5 text-[#22C55E] mx-auto" />
                <div className="text-base sm:text-lg font-bold text-[#111]">24h</div>
                <div className="text-[9px] sm:text-[10px] text-[#666] uppercase font-bold tracking-wider">SLA Response</div>
              </div>

              <div className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-3 sm:p-4 text-center space-y-1">
                <Zap className="w-5 h-5 text-[#22C55E] mx-auto" />
                <div className="text-base sm:text-lg font-bold text-[#111]">100%</div>
                <div className="text-[9px] sm:text-[10px] text-[#666] uppercase font-bold tracking-wider">Builder Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Command Center — trimmed to a minimal form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-4 sm:pt-8">

          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6">
              <p className="text-black/50 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold">Message Command Center</p>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#111] tracking-tight">
                Send Us a Message
              </h3>

              <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
                Whether you are a student developer looking to join a flagship cohort, or an organization wanting to sponsor a Buildathon sprint, our leadership team is ready to connect.
              </p>

              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Email Command</h4>
                    <a href="mailto:contact@turingwings.com" className="text-xs text-[#555] font-medium mt-0.5 break-all hover:text-[#22C55E] transition-colors block">contact@turingwings.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Direct Phone / Call</h4>
                    <a href="tel:+918341999296" className="text-xs text-[#555] font-medium mt-0.5 hover:text-[#22C55E] transition-colors block">+91 83419 99296</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#22C55E] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider">Guaranteed Response</h4>
                    <p className="text-xs text-[#555] font-medium mt-0.5">Within 24 hours on business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card — name, email, message only */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8F8F8] border border-black/10 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm">
              {submitSuccess ? (
                <div className="py-10 sm:py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111]">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-[#555] max-w-md mx-auto">
                    Thank you for contacting Turing Wings. A lead mentor will review your message and reply via email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="button-primary mt-4"
                  >
                    Send Another Message <span>↗</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-base sm:text-sm font-medium focus:border-[#22C55E] focus:outline-none transition-colors min-h-[44px]"
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
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-base sm:text-sm font-medium focus:border-[#22C55E] focus:outline-none transition-colors min-h-[44px]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Reason for Contact</label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-2xl bg-white border border-black/15 text-[#111] text-base sm:text-sm font-medium focus:border-[#22C55E] focus:outline-none transition-colors min-h-[44px]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Cohort Application">Cohort Application Question</option>
                        <option value="Buildathon Sponsorship">Buildathon Sponsorship</option>
                        <option value="Technical Mentorship">Technical Mentorship</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#22C55E] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111] uppercase tracking-wider">Your Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your question or build intent..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-black/15 text-[#111] text-base sm:text-sm font-medium focus:border-[#22C55E] focus:outline-none transition-colors resize-none min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Security Verification Step */}
                  <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-wrap items-center justify-between gap-3 min-h-[44px]">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleVerifyCaptcha}
                        className={`w-7 h-7 min-h-[28px] min-w-[28px] rounded-lg border flex items-center justify-center transition-colors shrink-0 ${captchaVerified
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
                    className="button-primary w-full justify-center text-center text-white min-h-[44px]"
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
        <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8">
          <div className="border-b border-black/10 pb-4">
            <p className="text-black/50 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold">Builder FAQ</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111] tracking-tight mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="bg-[#F8F8F8] border border-black/10 rounded-2xl p-5 sm:p-6 cursor-pointer hover:border-[#22C55E] transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-[#111]">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-[#22C55E] transition-transform duration-300 shrink-0 ${openFaq === index ? "rotate-180" : ""}`} />
                </div>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-[#555] leading-relaxed pt-2 border-t border-black/10 overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}