export const profile = {
  name: "Harsh Jadav",
  role: "Backend Engineer",
  tagline: "NestJS · TypeScript · PostgreSQL · Node.js",
  specialization: "Backend Systems · Full-Stack Applications · AI Products",
  status: "Available for Software Engineering Opportunities",
  location: "Ahmedabad, India",
  phone: "+91 84019 60169",
  summary:
    "Backend Engineer with production experience designing and shipping scalable REST APIs, transaction processing systems, and multi-provider integrations. Proficient in NestJS, TypeScript, PostgreSQL, and Prisma ORM. Hands-on with idempotent transaction handling, wallet callbacks, session management, and AWS-hosted deployments.",
  github: "https://github.com/harshh-0304",
  linkedin: "https://www.linkedin.com/in/harshh33/",
  email: "bakasakuta33@gmail.com",
  resumeUrl: "/resume.pdf",
  avatar: "/avatar.jpeg",
};

export const education = [
  {
    degree: "B.E. Computer Engineering",
    institution: "SAL College of Engineering",
    location: "Ahmedabad",
    period: "Sept 2021 – May 2025",
    cgpa: "7.43 / 10",
    highlights: [
      "Computer Science fundamentals: DSA, DBMS, OS, Networks",
      "Backend and full-stack development projects",
      "Machine learning and AI coursework",
    ],
  },
];

export const metrics = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Major Projects", value: 8, suffix: "+" },
  { label: "Core Technologies", value: 15, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
];

export const experiences = [
  {
    id: "exp-01",
    code: "EXP 01",
    title: "Backend Engineer",
    company: "Betorra Gaming Platform",
    url: "https://dev.betorra.com/",
    period: "Jan 2026 – Present",
    type: "Full-Time",
    status: "ACTIVE",
    badge: "BACKEND",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "AWS", "Swagger/OpenAPI"],
    responsibilities: [
      "Architected backend services supporting 1,200+ games across 4 external providers with real-time session management, wallet operations, and transaction processing at scale",
      "Built provider APIs covering game launch, wallet callbacks, debit/credit, rollback, and reward processing workflows for 4 certified gaming providers",
      "Engineered idempotent transaction handling, secure callback validation, and reconciliation pipelines ensuring data consistency across all provider interactions",
      "Designed PostgreSQL schemas, DTO validation, and REST API contracts; produced full Swagger/OpenAPI documentation using NestJS and Prisma ORM",
      "Led provider certification collaborations, production debugging, and code reviews on AWS-hosted environments using Git feature-branch workflows",
    ],
    highlights: [
      "1,200+ games supported across 4 external providers",
      "Idempotent transaction processing at production scale",
      "Full Swagger/OpenAPI documentation with NestJS + Prisma ORM",
      "AWS-hosted deployment with feature-branch Git workflow",
    ],
    summary: "Production-scale backend for a live gaming platform handling real-time sessions, wallet ops, and multi-provider integrations",
  },
  {
    id: "exp-02",
    code: "EXP 02",
    title: "AI Engineer",
    company: "DubFlix",
    url: "",
    period: "Jul 2025 – Present",
    type: "Contract",
    status: "ACTIVE",
    badge: "AI ENGINEERING",
    stack: ["Python", "NLP", "Speech Synthesis", "AI/ML"],
    responsibilities: [
      "Optimized multilingual NLP pipelines powering AI dubbing workflows across 5+ target languages",
      "Contributed to production speech synthesis and audio processing integrations",
      "Worked on prompt engineering strategies and LLM-based translation pipelines",
      "Developed voice generation workflows for content localization at scale",
    ],
    highlights: [
      "5+ target languages in AI dubbing pipeline",
      "Production speech synthesis and audio processing",
      "Multilingual NLP pipeline optimization",
    ],
    summary: "Built and optimized multilingual AI dubbing workflows with NLP, speech synthesis, and audio processing",
  },
  {
    id: "exp-03",
    code: "EXP 03",
    title: "Full-Stack Developer Intern",
    company: "Grownited Pvt. Ltd.",
    url: "",
    period: "Jan 2025 – Apr 2025",
    type: "Internship",
    status: "COMPLETED",
    badge: "INTERNSHIP",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    responsibilities: [
      "Designed RESTful API endpoints and built MERN stack UI features in an Agile team environment",
      "Developed React components and Node.js backend services end-to-end",
      "Worked with MongoDB for data modeling and API integrations",
    ],
    highlights: [
      "Full MERN stack development in Agile environment",
      "RESTful API design and implementation",
      "End-to-end feature delivery",
    ],
    summary: "Full-stack MERN development — RESTful APIs and UI features in an Agile team",
  },
  {
    id: "exp-04",
    code: "EXP 04",
    title: "Python Backend Intern",
    company: "360 Design",
    url: "",
    period: "Jun 2024 – Jul 2024",
    type: "Internship",
    status: "COMPLETED",
    badge: "INTERNSHIP",
    stack: ["Python", "Django", "REST APIs"],
    responsibilities: [
      "Built a Django media-sharing platform with user authentication and media management APIs",
      "Developed RESTful API endpoints for media upload, retrieval, and management",
      "Implemented user authentication and session management",
    ],
    highlights: [
      "Django media-sharing platform from scratch",
      "User authentication and media management APIs",
    ],
    summary: "Built a Django media-sharing platform with authentication and REST API backend",
  },
];

