'use client'

import { useState } from 'react'
import {
  Sparkles,
  FileText,
  Bot,
  Download,
  LayoutGrid,
  Zap,
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
} from 'lucide-react'

export function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: FileText,
      title: 'Smart Resume Editor',
      desc: 'AI-powered editor with real-time preview, drag-and-drop sections, and instant formatting.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: LayoutGrid,
      title: 'Professional Templates',
      desc: '4 stunning templates — Google, Apple, Amazon, and Startup styles. One click to apply.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      desc: 'Chat with AI to polish achievements, rewrite bullets, and optimize for ATS scoring.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Download,
      title: 'One-Click Export',
      desc: 'Export to PDF or DOCX instantly. Perfect formatting preserved every time.',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Zap,
      title: 'ATS Optimization',
      desc: 'Real-time ATS score tracking with keyword suggestions to beat applicant systems.',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Sparkles,
      title: 'Cover Letter Builder',
      desc: 'Generate tailored cover letters matched to your resume and target job description.',
      color: 'from-cyan-500 to-blue-600',
    },
  ]

  const stats = [
    { value: '98%', label: 'ATS Friendly' },
    { value: '3x', label: 'Cleaner Layout' },
    { value: '1 Click', label: 'Export' },
    { value: '10k+', label: 'Resumes Built' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#0B0F19] text-white overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-extrabold text-sm">GK</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Resume Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/80">
            AI Career Suite
          </span>
          <a
            href="/app"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
          >
            Open Editor
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-xs font-semibold tracking-wide uppercase">Premium</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Resume
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hub
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Upgrade your career in just a few clicks. AI-powered resume editing, professional templates, and smart ATS optimization — all in one place.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 backdrop-blur-sm"
                >
                  <div className="text-2xl font-extrabold tracking-tight">{stat.value}</div>
                  <div className="text-xs text-white/50 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/app"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base hover:opacity-90 transition-all shadow-xl shadow-blue-500/25"
              >
                <Sparkles className="w-5 h-5" />
                Edit Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/10 transition-colors"
              >
                See Features
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Feature Panel */}
          <div className="hidden lg:block">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold tracking-wide uppercase text-white/70 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Live Preview Features
              </h3>
              <ul className="space-y-3">
                {[
                  'Drag & Drop Resume Upload',
                  'Real-time ATS Score',
                  'AI Heading Detection',
                  'Responsive Mobile Layout',
                  'Smart Export Flow',
                  'Complete AI Resume Rebuild',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini preview card */}
            <div className="mt-4 bg-white rounded-2xl p-5 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">ATS Score</span>
                <span className="text-sm font-bold text-indigo-600">92%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
              </div>
              <div className="mt-4 flex gap-2">
                {['Google', 'Apple', 'Amazon', 'Startup'].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Everything You Need
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A complete AI-powered suite to build, optimize, and export professional resumes.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  hoveredFeature === i
                    ? 'bg-white/15 border-white/30 scale-[1.02] shadow-xl'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: 'Sarah M.', role: 'Software Engineer', text: 'Got 3 interview calls within a week after switching to Resume Hub. The ATS score feature is a game-changer.' },
            { name: 'James K.', role: 'Product Manager', text: 'The AI assistant rewrote my bullet points and they sound so much more impactful. Landed my dream job at a FAANG company.' },
            { name: 'Priya R.', role: 'Data Scientist', text: 'Clean templates, one-click export, and the cover letter builder saved me hours. Best resume tool I have used.' },
          ].map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/15 rounded-3xl p-10 md:p-14 backdrop-blur-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
            Join thousands of professionals who have already upgraded their career with Resume Hub.
          </p>
          <a
            href="/app"
            className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-blue-500/25"
          >
            <Sparkles className="w-5 h-5" />
            Start Editing Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">GK</span>
            </div>
            <span className="font-semibold text-sm text-white/60">GK Resume Hub</span>
          </div>
          <p className="text-xs text-white/30">
            &copy; 2026 GK Resume Hub. AI Career Suite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
