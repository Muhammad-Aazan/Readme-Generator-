import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import { Github, Twitter, Linkedin } from '../common/Icons';

const Footer = () => {
  return (
    <footer className="border-t border-dark-border bg-dark-bg/60 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                README<span className="text-purple-400">.gen</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm">
              The premier interactive GitHub README generator for modern developers. Craft stunning profiles, showcase tech stacks, and push changes seamlessly.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/generator" className="hover:text-purple-400 transition-colors">README Generator</Link></li>
              <li><Link to="/templates" className="hover:text-purple-400 transition-colors">Templates Gallery</Link></li>
              <li><Link to="/github" className="hover:text-purple-400 transition-colors">GitHub Sync</Link></li>
              <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Developer Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">GitHub Profile Docs</a></li>
              <li><a href="https://shields.io" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">Shields.io Badges</a></li>
              <li><Link to="/login" className="hover:text-purple-400 transition-colors">Account Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Free Registration</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} README Generator SaaS. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> for open source developers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;