export const projects = [
  {
    id: "project-01",
    name: "Betorra Gaming Platform",
    category: "Gaming Backend Platform",
    status: "LIVE",
    tag: "Professional",
    url: "https://dev.betorra.com/",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "AWS"],
    description:
      "Production backend for a live gaming platform — architected services supporting 1,200+ games with real-time session management, multi-provider wallet operations, and idempotent transaction processing.",
    features: [
      "1,200+ games across 4 certified gaming providers",
      "Real-time session management and wallet operations",
      "Idempotent transaction handling and reconciliation",
      "Swagger/OpenAPI documentation",
      "AWS-hosted with Git feature-branch workflow",
    ],
    highlight: "1,200+ games · 4 providers · production scale",
    color: "cyan",
    featured: true,
  },
  {
    id: "project-02",
    name: "ChillSpace",
    category: "Full-Stack Rental Marketplace",
    status: "LIVE",
    tag: "Flagship Project",
    url: "https://chilspace.vercel.app",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "Payment Integration"],
    description:
      "Full-stack rental marketplace with booking workflows, payment gateway integration, JWT authentication, and property management modules. MERN stack deployed on Vercel.",
    features: [
      "Booking workflows and property management",
      "Payment gateway integration",
      "JWT authentication and session handling",
      "REST API backend with Express.js",
      "Deployed on Vercel",
    ],
    highlight: "Full-stack MERN · JWT Auth · Payment Integration",
    color: "emerald",
    featured: true,
  },
  {
    id: "project-03",
    name: "Retail ERP System",
    category: "Enterprise Web Application",
    status: "BUILT",
    tag: "Enterprise",
    url: "",
    tech: ["ASP.NET MVC", "SQL Server", "JWT", "3-Tier Architecture"],
    description:
      "Modular ERP system with 3-tier architecture, role-based access control, and SQL Server backend. Built for retail inventory and billing management.",
    features: [
      "3-tier modular architecture",
      "Role-based access control",
      "SQL Server database backend",
      "JWT authentication",
    ],
    highlight: "Modular ERP · 3-tier architecture · role-based access",
    color: "violet",
    featured: false,
  },
  {
    id: "project-04",
    name: "PsycheQuiz",
    category: "ML-Powered Assessment Platform",
    status: "BUILT",
    tag: "ML Project",
    url: "",
    tech: ["Python", "Flask", "Machine Learning", "REST APIs"],
    description:
      "ML-driven emotional analysis platform with dynamic scoring logic, REST API backend, and data privacy controls. Built with Python, Flask, and scikit-learn.",
    features: [
      "ML-driven emotional analysis",
      "Dynamic scoring and classification",
      "Flask REST API backend",
      "Data privacy controls",
    ],
    highlight: "ML-driven · dynamic scoring · Flask REST API",
    color: "amber",
    featured: false,
  },
  {
    id: "project-05",
    name: "School Management System",
    category: "ASP.NET MVC Application",
    status: "BUILT",
    tag: "Academic",
    url: "",
    tech: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap"],
    description:
      "Web-based school management application handling student records, attendance tracking, and administrative workflows with ASP.NET MVC and SQL Server.",
    features: [
      "Student record management",
      "Attendance tracking system",
      "Administrative dashboard",
      "SQL Server database",
    ],
    highlight: "Full-stack ASP.NET MVC · SQL Server",
    color: "violet",
    featured: false,
  },
];

export const skills = [
  {
    category: "Backend",
    icon: "Server",
    items: [
      { name: "NestJS", level: 88 },
      { name: "Node.js / Express", level: 85 },
      { name: "Python / Django", level: 78 },
      { name: "ASP.NET Core MVC", level: 72 },
      { name: "REST API Design", level: 90 },
    ],
  },
  {
    category: "Languages",
    icon: "Code2",
    items: [
      { name: "TypeScript", level: 87 },
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 78 },
      { name: "SQL", level: 82 },
      { name: "C#", level: 68 },
    ],
  },
  {
    category: "Database",
    icon: "Database",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 78 },
      { name: "SQL Server", level: 75 },
      { name: "Prisma ORM", level: 83 },
    ],
  },
  {
    category: "AI / ML",
    icon: "Brain",
    items: [
      { name: "Prompt Engineering", level: 80 },
      { name: "LangChain / OpenAI", level: 75 },
      { name: "NLP Pipelines", level: 72 },
      { name: "Speech Synthesis", level: 70 },
    ],
  },
  {
    category: "Tools & Cloud",
    icon: "Wrench",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "AWS (EC2, S3)", level: 72 },
      { name: "Swagger / OpenAPI", level: 82 },
      { name: "Docker", level: 65 },
      { name: "Postman", level: 85 },
    ],
  },
];

export const concepts = [
  "REST APIs",
  "Transaction Processing",
  "Idempotency",
  "Session Management",
  "API Integration",
  "Modular Monolith",
  "Database Design",
  "JWT Auth",
  "Wallet Systems",
  "Provider Certification",
];

export const currentOperations = {
  learning: ["AI Agents", "LangGraph", "System Design Patterns"],
  building: ["AI Products", "Automation Systems"],
  objective: "Software Engineering Role — Backend / Full-Stack",
};

export const bootLines = [
  { text: "INITIALIZING HARSH OS...", delay: 0 },
  { text: "LOADING ENGINEER PROFILE...", delay: 500 },
  { text: "SCANNING EXPERIENCE DATABASE...", delay: 1050 },
  { text: "CONNECTING PROJECT ARCHIVE...", delay: 1600 },
  { text: "LOADING SKILL MATRIX...", delay: 2100 },
  { text: "ANALYZING GITHUB REPOSITORIES...", delay: 2600 },
  { text: "ESTABLISHING SECURE CONNECTION...", delay: 3100 },
  { text: "SYSTEM READY", delay: 3600 },
  { text: "WELCOME, HARSH JADAV", delay: 4000 },
];
