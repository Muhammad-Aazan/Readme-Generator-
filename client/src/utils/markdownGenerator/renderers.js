/**
 * Modular Deterministic Markdown & HTML Renderers for GitHub Profile READMEs
 * Enhanced with Dynamic GitHub Stats (Profile Views, Followers, Contribution Graph),
 * Multiple Theme Palettes, and Rich Section Renderers.
 */

export const THEME_PALETTES = {
  tokyonight: {
    bg: '1a1b27',
    color: '70a5fd',
    text: '38bdae',
    title: 'bf91f3',
    statsTheme: 'tokyonight'
  },
  dracula: {
    bg: '282a36',
    color: 'ff79c6',
    text: 'f8f8f2',
    title: 'bd93f9',
    statsTheme: 'dracula'
  },
  radical: {
    bg: '141321',
    color: 'fe428e',
    text: 'a9fef7',
    title: 'f8d847',
    statsTheme: 'radical'
  },
  onedark: {
    bg: '282c34',
    color: 'e06c75',
    text: 'abb2bf',
    title: '61afef',
    statsTheme: 'onedark'
  },
  gruvbox: {
    bg: '282828',
    color: 'fb4934',
    text: 'ebdbb2',
    title: 'fabd2f',
    statsTheme: 'gruvbox'
  },
  cyberpunk: {
    bg: '000b1e',
    color: '00ff9f',
    text: '00b8ff',
    title: 'ff003c',
    statsTheme: 'cyberpunk'
  },
  synthwave: {
    bg: '2b213a',
    color: 'e2e237',
    text: 'f92aad',
    title: '24ebd7',
    statsTheme: 'synthwave'
  }
};

export const renderHeader = (profile, templateId, settings = {}) => {
  const align = settings.align || (templateId === 'minimalist' ? 'left' : 'center');
  const name = profile.name || 'Developer';
  const role = profile.role || 'Full Stack Engineer';
  const tagline = profile.tagline || '';
  const avatarUrl = profile.avatarUrl;
  const bannerUrl = profile.bannerUrl;
  const username = profile.username || 'github';

  let output = '';

  if (bannerUrl) {
    output += `<p align="${align}">\n  <img src="${bannerUrl}" alt="${name}'s Banner" width="100%" />\n</p>\n\n`;
  }

  // Profile Views Counter & Followers Badges at top
  output += `<p align="${align}">\n`;
  output += `  <img src="https://komarev.com/ghpvc/?username=${username}&label=Profile%20Views&color=7c3aed&style=${settings.badgeStyle || 'flat-square'}" alt="Profile Views" />\n`;
  output += `  <a href="https://github.com/${username}?tab=followers"><img src="https://img.shields.io/github/followers/${username}?label=Followers&style=${settings.badgeStyle || 'flat-square'}&logo=github&color=3b82f6" alt="GitHub Followers" /></a>\n`;
  output += `</p>\n\n`;

  if (templateId === 'animated') {
    output += `<p align="${align}">\n`;
    if (avatarUrl) {
      output += `  <img src="${avatarUrl}" alt="${name}" width="120" style="border-radius: 50%;" />\n  <br/>\n`;
    }
    output += `  <a href="https://git.io/typing-svg">\n`;
    output += `    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=6366F1&center=${align === 'center' ? 'true' : 'false'}&vCenter=true&width=500&lines=Hi+%F0%9F%91%8B%2C+I'm+${encodeURIComponent(name)};${encodeURIComponent(role)};Welcome+to+my+GitHub+Profile!" alt="Typing SVG" />\n`;
    output += `  </a>\n</p>\n\n`;
    if (tagline) {
      output += `<p align="${align}"><em>${tagline}</em></p>\n\n`;
    }
    return output;
  }

  if (templateId === 'cyberpunk') {
    output += `\`\`\`bash\n`;
    output += `/* ==========================================================\n`;
    output += ` * [SYSTEM ONLINE] OPERATOR: ${name.toUpperCase()}\n`;
    output += ` * [ROLE]          ${role.toUpperCase()}\n`;
    if (profile.location) output += ` * [LOCATION]      ${profile.location.toUpperCase()}\n`;
    output += ` * [STATUS]        COMPILING CODE & SHIFTING PARADIGMS\n`;
    output += ` * ========================================================== */\n`;
    output += `\`\`\`\n\n`;
    if (tagline) {
      output += `> \`>>> ${tagline}\`\n\n`;
    }
    return output;
  }

  output += `<h1 align="${align}">Hi 👋, I'm ${name}</h1>\n`;
  output += `<h3 align="${align}">${role}</h3>\n\n`;

  if (avatarUrl && templateId !== 'minimalist') {
    output += `<p align="${align}">\n  <img src="${avatarUrl}" alt="${name}" width="120" style="border-radius: 50%;" />\n</p>\n\n`;
  }

  if (tagline) {
    output += `<p align="${align}"><em>${tagline}</em></p>\n\n`;
  }

  return output;
};

