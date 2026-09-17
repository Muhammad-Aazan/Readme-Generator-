import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';
import { Copy, Download, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadReadmeFile } from '../utils/exportUtils';

const PublicReadmePage = () => {
  const { username, slug } = useParams();
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublic = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/readmes/public/${username}/${slug}`);
        setReadme(res.data.data.readme);
      } catch (err) {
        console.warn('Public readme fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchPublic();
  }, [username, slug]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading public profile...</div>
        ) : readme ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-dark-border">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Public Profile</span>
                <h1 className="text-2xl font-bold text-white mt-0.5">{readme.name}</h1>
                <p className="text-xs text-slate-400">Created by @{username}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(readme.markdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-xs font-medium text-slate-200 hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => downloadReadmeFile(readme.markdown, `${slug || 'README'}.md`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="markdown-preview bg-dark-card border border-dark-border rounded-2xl p-8 shadow-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {readme.markdown}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <h2 className="text-xl font-bold text-white mb-2">README Not Found</h2>
            <p className="text-xs text-slate-400 mb-6">
              This README document might be private or may not exist.
            </p>
            <Link
              to="/generator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" /> Create Your Own
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PublicReadmePage;
