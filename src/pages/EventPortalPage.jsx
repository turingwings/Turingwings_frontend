import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TemplateRegistry from "../modules/hackathon/templates/TemplateRegistry";
import { defaultEventData } from "../modules/hackathon/templates/ai-future/config/defaults";
import { RefreshCw } from "lucide-react";

export default function EventPortalPage() {
  const { slug } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [slug]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://turingwings-backend.onrender.com/api/events/${slug}`);
      if (res.ok) {
        const data = await res.json();
        
        // Build rich eligibility list from admin configuration
        const eligibilityList = [];
        if (data.eligibility?.category) eligibilityList.push(`Target Group: ${data.eligibility.category}`);
        if (data.eligibility?.ageLimit) eligibilityList.push(`Age Requirement: ${data.eligibility.ageLimit}`);
        if (data.eligibility?.collegeRestrictions) eligibilityList.push(`Institutional Policy: ${data.eligibility.collegeRestrictions}`);
        if (data.eligibility?.graduationYears?.length > 0) eligibilityList.push(`Graduation Batches: ${data.eligibility.graduationYears.join(", ")}`);
        if (eligibilityList.length === 0) {
          eligibilityList.push("Open to all students, developers, and creators worldwide.");
        }

        // Build rich rules list from admin configuration
        const rulesList = [];
        if (data.rules?.generalRules?.length > 0) rulesList.push(...data.rules.generalRules);
        if (data.rules?.teamRules?.length > 0) rulesList.push(...data.rules.teamRules);
        if (data.rules?.submissionRules?.length > 0) rulesList.push(...data.rules.submissionRules);
        if (data.rules?.codeOfConduct) rulesList.push(`Code of Conduct: ${data.rules.codeOfConduct}`);
        if (data.rules?.plagiarismPolicy) rulesList.push(`Plagiarism Policy: ${data.rules.plagiarismPolicy}`);
        if (rulesList.length === 0) {
          rulesList.push("All code must be written during the official event build window.");
        }

        // Build schedule timeline items
        const timelineList = [];
        if (data.schedule?.registrationOpen) {
          timelineList.push({ id: "reg-open", date: data.schedule.registrationOpen, title: "Registrations Open", description: "Registration portal goes live." });
        }
        if (data.schedule?.registrationClose) {
          timelineList.push({ id: "reg-close", date: data.schedule.registrationClose, title: "Registrations Close", description: "Deadline to register your team." });
        }
        if (data.schedule?.eventStart) {
          timelineList.push({ id: "event-start", date: data.schedule.eventStart, title: "Event Kickoff & Problem Release", description: "Hackathon begins & problem statements revealed." });
        }
        if (data.schedule?.submissionDeadline) {
          timelineList.push({ id: "submission", date: data.schedule.submissionDeadline, title: "Project Submission Deadline", description: "Freeze code and submit repository link." });
        }
        if (data.schedule?.winnerAnnouncementDate) {
          timelineList.push({ id: "winners", date: data.schedule.winnerAnnouncementDate, title: "Grand Winner Announcement", description: "Awards ceremony & results release." });
        }
        if (timelineList.length === 0) {
          timelineList.push(...defaultEventData.timeline);
        }

        // Transform full MongoDB event data shape into template contract
        const transformedData = {
          templateId: data.templateId || "ai-future",
          backgroundStyle: data.backgroundStyle || "particles",
          meta: {
            name: data.name || "Turing Wings Event",
            shortName: data.shortName || data.name,
            tagline: data.tagline || "Build Next-Gen Applications",
            status: data.status === "Published" ? "upcoming" : "upcoming",
            startDate: data.schedule?.eventStart || new Date().toISOString(),
            endDate: data.schedule?.submissionDeadline || new Date().toISOString(),
            venue: data.venue?.name || "Turing Wings Virtual Platform",
            mode: data.venue?.type || "Online Global Portal",
            slug: data.slug,
          },
          hero: {
            eyebrow: `Turing Wings ${data.type || "Hackathon"}`,
            headline: data.name,
            subheadline: data.tagline || data.shortDescription || "Join top builders and compete for global recognition.",
            primaryCta: { label: "Register your team", path: "/register" },
            secondaryCta: { label: "Explore tracks", path: "/tracks" },
            heroBanner: data.heroBanner,
            introVideo: data.introVideo,
          },
          about: {
            title: `About ${data.name}`,
            body: data.fullDescription || data.shortDescription || "A premier innovation sprint bringing creators together.",
            highlights: (data.objectives || [
              "Build production-grade web applications",
              "Demonstrate 12x development speed",
              "Collaborate with international builder squads",
            ]).map((obj, i) => ({
              title: `Objective ${i + 1}`,
              description: obj,
            })),
          },
          statistics: [
            { label: "Max Team Size", value: data.registrationConfig?.maxTeamSize || 4, suffix: " Members" },
            { label: "Challenge Tracks", value: data.tracks?.length || 3, suffix: " Tracks" },
            { label: "Prizes & Rewards", value: data.prizes?.length || 3, suffix: " Categories" },
            { label: "Mentors & Judges", value: (data.judges?.length || 0) + (data.mentors?.length || 0) || 4, suffix: "+" },
          ],
          timeline: timelineList,
          tracks: data.tracks && data.tracks.length > 0 ? data.tracks.map((t, idx) => ({
            id: t.id || `trk-${idx}`,
            name: t.name || `Track ${idx + 1}`,
            code: `TRK-0${idx + 1}`,
            description: t.description || "Build cutting edge solutions for this track.",
          })) : defaultEventData.tracks,
          eligibility: eligibilityList,
          rules: rulesList,
          prizes: data.prizes && data.prizes.length > 0 ? data.prizes.map((p) => ({
            place: p.title || "Winner Prize",
            amount: p.cashAmount ? `$${p.cashAmount}` : p.reward || "$1,000",
            description: p.swag || p.reward || p.category || "Winner Trophy & Swag Box",
          })) : defaultEventData.prizes,
          judges: data.judges && data.judges.length > 0 ? data.judges.map((j, idx) => ({
            id: j.id || `j-${idx}`,
            name: j.name,
            role: j.designation || j.company || "Event Judge",
            photo: j.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            bio: j.bio,
            linkedin: j.linkedin,
          })) : defaultEventData.judges,
          mentors: data.mentors && data.mentors.length > 0 ? data.mentors.map((m, idx) => ({
            id: m.id || `m-${idx}`,
            name: m.name,
            expertise: m.designation || m.company || m.expertise || "Mentor",
            photo: m.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            bio: m.bio,
            linkedin: m.linkedin,
          })) : defaultEventData.mentors,
          sponsors: data.sponsors && data.sponsors.length > 0 ? data.sponsors.map((s, idx) => ({
            id: s.id || `s-${idx}`,
            name: s.name,
            tier: s.tier || "Gold",
            logo: s.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
            website: s.website,
          })) : defaultEventData.sponsors,
          faqs: data.faqs && data.faqs.length > 0 ? data.faqs.map((f) => ({
            q: f.question,
            a: f.answer,
          })) : defaultEventData.faqs,
          contact: {
            email: data.contact?.coordinatorEmail || data.contact?.supportEmail || "contact@turingwings.com",
            phone: data.contact?.coordinatorPhone || data.contact?.emergencyContact || "+91 9876543210",
            address: data.venue?.address || "Turing Wings Online Virtual Arena",
            coordinatorName: data.contact?.coordinatorName || "Manoj Kumar Allu",
            socials: {
              twitter: "#",
              linkedin: "#",
              instagram: "#",
              discord: data.contact?.discord || "https://discord.gg/turingwings",
              whatsapp: data.contact?.whatsapp || "https://chat.whatsapp.com/turingwings",
              telegram: data.contact?.telegram || "https://t.me/turingwings",
            },
          },
          customQuestions: data.customQuestions || [],
          registrationConfig: data.registrationConfig || {},
        };

        setEventData(transformedData);
      } else {
        setEventData(defaultEventData);
      }
    } catch (err) {
      console.error("Error fetching event portal data:", err);
      setEventData(defaultEventData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4 font-sans">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm font-mono text-slate-400">Loading dedicated Hackathon Webpage Portal...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative font-sans">
      {/* Dynamic Multi-Template Event Webpage */}
      <TemplateRegistry
        templateId={eventData?.templateId || "ai-future"}
        eventData={eventData || defaultEventData}
      />
    </div>
  );
}