export const renderAbout = (about, profile, templateId) => {
  if (!about && !profile.location && !profile.website) return '';

  let output = `## 🚀 About Me\n\n`;
  if (about) {
    output += `${about}\n\n`;
  }

  const bullets = [];
  if (profile.role) bullets.push(`- 💼 Currently working as **${profile.role}**`);
  if (profile.location) bullets.push(`- 📍 Based in **${profile.location}**`);
  if (profile.website) bullets.push(`- 🌐 Portfolio / Website: [${profile.website}](${profile.website.startsWith('http') ? profile.website : 'https://' + profile.website})`);

  if (bullets.length > 0) {
    output += bullets.join('\n') + '\n\n';
  }

  return output;
};

export const renderSkills = (skills = [], settings = {}) => {
  if (!skills || skills.length === 0) return '';

  const style = settings.badgeStyle || 'for-the-badge';
  let output = `## 💻 Tech Stack & Skills\n\n`;

  // Group by category if possible
  const categories = {};
  skills.forEach(skill => {
    const cat = skill.category || 'Technologies';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(skill);
  });

  const catKeys = Object.keys(categories);
  if (catKeys.length === 1 && catKeys[0] === 'Technologies') {
    output += `<p align="${settings.align || 'left'}">\n`;
    skills.forEach(s => {
      let badgeUrl = '';
      if (s.badge) {
        badgeUrl = `https://img.shields.io/badge/${s.badge.replace(/style=[^&]+/, `style=${style}`)}`;
      } else {
        const cleanName = encodeURIComponent(s.name);
        const color = (s.color || '3b82f6').replace('#', '');
        badgeUrl = `https://img.shields.io/badge/${cleanName}-${color}?style=${style}&logo=codeigniter&logoColor=white`;
      }
      output += `  <img src="${badgeUrl}" alt="${s.name}" />\n`;
    });
    output += `</p>\n\n`;
  } else {
    catKeys.forEach(cat => {
      output += `**${cat}:**\n\n`;
      output += `<p align="${settings.align || 'left'}">\n`;
      categories[cat].forEach(s => {
        let badgeUrl = '';
        if (s.badge) {
          badgeUrl = `https://img.shields.io/badge/${s.badge.replace(/style=[^&]+/, `style=${style}`)}`;
        } else {
          const cleanName = encodeURIComponent(s.name);
          const color = (s.color || '3b82f6').replace('#', '');
          badgeUrl = `https://img.shields.io/badge/${cleanName}-${color}?style=${style}&logo=codeigniter&logoColor=white`;
        }
        output += `  <img src="${badgeUrl}" alt="${s.name}" />\n`;
      });
      output += `</p>\n\n`;
    });
  }

  return output;
};

