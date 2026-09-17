import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Eye, Code, RefreshCw } from 'lucide-react';

const LivePreview = ({
  markdown,
  isManualEdit,
  onResetToGenerated,
  activeTab,
  setActiveTab,
  onMarkdownChange
}) => {
  return (
    <div className="flex flex-col h-full bg-dark-bg border-l border-dark-border">
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-dark-border bg-dark-surface/70">
        <div className="flex items-center gap-1 bg-dark-bg p-1 rounded-lg border border-dark-border">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'markdown'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>
        </div>

        {isManualEdit && (
          <button
            onClick={onResetToGenerated}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
            title="Reset manual changes back to generator output"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Generated</span>
          </button>
        )}
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'preview' ? (
          <div className="markdown-preview max-w-4xl mx-auto bg-dark-surface/40 border border-dark-border rounded-xl p-8 shadow-inner min-h-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    alt={props.alt || 'Badge / Image'}
                  />
                )
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="h-full max-w-4xl mx-auto flex flex-col">
            <div className="text-xs text-slate-400 mb-2">
              Directly edit your README markdown below. Changes will be instantly reflected in the live preview and downloads.
            </div>
            <textarea
              value={markdown}
              onChange={(e) => onMarkdownChange(e.target.value)}
              className="w-full flex-1 min-h-[500px] p-4 font-mono text-sm bg-dark-surface border border-dark-border rounded-xl text-slate-200 focus:border-purple-500 focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;