import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Sparkles, Home, ArrowRight } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <span className="text-6xl font-black text-purple-500 mb-2">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6">
          The requested route or README resource doesn't exist or has been relocated.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-xs font-semibold text-slate-200 hover:text-white"
          >
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
          <Link
            to="/generator"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow"
          >
            <Sparkles className="w-3.5 h-3.5" /> Launch Generator
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
