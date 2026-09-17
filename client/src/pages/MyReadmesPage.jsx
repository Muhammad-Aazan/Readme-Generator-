import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';
import { loadReadmeData } from '../features/generator/generatorSlice';
import {
  Plus,
  Search,
  FileText,
  Clock,
  Copy,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

const MyReadmesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [readmes, setReadmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReadmes();
  }, []);

  const fetchReadmes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/readmes');
      setReadmes(res.data.data.readmes || []);
    } catch (err) {
      console.warn('Could not fetch readmes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (readme) => {
    dispatch(loadReadmeData({ readme }));
    navigate('/generator');
  };

  const handleDuplicate = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/readmes/${id}/duplicate`);
      setReadmes([res.data.data.readme, ...readmes]);
      toast.success('README duplicated!');
    } catch (err) {
      toast.error('Failed to duplicate README');
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this README permanently?')) return;
    try {
      await api.delete(`/readmes/${id}`);
      setReadmes(readmes.filter((r) => r._id !== id));
      toast.success('README removed');
    } catch (err) {
      toast.error('Failed to delete README');
    }
  };

  const filtered = readmes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">My README Documents</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse, duplicate, edit, or delete your saved GitHub profiles.
            </p>
          </div>
          <Link
            to="/generator"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative w-full max-w-md mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter READMEs by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-card border border-dark-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-purple-500 outline-none"
          />
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading READMEs...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 border border-dashed border-dark-border rounded-2xl text-center bg-dark-surface/20">
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No READMEs found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
              Start building your customized GitHub profile README now.
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
            {filtered.map((r) => (
              <div
                key={r._id}
                onClick={() => handleOpen(r)}
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
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 font-mono">
                    {r.markdown || 'Interactive README'}
                  </p>
                </div>

                <div className="pt-3 border-t border-dark-border/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" /> {new Date(r.updatedAt || Date.now()).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDuplicate(r._id, e)}
                      className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(r._id, e)}
                      className="p-1 rounded text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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

export default MyReadmesPage;


