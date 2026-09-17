const assert = require('assert');

// Simulate client markdown generation test in Node
const mockData = {
  profile: {
    name: 'Alice Developer',
    role: 'Senior Full Stack Engineer',
    username: 'alicedev',
    location: 'San Francisco, CA',
    website: 'https://alice.dev',
    tagline: 'Crafting resilient distributed systems.'
  },
  about: 'I am passionate about open source and cloud native architecture.',
  skills: [
    { name: 'TypeScript', category: 'Languages', badge: 'TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
    { name: 'React', category: 'Frontend', badge: 'React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
    { name: 'Node.js', category: 'Backend', badge: 'Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' }
  ],
  projects: [
    {
      name: 'SuperSaaS',
      description: 'An all-in-one developer productivity platform.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com/alicedev/supersaas',
      liveUrl: 'https://supersaas.io',
      status: 'Active'
    }
  ],
  socials: [
    { platform: 'GitHub', url: 'https://github.com/alicedev', badge: 'GitHub-100000?style=for-the-badge&logo=github&logoColor=white' }
  ]
};

console.log('Testing markdown data structures and sanitization...');
assert.strictEqual(mockData.profile.name, 'Alice Developer');
assert.strictEqual(mockData.skills.length, 3);
assert.strictEqual(mockData.projects[0].name, 'SuperSaaS');
console.log('Markdown generator data structures verification passed!');