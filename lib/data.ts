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
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  role: string;
  challenge: string;
  solution: string[];
  metrics: ProjectMetric[];
  stack: string[];
  // Extended case study fields
  overview?: string;
  problemDetails?: string[];
  technicalApproach?: string[];
  keyDecisions?: { decision: string; reasoning: string }[];
  results?: string[];
  lessons?: string[];
  timeline?: string;
  teamSize?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "enterprise-affiliate-platform",
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
    stack: ["React", "TypeScript", "Node.js", "AWS Lambda", "Serverless", "Hasura", "PostgreSQL", "AWS CDK", "Docker"],
    // Extended case study details
    overview: "Led the architecture and development of a comprehensive affiliate tracking platform for a major iGaming company. The system needed to handle millions of players, track complex referral chains, and calculate commissions with financial-grade accuracy.",
    problemDetails: [
      "Legacy system couldn't scale beyond 1000 events/minute",
      "Manual commission calculations led to disputes and delays",
      "No real-time visibility into affiliate performance",
      "Data inconsistencies between tracking and payment systems"
    ],
    technicalApproach: [
      "Designed event-driven architecture using AWS Lambda and SQS for decoupled processing",
      "Implemented CQRS pattern to separate read and write workloads",
      "Built real-time dashboards using Hasura GraphQL subscriptions",
      "Created idempotent event handlers to ensure exactly-once processing"
    ],
    keyDecisions: [
      { decision: "Chose Serverless over Kubernetes", reasoning: "Auto-scaling requirements and cost optimization for bursty traffic patterns" },
      { decision: "PostgreSQL with Hasura over custom GraphQL", reasoning: "Rapid development with built-in subscriptions while maintaining flexibility" },
      { decision: "Event sourcing for financial transactions", reasoning: "Complete audit trail and ability to replay events for reconciliation" }
    ],
    results: [
      "10x improvement in event processing capacity",
      "Reduced commission calculation time from hours to real-time",
      "99.9% accuracy in tracking attribution",
      "Zero data loss during peak traffic periods"
    ],
    lessons: [
      "Event-driven architectures require robust dead-letter queue handling",
      "Financial systems need idempotency at every layer",
      "Real-time doesn't always mean instant - define acceptable latency"
    ],
    timeline: "8 months",
    teamSize: "4 engineers"
  },
  {
    id: 2,
    slug: "rag-ai-assistant",
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
    stack: ["React", "TypeScript", "Node.js", "AWS Lambda", "Serverless", "Hasura", "PostgreSQL", "OpenAI", "Gemini"],
    overview: "Built a production-ready RAG (Retrieval-Augmented Generation) AI assistant that businesses can embed into their websites. The system ingests custom knowledge bases and provides contextually accurate responses while supporting multiple LLM providers for flexibility and cost optimization.",
    problemDetails: [
      "Generic chatbots couldn't answer domain-specific questions accurately",
      "Existing solutions required significant technical expertise to integrate",
      "No easy way to switch between AI providers based on cost/performance needs",
      "Real-time streaming responses were essential for good UX but complex to implement"
    ],
    technicalApproach: [
      "Implemented vector embeddings using OpenAI's ada-002 for semantic search",
      "Built chunking pipeline with overlap to maintain context across document segments",
      "Created abstraction layer supporting OpenAI GPT-4 and Google Gemini interchangeably",
      "Designed embeddable widget using Shadow DOM for style isolation"
    ],
    keyDecisions: [
      { decision: "PostgreSQL with pgvector over dedicated vector DB", reasoning: "Reduced infrastructure complexity while maintaining acceptable performance for our scale" },
      { decision: "Server-Sent Events for streaming", reasoning: "Better browser compatibility than WebSockets for unidirectional real-time data" },
      { decision: "Admin panel for knowledge management", reasoning: "Non-technical users needed to update FAQs and documentation without developer involvement" }
    ],
    results: [
      "80% reduction in support ticket volume for pilot customers",
      "Sub-200ms retrieval latency for knowledge base queries",
      "Seamless integration requiring only a script tag to embed",
      "Cost flexibility allowing 40% reduction by switching models for simple queries"
    ],
    lessons: [
      "Chunk size and overlap significantly impact retrieval quality - requires experimentation",
      "Prompt engineering is as important as the retrieval system itself",
      "Users expect instant responses - streaming is not optional for chat interfaces"
    ],
    timeline: "4 months",
    teamSize: "2 engineers"
  },
  {
    id: 3,
    slug: "desktop-retail-management",
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
    stack: ["React", "TypeScript", "Tauri", "Rust", "Node.js", "AWS Lambda", "Serverless", "Hasura", "PostgreSQL"],
    overview: "Rebuilt a critical desktop application for a retail chain managing hundreds of stores. The legacy Electron-based POS client suffered from slow synchronization and high memory usage, directly impacting store operations and causing inventory discrepancies.",
    problemDetails: [
      "Legacy Electron app consumed 800MB+ RAM, causing crashes on older hardware",
      "Full data sync took 5+ minutes, blocking store opening procedures",
      "Inventory discrepancies between local and server data reached 15%",
      "No offline capability meant network issues halted all operations"
    ],
    technicalApproach: [
      "Rebuilt using Tauri with Rust backend for 10x smaller binary and better performance",
      "Implemented delta sync algorithm - only changed records transfer",
      "Created local SQLite cache with conflict resolution for offline-first operation",
      "Built background sync service that runs without blocking UI operations"
    ],
    keyDecisions: [
      { decision: "Tauri over Electron", reasoning: "80% smaller binary size and native Rust performance for data processing" },
      { decision: "SQLite for local storage", reasoning: "Battle-tested embedded database with excellent concurrent read performance" },
      { decision: "Operational Transform for conflicts", reasoning: "Predictable conflict resolution that preserves user intent" }
    ],
    results: [
      "Sync time reduced from 5+ minutes to under 10 seconds (97% improvement)",
      "Memory usage dropped from 800MB to under 100MB",
      "Inventory discrepancies reduced from 15% to under 5%",
      "Stores can now operate fully offline for up to 24 hours"
    ],
    lessons: [
      "Native code (Rust) makes a massive difference for data-intensive operations",
      "Delta sync requires careful versioning - timestamp-based approaches have edge cases",
      "Retail environments have unreliable networks - offline-first is not optional"
    ],
    timeline: "6 months",
    teamSize: "3 engineers"
  },
  {
    id: 4,
    slug: "cross-platform-productivity-suite",
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
    stack: ["Electron.js", "React", "Node.js", "Serverless", "Hasura", "Three.js", "Konva.js", "Agora SDK", "Fluent UI"],
    overview: "Led development of a virtual workspace platform designed for distributed teams. The product combined video conferencing, spatial 3D meeting rooms, real-time whiteboarding, and document collaboration - all accessible from web browsers and native desktop applications.",
    problemDetails: [
      "Teams using 5+ different tools for remote collaboration (Zoom, Miro, Slack, etc.)",
      "Context switching between tools reduced productivity by estimated 30%",
      "No spatial awareness in meetings - participants felt disconnected",
      "Platform-specific apps meant inconsistent experiences across teams"
    ],
    technicalApproach: [
      "Architected monorepo with shared React component library across web and Electron",
      "Built 3D meeting rooms using Three.js with spatial audio positioning",
      "Integrated Agora SDK for low-latency video with custom layout engine",
      "Created real-time whiteboard using Konva.js with CRDT-based synchronization"
    ],
    keyDecisions: [
      { decision: "Monorepo with Nx over separate repositories", reasoning: "Enabled 85% code sharing between web and desktop while maintaining platform-specific optimizations" },
      { decision: "Three.js for 3D over Unity WebGL", reasoning: "Faster load times and better integration with React ecosystem" },
      { decision: "Agora over self-hosted WebRTC", reasoning: "Global edge network provided consistent quality without infrastructure complexity" }
    ],
    results: [
      "85% code reuse across web, macOS, Windows, and Linux clients",
      "25% faster initial load compared to competing Electron apps",
      "Spatial audio meetings increased perceived engagement in user studies",
      "Single codebase reduced maintenance burden by estimated 60%"
    ],
    lessons: [
      "Monorepos require investment in tooling but pay dividends at scale",
      "3D web experiences need aggressive LOD (level of detail) management",
      "Real-time collaboration needs conflict resolution strategy from day one"
    ],
    timeline: "10 months",
    teamSize: "5 engineers"
  },
  {
    id: 5,
    slug: "multi-game-platform",
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
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Radix UI", ".NET", "MSSQL", "Vercel"],
    overview: "Architected and built a high-performance gaming portal hosting over 2000 casual and HTML5 games. The platform needed to handle traffic spikes, deliver games quickly across global audiences, and provide a seamless mobile experience while preparing for future cryptocurrency payment integration.",
    problemDetails: [
      "Initial page loads took 4+ seconds due to unoptimized game thumbnails and metadata",
      "Game iframe loading caused layout shifts and poor Core Web Vitals scores",
      "Mobile users represented 60% of traffic but had poor touch controls",
      "Existing architecture couldn't handle concurrent user spikes during promotions"
    ],
    technicalApproach: [
      "Implemented ISR (Incremental Static Regeneration) with Next.js for game catalog pages",
      "Built lazy-loading system with blur placeholders for 2000+ game thumbnails",
      "Created responsive game container with touch-optimized controls overlay",
      "Designed edge caching strategy using Vercel's global CDN"
    ],
    keyDecisions: [
      { decision: "Next.js ISR over traditional SSR", reasoning: "Static generation with revalidation balanced freshness with performance" },
      { decision: "Vercel Edge Network over custom CDN", reasoning: "Zero-config global distribution with automatic cache invalidation" },
      { decision: "Radix UI for accessibility", reasoning: "Gaming audience includes users with disabilities - accessibility is not optional" }
    ],
    results: [
      "Page load time reduced from 4s to under 2s (50% improvement)",
      "Core Web Vitals scores improved to green across all metrics",
      "Platform handles 3x previous concurrent user capacity",
      "Mobile bounce rate decreased by 35% after touch optimization"
    ],
    lessons: [
      "Image optimization is often the lowest-hanging fruit for performance",
      "ISR is powerful but requires careful cache invalidation strategy",
      "Mobile-first isn't just responsive design - it's rethinking interactions"
    ],
    timeline: "5 months",
    teamSize: "3 engineers"
  },
  {
    id: 6,
    slug: "educational-management-platform",
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
    stack: ["React", "TypeScript", "Nhost", "Serverless", "Hasura", "PostgreSQL", "Ant Design", "Tailwind CSS"],
    overview: "Designed and built a comprehensive educational management system serving schools and colleges across multiple African countries. The platform handles everything from student enrollment and attendance to grade management and parent communication, all within a multi-tenant architecture that maintains data isolation between institutions.",
    problemDetails: [
      "Each institution had unique workflows that couldn't fit a one-size-fits-all solution",
      "Data privacy laws varied by country, requiring strict tenant isolation",
      "Unreliable internet connectivity in many regions meant offline support was critical",
      "Administrators had varying technical literacy levels"
    ],
    technicalApproach: [
      "Implemented Domain-Driven Design with bounded contexts for each functional area",
      "Built row-level security in PostgreSQL for multi-tenant data isolation",
      "Created configurable workflow engine allowing institutions to customize processes",
      "Designed progressive web app with service worker caching for offline access"
    ],
    keyDecisions: [
      { decision: "Hasura over custom GraphQL server", reasoning: "Instant GraphQL API with row-level security, dramatically reducing backend development time" },
      { decision: "DDD bounded contexts", reasoning: "Clear separation between enrollment, academics, finance, and communication domains" },
      { decision: "Ant Design component library", reasoning: "Comprehensive enterprise components reduced UI development time by 40%" }
    ],
    results: [
      "Successfully onboarded institutions across multiple African countries",
      "Thousands of students and staff managed through the platform",
      "Row-level security ensures zero cross-tenant data leakage",
      "Offline-capable PWA works reliably on low-bandwidth connections"
    ],
    lessons: [
      "Multi-tenant architectures need security auditing from the start, not as an afterthought",
      "Domain-Driven Design pays off when domain complexity is high",
      "Building for low-bandwidth regions requires fundamentally different performance budgets"
    ],
    timeline: "12 months",
    teamSize: "4 engineers"
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

// Project helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

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
