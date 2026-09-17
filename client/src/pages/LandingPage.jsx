import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  Palette,
  Eye,
  CheckCircle,
  Download,
  Share2,
  Code2
} from 'lucide-react';
import { Github } from '../components/common/Icons';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { TEMPLATES } from '../templates/templatesCatalog';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen GitHub Profile Builder
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Build a README that <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-sky-400">
            actually represents you.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Create professional, beautiful GitHub profile README files without manually wrestling with markdown tables, broken image URLs, or badge alignment.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
          <Link
            to="/generator"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>Create Free README</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/templates"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-dark-card border border-dark-border hover:border-purple-500/40 text-slate-200 font-semibold text-base flex items-center justify-center gap-2 transition-all hover:bg-dark-surface"
          >
            <span>Explore 12+ Templates</span>
          </Link>
        </div>

        {/* Live Interactive Teaser Card */}
        <div className="w-full max-w-5xl rounded-2xl border border-dark-border bg-dark-surface/60 p-2 sm:p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-dark-border/60 text-xs text-slate-400 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-slate-500">profile/README.md — Live Preview</span>
            </div>
            <span className="text-purple-400 font-medium">Deterministic Generator Engine v1.0</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left p-4">
            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5 font-mono text-xs text-slate-300 space-y-2 overflow-hidden">
              <p className="text-purple-400 font-bold"># Live Input Data</p>
              <p><span className="text-indigo-400">Name:</span> "Alex Rivera"</p>
              <p><span className="text-indigo-400">Role:</span> "Senior Full Stack Engineer"</p>
              <p><span className="text-indigo-400">Skills:</span> ["TypeScript", "React", "Node.js", "Docker"]</p>
              <p><span className="text-indigo-400">Stats:</span> TokyoNight Theme Enabled</p>
              <p className="text-slate-500 pt-2">// Instant Markdown output generated synchronously</p>
            </div>
            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold text-white mb-1">Hi 👋, I'm Alex Rivera</h3>
              <p className="text-xs text-purple-400 font-medium mb-4">Senior Full Stack Engineer</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-blue-600/20 border border-blue-500/40 text-[10px] text-blue-300 font-bold">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-sky-600/20 border border-sky-500/40 text-[10px] text-sky-300 font-bold">React</span>
                <span className="px-2 py-0.5 rounded bg-emerald-600/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold">Node.js</span>
                <span className="px-2 py-0.5 rounded bg-cyan-600/20 border border-cyan-500/40 text-[10px] text-cyan-300 font-bold">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-dark-border bg-dark-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Everything You Need</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Designed from the ground up for developer ergonomics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Instant Live Preview</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Experience real-time reactive markdown rendering. Every keystroke updates your profile preview immediately with zero latency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">12+ Modular Templates</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                From minimalist text to dynamic typing SVG headers and cyberpunk terminal aesthetics, swap presentations without losing your content.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center mb-4 text-sky-400">
                <Github className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Direct GitHub Push</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Commit changes straight to your GitHub profile repository or download a clean standalone README.md file in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-20 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Curated Styles</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Popular Templates</h3>
            </div>
            <Link
              to="/templates"
              className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <span>View all 12 templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="group rounded-xl border border-dark-border bg-dark-card overflow-hidden hover:border-purple-500/50 transition-all flex flex-col"
              >
                <div className="h-36 w-full overflow-hidden bg-dark-bg relative">
                  <img
                    src={t.preview}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-dark-bg/80 text-[10px] font-bold text-purple-300 border border-purple-500/20">
                    {t.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-white text-sm mb-1">{t.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">{t.description}</p>
                  <Link
                    to={`/generator?template=${t.id}`}
                    className="mt-auto block text-center py-2 rounded-lg bg-dark-surface border border-dark-border text-xs font-semibold text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 border-t border-dark-border bg-gradient-to-b from-dark-surface/50 to-dark-bg text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to upgrade your developer presence?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of developers building clean, modern, and attractive GitHub README profiles in seconds.
          </p>
          <Link
            to="/generator"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Launch README Generator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;