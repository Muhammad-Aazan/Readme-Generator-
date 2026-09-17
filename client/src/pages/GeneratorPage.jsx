import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TopBar from '../components/generator/TopBar';
import SectionList from '../components/generator/SectionList';
import LivePreview from '../components/generator/LivePreview';
import TemplatePickerModal from '../components/templates/TemplatePickerModal';
import GithubPushModal from '../components/generator/GithubPushModal';
import Navbar from '../components/layout/Navbar';
import {
  setTemplate,
  setManualMarkdown,
  resetToGenerated
} from '../features/generator/generatorSlice';

const GeneratorPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const {
    activeTemplate,
    generatedMarkdown,
    customMarkdown,
    isManualMarkdownEdit
  } = useSelector((state) => state.generator);

  // Template query param sync
  useEffect(() => {
    const templateQuery = searchParams.get('template');
    if (templateQuery) {
      dispatch(setTemplate(templateQuery));
    }
  }, [searchParams, dispatch]);

  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'markdown'
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' | 'preview' | 'markdown'
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  const currentMarkdown = isManualMarkdownEdit ? customMarkdown : generatedMarkdown;

  return (
    <div className="h-screen flex flex-col bg-[#0B0F17] overflow-hidden text-slate-100">
      <Navbar />

      {/* Generator Action Header */}
      <TopBar
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
      />

      {/* Mobile Navigation Tabs */}
      <div className="flex sm:hidden border-b border-dark-border bg-dark-surface">
        <button
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-2 text-xs font-semibold ${
            mobileTab === 'edit'
              ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10'
              : 'text-slate-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold ${
            mobileTab === 'preview'
              ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10'
              : 'text-slate-400'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setMobileTab('markdown')}
          className={`flex-1 py-2 text-xs font-semibold ${
            mobileTab === 'markdown'
              ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10'
              : 'text-slate-400'
          }`}
        >
          Markdown
        </button>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Accordion Form Editor */}
        <div
          className={`w-full sm:w-1/2 lg:w-5/12 h-full flex flex-col border-r border-dark-border ${
            mobileTab !== 'edit' ? 'hidden sm:flex' : 'flex'
          }`}
        >
          <SectionList />
        </div>

        {/* Right Side: Live Interactive Preview & Raw Markdown */}
        <div
          className={`w-full sm:w-1/2 lg:w-7/12 h-full flex flex-col ${
            mobileTab === 'edit' ? 'hidden sm:flex' : 'flex'
          }`}
        >
          <LivePreview
            markdown={currentMarkdown}
            isManualEdit={isManualMarkdownEdit}
            onResetToGenerated={() => dispatch(resetToGenerated())}
            activeTab={mobileTab !== 'edit' ? mobileTab : activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setMobileTab(tab);
            }}
            onMarkdownChange={(val) => dispatch(setManualMarkdown(val))}
          />
        </div>
      </div>

      {/* Modal Dialogs */}
      <TemplatePickerModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        activeTemplate={activeTemplate}
        onSelectTemplate={(tmplId) => dispatch(setTemplate(tmplId))}
      />

      <GithubPushModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        markdown={currentMarkdown}
      />
    </div>
  );
};

export default GeneratorPage;

