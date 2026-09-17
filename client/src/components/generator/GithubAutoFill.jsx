import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { updateProfile, updateAbout } from '../../features/generator/generatorSlice';

const GithubAutoFill = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`https://api.github.com/users/${username.trim()}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      dispatch(updateProfile({
        name: data.name || data.login,
        username: data.login,
        location: data.location || '',
        website: data.blog || '',
        avatarUrl: data.avatar_url || '',
        bio: data.bio || ''
      }));
      if (data.bio) dispatch(updateAbout(data.bio));
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-b border-purple-500/20">
      <p className="text-xs font-semibold text-purple-300 mb-2 flex items-center gap-1.5">
        <span>⚡</span> Auto-fill from GitHub
      </p>
      <form onSubmit={handleFetch} className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="flex-1 bg-[#0B0F17] border border-purple-500/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-1.5 text-xs text-green-400 flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" /> Profile loaded from GitHub!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
        </p>
      )}
    </div>
  );
};

export default GithubAutoFill;
