const Template = require('../models/Template');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const defaultTemplates = [
  {
    name: 'Minimalist Developer',
    slug: 'minimalist',
    description: 'Clean, typography-focused layout with simple badges and concise sections.',
    category: 'minimal',
    tags: ['clean', 'concise', 'typography', 'minimal'],
    preview: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Modern Full-Stack',
    slug: 'modern',
    description: 'Rich developer profile with interactive badges, GitHub metrics, cards, and dynamic header.',
    category: 'developer',
    tags: ['fullstack', 'modern', 'popular', 'badges'],
    preview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Executive / Professional',
    slug: 'professional',
    description: 'Formal and structured, tailored for engineering managers, tech leads, and consultants.',
    category: 'developer',
    tags: ['executive', 'management', 'consulting'],
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Frontend Artisan',
    slug: 'frontend',
    description: 'Visual flair, design-oriented badges, UI component showcase, and live preview links.',
    category: 'creative',
    tags: ['frontend', 'ui/ux', 'design', 'react'],
    preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Backend Architect',
    slug: 'backend',
    description: 'Focuses on systems architecture, cloud infrastructure, databases, and microservices.',
    category: 'developer',
    tags: ['backend', 'cloud', 'databases', 'devops'],
    preview: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'AI & Data Scientist',
    slug: 'ai-engineer',
    description: 'Specialized for machine learning engineers with model showcases, papers, and datasets.',
    category: 'specialized',
    tags: ['ai', 'machine-learning', 'python', 'data'],
    preview: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Open Source Enthusiast',
    slug: 'open-source',
    description: 'Emphasizes community contributions, maintained repositories, issue badges, and sponsors.',
    category: 'developer',
    tags: ['oss', 'contributor', 'sponsors', 'community'],
    preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Student & Junior Dev',
    slug: 'student',
    description: 'Highlights learning trajectory, coursework, hackathon wins, and upcoming goals.',
    category: 'minimal',
    tags: ['student', 'intern', 'junior', 'learning'],
    preview: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Designer / Coder',
    slug: 'designer-coder',
    description: 'Harmonious blend of creative aesthetic, portfolio imagery, and technical competencies.',
    category: 'creative',
    tags: ['portfolio', 'creative', 'design', 'figma'],
    preview: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Cyberpunk Terminal',
    slug: 'cyberpunk',
    description: 'Retro terminal neon aesthetics with hacker styling and monospace flair.',
    category: 'specialized',
    tags: ['terminal', 'retro', 'cyberpunk', 'dark'],
    preview: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'Animated Dynamic',
    slug: 'animated',
    description: 'Dynamic animated typing headers, glowing badges, wave dividers, and live stats widgets.',
    category: 'animated',
    tags: ['animated', 'svg', 'dynamic', 'widgets'],
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    isActive: true
  },
  {
    name: 'GitHub Classic Clean',
    slug: 'github-classic',
    description: 'Standard GitHub markdown structure that looks native and clean on all devices.',
    category: 'developer',
    tags: ['classic', 'standard', 'clean', 'simple'],
    preview: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
    isActive: true
  }
];

const getTemplates = async (req, res, next) => {
  try {
    let templates = [];
    try {
      templates = await Template.find({ isActive: true });
      if (templates.length === 0) {
        templates = defaultTemplates;
      }
    } catch (e) {
      templates = defaultTemplates;
    }
    return successResponse(res, { templates });
  } catch (error) {
    next(error);
  }
};

const getTemplateBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let template = null;
    try {
      template = await Template.findOne({ slug, isActive: true });
    } catch (e) {}

    if (!template) {
      template = defaultTemplates.find(t => t.slug === slug);
    }

    if (!template) {
      return errorResponse(res, 'Template not found', 404, 'NOT_FOUND');
    }

    return successResponse(res, { template });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTemplates,
  getTemplateBySlug,
  defaultTemplates
};