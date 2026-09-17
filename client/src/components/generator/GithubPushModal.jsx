import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Github } from '../common/Icons';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { toast } from 'sonner';

const GithubPushModal = ({ isOpen, onClose, markdown }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [repoName, setRepoName] = useState(user?.githubUsername || 'portfolio-readme');
  const [branch, setBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('docs: update README.md via README Generator');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePush = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to push README files to GitHub');
      return;
    }

    try {
      setLoading(true);
      await api.post('/github/readme', {
        owner: user?.githubUsername || user?.username,
        repo: repoName,
        branch,
        path: 'README.md',
        message: commitMessage,
        content: markdown
      });
      toast.success(`Successfully pushed README.md to ${repoName}!`);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to push to GitHub. Verify repository permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-surface border border-dark-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-white">
              <Github className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Push directly to GitHub</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-dark-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePush} className="p-6 space-y-4">
          <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl text-xs text-purple-200">
            Pushing will create or update the <code className="bg-purple-900/50 px-1 py-0.5 rounded text-white">README.md</code> directly in your chosen GitHub repository.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Repository Name
            </label>
            <input
              type="text"
              required
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="e.g. your-username or repo-name"
              className="w-full bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Tip: Using your exact GitHub username updates your special profile README.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target File
              </label>
              <input
                type="text"
                disabled
                value="README.md"
                className="w-full bg-dark-bg/60 border border-dark-border rounded-lg px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Commit Message
            </label>
            <input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-dark-card transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Committing...</span>
              ) : (
                <>
                  <span>Commit to GitHub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GithubPushModal;