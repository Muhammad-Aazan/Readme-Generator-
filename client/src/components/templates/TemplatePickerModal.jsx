import React from 'react';
import { X, Check } from 'lucide-react';
import { TEMPLATES } from '../../templates/templatesCatalog';

const TemplatePickerModal = ({ isOpen, onClose, activeTemplate, onSelectTemplate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-surface border border-dark-border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
          <div>
            <h3 className="text-lg font-bold text-white">Choose a README Template</h3>
            <p className="text-xs text-slate-400">
              Templates style your presentation without changing your entered data. Switch freely at any time.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-dark-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((tmpl) => {
            const isSelected = activeTemplate === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl.id);
                  onClose();
                }}
                className={`relative group cursor-pointer rounded-xl border p-3 flex flex-col transition-all overflow-hidden ${
                  isSelected
                    ? 'border-purple-500 bg-purple-950/20 ring-1 ring-purple-500 shadow-lg shadow-purple-500/10'
                    : 'border-dark-border bg-dark-card hover:border-slate-600 hover:bg-dark-card/80'
                }`}
              >
                <div className="h-28 w-full rounded-lg bg-dark-bg overflow-hidden mb-3 relative">
                  <img
                    src={tmpl.preview}
                    alt={tmpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-dark-bg/80 backdrop-blur-md text-[10px] font-semibold text-purple-300 border border-purple-500/20">
                    {tmpl.category}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">{tmpl.name}</h4>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {tmpl.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1">
                  {tmpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-dark-bg text-[10px] font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplatePickerModal;