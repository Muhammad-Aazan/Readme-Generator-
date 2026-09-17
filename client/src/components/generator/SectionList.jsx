import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Sliders, ChevronDown, ChevronRight, MoveUp, MoveDown,
  Eye, EyeOff, Trash2, Plus, X
} from 'lucide-react';
import {
  updateProfile, updateAbout, toggleSkill, addCustomSkill,
  setSocials, setProjects, addProject, deleteProject,
  setExperience, setEducation, setCertifications, setAchievements,
  setServices, setOpenSource, setSupport, setCustomSections,
  toggleSectionVisibility, setSectionOrder, updateSettings
} from '../../features/generator/generatorSlice';
import { AVAILABLE_SKILLS, SOCIAL_PLATFORMS, SKILL_CATEGORIES } from '../../utils/iconsCatalog';
import GithubAutoFill from './GithubAutoFill';

// ─── Reusable input/textarea styles ───
const inp = 'w-full bg-[#0B0F17] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-purple-500 transition-colors placeholder-slate-600';
const texta = `${inp} resize-none`;
const labelCls = 'block text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5';

// ─── Generic add/edit/delete list editor ───
const ListEditor = ({ items = [], setItems, fields, newItem, dispatch }) => {
  const handleChange = (idx, key, value) => {
    const updated = items.map((it, i) => i === idx ? { ...it, [key]: value } : it);
    dispatch(setItems(updated));
  };
  const handleDelete = (idx) => {
    dispatch(setItems(items.filter((_, i) => i !== idx)));
  };
  const handleAdd = () => {
    dispatch(setItems([...items, { ...newItem, id: Date.now().toString() }]));
  };
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={item.id || idx} className="p-3 bg-[#0B0F17] border border-slate-700 rounded-lg space-y-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">#{idx + 1}</span>
            <button type="button" onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-400 p-0.5">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fields.map(f => (
              <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                <label className={labelCls}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    rows={2}
                    value={item[f.key] || ''}
                    onChange={e => handleChange(idx, f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={texta}
                  />
                ) : f.type === 'checkbox' ? (
                  <label className="flex items-center gap-2 text-xs text-slate-300 mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!item[f.key]}
                      onChange={e => handleChange(idx, f.key, e.target.checked)}
                      className="accent-purple-500"
                    />
                    {f.checkLabel || 'Current'}
                  </label>
                ) : (
                  <input
                    type={f.type || 'text'}
                    value={item[f.key] || ''}
                    onChange={e => handleChange(idx, f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={inp}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-2 bg-slate-800 border border-dashed border-slate-600 rounded-lg text-xs font-semibold text-purple-400 hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-1.5"
      >
        <Plus className="w-3.5 h-3.5" /> Add Entry
      </button>
    </div>
  );
};

const SectionList = () => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.generator);
  const {
    profile, about, skills, socials, projects,
    experience, education, certifications, achievements,
    services, openSource, support, customSections,
    sections, settings
  } = formData;

  const [expandedSection, setExpandedSection] = useState('profile');
  const [customSkillName, setCustomSkillName] = useState('');
  const [customSkillColor, setCustomSkillColor] = useState('#6366f1');
  const [customSkillCat, setCustomSkillCat] = useState('Other');

  const toggleExpand = (id) => setExpandedSection(expandedSection === id ? null : id);

  const handleMove = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIdx, 0, moved);
    dispatch(setSectionOrder(newSections));
  };

  const handleAddCustomSkill = () => {
    if (!customSkillName.trim()) return;
    dispatch(addCustomSkill({
      name: customSkillName.trim(),
      category: customSkillCat,
      color: customSkillColor.replace('#', '')
    }));
    setCustomSkillName('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0F17] overflow-y-auto divide-y divide-slate-800">
      {/* GitHub Auto-Fill */}
      <GithubAutoFill />

      {/* Global Settings Bar */}
      <div className="p-4 bg-slate-900/50">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sliders className="w-3 h-3 text-purple-400" />
          Global Layout & Theme
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className={labelCls}>Alignment</label>
            <select
              value={settings.align || 'center'}
              onChange={(e) => dispatch(updateSettings({ align: e.target.value }))}
              className={inp}
            >
              <option value="center">Center</option>
              <option value="left">Left</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Badge Style</label>
            <select
              value={settings.badgeStyle || 'for-the-badge'}
              onChange={(e) => dispatch(updateSettings({ badgeStyle: e.target.value }))}
              className={inp}
            >
              <option value="for-the-badge">For-the-badge</option>
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="plastic">Plastic</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Stats Theme</label>
            <select
              value={settings.statsTheme || 'tokyonight'}
              onChange={(e) => dispatch(updateSettings({ statsTheme: e.target.value }))}
              className={inp}
            >
              <option value="tokyonight">Tokyo Night</option>
              <option value="dracula">Dracula</option>
              <option value="radical">Radical</option>
              <option value="onedark">One Dark</option>
              <option value="gruvbox">Gruvbox</option>
              <option value="synthwave">Synthwave</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="dark">Dark</option>
              <option value="default">Default</option>
              <option value="merko">Merko</option>
              <option value="vue-dark">Vue Dark</option>
              <option value="buefy">Buefy</option>
              <option value="highcontrast">High Contrast</option>
            </select>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showStreak !== false}
              onChange={e => dispatch(updateSettings({ showStreak: e.target.checked }))}
              className="accent-purple-500 rounded"
            />
            Show Streak
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={!!settings.showTrophies}
              onChange={e => dispatch(updateSettings({ showTrophies: e.target.checked }))}
              className="accent-purple-500 rounded"
            />
            Show Trophies
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={!!settings.showDevQuote}
              onChange={e => dispatch(updateSettings({ showDevQuote: e.target.checked }))}
              className="accent-purple-500 rounded"
            />
            Dev Quote
          </label>
        </div>
      </div>

      {/* Sections Accordion */}
      {sections.map((sec, idx) => {
        const isExpanded = expandedSection === sec.id;
        return (
          <div key={sec.id} className="bg-[#0B0F17]">
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-3 hover:bg-slate-900/40 transition-colors">
              <div
                onClick={() => toggleExpand(sec.id)}
                className="flex items-center gap-2.5 cursor-pointer flex-1 select-none"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-purple-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className={`text-sm font-semibold ${sec.enabled ? 'text-slate-100' : 'text-slate-500 line-through'}`}>
                  {sec.title}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  className="p-1 rounded text-slate-600 hover:text-white disabled:opacity-20"
                  title="Move up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === sections.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  className="p-1 rounded text-slate-600 hover:text-white disabled:opacity-20"
                  title="Move down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(toggleSectionVisibility({ id: sec.id, enabled: !sec.enabled }))}
                  className={`p-1.5 rounded transition-colors ${
                    sec.enabled ? 'text-purple-400 hover:bg-purple-500/10' : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  {sec.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Body */}
            {isExpanded && (
              <div className="px-4 pt-2 pb-6 bg-slate-900/20 border-t border-slate-800/60">

                {/* ── PROFILE ── */}
                {sec.id === 'profile' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelCls}>Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => dispatch(updateProfile({ name: e.target.value }))}
                          className={inp}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Professional Role</label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={(e) => dispatch(updateProfile({ role: e.target.value }))}
                          className={inp}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>GitHub Username</label>
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) => dispatch(updateProfile({ username: e.target.value }))}
                          className={inp}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Location</label>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => dispatch(updateProfile({ location: e.target.value }))}
                          className={inp}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Tagline</label>
                      <input
                        type="text"
                        value={profile.tagline}
                        onChange={(e) => dispatch(updateProfile({ tagline: e.target.value }))}
                        className={inp}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelCls}>Avatar URL</label>
                        <input
                          type="url"
                          value={profile.avatarUrl}
                          onChange={(e) => dispatch(updateProfile({ avatarUrl: e.target.value }))}
                          className={inp}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Banner URL (Optional)</label>
                        <input
                          type="url"
                          value={profile.bannerUrl || ''}
                          onChange={(e) => dispatch(updateProfile({ bannerUrl: e.target.value }))}
                          className={inp}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className={labelCls}>Website / Portfolio</label>
                        <input
                          type="url"
                          value={profile.website || ''}
                          onChange={(e) => dispatch(updateProfile({ website: e.target.value }))}
                          className={inp}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ABOUT ── */}
                {sec.id === 'about' && (
                  <div>
                    <label className={labelCls}>About Me</label>
                    <textarea
                      rows={5}
                      value={about}
                      onChange={(e) => dispatch(updateAbout(e.target.value))}
                      className={texta}
                    />
                  </div>
                )}

                {/* ── SKILLS ── */}
                {sec.id === 'skills' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">Click to toggle skills. Add your own custom technologies below.</p>
                    {Object.values(SKILL_CATEGORIES).map((category) => {
                      const catSkills = AVAILABLE_SKILLS.filter((s) => s.category === category);
                      if (catSkills.length === 0) return null;
                      return (
                        <div key={category}>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{category}</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {catSkills.map((skill) => {
                              const isSelected = skills.some((s) => s.name.toLowerCase() === skill.name.toLowerCase());
                              return (
                                <button
                                  key={skill.name}
                                  type="button"
                                  onClick={() => dispatch(toggleSkill(skill))}
                                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                                    isSelected
                                      ? 'bg-purple-600 text-white ring-1 ring-purple-400 shadow-sm'
                                      : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                                  }`}
                                >
                                  {skill.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Additional Categories from string tags (Game Dev, Blockchain, etc.) */}
                    {['Game Dev', 'Blockchain'].map((catName) => {
                      const catSkills = AVAILABLE_SKILLS.filter((s) => s.category === catName);
                      if (catSkills.length === 0) return null;
                      return (
                        <div key={catName}>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{catName}</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {catSkills.map((skill) => {
                              const isSelected = skills.some((s) => s.name.toLowerCase() === skill.name.toLowerCase());
                              return (
                                <button
                                  key={skill.name}
                                  type="button"
                                  onClick={() => dispatch(toggleSkill(skill))}
                                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                                    isSelected
                                      ? 'bg-purple-600 text-white ring-1 ring-purple-400 shadow-sm'
                                      : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                                  }`}
                                >
                                  {skill.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Custom Skill Input */}
                    <div className="pt-2 border-t border-slate-800">
                      <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">➕ Add Custom Technology</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customSkillName}
                          onChange={e => setCustomSkillName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddCustomSkill()}
                          placeholder="e.g. Astro, WebAssembly, Kafka..."
                          className={`${inp} flex-1`}
                        />
                        <select
                          value={customSkillCat}
                          onChange={e => setCustomSkillCat(e.target.value)}
                          className={`${inp} w-28`}
                        >
                          {Object.values(SKILL_CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Game Dev">Game Dev</option>
                          <option value="Blockchain">Blockchain</option>
                          <option value="Other">Other</option>
                        </select>
                        <input
                          type="color"
                          value={customSkillColor}
                          onChange={e => setCustomSkillColor(e.target.value)}
                          className="w-9 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                          title="Badge Color"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomSkill}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {/* Selected custom skills badge display */}
                      {skills.filter(s => !AVAILABLE_SKILLS.some(a => a.name.toLowerCase() === s.name.toLowerCase())).length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {skills.filter(s => !AVAILABLE_SKILLS.some(a => a.name.toLowerCase() === s.name.toLowerCase())).map(s => (
                            <span
                              key={s.name}
                              className="flex items-center gap-1.5 px-2 py-0.5 bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs rounded-full"
                            >
                              <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ backgroundColor: s.color ? (s.color.startsWith('#') ? s.color : `#${s.color}`) : '#8b5cf6' }}
                              />
                              {s.name}
                              <button
                                type="button"
                                onClick={() => dispatch(toggleSkill(s))}
                                className="text-purple-400 hover:text-red-400 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── GITHUB STATS ── */}
                {sec.id === 'githubStats' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">
                      GitHub analytics dynamically query using the username from your Profile section (<span className="text-purple-400 font-mono">@{profile.username || 'username'}</span>).
                    </p>
                    <div className="p-3 bg-slate-800/40 rounded-lg space-y-1.5">
                      <p className="text-xs font-semibold text-slate-200">Included Widgets:</p>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        <li>👁️ Profile Views Counter (komarev.com)</li>
                        <li>👥 GitHub Followers Badge</li>
                        <li>📊 Main GitHub Stats Card & Top Languages Card</li>
                        <li>🔥 Daily Contribution Streak (toggle in Global Settings)</li>
                        <li>📈 Contribution Activity Wave Graph</li>
                        <li>🏆 GitHub Trophies (toggle in Global Settings)</li>
                        <li>💬 Daily Developer Inspiration Quote (toggle in Global Settings)</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* ── PROJECTS ── */}
                {sec.id === 'projects' && (
                  <div className="space-y-3">
                    {projects.map((proj, pIdx) => (
                      <div key={proj.id || pIdx} className="p-3 bg-[#0B0F17] border border-slate-700 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project #{pIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => dispatch(deleteProject(proj.id))}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className={labelCls}>Project Name</label>
                            <input
                              type="text"
                              value={proj.name}
                              onChange={e => {
                                const u = [...projects];
                                u[pIdx] = { ...proj, name: e.target.value };
                                dispatch(setProjects(u));
                              }}
                              className={inp}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Status</label>
                            <input
                              type="text"
                              value={proj.status || ''}
                              onChange={e => {
                                const u = [...projects];
                                u[pIdx] = { ...proj, status: e.target.value };
                                dispatch(setProjects(u));
                              }}
                              placeholder="Active / Production / WIP"
                              className={inp}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>GitHub Repository URL</label>
                            <input
                              type="url"
                              value={proj.githubUrl || ''}
                              onChange={e => {
                                const u = [...projects];
                                u[pIdx] = { ...proj, githubUrl: e.target.value };
                                dispatch(setProjects(u));
                              }}
                              className={inp}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Live Demo URL</label>
                            <input
                              type="url"
                              value={proj.liveUrl || ''}
                              onChange={e => {
                                const u = [...projects];
                                u[pIdx] = { ...proj, liveUrl: e.target.value };
                                dispatch(setProjects(u));
                              }}
                              className={inp}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelCls}>Description</label>
                            <textarea
                              rows={2}
                              value={proj.description || ''}
                              onChange={e => {
                                const u = [...projects];
                                u[pIdx] = { ...proj, description: e.target.value };
                                dispatch(setProjects(u));
                              }}
                              className={texta}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelCls}>Technologies (comma separated)</label>
                            <input
                              type="text"
                              value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                              onChange={e => {
                                const u = [...projects];
                                u[pIdx] = {
                                  ...proj,
                                  technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                                };
                                dispatch(setProjects(u));
                              }}
                              className={inp}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(addProject({
                          id: 'p-' + Date.now(),
                          name: 'New Project',
                          description: 'High-performance application built with modern architecture.',
                          technologies: ['React', 'Node.js'],
                          githubUrl: 'https://github.com',
                          liveUrl: '',
                          status: 'Active'
                        }))
                      }
                      className="w-full py-2 bg-slate-800 border border-dashed border-slate-600 rounded-lg text-xs font-semibold text-purple-400 hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>
                )}

                {/* ── EXPERIENCE ── */}
                {sec.id === 'experience' && (
                  <ListEditor
                    items={experience}
                    setItems={setExperience}
                    dispatch={dispatch}
                    newItem={{
                      company: '',
                      position: '',
                      startDate: '',
                      endDate: '',
                      current: false,
                      companyUrl: '',
                      description: '',
                      technologies: []
                    }}
                    fields={[
                      { key: 'position', label: 'Job Title / Position', placeholder: 'Senior Software Engineer' },
                      { key: 'company', label: 'Company / Organization', placeholder: 'Acme Corp' },
                      { key: 'companyUrl', label: 'Company URL', placeholder: 'https://acme.com' },
                      { key: 'startDate', label: 'Start Date', placeholder: 'Jan 2022' },
                      { key: 'endDate', label: 'End Date', placeholder: 'Present' },
                      { key: 'current', label: 'Current Employment', type: 'checkbox', checkLabel: 'I currently work here', full: true },
                      { key: 'description', label: 'Description & Impact', type: 'textarea', placeholder: 'Architected distributed systems...', full: true },
                      { key: 'technologies', label: 'Key Technologies (comma separated)', placeholder: 'React, Node.js, PostgreSQL', full: true }
                    ]}
                  />
                )}

                {/* ── EDUCATION ── */}
                {sec.id === 'education' && (
                  <ListEditor
                    items={education}
                    setItems={setEducation}
                    dispatch={dispatch}
                    newItem={{ institution: '', degree: '', field: '', startYear: '', endYear: '', description: '' }}
                    fields={[
                      { key: 'institution', label: 'Institution / University', placeholder: 'UC Berkeley' },
                      { key: 'degree', label: 'Degree', placeholder: 'B.S. / M.S.' },
                      { key: 'field', label: 'Field of Study', placeholder: 'Computer Science' },
                      { key: 'startYear', label: 'Start Year', placeholder: '2018' },
                      { key: 'endYear', label: 'End Year', placeholder: '2022' },
                      { key: 'description', label: 'Honors & Focus', type: 'textarea', placeholder: 'Magna Cum Laude...', full: true }
                    ]}
                  />
                )}

                {/* ── CERTIFICATIONS ── */}
                {sec.id === 'certifications' && (
                  <ListEditor
                    items={certifications}
                    setItems={setCertifications}
                    dispatch={dispatch}
                    newItem={{ certification: '', issuer: '', date: '', credentialUrl: '' }}
                    fields={[
                      { key: 'certification', label: 'Certification Name', placeholder: 'AWS Solutions Architect Professional', full: true },
                      { key: 'issuer', label: 'Issuing Organization', placeholder: 'Amazon Web Services' },
                      { key: 'date', label: 'Date Issued', placeholder: '2023' },
                      { key: 'credentialUrl', label: 'Credential Verification URL', placeholder: 'https://credly.com/...', full: true }
                    ]}
                  />
                )}

                {/* ── ACHIEVEMENTS ── */}
                {sec.id === 'achievements' && (
                  <ListEditor
                    items={achievements}
                    setItems={setAchievements}
                    dispatch={dispatch}
                    newItem={{ title: '', description: '' }}
                    fields={[
                      { key: 'title', label: 'Honor / Award Title', placeholder: 'Winner, Global FinTech Hackathon', full: true },
                      { key: 'description', label: 'Description & Scope', type: 'textarea', placeholder: 'Recognized for building...', full: true }
                    ]}
                  />
                )}

                {/* ── SERVICES ── */}
                {sec.id === 'services' && (
                  <ListEditor
                    items={services}
                    setItems={setServices}
                    dispatch={dispatch}
                    newItem={{ title: '', description: '' }}
                    fields={[
                      { key: 'title', label: 'Service / Offering Title', placeholder: 'Full Stack Architecture Consulting', full: true },
                      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'End-to-end design and implementation...', full: true }
                    ]}
                  />
                )}

                {/* ── OPEN SOURCE ── */}
                {sec.id === 'openSource' && (
                  <ListEditor
                    items={openSource}
                    setItems={setOpenSource}
                    dispatch={dispatch}
                    newItem={{ project: '', role: '', contribution: '', url: '' }}
                    fields={[
                      { key: 'project', label: 'Repository / Project Name', placeholder: 'TanStack/query' },
                      { key: 'role', label: 'Role', placeholder: 'Contributor / Maintainer' },
                      { key: 'url', label: 'Repository URL', placeholder: 'https://github.com/...' },
                      { key: 'contribution', label: 'Contribution Summary', type: 'textarea', placeholder: 'Resolved hydration bugs and added features...', full: true }
                    ]}
                  />
                )}

                {/* ── SUPPORT & SPONSORS ── */}
                {sec.id === 'support' && (
                  <div className="space-y-3">
                    {support.map((sup, sIdx) => (
                      <div key={sup.id || sIdx} className="p-3 bg-[#0B0F17] border border-slate-700 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support Channel #{sIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => dispatch(setSupport(support.filter((_, i) => i !== sIdx)))}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className={labelCls}>Platform</label>
                            <select
                              value={sup.type || 'buyMeACoffee'}
                              onChange={e => {
                                const u = [...support];
                                u[sIdx] = {
                                  ...sup,
                                  type: e.target.value,
                                  name: e.target.options[e.target.selectedIndex].text
                                };
                                dispatch(setSupport(u));
                              }}
                              className={inp}
                            >
                              <option value="buyMeACoffee">Buy Me a Coffee</option>
                              <option value="kofi">Ko-fi</option>
                              <option value="patreon">Patreon</option>
                              <option value="githubSponsors">GitHub Sponsors</option>
                              <option value="paypal">PayPal</option>
                              <option value="other">Other Platform</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelCls}>Donation / Sponsor URL</label>
                            <input
                              type="url"
                              value={sup.url || ''}
                              onChange={e => {
                                const u = [...support];
                                u[sIdx] = { ...sup, url: e.target.value };
                                dispatch(setSupport(u));
                              }}
                              placeholder="https://..."
                              className={inp}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(setSupport([...support, {
                          id: 'sup-' + Date.now(),
                          type: 'buyMeACoffee',
                          name: 'Buy Me a Coffee',
                          url: ''
                        }]))
                      }
                      className="w-full py-2 bg-slate-800 border border-dashed border-slate-600 rounded-lg text-xs font-semibold text-purple-400 hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Support Link
                    </button>
                  </div>
                )}

                {/* ── CUSTOM SECTIONS ── */}
                {sec.id === 'customSections' && (
                  <div className="space-y-3">
                    {customSections.map((cs, cIdx) => (
                      <div key={cs.id || cIdx} className="p-3 bg-[#0B0F17] border border-slate-700 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Custom Section #{cIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => dispatch(setCustomSections(customSections.filter((_, i) => i !== cIdx)))}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className={labelCls}>Section Title</label>
                          <input
                            type="text"
                            value={cs.title || ''}
                            onChange={e => {
                              const u = [...customSections];
                              u[cIdx] = { ...cs, title: e.target.value };
                              dispatch(setCustomSections(u));
                            }}
                            placeholder="e.g. ⚡ Currently Learning / 📚 Favorite Books"
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Content (Markdown Supported)</label>
                          <textarea
                            rows={5}
                            value={cs.content || ''}
                            onChange={e => {
                              const u = [...customSections];
                              u[cIdx] = { ...cs, content: e.target.value };
                              dispatch(setCustomSections(u));
                            }}
                            placeholder="- 🦀 Deepening Rust systems programming\n- 🤖 Experimenting with LangChain and Ollama\n- 🌐 Building serverless edge workers"
                            className={texta}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(setCustomSections([...customSections, {
                          id: 'cs-' + Date.now(),
                          title: '⚡ New Section',
                          content: '',
                          enabled: true
                        }]))
                      }
                      className="w-full py-2 bg-slate-800 border border-dashed border-slate-600 rounded-lg text-xs font-semibold text-purple-400 hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Custom Section
                    </button>
                  </div>
                )}

                {/* ── CONTACT & SOCIALS ── */}
                {sec.id === 'contact' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">Add your social profile URLs to generate clean branded Shields.io badges.</p>
                    {SOCIAL_PLATFORMS.map((plat) => {
                      const existing = socials.find((s) => s.platform === plat.name) || { url: '' };
                      return (
                        <div key={plat.id} className="flex items-center gap-2">
                          <span className="w-28 text-xs text-slate-300 font-medium truncate flex-shrink-0">{plat.name}</span>
                          <input
                            type="text"
                            placeholder={`${plat.prefix}...`}
                            value={existing.url}
                            onChange={(e) => {
                              const updated = socials.filter((s) => s.platform !== plat.name);
                              if (e.target.value) {
                                updated.push({
                                  platform: plat.name,
                                  url: e.target.value,
                                  badge: plat.badge
                                });
                              }
                              dispatch(setSocials(updated));
                            }}
                            className={inp}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionList;
