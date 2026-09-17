const mongoose = require('mongoose');

const readmeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for the README'],
      default: 'My GitHub Profile README'
    },
    slug: {
      type: String,
      default: 'profile-readme'
    },
    template: {
      type: String,
      default: 'modern'
    },
    theme: {
      type: String,
      default: 'dark'
    },
    sections: {
      type: Array,
      default: [
        { id: 'profile', title: 'Profile', enabled: true },
        { id: 'about', title: 'About Me', enabled: true },
        { id: 'skills', title: 'Skills & Tech Stack', enabled: true },
        { id: 'githubStats', title: 'GitHub Statistics', enabled: true },
        { id: 'projects', title: 'Featured Projects', enabled: true },
        { id: 'experience', title: 'Work Experience', enabled: true },
        { id: 'education', title: 'Education', enabled: false },
        { id: 'certifications', title: 'Certifications', enabled: false },
        { id: 'achievements', title: 'Achievements', enabled: false },
        { id: 'services', title: 'Services', enabled: false },
        { id: 'openSource', title: 'Open Source', enabled: false },
        { id: 'contact', title: 'Connect & Contact', enabled: true },
        { id: 'support', title: 'Support / Donate', enabled: false }
      ]
    },
    profile: {
      name: { type: String, default: '' },
      username: { type: String, default: '' },
      role: { type: String, default: '' },
      tagline: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      bio: { type: String, default: '' },
      bannerUrl: { type: String, default: '' }
    },
    about: {
      type: String,
      default: 'Passionate developer building modern web applications.'
    },
    skills: {
      type: Array,
      default: []
    },
    socials: {
      type: Array,
      default: []
    },
    projects: {
      type: Array,
      default: []
    },
    experience: {
      type: Array,
      default: []
    },
    education: {
      type: Array,
      default: []
    },
    certifications: {
      type: Array,
      default: []
    },
    achievements: {
      type: Array,
      default: []
    },
    services: {
      type: Array,
      default: []
    },
    openSource: {
      type: Array,
      default: []
    },
    customSections: {
      type: Array,
      default: []
    },
    badges: {
      type: Array,
      default: []
    },
    settings: {
      type: Object,
      default: {
        badgeStyle: 'for-the-badge',
        statsTheme: 'tokyonight',
        align: 'left',
        showGithubTrophies: true,
        showStreak: true
      }
    },
    markdown: {
      type: String,
      default: ''
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    versions: [
      {
        versionNumber: Number,
        savedAt: { type: Date, default: Date.now },
        markdown: String,
        note: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Readme', readmeSchema);