export const renderGithubStats = (profile, settings = {}) => {
  const username = profile.username || 'github';
  const theme = settings.statsTheme || 'tokyonight';
  const align = settings.align || 'center';

  let output = `## 📊 GitHub Analytics & Contributions\n\n`;

  // 1. Stats + Top Languages side by side
  output += `<p align="${align}">\n`;
  output += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&hide_border=true&count_private=true" alt="${username}'s GitHub Stats" height="180" />\n`;
  output += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&hide_border=true" alt="Top Languages" height="180" />\n`;
  output += `</p>\n\n`;

  // 2. Streak stats
  if (settings.showStreak !== false) {
    output += `<p align="${align}">\n`;
    output += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=true" alt="GitHub Streak" />\n`;
    output += `</p>\n\n`;
  }

  // 3. Contribution Activity Graph
  output += `<p align="${align}">\n`;
  output += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme}&hide_border=true" alt="${username}'s Contribution Graph" />\n`;
  output += `</p>\n\n`;

  // 4. GitHub Trophies (optional toggle)
  if (settings.showTrophies) {
    output += `<p align="${align}">\n`;
    output += `  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&no-bg=true&margin-w=4" alt="GitHub Trophies" />\n`;
    output += `</p>\n\n`;
  }

  // 5. Random Dev Quote (optional toggle)
  if (settings.showDevQuote) {
    output += `<p align="${align}">\n`;
    output += `  <img src="https://quotes-github-profile.vercel.app/api?type=horizontal&theme=${theme === 'default' ? 'dark' : theme}" alt="Random Dev Quote" />\n`;
    output += `</p>\n\n`;
  }

  return output;
};

export const renderProjects = (projects = []) => {
  if (!projects || projects.length === 0) return '';

  let output = `## 🛠️ Featured Projects\n\n`;

  projects.forEach((proj, idx) => {
    output += `### ${idx + 1}. [${proj.name || 'Untitled Project'}](${proj.githubUrl || proj.liveUrl || '#'}) ${proj.status ? `\`${proj.status}\`` : ''}\n\n`;
    if (proj.description) {
      output += `${proj.description}\n\n`;
    }
    if (proj.technologies && proj.technologies.length > 0) {
      output += `**Tech Stack:** \`${Array.isArray(proj.technologies) ? proj.technologies.join('`, `') : proj.technologies}\`\n\n`;
    }
    const links = [];
    if (proj.githubUrl) links.push(`[📁 Source Code](${proj.githubUrl})`);
    if (proj.liveUrl) links.push(`[🌐 Live Demo](${proj.liveUrl})`);
    if (links.length > 0) {
      output += `${links.join(' • ')}\n\n`;
    }
    output += `---\n\n`;
  });

  return output;
};

export const renderExperience = (experience = []) => {
  if (!experience || experience.length === 0) return '';

  let output = `## 💼 Work Experience\n\n`;

  experience.forEach(exp => {
    const dates = exp.startDate ? `${exp.startDate} - ${exp.current ? 'Present' : (exp.endDate || 'Present')}` : '';
    output += `### **${exp.position || 'Software Engineer'}** @ [${exp.company || 'Company'}](${exp.companyUrl || '#'})\n`;
    if (dates) output += `*${dates}*\n\n`;
    if (exp.description) output += `${exp.description}\n\n`;
    if (exp.technologies) {
      output += `*Technologies:* \`${Array.isArray(exp.technologies) ? exp.technologies.join('`, `') : exp.technologies}\`\n\n`;
    }
  });

  return output;
};

export const renderEducation = (education = []) => {
  if (!education || education.length === 0) return '';

  let output = `## 🎓 Education\n\n`;

  education.forEach(edu => {
    output += `### **${edu.degree || 'Degree'} in ${edu.field || 'Computer Science'}**\n`;
    output += `*${edu.institution || 'University'}* (${edu.startYear || ''} - ${edu.endYear || 'Present'})\n\n`;
    if (edu.description) output += `${edu.description}\n\n`;
  });

  return output;
};

export const renderCertifications = (certifications = []) => {
  if (!certifications || certifications.length === 0) return '';

  let output = `## 📜 Certifications & Credentials\n\n`;
  certifications.forEach(cert => {
    output += `- **[${cert.certification || 'Certification'}](${cert.credentialUrl || '#'})** - *${cert.issuer || 'Issuer'}* (${cert.date || ''})\n`;
  });
  output += `\n`;
  return output;
};

