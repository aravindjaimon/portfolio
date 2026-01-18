// Portfolio data for Aravind Jaimon

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  npm: string;
  location: string;
}

export const personalInfo: PersonalInfo = {
  name: "ARAVIND JAIMON",
  title: "Lead Software Engineer",
  subtitle: "First Engineer at RaftLabs",
  tagline: "First engineering hire → 30+ engineer team. Building systems for millions.",
  email: "dev@aravindjaimon.com",
  linkedin: "https://linkedin.com/in/aravindjaimon",
  github: "https://github.com/aravindjaimon",
  portfolio: "aravindjaimon.com",
  npm: "https://npmjs.com/~aravindjaimon",
  location: "Kerala, India"
};

export interface StoryMilestone {
  phase: string;
  date: string;
  description: string;
}

export const storyMilestones: StoryMilestone[] = [
  {
    phase: "THE BEGINNING",
    date: "October 2020",
    description: "Joined as the FIRST engineer at RaftLabs. Started with nothing but vision and code."
  },
  {
    phase: "THE BUILDING",
    date: "2020-2022",
    description: "Established technical culture, coding standards, architectural roadmap. Every system, every pattern, every decision — built from scratch."
  },
  {
    phase: "THE SCALING",
    date: "2022-2024",
    description: "1 → 30+ engineers. Mentored 10+ developers. Created the engineering DNA that powers the company today."
  },
  {
    phase: "THE IMPACT",
    date: "2024-Present",
    description: "1M+ users served. 10,000 events/minute processed. 97% performance improvements delivered. 50+ production systems shipped."
  }
];

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  ai: string[];
  cloud: string[];
  systemDesign: string[];
}

export const skills: Skills = {
  languages: ["TypeScript", "JavaScript", "Rust", "SQL", "HTML/CSS"],
  frontend: ["React", "Next.js", "Redux", "Electron.js", "Tauri", "Three.js", "Tailwind CSS", "Shadcn/ui"],
  backend: ["Node.js", "NestJS", "Serverless Framework", "GraphQL (Hasura)", "REST", "gRPC"],
  ai: ["OpenAI API", "Google Gemini", "RAG Implementation", "Vector Databases", "Prompt Engineering"],
  cloud: ["AWS (Lambda, CDK, API Gateway)", "Docker", "PostgreSQL", "Redis", "Vercel", "CI/CD Pipelines"],
  systemDesign: ["Microservices Architecture", "Event-Driven Architecture", "Caching Strategies", "Domain-Driven Design (DDD)"]
};

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  industry: string;
  role: string;
  challenge: string;
  solution: string[];
  metrics: ProjectMetric[];
  stack: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Affiliate Platform",
    subtitle: "High-Scale Affiliate Tracking System",
    industry: "iGaming",
    role: "Lead Software Engineer",
    challenge: "Build a distributed tracking system handling millions of players and thousands of affiliates with financial-grade accuracy",
    solution: [
      "Distributed event ingestion pipeline",
      "Real-time processing architecture",
      "High-accuracy tracking system",
      "Scalable microservices design"
    ],
    metrics: [
      { value: "1M+", label: "Player Accounts" },
      { value: "10K", label: "Events/Min" },
      { value: "99.9%", label: "Data Accuracy" },
      { value: "40%", label: "Performance Boost" }
    ],
    stack: ["React", "TypeScript", "Node.js", "AWS Lambda", "Serverless", "Hasura", "PostgreSQL", "AWS CDK", "Docker"]
  },
  {
    id: 2,
    title: "RAG-Powered AI Assistant",
    subtitle: "Context-Aware AI Chat Platform",
    industry: "AI/SaaS",
    role: "Full Stack Engineer",
    challenge: "Create an intelligent, context-aware AI assistant that can be embedded into any website with domain-specific knowledge",
    solution: [
      "Retrieval-Augmented Generation implementation",
      "Multi-model support (OpenAI + Gemini)",
      "Embeddable widget SDK",
      "Admin panel for customization"
    ],
    metrics: [
      { value: "RAG", label: "Architecture" },
      { value: "Multi", label: "Model Support" },
      { value: "SDK", label: "Embeddable" },
      { value: "Real-time", label: "Streaming" }
    ],
    stack: ["React", "TypeScript", "Node.js", "AWS Lambda", "Serverless", "Hasura", "PostgreSQL", "OpenAI", "Gemini"]
  },
  {
    id: 3,
    title: "Desktop Retail Management System",
    subtitle: "High-Performance Point-of-Sale Client",
    industry: "Retail",
    role: "Full Stack Developer",
    challenge: "Legacy sync system taking 5+ minutes, causing operational delays for retail stores processing half a million daily transactions",
    solution: [
      "Complete rebuild using Rust + Tauri",
      "Optimized sync algorithms",
      "Lightweight desktop client",
      "Real-time inventory insights"
    ],
    metrics: [
      { value: "97%", label: "Faster Sync" },
      { value: "500K+", label: "Daily Transactions" },
      { value: "99.9%", label: "Data Uptime" },
      { value: "10%", label: "Less Discrepancy" }
    ],
    stack: ["React", "TypeScript", "Tauri", "Rust", "Node.js", "AWS Lambda", "Serverless", "Hasura", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Cross-Platform Productivity Suite",
    subtitle: "Virtual Workspace & Collaboration Platform",
    industry: "Enterprise SaaS",
    role: "Lead Developer",
    challenge: "Build a unified productivity platform for remote teams across Web, macOS, Windows, and Linux",
    solution: [
      "Monorepo architecture for code sharing",
      "3D virtual meeting rooms (Three.js)",
      "Real-time video/audio (Agora SDK)",
      "Cross-platform builds"
    ],
    metrics: [
      { value: "3", label: "Platforms" },
      { value: "25%", label: "Faster Load" },
      { value: "3D", label: "Virtual Rooms" },
      { value: "Real-time", label: "Collaboration" }
    ],
    stack: ["Electron.js", "React", "Node.js", "Serverless", "Hasura", "Three.js", "Konva.js", "Agora SDK", "Fluent UI"]
  },
  {
    id: 5,
    title: "Multi-Game Platform",
    subtitle: "High-Performance Gaming Portal",
    industry: "Gaming",
    role: "Lead Software Engineer",
    challenge: "Create a high-performance gaming portal hosting 2000+ games with cryptocurrency payment integration plans",
    solution: [
      "Advanced caching strategies",
      "Optimized asset delivery",
      "Responsive design for all devices",
      "Scalable architecture"
    ],
    metrics: [
      { value: "2K+", label: "Games Hosted" },
      { value: "50%", label: "Faster Load" },
      { value: "3x", label: "User Capacity" },
      { value: "Mobile", label: "Optimized" }
    ],
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Radix UI", ".NET", "MSSQL", "Vercel"]
  },
  {
    id: 6,
    title: "Educational Management Platform",
    subtitle: "Multi-Tenant Institution System",
    industry: "EdTech",
    role: "Lead Software Engineer",
    challenge: "Build comprehensive management system for schools and colleges across Africa with multi-institutional support",
    solution: [
      "Domain-Driven Design architecture",
      "Multi-tenant system",
      "Comprehensive workflow automation",
      "Scalable backend design"
    ],
    metrics: [
      { value: "Multi", label: "Institutions" },
      { value: "1000s", label: "Users Served" },
      { value: "Pan-African", label: "Deployment" },
      { value: "DDD", label: "Architecture" }
    ],
    stack: ["React", "TypeScript", "Nhost", "Serverless", "Hasura", "PostgreSQL", "Ant Design", "Tailwind CSS"]
  }
];

