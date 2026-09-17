import { createSlice } from '@reduxjs/toolkit';
import { generateReadme } from '../../utils/markdownGenerator';
import { TEMPLATES } from '../../templates/templatesCatalog';

const initialFormData = {
  profile: {
    name: 'Alex Rivera',
    username: 'alexrivera',
    role: 'Senior Full Stack Engineer',
    tagline: 'Building robust distributed systems & modern web applications.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerUrl: '',
    location: 'San Francisco, CA',
    website: 'https://alexrivera.dev',
    bio: 'Passionate software engineer with 6+ years of experience specializing in React, Node.js, and cloud native architectures.'
  },
  about: 'I specialize in full-stack web application development, microservices, and developer toolchain optimization. In my spare time, I actively contribute to open-source software and mentor aspiring engineers.',
  skills: [
    { name: 'JavaScript', category: 'Languages', badge: 'JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black', color: '#F7DF1E' },
    { name: 'TypeScript', category: 'Languages', badge: 'TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white', color: '#3178C6' },
    { name: 'React', category: 'Frontend', badge: 'React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB', color: '#61DAFB' },
    { name: 'Next.js', category: 'Frontend', badge: 'Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white', color: '#000000' },
    { name: 'Tailwind CSS', category: 'Frontend', badge: 'Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white', color: '#38B2AC' },
    { name: 'Node.js', category: 'Backend', badge: 'Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white', color: '#339933' },
    { name: 'Express.js', category: 'Backend', badge: 'Express.js-404D59?style=for-the-badge', color: '#000000' },
    { name: 'MongoDB', category: 'Database', badge: 'MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white', color: '#47A248' },
    { name: 'PostgreSQL', category: 'Database', badge: 'PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white', color: '#4169E1' },
    { name: 'Docker', category: 'DevOps & Cloud', badge: 'Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white', color: '#2496ED' },
    { name: 'Git', category: 'Tools & Workflow', badge: 'Git-F05032?style=for-the-badge&logo=git&logoColor=white', color: '#F05032' }
  ],
  socials: [
    { platform: 'GitHub', url: 'https://github.com/alexrivera', badge: 'GitHub-100000?style=for-the-badge&logo=github&logoColor=white' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexrivera', badge: 'LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' },
    { platform: 'Twitter', url: 'https://twitter.com/alexrivera_dev', badge: 'Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white' }
  ],
  projects: [
    {
      id: 'p-1',
      name: 'CloudPulse Dashboard',
      description: 'Real-time cloud observability and Kubernetes performance monitor with automated alerts.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/alexrivera/cloudpulse',
      liveUrl: 'https://cloudpulse.app',
      status: 'Production'
    },
    {
      id: 'p-2',
      name: 'DevFlow CLI',
      description: 'Streamlined command-line tool for bootstrapping standardized production microservices.',
      technologies: ['Node.js', 'Go', 'Docker'],
      githubUrl: 'https://github.com/alexrivera/devflow-cli',
      liveUrl: '',
      status: 'Active'
    }
  ],
  experience: [
    {
      id: 'e-1',
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Engineer',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      companyUrl: 'https://example.com',
      description: 'Led architecture of high-concurrency billing engine serving 2M+ daily events.',
      technologies: ['React', 'Node.js', 'Redis', 'AWS']
    }
  ],
  education: [
    {
      id: 'ed-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S.',
      field: 'Computer Science',
      startYear: '2016',
      endYear: '2020',
      description: 'Graduated with Magna Cum Laude honors. Focus on distributed systems and software architecture.'
    }
  ],
  certifications: [
    {
      id: 'c-1',
      certification: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialUrl: 'https://aws.amazon.com'
    },
    {
      id: 'c-2',
      certification: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2024',
      credentialUrl: 'https://www.cncf.io'
    }
  ],
  achievements: [
    { id: 'a-1', title: 'Winner, Global FinTech Hackathon 2023', description: 'Built an AI automated real-time fraud detection gateway.' },
    { id: 'a-2', title: 'Top 1% Open Source Contributor', description: 'Ranked in top 1% contributors on GitHub with 1,200+ contributions in 2023.' }
  ],
  services: [
    { id: 's-1', title: 'Full Stack Web Architecture', description: 'Enterprise scalable frontends with Next.js/React and high-throughput microservices.' },
    { id: 's-2', title: 'Cloud Infrastructure & DevOps', description: 'Docker containerization, Kubernetes orchestration, and automated CI/CD pipelines.' },
    { id: 's-3', title: 'API & Microservice Development', description: 'RESTful & GraphQL services built with high security, rate limiting, and observability.' }
  ],
  openSource: [
    { id: 'o-1', project: 'React Query Contributor', contribution: 'Added query cache invalidation improvements and mutation retries', role: 'Contributor', url: 'https://github.com/TanStack/query' },
    { id: 'o-2', project: 'Tailwind UI Kit', contribution: 'Crafted 15+ accessible interactive components', role: 'Maintainer', url: 'https://github.com' }
  ],
  support: [
    { id: 'sup-1', type: 'buyMeACoffee', name: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/alexrivera' },
    { id: 'sup-2', type: 'githubSponsors', name: 'GitHub Sponsors', url: 'https://github.com/sponsors/alexrivera' }
  ],
  customSections: [
    {
      id: 'cs-1',
      title: '⚡ Currently Learning & Exploring',
      content: '- 🦀 Deepening Rust systems programming & WebAssembly.\n- 🤖 Fine-tuning open-source LLMs with Ollama & LangChain.\n- 🚀 Exploring distributed event streaming with Apache Kafka.',
      enabled: true
    }
  ],
  sections: [
    { id: 'profile', title: 'Profile Header', enabled: true },
    { id: 'about', title: 'About Me', enabled: true },
    { id: 'skills', title: 'Tech Stack & Skills', enabled: true },
    { id: 'githubStats', title: 'GitHub Statistics & Contributions', enabled: true },
    { id: 'projects', title: 'Featured Projects', enabled: true },
    { id: 'experience', title: 'Work Experience', enabled: true },
    { id: 'education', title: 'Education', enabled: true },
    { id: 'certifications', title: 'Certifications & Credentials', enabled: true },
    { id: 'achievements', title: 'Honors & Achievements', enabled: true },
    { id: 'services', title: 'Services & Offerings', enabled: true },
    { id: 'openSource', title: 'Open Source Contributions', enabled: true },
    { id: 'customSections', title: 'Custom Sections', enabled: true },
    { id: 'contact', title: 'Connect & Contact', enabled: true },
    { id: 'support', title: 'Support & Sponsors', enabled: true }
  ],
  settings: {
    badgeStyle: 'for-the-badge',
    statsTheme: 'tokyonight',
    align: 'center',
    showTrophies: false,
    showStreak: true,
    showDevQuote: false
  }
};

const initialMarkdown = generateReadme(initialFormData, 'modern', initialFormData.settings);

export const generatorSlice = createSlice({
  name: 'generator',
  initialState: {
    activeReadmeId: null,
    readmeName: 'My GitHub Profile README',
    activeTemplate: 'modern',
    formData: initialFormData,
    generatedMarkdown: initialMarkdown,
    customMarkdown: initialMarkdown,
    isManualMarkdownEdit: false,
    history: [initialFormData],
    historyIndex: 0,
    saveStatus: 'idle' // 'idle' | 'saving' | 'saved' | 'error'
  },
  reducers: {
    updateProfile: (state, action) => {
      state.formData.profile = { ...state.formData.profile, ...action.payload };
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    updateAbout: (state, action) => {
      state.formData.about = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setSkills: (state, action) => {
      state.formData.skills = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    toggleSkill: (state, action) => {
      const skill = action.payload;
      const index = state.formData.skills.findIndex(s => s.name.toLowerCase() === skill.name.toLowerCase());
      if (index > -1) {
        state.formData.skills.splice(index, 1);
      } else {
        state.formData.skills.push(skill);
      }
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    addCustomSkill: (state, action) => {
      const { name, category = 'Other', color = '3b82f6' } = action.payload;
      if (!name || !name.trim()) return;
      const cleanName = name.trim();
      const existing = state.formData.skills.find(s => s.name.toLowerCase() === cleanName.toLowerCase());
      if (!existing) {
        state.formData.skills.push({
          name: cleanName,
          category,
          color,
          badge: `${encodeURIComponent(cleanName)}-${color.replace('#', '')}?style=for-the-badge&logo=codeigniter&logoColor=white`
        });
        state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
        if (!state.isManualMarkdownEdit) {
          state.customMarkdown = state.generatedMarkdown;
        }
      }
    },
    setSocials: (state, action) => {
      state.formData.socials = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setProjects: (state, action) => {
      state.formData.projects = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    addProject: (state, action) => {
      state.formData.projects.push(action.payload);
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    deleteProject: (state, action) => {
      state.formData.projects = state.formData.projects.filter(p => p.id !== action.payload);
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setExperience: (state, action) => {
      state.formData.experience = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setEducation: (state, action) => {
      state.formData.education = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setCertifications: (state, action) => {
      state.formData.certifications = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setAchievements: (state, action) => {
      state.formData.achievements = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setServices: (state, action) => {
      state.formData.services = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setOpenSource: (state, action) => {
      state.formData.openSource = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setSupport: (state, action) => {
      state.formData.support = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setCustomSections: (state, action) => {
      state.formData.customSections = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setSectionOrder: (state, action) => {
      state.formData.sections = action.payload;
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    toggleSectionVisibility: (state, action) => {
      const { id, enabled } = action.payload;
      const sec = state.formData.sections.find(s => s.id === id);
      if (sec) {
        sec.enabled = enabled;
      }
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setTemplate: (state, action) => {
      state.activeTemplate = action.payload;
      const tmpl = TEMPLATES.find(t => t.id === action.payload);
      if (tmpl?.settings) {
        state.formData.settings = { ...state.formData.settings, ...tmpl.settings };
      }
      state.generatedMarkdown = generateReadme(state.formData, action.payload, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    updateSettings: (state, action) => {
      state.formData.settings = { ...state.formData.settings, ...action.payload };
      state.generatedMarkdown = generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      if (!state.isManualMarkdownEdit) {
        state.customMarkdown = state.generatedMarkdown;
      }
    },
    setManualMarkdown: (state, action) => {
      state.customMarkdown = action.payload;
      state.isManualMarkdownEdit = true;
    },
    resetToGenerated: (state) => {
      state.isManualMarkdownEdit = false;
      state.customMarkdown = state.generatedMarkdown;
    },
    setSaveStatus: (state, action) => {
      state.saveStatus = action.payload;
    },
    setReadmeName: (state, action) => {
      state.readmeName = action.payload;
    },
    loadReadmeData: (state, action) => {
      const { readme } = action.payload;
      state.activeReadmeId = readme._id;
      state.readmeName = readme.name;
      state.activeTemplate = readme.template || 'modern';
      state.formData = {
        ...initialFormData,
        ...readme
      };
      state.generatedMarkdown = readme.markdown || generateReadme(state.formData, state.activeTemplate, state.formData.settings);
      state.customMarkdown = state.generatedMarkdown;
      state.isManualMarkdownEdit = false;
    }
  }
});

export const {
  updateProfile,
  updateAbout,
  setSkills,
  toggleSkill,
  addCustomSkill,
  setSocials,
  setProjects,
  addProject,
  deleteProject,
  setExperience,
  setEducation,
  setCertifications,
  setAchievements,
  setServices,
  setOpenSource,
  setSupport,
  setCustomSections,
  setSectionOrder,
  toggleSectionVisibility,
  setTemplate,
  updateSettings,
  setManualMarkdown,
  resetToGenerated,
  setSaveStatus,
  setReadmeName,
  loadReadmeData
} = generatorSlice.actions;

export default generatorSlice.reducer;