export const renderAchievements = (achievements = []) => {
  if (!achievements || achievements.length === 0) return '';

  let output = `## 🏆 Honors & Achievements\n\n`;
  achievements.forEach(ach => {
    output += `- 🏅 **${ach.title || ach.name || ach}**${ach.description ? `: ${ach.description}` : ''}\n`;
  });
  output += `\n`;
  return output;
};

export const renderServices = (services = []) => {
  if (!services || services.length === 0) return '';

  let output = `## ⚡ Services & What I Do\n\n`;
  services.forEach(srv => {
    output += `- ✔️ **${srv.title || srv}**: ${srv.description || 'Professional design and development solutions.'}\n`;
  });
  output += `\n`;
  return output;
};

export const renderOpenSource = (openSource = []) => {
  if (!openSource || openSource.length === 0) return '';

  let output = `## 🌍 Open Source Contributions\n\n`;
  openSource.forEach(item => {
    output += `- 🌟 **[${item.project || 'Project'}](${item.url || '#'})** (${item.role || 'Contributor'}): ${item.contribution || 'Feature contributions and bug fixes.'}\n`;
  });
  output += `\n`;
  return output;
};

export const renderContact = (socials = [], profile = {}, settings = {}) => {
  let output = `## 🤝 Connect With Me\n\n`;
  const align = settings.align || 'left';
  const badgeStyle = settings.badgeStyle || 'for-the-badge';

  if (socials && socials.length > 0) {
    output += `<p align="${align}">\n`;
    socials.forEach(s => {
      if (!s.url) return;
      const badge = s.badge ? s.badge.replace(/style=[^&]+/, `style=${badgeStyle}`) : `${encodeURIComponent(s.platform || 'Link')}-000000?style=${badgeStyle}`;
      output += `  <a href="${s.url}" target="_blank">\n    <img src="https://img.shields.io/badge/${badge}" alt="${s.platform || 'Link'}" />\n  </a>\n`;
    });
    output += `</p>\n\n`;
  }

  return output;
};

export const renderSupport = (supportLinks = [], settings = {}) => {
  if (!supportLinks || supportLinks.length === 0) return '';

  let output = `## 💖 Support & Sponsors\n\n`;
  output += `<p align="${settings.align || 'left'}">\n`;
  supportLinks.forEach(sup => {
    if (sup.type === 'buyMeACoffee' || sup.name === 'Buy Me a Coffee') {
      output += `  <a href="${sup.url}" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" /></a>\n`;
    } else if (sup.type === 'kofi' || sup.name === 'Ko-fi') {
      output += `  <a href="${sup.url}" target="_blank"><img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi" /></a>\n`;
    } else if (sup.type === 'patreon' || sup.name === 'Patreon') {
      output += `  <a href="${sup.url}" target="_blank"><img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon" /></a>\n`;
    } else if (sup.type === 'githubSponsors' || sup.name === 'GitHub Sponsors') {
      output += `  <a href="${sup.url}" target="_blank"><img src="https://img.shields.io/badge/GitHub%20Sponsors-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="GitHub Sponsors" /></a>\n`;
    } else if (sup.url) {
      output += `  <a href="${sup.url}" target="_blank"><img src="https://img.shields.io/badge/${encodeURIComponent(sup.name || 'Sponsor')}-FF69B4?style=for-the-badge&logo=heart&logoColor=white" alt="${sup.name || 'Sponsor'}" /></a>\n`;
    }
  });
  output += `</p>\n\n`;
  return output;
};

export const renderCustomSections = (customSections = []) => {
  if (!customSections || customSections.length === 0) return '';

  let output = '';
  customSections.forEach(sec => {
    if (sec.enabled === false) return;
    output += `## ${sec.title || 'Custom Section'}\n\n`;
    output += `${sec.content || ''}\n\n`;
  });

  return output;
};