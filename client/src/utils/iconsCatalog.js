export const SKILL_CATEGORIES = {
  LANGUAGES: 'Languages',
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DEVOPS_CLOUD: 'DevOps & Cloud',
  TOOLS: 'Tools & Workflow',
  AI_DATA: 'AI & Data'
};

export const AVAILABLE_SKILLS = [
  // Languages
  { name: 'JavaScript', category: SKILL_CATEGORIES.LANGUAGES, badge: 'JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black', color: '#F7DF1E' },
  { name: 'TypeScript', category: SKILL_CATEGORIES.LANGUAGES, badge: 'TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white', color: '#3178C6' },
  { name: 'Python', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Python-3776AB?style=for-the-badge&logo=python&logoColor=white', color: '#3776AB' },
  { name: 'Java', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white', color: '#ED8B00' },
  { name: 'C++', category: SKILL_CATEGORIES.LANGUAGES, badge: 'C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white', color: '#00599C' },
  { name: 'C#', category: SKILL_CATEGORIES.LANGUAGES, badge: 'C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white', color: '#239120' },
  { name: 'Go', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Go-00ADD8?style=for-the-badge&logo=go&logoColor=white', color: '#00ADD8' },
  { name: 'Rust', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Rust-000000?style=for-the-badge&logo=rust&logoColor=white', color: '#000000' },
  { name: 'PHP', category: SKILL_CATEGORIES.LANGUAGES, badge: 'PHP-777BB4?style=for-the-badge&logo=php&logoColor=white', color: '#777BB4' },
  { name: 'Ruby', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white', color: '#CC342D' },
  { name: 'Kotlin', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white', color: '#7F52FF' },
  { name: 'Swift', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white', color: '#FA7343' },
  { name: 'HTML5', category: SKILL_CATEGORIES.LANGUAGES, badge: 'HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white', color: '#E34F26' },
  { name: 'CSS3', category: SKILL_CATEGORIES.LANGUAGES, badge: 'CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white', color: '#1572B6' },

  // Frontend
  { name: 'React', category: SKILL_CATEGORIES.FRONTEND, badge: 'React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB', color: '#61DAFB' },
  { name: 'Next.js', category: SKILL_CATEGORIES.FRONTEND, badge: 'Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white', color: '#000000' },
  { name: 'Vue.js', category: SKILL_CATEGORIES.FRONTEND, badge: 'Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D', color: '#4FC08D' },
  { name: 'Angular', category: SKILL_CATEGORIES.FRONTEND, badge: 'Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white', color: '#DD0031' },
  { name: 'Svelte', category: SKILL_CATEGORIES.FRONTEND, badge: 'Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white', color: '#FF3E00' },
  { name: 'Tailwind CSS', category: SKILL_CATEGORIES.FRONTEND, badge: 'Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white', color: '#38B2AC' },
  { name: 'Redux Toolkit', category: SKILL_CATEGORIES.FRONTEND, badge: 'Redux-593D88?style=for-the-badge&logo=redux&logoColor=white', color: '#764ABC' },
  { name: 'Vite', category: SKILL_CATEGORIES.FRONTEND, badge: 'Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E', color: '#646CFF' },

  // Backend
  { name: 'Node.js', category: SKILL_CATEGORIES.BACKEND, badge: 'Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white', color: '#339933' },
  { name: 'Express.js', category: SKILL_CATEGORIES.BACKEND, badge: 'Express.js-404D59?style=for-the-badge', color: '#000000' },
  { name: 'NestJS', category: SKILL_CATEGORIES.BACKEND, badge: 'NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white', color: '#E0234E' },
  { name: 'Django', category: SKILL_CATEGORIES.BACKEND, badge: 'Django-092E20?style=for-the-badge&logo=django&logoColor=white', color: '#092E20' },
  { name: 'FastAPI', category: SKILL_CATEGORIES.BACKEND, badge: 'FastAPI-005571?style=for-the-badge&logo=fastapi', color: '#009688' },
  { name: 'Spring Boot', category: SKILL_CATEGORIES.BACKEND, badge: 'Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot', color: '#6DB33F' },
  { name: 'Laravel', category: SKILL_CATEGORIES.BACKEND, badge: 'Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white', color: '#FF2D20' },
  { name: 'GraphQL', category: SKILL_CATEGORIES.BACKEND, badge: 'GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white', color: '#E10098' },

  // Database
  { name: 'MongoDB', category: SKILL_CATEGORIES.DATABASE, badge: 'MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white', color: '#47A248' },
  { name: 'PostgreSQL', category: SKILL_CATEGORIES.DATABASE, badge: 'PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white', color: '#4169E1' },
  { name: 'MySQL', category: SKILL_CATEGORIES.DATABASE, badge: 'MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white', color: '#4479A1' },
  { name: 'Redis', category: SKILL_CATEGORIES.DATABASE, badge: 'Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white', color: '#DC382D' },
  { name: 'Firebase', category: SKILL_CATEGORIES.DATABASE, badge: 'Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white', color: '#FFCA28' },
  { name: 'Supabase', category: SKILL_CATEGORIES.DATABASE, badge: 'Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white', color: '#3ECF8E' },
  { name: 'Prisma', category: SKILL_CATEGORIES.DATABASE, badge: 'Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white', color: '#2D3748' },

  // DevOps & Cloud
  { name: 'Docker', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white', color: '#2496ED' },
  { name: 'Kubernetes', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white', color: '#326CE5' },
  { name: 'AWS', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white', color: '#FF9900' },
  { name: 'Google Cloud', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white', color: '#4285F4' },
  { name: 'Azure', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white', color: '#0089D6' },
  { name: 'Vercel', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white', color: '#000000' },
  { name: 'GitHub Actions', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white', color: '#2088FF' },
  { name: 'Linux', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black', color: '#FCC624' },

  // Tools
  { name: 'Git', category: SKILL_CATEGORIES.TOOLS, badge: 'Git-F05032?style=for-the-badge&logo=git&logoColor=white', color: '#F05032' },
  { name: 'GitHub', category: SKILL_CATEGORIES.TOOLS, badge: 'GitHub-100000?style=for-the-badge&logo=github&logoColor=white', color: '#181717' },
  { name: 'VS Code', category: SKILL_CATEGORIES.TOOLS, badge: 'VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white', color: '#007ACC' },
  { name: 'Postman', category: SKILL_CATEGORIES.TOOLS, badge: 'Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white', color: '#FF6C37' },
  { name: 'Figma', category: SKILL_CATEGORIES.TOOLS, badge: 'Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white', color: '#F24E1E' },
  { name: 'Jest', category: SKILL_CATEGORIES.TOOLS, badge: 'Jest-C21325?style=for-the-badge&logo=jest&logoColor=white', color: '#C21325' },

  // AI & Data
  { name: 'TensorFlow', category: SKILL_CATEGORIES.AI_DATA, badge: 'TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white', color: '#FF6F00' },
  { name: 'PyTorch', category: SKILL_CATEGORIES.AI_DATA, badge: 'PyTorch-EE4C2C?style=for-the-badge&logo=PyTorch&logoColor=white', color: '#EE4C2C' },
  { name: 'OpenAI', category: SKILL_CATEGORIES.AI_DATA, badge: 'OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white', color: '#412991' },
  { name: 'Hugging Face', category: SKILL_CATEGORIES.AI_DATA, badge: 'Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=000', color: '#FFD21E' },
  { name: 'Pandas', category: SKILL_CATEGORIES.AI_DATA, badge: 'Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white', color: '#150458' },

  // Mobile Development
  { name: 'React Native', category: SKILL_CATEGORIES.FRONTEND, badge: 'React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB', color: '#61DAFB' },
  { name: 'Flutter', category: SKILL_CATEGORIES.FRONTEND, badge: 'Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white', color: '#02569B' },
  { name: 'Dart', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white', color: '#0175C2' },
  { name: 'Expo', category: SKILL_CATEGORIES.FRONTEND, badge: 'Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white', color: '#000020' },

  // More Languages
  { name: 'Scala', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Scala-DC322F?style=for-the-badge&logo=scala&logoColor=white', color: '#DC322F' },
  { name: 'R', category: SKILL_CATEGORIES.LANGUAGES, badge: 'R-276DC3?style=for-the-badge&logo=r&logoColor=white', color: '#276DC3' },
  { name: 'Solidity', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white', color: '#363636' },
  { name: 'Bash', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white', color: '#4EAA25' },
  { name: 'Lua', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Lua-2C2D72?style=for-the-badge&logo=lua&logoColor=white', color: '#2C2D72' },
  { name: 'Elixir', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Elixir-4B275F?style=for-the-badge&logo=elixir&logoColor=white', color: '#4B275F' },
  { name: 'Haskell', category: SKILL_CATEGORIES.LANGUAGES, badge: 'Haskell-5e5086?style=for-the-badge&logo=haskell&logoColor=white', color: '#5D4F85' },
  { name: 'MATLAB', category: SKILL_CATEGORIES.LANGUAGES, badge: 'MATLAB-0076A8?style=for-the-badge&logo=mathworks&logoColor=white', color: '#0076A8' },

  // More Frontend
  { name: 'Three.js', category: SKILL_CATEGORIES.FRONTEND, badge: 'Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white', color: '#000000' },
  { name: 'Astro', category: SKILL_CATEGORIES.FRONTEND, badge: 'Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white', color: '#FF5D01' },
  { name: 'Nuxt.js', category: SKILL_CATEGORIES.FRONTEND, badge: 'Nuxt.js-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82', color: '#00DC82' },
  { name: 'Gatsby', category: SKILL_CATEGORIES.FRONTEND, badge: 'Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white', color: '#663399' },
  { name: 'Bootstrap', category: SKILL_CATEGORIES.FRONTEND, badge: 'Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white', color: '#7952B3' },
  { name: 'Material UI', category: SKILL_CATEGORIES.FRONTEND, badge: 'Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white', color: '#007FFF' },
  { name: 'shadcn/ui', category: SKILL_CATEGORIES.FRONTEND, badge: 'shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white', color: '#000000' },

  // More Backend
  { name: 'Hono', category: SKILL_CATEGORIES.BACKEND, badge: 'Hono-E36002?style=for-the-badge&logo=hono&logoColor=white', color: '#E36002' },
  { name: 'Bun', category: SKILL_CATEGORIES.BACKEND, badge: 'Bun-000000?style=for-the-badge&logo=bun&logoColor=white', color: '#FBF0DF' },
  { name: 'Deno', category: SKILL_CATEGORIES.BACKEND, badge: 'Deno-000000?style=for-the-badge&logo=deno&logoColor=white', color: '#000000' },
  { name: 'tRPC', category: SKILL_CATEGORIES.BACKEND, badge: 'tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white', color: '#2596BE' },
  { name: 'Socket.io', category: SKILL_CATEGORIES.BACKEND, badge: 'Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white', color: '#010101' },

  // More Database
  { name: 'SQLite', category: SKILL_CATEGORIES.DATABASE, badge: 'SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white', color: '#003B57' },
  { name: 'PlanetScale', category: SKILL_CATEGORIES.DATABASE, badge: 'PlanetScale-000000?style=for-the-badge&logo=planetscale&logoColor=white', color: '#000000' },
  { name: 'Cassandra', category: SKILL_CATEGORIES.DATABASE, badge: 'Cassandra-1287B1?style=for-the-badge&logo=apache-cassandra&logoColor=white', color: '#1287B1' },
  { name: 'Elasticsearch', category: SKILL_CATEGORIES.DATABASE, badge: 'Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white', color: '#005571' },

  // More DevOps
  { name: 'Terraform', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white', color: '#7B42BC' },
  { name: 'Ansible', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Ansible-1A1918?style=for-the-badge&logo=ansible&logoColor=white', color: '#EE0000' },
  { name: 'Netlify', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white', color: '#00C7B7' },
  { name: 'Railway', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Railway-131415?style=for-the-badge&logo=railway&logoColor=white', color: '#0B0D0E' },
  { name: 'Nginx', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white', color: '#009639' },
  { name: 'Apache Kafka', category: SKILL_CATEGORIES.DEVOPS_CLOUD, badge: 'Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white', color: '#231F20' },

  // More Tools
  { name: 'Neovim', category: SKILL_CATEGORIES.TOOLS, badge: 'Neovim-57A143?style=for-the-badge&logo=neovim&logoColor=white', color: '#57A143' },
  { name: 'Notion', category: SKILL_CATEGORIES.TOOLS, badge: 'Notion-000000?style=for-the-badge&logo=notion&logoColor=white', color: '#000000' },
  { name: 'Jira', category: SKILL_CATEGORIES.TOOLS, badge: 'Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white', color: '#0052CC' },
  { name: 'Storybook', category: SKILL_CATEGORIES.TOOLS, badge: 'Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white', color: '#FF4785' },
  { name: 'Webpack', category: SKILL_CATEGORIES.TOOLS, badge: 'Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black', color: '#8DD6F9' },
  { name: 'Vitest', category: SKILL_CATEGORIES.TOOLS, badge: 'Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white', color: '#6E9F18' },
  { name: 'Cypress', category: SKILL_CATEGORIES.TOOLS, badge: 'Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white', color: '#17202C' },

  // More AI & Data
  { name: 'Scikit-learn', category: SKILL_CATEGORIES.AI_DATA, badge: 'scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white', color: '#F7931E' },
  { name: 'NumPy', category: SKILL_CATEGORIES.AI_DATA, badge: 'NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white', color: '#013243' },
  { name: 'LangChain', category: SKILL_CATEGORIES.AI_DATA, badge: 'LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white', color: '#1C3C3C' },
  { name: 'Ollama', category: SKILL_CATEGORIES.AI_DATA, badge: 'Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white', color: '#000000' },

  // Creative / Game Dev
  { name: 'Unity', category: 'Game Dev', badge: 'Unity-100000?style=for-the-badge&logo=unity&logoColor=white', color: '#000000' },
  { name: 'Unreal Engine', category: 'Game Dev', badge: 'Unreal_Engine-313131?style=for-the-badge&logo=unreal-engine&logoColor=white', color: '#0E1128' },
  { name: 'Godot', category: 'Game Dev', badge: 'Godot-478CBF?style=for-the-badge&logo=godot-engine&logoColor=white', color: '#478CBF' },
  { name: 'Blender', category: 'Game Dev', badge: 'Blender-F5792A?style=for-the-badge&logo=blender&logoColor=white', color: '#F5792A' },

  // Blockchain
  { name: 'Web3.js', category: 'Blockchain', badge: 'Web3.js-F16822?style=for-the-badge&logo=web3dotjs&logoColor=white', color: '#F16822' },
  { name: 'Hardhat', category: 'Blockchain', badge: 'Hardhat-FFF100?style=for-the-badge&logo=hardhat&logoColor=black', color: '#FFF100' },
  { name: 'Ethereum', category: 'Blockchain', badge: 'Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white', color: '#3C3C3D' },
];

export const SOCIAL_PLATFORMS = [
  { id: 'github', name: 'GitHub', prefix: 'https://github.com/', badge: 'GitHub-100000?style=for-the-badge&logo=github&logoColor=white', color: '#181717' },
  { id: 'linkedin', name: 'LinkedIn', prefix: 'https://linkedin.com/in/', badge: 'LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white', color: '#0077B5' },
  { id: 'twitter', name: 'Twitter / X', prefix: 'https://twitter.com/', badge: 'Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white', color: '#1DA1F2' },
  { id: 'website', name: 'Personal Website', prefix: 'https://', badge: 'Website-000000?style=for-the-badge&logo=about.me&logoColor=white', color: '#6366F1' },
  { id: 'email', name: 'Email', prefix: 'mailto:', badge: 'Email-D14836?style=for-the-badge&logo=gmail&logoColor=white', color: '#EA4335' },
  { id: 'discord', name: 'Discord', prefix: 'https://discord.gg/', badge: 'Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white', color: '#5865F2' },
  { id: 'youtube', name: 'YouTube', prefix: 'https://youtube.com/@', badge: 'YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white', color: '#FF0000' },
  { id: 'devto', name: 'Dev.to', prefix: 'https://dev.to/', badge: 'dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white', color: '#0A0A0A' },
  { id: 'medium', name: 'Medium', prefix: 'https://medium.com/@', badge: 'Medium-12100E?style=for-the-badge&logo=medium&logoColor=white', color: '#12100E' }
];