export interface ImpactMetric {
  value: string;
  label: string;
}

export const impactMetrics: ImpactMetric[] = [
  { value: "1 → 30+", label: "Team Growth" },
  { value: "1M+", label: "Users Served" },
  { value: "97%", label: "Faster Sync" },
  { value: "50+", label: "Systems Built" },
  { value: "10K/min", label: "Events Processed" },
  { value: "99.9%", label: "Accuracy" },
  { value: "10+", label: "Engineers Mentored" },
  { value: "5+", label: "Years Exp" }
];

export interface Experience {
  period: string;
  role: string;
  company: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    period: "2024 - Present",
    role: "Lead Software Engineer",
    company: "RaftLabs",
    highlights: [
      "Driving technical strategy",
      "AI-assisted development adoption",
      "Engineering culture architect"
    ]
  },
  {
    period: "2022 - 2024",
    role: "Senior Software Engineer",
    company: "RaftLabs",
    highlights: [
      "System architecture leadership",
      "Performance optimization",
      "Team scaling initiatives"
    ]
  },
  {
    period: "2020 - 2022",
    role: "Software Engineer",
    company: "RaftLabs",
    highlights: [
      "First engineering hire",
      "Foundation building",
      "Full-stack development"
    ]
  },
  {
    period: "2020",
    role: "Full Stack Intern",
    company: "Techtonic",
    highlights: [
      "React-Gatsby development",
      "Three.js 3D experiences"
    ]
  },
  {
    period: "2019",
    role: "Python Developer Intern",
    company: "Vaultboard",
    highlights: [
      "Resume parsing algorithms",
      "Automation development"
    ]
  }
];

export interface Education {
  degree: string;
  status: string;
  institution: string;
  expected?: string;
  year?: string;
  note?: string;
}

export const education: Education[] = [
  {
    degree: "M.S. Computer Science",
    status: "In Progress",
    institution: "Woolf / Scaler Neovarsity",
    expected: "September 2026"
  },
  {
    degree: "B.Tech Computer Science & Engineering",
    status: "Completed",
    institution: "Bir Tikendrajit University",
    year: "2024",
    note: "Transferred from College of Engineering, Poonjar - KTU"
  }
];

export const certifications: string[] = [
  "GCP Fundamentals: Core Infrastructure",
  "Elastic Cloud Infrastructure: Scaling and Automation",
  "Reliable Cloud Infrastructure: Design and Process"
];

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    icon: "trophy",
    title: "Smart India Hackathon Finalist",
    description: "Grand Finale (2018 & 2019)",
    detail: "Top 0.1% among 200,000+ participants"
  },
  {
    icon: "award",
    title: "NCR Corporation Special Recognition",
    description: "Technical innovation award",
    detail: "e-Waste Management application - SIH 2019"
  },
  {
    icon: "users",
    title: "IEEE Leadership",
    description: "Chairman, IEEE Student Branch",
    detail: "College of Engineering Poonjar"
  }
];
