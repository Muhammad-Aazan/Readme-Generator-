import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';
import { loadReadmeData } from '../features/generator/generatorSlice';
import {
  FileText,
  Plus,
  LayoutTemplate,
  Clock,
  ExternalLink,
  Trash2,
  Copy,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Github } from '../components/common/Icons';
import { toast } from 'sonner';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [readmes, setReadmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReadmes();
  }, []);

  const fetchReadmes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/readmes');
      setReadmes(res.data.data.readmes || []);
    } catch (err) {
      console.warn('Could not load readmes, using demo state:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReadme = (readme) => {
    dispatch(loadReadmeData({ readme }));
    navigate('/generator');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this README?')) return;
    try {
      await api.delete(`/readmes/${id}`);
      setReadmes(readmes.filter((r) => r._id !== id));
      toast.success('README deleted');
    } catch (err) {
      toast.error('Failed to delete README');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {user?.name || user?.username || 'Developer'} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your GitHub profile READMEs, switch templates, and monitor sync status.
            </p>
          </div>
          <Link
            to="/generator"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New README</span>
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{readmes.length}</div>
              <div className="text-xs text-slate-400 font-medium">Total READMEs</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">12</div>
              <div className="text-xs text-slate-400 font-medium">Available Templates</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {user?.githubConnected ? 'Connected' : 'Disconnected'}
              </div>
              <div className="text-xs text-slate-400 font-medium">GitHub Status</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-dark-card border border-dark-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Pro Developer</div>
              <div className="text-xs text-slate-400 font-medium">Current Tier</div>
            </div>
          </div>
        </div>

        {/* Saved READMEs Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Your Saved READMEs</h2>
          <Link to="/readmes" className="text-xs font-semibold text-purple-400 hover:underline">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading your documents...</div>
        ) : readmes.length === 0 ? (
          <div className="p-12 border border-dashed border-dark-border rounded-2xl text-center bg-dark-surface/20">
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No READMEs yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
              Get started by designing your first interactive developer README file using our generator.
            </p>
            <Link
              to="/generator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Launch Generator
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {readmes.map((r) => (
              <div
                key={r._id}
                onClick={() => handleOpenReadme(r)}
                className="group p-5 rounded-xl bg-dark-card border border-dark-border hover:border-purple-500/50 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                      {r.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-dark-bg text-[10px] font-semibold text-purple-300 border border-purple-500/20 uppercase">
                      {r.template || 'Modern'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 font-mono">
                    {r.markdown ? r.markdown.substring(0, 100) + '...' : 'Interactive README configuration'}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-border/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" /> {new Date(r.updatedAt || Date.now()).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(r._id, e)}
                      className="p-1 rounded text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;