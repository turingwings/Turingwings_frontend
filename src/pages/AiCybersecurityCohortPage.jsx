import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShieldCheck, Terminal, Cpu, Lock, AlertTriangle, CheckCircle2, ArrowRight,
  Sparkles, Key, Radio, ChevronDown, Zap, FileText, Calendar, Bug, Search,
  Code2, Wifi, Eye, Layers, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiCybersecurityCohortPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [openDay, setOpenDay] = useState(0);
  const [activeTool, setActiveTool] = useState(null);

  const securityMatrix = [
    { code: 'SEC-01', title: 'Network Recon', desc: 'OSI, TCP/IP & Kali Linux setup', icon: Wifi },
    { code: 'SEC-02', title: 'Web App Pentest', desc: 'Burp Suite & OWASP Top 10', icon: Bug },
    { code: 'SEC-03', title: 'Python Auto', desc: 'Log parsers & OSINT tools', icon: Code2 },
    { code: 'SEC-04', title: 'AI SOC Agents', desc: 'Model Context Protocol (MCP)', icon: Cpu },
  ];

  const weeksData = [
    {
      week: 1,
      code: 'OP-01',
      icon: Wifi,
      title: 'Networking & Kali Linux Essentials',
      subtitle: 'Build a Cyber Foundation & Terminal Command Mastery',
      goal: 'Understand internet device communication, set up a Kali Linux VM, and capture packets in Wireshark.',
      days: [
        {
          icon: Terminal,
          title: 'Cybersecurity Foundations & Kali Setup',
          theory: 'CIA Triad, Ethical Hacking principles, VM setup.',
          practical: 'Install Kali Linux VM & configure workspace.',
        },
        {
          icon: Wifi,
          title: 'Networking & IP Architecture',
          theory: 'Routers, Switches, Firewalls, IPv4 vs IPv6, Ports & Protocols.',
          practical: 'Terminal commands: ip a, ping, traceroute, nslookup, dig.',
        },
        {
          icon: Radio,
          title: 'Wireshark Packet Analysis & Linux Terminal',
          theory: 'OSI 7-Layer Model, Packet Flow, Linux File Permissions.',
          practical: 'Live Wireshark packet capture & Linux shell scripts.',
        },
      ],
      miniProject: 'Build & configure a complete Kali Linux Cyber Lab Environment.',
    },
    {
      week: 2,
      code: 'OP-02',
      icon: Bug,
      title: 'Web Security & Ethical Pentesting',
      subtitle: 'Burp Suite Proxy, OWASP Top 10 & Scanners',
      goal: 'Inspect HTTP traffic, master Burp Suite, and perform vulnerability scans with OWASP ZAP.',
      days: [
        {
          icon: Key,
          title: 'HTTP Protocol & Burp Suite Proxy',
          theory: 'Client-Server architecture, HTTP headers, Cookies & Sessions.',
          practical: 'Burp Suite Intercept, Repeater, & directory discovery.',
        },
        {
          icon: AlertTriangle,
          title: 'OWASP Top 10 & Security Scanning',
          theory: 'SQL Injection, XSS, CSRF, Insecure Direct Object References.',
          practical: 'DVWA & Juice Shop lab pentesting with OWASP ZAP & Nikto.',
        },
        {
          icon: FileText,
          title: 'Security Assessment Reporting',
          theory: 'Penetration testing lifecycle & vulnerability documentation.',
          practical: 'Generate executive security audit report with proof-of-concept.',
        },
      ],
      miniProject: 'Perform a Web Application Security Audit & generate an executive report.',
    },
    {
      week: 3,
      code: 'OP-03',
      icon: Code2,
      title: 'Python Security Automation & OSINT',
      subtitle: 'Automate Log Parsers, Port Tools & Threat Intel APIs',
      goal: 'Write Python scripts for log parsing, IP lookups, and OSINT threat intelligence collection.',
      days: [
        {
          icon: Code2,
          title: 'Python Fundamentals & Log Parsers',
          theory: 'Python syntax, conditions, file handling, regular expressions.',
          practical: 'Write an automated log parser for authentication attacks.',
        },
        {
          icon: Search,
          title: 'Network Utilities & AI Scripting Assistance',
          theory: 'Sockets, HTTP requests library, AI prompt engineering for security code.',
          practical: 'Build a Python host scanner & threat intelligence utility.',
        },
        {
          icon: Eye,
          title: 'Automation Security Workflow',
          theory: 'SOC Indicators of Compromise (IOCs) & file hash verification.',
          practical: 'Combine scripts into an automated incident response tool.',
        },
      ],
      miniProject: 'Build a Python OSINT Threat Intelligence Tool.',
    },
    {
      week: 4,
      code: 'OP-04',
      icon: Cpu,
      title: 'Autonomous AI Security Agents (MCP)',
      subtitle: 'Build Multi-Agent SOC Workflows with Model Context Protocol',
      goal: 'Agentic AI frameworks, Ollama local LLMs, tool calling via MCP, and a Capstone presentation.',
      days: [
        {
          icon: Sparkles,
          title: 'Agentic AI & Model Context Protocol',
          theory: 'LLM agents vs chat assistants, MCP specification, local models.',
          practical: 'Setup Ollama, Llama 3, OpenClaw & build an initial Security Agent.',
        },
        {
          icon: Layers,
          title: 'Multi-Agent Threat Analysis Workflows',
          theory: 'Tool permissions, VirusTotal API, Nmap integration, agent delegation.',
          practical: 'Build a Multi-Agent SOC assessment system.',
        },
        {
          icon: ShieldCheck,
          title: 'Capstone Project & Demo Day',
          theory: 'Autonomous AI Security Systems, LLM security risks.',
          practical: 'Live Demonstration & Solo Capstone presentation.',
        },
      ],
      miniProject: 'Build an Autonomous AI Agent for Automated Cybersecurity Assessment.',
    },
  ];

  const toolsList = [
    {
      name: 'Kali Linux', desc: 'Pentesting OS', icon: Terminal,
      mainUse: 'Your entire lab runs on it — a Linux distribution pre-loaded with the recon, exploitation, and analysis tools used throughout the cohort.',
    },
    {
      name: 'Burp Suite', desc: 'Intercept Proxy', icon: Bug,
      mainUse: 'Sits between your browser and the target app so you can intercept, inspect, and modify every HTTP request — the core tool for manual web pentesting.',
    },
    {
      name: 'Nmap & Gobuster', desc: 'Reconnaissance', icon: Search,
      mainUse: 'Maps a target before you attack it — open ports, running services, and hidden directories, so every later step is aimed at something real.',
    },
    {
      name: 'Wireshark', desc: 'Packet Analyzer', icon: Radio,
     mainUse: "Captures raw network traffic frame by frame, letting you see exactly what's moving across the wire during an attack or a normal session.",
    },
    {
      name: 'OWASP ZAP & Nikto', desc: 'Vulnerability Scanners', icon: AlertTriangle,
      mainUse: 'Automates the first pass of a security audit — scanning an application or server for known misconfigurations and vulnerability classes.',
    },
    {
      name: 'Python 3', desc: 'Security Automation', icon: Code2,
      mainUse: 'Turns one-off manual checks into repeatable tools — log parsers, port scanners, and OSINT utilities you build and keep.',
    },
    {
      name: 'Ollama & Llama 3', desc: 'Local AI Models', icon: Sparkles,
      mainUse: 'Runs an LLM entirely on your own machine, so your security agents can reason about logs and alerts without sending sensitive data anywhere.',
    },
    {
      name: 'OpenClaw & MCP', desc: 'Agentic Framework', icon: Layers,
      mainUse: 'The framework behind Week 4 — lets an AI agent actually call your security tools (Nmap, VirusTotal, log parsers) instead of just talking about them.',
    },
  ];

  const activeWeekObj = weeksData.find((w) => w.week === activeWeek);

  const terminalLines = [
    { color: '#4ADE80', text: '$ nmap -sC -sV -p 80,443 target.turingwings.lab' },
    { color: '#38BDF8', text: '[+] Burp Suite Proxy Intercept: POST /api/login' },
    { color: '#4ADE80', text: '[+] OpenClaw AI Agent: Analyzing authentication logs...' },
    { color: '#F87171', text: '[ALERT]: SQL Injection pattern identified on username input', bold: true },
    { color: '#4ADE80', text: '[SUCCESS]: AI Agent generated security mitigation patch!', bold: true },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#0284C7] selection:text-white font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      {/* AMBIENT BACKGROUND FIELD */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#0284C7]/15 blur-[110px]"
          animate={{ x: [0, -35, 0], y: [0, 30, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-[26rem] h-[26rem] rounded-full bg-[#090909]/[0.05] blur-[110px]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 pt-28 sm:pt-36 pb-10 space-y-20">

        {/* HERO — cardless, sits in the ambient field */}
        <motion.div initial="hidden" animate="show" variants={container} className="max-w-3xl space-y-7">
          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/30 text-[#0284C7] text-xs font-bold font-mono">
              <ShieldCheck className="w-4 h-4" />
              4-WEEK CYBERSECURITY COHORT
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#090909] text-white text-xs font-bold font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              Launch — September 01, 2026
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold font-mono">
              Tuition ₹4,999
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            AI & Cybersecurity
            <br />
            <span className="text-[#0284C7]">Cohort</span>
          </motion.h1>

          <motion.p variants={item} className="text-base sm:text-lg text-black/70 font-medium max-w-xl">
            Networking, web pentesting, Python automation, and autonomous AI security agents — live, in four weeks.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link
              to="/cohorts/register?cohort=ai-cybersecurity"
              className="group py-3.5 px-7 rounded-2xl bg-[#090909] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#0284C7] transition-all text-center flex items-center justify-center gap-2 shadow-lg font-mono"
            >
              <Zap className="w-4 h-4 fill-current" />
              Join Security Ops • ₹4,999
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </Link>
            <a
              href="#security-schedule"
              className="py-3.5 px-5 rounded-2xl hover:bg-black/5 text-[#090909] font-bold text-xs text-center border border-black/15 transition-all flex items-center justify-center gap-2 font-mono"
            >
              View 4-Week Schedule
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-black/10 text-xs font-mono">
            {[
              ['Launch Date', 'Sep 01, 2026', '#0284C7'],
              ['Tuition Fee', '₹4,999', '#090909'],
              ['Duration', '4 Weeks Live', '#090909'],
              ['Lab Standard', 'MCP Agent Framework', '#15803D'],
            ].map(([label, value, color]) => (
              <div key={label}>
                <span className="text-black/45 text-[10px] uppercase block">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* LIVE TERMINAL — signature visual, typed-in line by line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="bg-[#090D16] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-3 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-[11px] text-slate-400 font-mono ml-1 hidden xs:inline">root@turingwings-sec:~#</span>
            </div>
            <span className="text-[10px] font-bold text-[#38BDF8] font-mono flex items-center gap-1.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              LIVE AI SOC TERMINAL
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono leading-relaxed overflow-x-auto">
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.35, duration: 0.3 }}
                style={{ color: line.color }}
                className={line.bold ? 'font-bold' : ''}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + terminalLines.length * 0.35 }}
              className="inline-flex items-center gap-1 text-slate-500"
            >
              <span>$</span>
              <motion.span
                className="w-1.5 h-3.5 bg-slate-400 inline-block"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </motion.span>
          </div>
        </motion.div>

        {/* PROGRAM STRUCTURE */}
        <div className="space-y-4">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Program Structure</h2>
            <p className="text-xs sm:text-sm text-black/50">Four stages, building from fundamentals to autonomous agents.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {securityMatrix.map((m) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.code}
                  variants={item}
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-2xl bg-white border border-black/10 space-y-1.5 shadow-xs text-center cursor-default"
                >
                  <span className="w-9 h-9 mx-auto rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-[10px] font-bold text-[#0284C7] font-mono block">{m.code}</span>
                  <h3 className="text-xs font-bold">{m.title}</h3>
                  <p className="text-[10px] text-black/60 leading-tight">{m.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* PROGRAM SCHEDULE — kill-chain progress timeline */}
        <div id="security-schedule" className="space-y-10 pt-2">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Weekly Schedule</h2>
            <p className="text-xs sm:text-sm text-black/50">Four weeks, each one unlocking the next.</p>
          </div>

          {/* MOBILE — compact progress + tap targets, no horizontal scroll */}
          <div className="sm:hidden space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold px-0.5">
              <span style={{ color: '#0284C7' }}>WEEK {activeWeek} OF {weeksData.length}</span>
              <span className="text-black/40">{activeWeekObj?.title.split(' ').slice(0, 3).join(' ')}</span>
            </div>
            <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#0284C7,#38BDF8)' }}
                animate={{ width: `${(activeWeek / weeksData.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {weeksData.map((w) => {
                const Icon = w.icon;
                const isActive = w.week === activeWeek;
                const isDone = w.week < activeWeek;
                return (
                  <button
                    key={w.week}
                    onClick={() => { setActiveWeek(w.week); setOpenDay(0); }}
                    className="cursor-pointer flex flex-col items-center gap-1.5"
                  >
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? '#090909' : isDone ? '#0284C7' : '#FFFFFF',
                        scale: isActive ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.25 }}
                      className="w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm"
                      style={{ borderColor: isActive || isDone ? 'transparent' : 'rgba(0,0,0,0.15)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive || isDone ? '#FFFFFF' : '#0284C7' }} />
                    </motion.span>
                    <span className="text-[9px] font-mono font-bold" style={{ color: isActive ? '#0284C7' : 'rgba(0,0,0,0.35)' }}>
                      {w.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESKTOP / TABLET — full chain with connecting lines */}
          <div className="hidden sm:flex items-start justify-between gap-0 max-w-2xl mx-auto">
            {weeksData.map((w, idx) => {
              const Icon = w.icon;
              const isActive = w.week === activeWeek;
              const isDone = w.week < activeWeek;
              return (
                <React.Fragment key={w.week}>
                  <button
                    onClick={() => { setActiveWeek(w.week); setOpenDay(0); }}
                    className="cursor-pointer relative flex flex-col items-center gap-2.5 shrink-0 w-[100px]"
                  >
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? '#090909' : isDone ? '#0284C7' : '#FFFFFF',
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm"
                      style={{ borderColor: isActive || isDone ? 'transparent' : 'rgba(0,0,0,0.15)' }}
                    >
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl"
                          style={{ boxShadow: '0 0 0 5px rgba(2,132,199,0.16)' }}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                      <Icon
                        className="w-5 h-5 relative z-10"
                        style={{ color: isActive || isDone ? '#FFFFFF' : '#0284C7' }}
                      />
                    </motion.span>
                    <span
                      className="text-[9px] font-mono font-bold transition-colors"
                      style={{ color: isActive ? '#0284C7' : 'rgba(0,0,0,0.35)' }}
                    >
                      {w.code}
                    </span>
                    <span
                      className={`text-[11px] font-bold text-center leading-tight px-1 transition-colors ${
                        isActive ? 'text-[#090909]' : 'text-black/45'
                      }`}
                    >
                      {w.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </button>

                  {idx < weeksData.length - 1 && (
                    <div className="relative flex-1 h-[2px] mt-[26px] mx-2 rounded-full bg-black/10 overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: 'linear-gradient(90deg,#0284C7,#38BDF8)' }}
                        initial={false}
                        animate={{ width: w.week < activeWeek ? '100%' : '0%' }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ACTIVE OPS DETAIL */}
          <AnimatePresence mode="wait">
            {activeWeekObj && (
              <motion.div
                key={activeWeekObj.week}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-white border border-black/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-md"
              >
                <div className="space-y-1.5 border-b border-black/10 pb-5">
                  <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest font-mono">
                    {activeWeekObj.code} — {activeWeekObj.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold">{activeWeekObj.title}</h3>
                  <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-2xl">{activeWeekObj.goal}</p>
                </div>

                {/* DAY LOG — connected vertical timeline */}
                <div className="relative">
                  <motion.div
                    key={`line-${activeWeekObj.week}`}
                    className="absolute left-[26px] sm:left-[28px] top-7 bottom-7 w-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(180deg,#0284C7,rgba(2,132,199,0.08))',
                      transformOrigin: 'top',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                  />

                  <div className="space-y-4 sm:space-y-5">
                    {activeWeekObj.days.map((day, idx) => {
                      const Icon = day.icon;
                      const isOpen = openDay === idx;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + idx * 0.08, duration: 0.3, ease: 'easeOut' }}
                          className="relative flex gap-3 sm:gap-4"
                        >
                          <motion.button
                            onClick={() => setOpenDay(isOpen ? -1 : idx)}
                            whileTap={{ scale: 0.93 }}
                            aria-label={`Toggle Day ${idx + 1}`}
                            className="cursor-pointer relative z-10 w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
                            style={{
                              background: isOpen ? '#090909' : '#FFFFFF',
                              border: isOpen ? 'none' : '1px solid rgba(0,0,0,0.12)',
                              boxShadow: isOpen ? '0 8px 20px rgba(0,0,0,0.16)' : 'none',
                            }}
                          >
                            {isOpen && (
                              <motion.span
                                className="absolute -inset-1 rounded-2xl"
                                style={{ border: '1px solid rgba(2,132,199,0.4)' }}
                                animate={{ opacity: [0.25, 0.75, 0.25], scale: [1, 1.06, 1] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            )}
                            <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" style={{ color: isOpen ? '#38BDF8' : '#0284C7' }} />
                          </motion.button>

                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => setOpenDay(isOpen ? -1 : idx)}
                              className={`cursor-pointer w-full text-left rounded-2xl border p-4 sm:p-5 transition-colors duration-200 ${
                                isOpen ? 'border-[#0284C7]/40 bg-[#FAF8F5]' : 'border-black/10 bg-white hover:border-black/20'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <span className="text-[10px] font-mono font-bold text-[#0284C7]">DAY {idx + 1}</span>
                                  <h4 className="text-sm font-bold leading-snug">{day.title}</h4>
                                  <p className="text-[11px] text-black/55 truncate">{day.theory}</p>
                                </div>
                                <motion.span
                                  animate={{ rotate: isOpen ? 90 : 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="shrink-0 text-black/35"
                                >
                                  <ChevronDown className="w-4 h-4 -rotate-90" />
                                </motion.span>
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 p-3.5 rounded-xl bg-[#090D16] border border-white/10">
                                    <span className="font-bold text-[#38BDF8] text-[11px] font-mono block mb-1">
                                      $ practical_lab --exec
                                    </span>
                                    <p className="text-[11px] text-slate-300 leading-relaxed">{day.practical}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* MINI PROJECT DELIVERABLE */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 rounded-2xl bg-[#090909] text-white flex items-center justify-between gap-4 text-xs font-mono"
                >
                  <div>
                    <span className="font-bold text-[#38BDF8] block">Week Deliverable</span>
                    <p className="text-white/75">{activeWeekObj.miniProject}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TOOLS & TECHNOLOGIES — ticker, click for main use */}
        <div className="space-y-5">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Tools & Technologies</h2>
            <p className="text-xs sm:text-sm text-black/50">Tap any tool to see how it's used in the cohort.</p>
          </div>

          <div className="relative -mx-4 sm:-mx-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

            <div className="overflow-hidden py-1">
              <motion.div
                className="flex gap-3 w-max px-4 sm:px-8"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {[...toolsList, ...toolsList].map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <motion.button
                      key={`${t.name}-${i}`}
                      onClick={() => setActiveTool(t)}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="cursor-pointer flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl bg-white border border-black/10 shadow-xs hover:border-[#0284C7]/40 hover:shadow-md transition-all shrink-0"
                    >
                      <span className="w-9 h-9 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <span className="text-left leading-tight">
                        <span className="text-xs font-bold block font-mono whitespace-nowrap">{t.name}</span>
                        <span className="text-[10px] text-black/50 block whitespace-nowrap">{t.desc}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* TOOL DETAIL MODAL */}
        <AnimatePresence>
          {activeTool && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setActiveTool(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4"
              >
                <button
                  onClick={() => setActiveTool(null)}
                  className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-black/40 hover:bg-black/5 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 rounded-2xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center">
                  {activeTool && <activeTool.icon className="w-6 h-6" />}
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0284C7]">{activeTool?.desc}</span>
                  <h3 className="text-lg font-extrabold leading-snug">{activeTool?.name}</h3>
                </div>
                <p className="text-sm text-black/70 leading-relaxed">{activeTool?.mainUse}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-xl"
        >
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Reserve Your Seat</h2>
            <p className="text-xs text-black/70">
              4 weeks of live pentesting labs, Python security automation, and autonomous MCP agents.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/cohorts/register?cohort=ai-cybersecurity"
              className="py-3.5 px-8 rounded-2xl bg-[#090909] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#0284C7] transition-all flex items-center gap-2 shadow-lg font-mono"
            >
              Register Now • ₹4,999
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}