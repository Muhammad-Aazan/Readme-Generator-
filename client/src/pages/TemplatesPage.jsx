import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { TEMPLATES } from '../templates/templatesCatalog';
import { Search, Sparkles, Check, ArrowRight } from 'lucide-react';

const TemplatesPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Full Stack', 'Minimal', 'Creative', 'Backend', 'Specialized', 'Dynamic'];

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || t.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> 12 Handcrafted Profiles
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            README Templates Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Select any layout or presentation style. Changing templates adapts your markdown instantly while preserving all your entered skills, projects, and bio.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:border-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((t) => (
            <div
              key={t.id}
              className="group rounded-2xl border border-dark-border bg-dark-card overflow-hidden hover:border-purple-500/50 transition-all flex flex-col hover:shadow-xl hover:shadow-purple-500/5"
            >
              <div className="h-44 w-full overflow-hidden bg-dark-bg relative">
                <img
                  src={t.preview}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-dark-bg/85 backdrop-blur-md text-[10px] font-bold text-purple-300 border border-purple-500/20">
                  {t.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-white mb-1">{t.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {t.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-dark-bg text-[10px] font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/generator?template=${t.id}`}
                  className="mt-auto w-full py-2.5 rounded-xl bg-purple-600/15 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:text-white"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplatesPage;
