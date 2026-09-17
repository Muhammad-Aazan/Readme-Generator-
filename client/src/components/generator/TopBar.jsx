import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Copy,
  Download,
  Save,
  Share2,
  Undo2,
  Redo2,
  LayoutTemplate,
  Check,
  Sparkles
} from 'lucide-react';
import { Github } from '../common/Icons';
import { copyToClipboard, downloadReadmeFile } from '../../utils/exportUtils';
import { setReadmeName, setSaveStatus } from '../../features/generator/generatorSlice';
import api from '../../services/api';
import { toast } from 'sonner';

const TopBar = ({ onOpenTemplates, onOpenGithubModal }) => {
  const dispatch = useDispatch();
  const { customMarkdown, generatedMarkdown, isManualMarkdownEdit, activeReadmeId, readmeName, saveStatus, formData, activeTemplate } = useSelector(
    (state) => state.generator
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const markdownToExport = isManualMarkdownEdit ? customMarkdown : generatedMarkdown;

  const handleCopy = () => {
    copyToClipboard(markdownToExport);
  };

  const handleDownload = () => {
    downloadReadmeFile(markdownToExport, `${readmeName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'README'}.md`);
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.info('Log in or create a free account to save READMEs to your dashboard.');
      return;
    }

    try {
      dispatch(setSaveStatus('saving'));
      const payload = {
        name: readmeName,
        template: activeTemplate,
        markdown: markdownToExport,
        ...formData
      };

      if (activeReadmeId) {
        await api.patch(`/readmes/${activeReadmeId}`, payload);
      } else {
        await api.post('/readmes', payload);
      }
      dispatch(setSaveStatus('saved'));
      toast.success('README saved successfully!');
      setTimeout(() => dispatch(setSaveStatus('idle')), 3000);
    } catch (err) {
      dispatch(setSaveStatus('error'));
      toast.error(err.response?.data?.message || 'Failed to save README');
    }
  };

  return (
    <div className="h-16 border-b border-dark-border bg-dark-surface px-4 flex items-center justify-between gap-4">
      {/* Title & Status */}
      <div className="flex items-center gap-3 min-w-0">
        {isEditingTitle ? (
          <input
            type="text"
            value={readmeName}
            onChange={(e) => dispatch(setReadmeName(e.target.value))}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
            autoFocus
            className="bg-dark-card border border-purple-500 rounded px-2.5 py-1 text-sm font-semibold text-white outline-none focus:ring-1 focus:ring-purple-500"
          />
        ) : (
          <div
            onClick={() => setIsEditingTitle(true)}
            className="cursor-pointer group flex items-center gap-2 hover:opacity-80"
          >
            <h2 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
              {readmeName}
            </h2>
            <span className="text-xs text-slate-400 group-hover:text-purple-400">✎</span>
          </div>
        )}

        {/* Autosave status indicator */}
        <div className="hidden sm:flex items-center text-xs text-slate-400">
          {saveStatus === 'saving' && (
            <span className="text-amber-400 animate-pulse flex items-center gap-1">
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-400">Save failed</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-xs font-medium text-slate-200 hover:border-purple-500/40 hover:text-white transition-colors"
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden md:inline">Templates</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-xs font-medium text-slate-200 hover:border-purple-500/40 hover:text-white transition-colors"
          title="Copy Markdown"
        >
          <Copy className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Copy</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-xs font-medium text-slate-200 hover:border-purple-500/40 hover:text-white transition-colors"
          title="Download README.md"
        >
          <Download className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Download</span>
        </button>

        <button
          onClick={onOpenGithubModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-xs font-medium text-slate-200 hover:border-purple-500/40 hover:text-white transition-colors"
          title="Push to GitHub"
        >
          <Github className="w-3.5 h-3.5 text-slate-300" />
          <span className="hidden lg:inline">GitHub Push</span>
        </button>

        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;