import {
  renderHeader,
  renderAbout,
  renderSkills,
  renderGithubStats,
  renderProjects,
  renderExperience,
  renderEducation,
  renderCertifications,
  renderAchievements,
  renderServices,
  renderOpenSource,
  renderContact,
  renderSupport,
  renderCustomSections
} from './renderers';

/**
 * Deterministic Main Entry Point for Markdown Generation
 * Accepts user form data, active template identifier, and layout styling settings
 */
export const generateReadme = (data = {}, templateId = 'modern', settings = {}) => {
  const {
    profile = {},
    about = '',
    skills = [],
    socials = [],
    projects = [],
    experience = [],
    education = [],
    certifications = [],
    achievements = [],
    services = [],
    openSource = [],
    customSections = [],
    support = [],
    sections = []
  } = data;

  // Default section order if not supplied
  const defaultSections = [
    { id: 'profile', enabled: true },
    { id: 'about', enabled: true },
    { id: 'skills', enabled: true },
    { id: 'githubStats', enabled: true },
    { id: 'projects', enabled: true },
    { id: 'experience', enabled: true },
    { id: 'education', enabled: true },
    { id: 'certifications', enabled: true },
    { id: 'achievements', enabled: true },
    { id: 'services', enabled: true },
    { id: 'openSource', enabled: true },
    { id: 'customSections', enabled: true },
    { id: 'contact', enabled: true },
    { id: 'support', enabled: true }
  ];

  const activeSections = sections.length > 0 ? sections : defaultSections;

  // Dispatch renderer by section ID
  const renderMap = {
    profile: () => renderHeader(profile, templateId, settings),
    about: () => renderAbout(about, profile, templateId),
    skills: () => renderSkills(skills, settings),
    githubStats: () => renderGithubStats(profile, settings),
    projects: () => renderProjects(projects),
    experience: () => renderExperience(experience),
    education: () => renderEducation(education),
    certifications: () => renderCertifications(certifications),
    achievements: () => renderAchievements(achievements),
    services: () => renderServices(services),
    openSource: () => renderOpenSource(openSource),
    customSections: () => renderCustomSections(customSections),
    contact: () => renderContact(socials, profile, settings),
    support: () => renderSupport(support, settings)
  };

  const renderedParts = [];

  activeSections.forEach(sec => {
    if (sec.enabled !== false && renderMap[sec.id]) {
      const part = renderMap[sec.id]();
      if (part && part.trim().length > 0) {
        renderedParts.push(part.trim());
      }
    }
  });

  // Join sections with clean Markdown horizontal dividers
  const divider = templateId === 'minimalist' ? '\n\n' : '\n\n---\n\n';
  return renderedParts.join(divider) + '\n';
};

export default generateReadme;