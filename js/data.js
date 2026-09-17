/**
 * CENTRAL PORTFOLIO CONFIGURATION & DATA SOURCE
 * Update your personal information, skills, projects, and links here.
 * The entire website dynamically renders from this data store.
 */

export const portfolioData = {
  profile: {
    name: "Shubham Singh Bhadauria",
    initials: "SB",
    subtitle: "Computer Science With AI / Data Science Student",
    headlineTagline: "Software Developer • AI Enthusiast • Problem Solver",
    intro:
      "I am Shubham from Jaipur, Rajasthan and I am pursuing B.Tech CSE AI/DS from JECRC UNIVERSITY. I am into coding, video editing and software development.",
    location: "Jaipur, Rajasthan, India",
    educationBrief: "B.Tech in Computer Science & Engineering (AI/DS) • JECRC UNIVERSITY (2026 – 2030)",
    focus: "Software Development, Artificial Intelligence, Web Development & Data Structures",
    interests: "Video Editing And Reading Mangas/Manhwa",
    statusBadge: "Available for Collaborations & Internships",
    contactEmail: "Uchihaobito1956@gmail.com",
    portraitImage: "assets/images/shubham_portrait.jpg",
  },

  about: {
    heading: "Building with curiosity.",
    leadParagraph:
      "I am a Computer Science student with a deep fascination for the intersection of <strong>intelligent software engineering</strong> and <strong>immersive digital design</strong>. Based in Jaipur, Rajasthan, I am currently pursuing my B.Tech in CSE specializing in Artificial Intelligence and Data Science at JECRC University.",
    secondaryParagraph:
      "Beyond traditional development, I am energized by crafting intuitive user experiences, exploring data structures, and channeling visual creativity through video editing and digital storytelling.",
    infoBlocks: [
      {
        icon: "graduation-cap",
        title: "Education",
        content: "B.Tech in Computer Science & Engineering",
        subtext: "JECRC UNIVERSITY • 2026 – 2030",
      },
      {
        icon: "map-pin",
        title: "Location",
        content: "Jaipur, Rajasthan, India",
        subtext: "Open to remote & hybrid roles",
      },
      {
        icon: "cpu",
        title: "Core Focus",
        content: "AI, Web Architecture & Data Structures",
        subtext: "Building robust, scalable applications",
      },
      {
        icon: "film",
        title: "Interests & Creativity",
        content: "Video Editing & Mangas/Manhwa",
        subtext: "Visual pacing, narrative & design",
      },
    ],
  },

  skills: {
    categories: [
      { id: "all", label: "All Skills" },
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
      { id: "ai-data", label: "AI / Data" },
      { id: "tools", label: "Tools & Workflow" },
    ],
    items: [
      // Frontend
      {
        name: "HTML5",
        category: "frontend",
        description: "Semantic layouts, accessibility (ARIA), modern DOM structures.",
        icon: "code",
      },
      {
        name: "CSS3",
        category: "frontend",
        description: "Modern CSS variables, flexbox, grid, glassmorphism & responsive clamp typography.",
        icon: "layout",
      },
      {
        name: "JavaScript",
        category: "frontend",
        description: "Modern ES6+, asynchronous programming, interactive DOM events.",
        icon: "file-code",
      },
      {
        name: "React",
        category: "frontend",
        description: "Component-driven development, state management, and modern UI flows.",
        icon: "layers",
      },

      // Backend
      {
        name: "Node.js",
        category: "backend",
        description: "Event-driven runtime for scalable backend services and tooling.",
        icon: "server",
      },
      {
        name: "Python",
        category: "backend",
        description: "Clean script architecture, algorithmic problem-solving, and server logic.",
        icon: "terminal",
      },
      {
        name: "APIs",
        category: "backend",
        description: "RESTful architecture, JSON protocols, and third-party data integration.",
        icon: "network",
      },
      {
        name: "Databases",
        category: "backend",
        description: "Relational and structured schemas, queries, and persistent storage.",
        icon: "database",
      },

      // AI / Data
      {
        name: "Machine Learning",
        category: "ai-data",
        description: "Core ML concepts, classification, and data predictive workflows.",
        icon: "brain-circuit",
      },
      {
        name: "Artificial Intelligence",
        category: "ai-data",
        description: "Intelligent systems, search algorithms, heuristic analysis, and AI modeling.",
        icon: "bot",
      },
      {
        name: "Data Analysis",
        category: "ai-data",
        description: "Exploratory data analysis, statistical modeling, patterns & visualizations.",
        icon: "bar-chart-3",
      },

      // Tools
      {
        name: "Git",
        category: "tools",
        description: "Distributed version control, branch management, and collaborative hygiene.",
        icon: "git-branch",
      },
      {
        name: "GitHub",
        category: "tools",
        description: "Repository workflows, CI/CD automation, issues, and open-source contribution.",
        icon: "github",
      },
      {
        name: "VS Code",
        category: "tools",
        description: "Primary IDE optimized for efficient coding, debugging, and terminal workflows.",
        icon: "app-window",
      },
      {
        name: "Figma",
        category: "tools",
        description: "UI/UX wireframing, component mockups, and layout design prototyping.",
        icon: "pen-tool",
      },
    ],
  },

  projects: [
    {
      id: "personal-portfolio",
      number: "01",
      title: "Personal Portfolio Website",
      tagline: "College Assignment & Interactive Showcase",
      description:
        "This project is a personal portfolio website developed as part of my college assignment. The website showcases my education, technical skills, projects, and achievements in a modern and attractive design. It is built using HTML, CSS, and JavaScript, with responsive layouts and smooth animations to provide an engaging user experience.",
      detailedOverview:
        "Engineered with a minimalist design language inspired by Apple and Samsung product pages. Key highlights include fluid clamp typography, obsidian dark and titanium light themes, Lenis smooth scrolling, GSAP ScrollTrigger reveals, an interactive WebGL particle mesh, and responsive touch gestures across all screen sizes.",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
        "Lucide Icons",
      ],
      image: "assets/images/portfolio_mockup.jpg",
      featured: true,
      demoUrl: "#home",
      githubUrl: "https://github.com",
    },
    {
      id: "ai-data-explorer",
      number: "02",
      title: "AI & Neural Network Analytics",
      tagline: "[Upcoming Academic & Practical Exploration]",
      description:
        "An upcoming engineering study in deep learning architectures, intelligent data processing, and predictive analytics models designed as part of my AI/DS curriculum.",
      detailedOverview:
        "Currently in conceptualization and dataset curation. Will feature neural network parameter visualization, dataset throughput metrics, and real-time loss tracking.",
      technologies: ["Python", "Machine Learning", "AI", "Data Analysis", "APIs"],
      image: "assets/images/ai_data_mockup.jpg",
      featured: false,
      isUpcoming: true,
      demoUrl: "#",
      githubUrl: "https://github.com",
    },
  ],

  timeline: [
    {
      period: "2026 – 2030",
      degree: "B.Tech in Computer Science & Engineering (AI/DS)",
      institution: "JECRC UNIVERSITY",
      location: "Jaipur, Rajasthan",
      description:
        "Currently pursuing B.Tech in Computer Science & Engineering, developing skills in programming, web development, data structures, and emerging technologies.",
      highlights: [
        "Specialization in Artificial Intelligence & Data Science",
        "Strong foundation in Algorithms, Object-Oriented Programming & Web Technologies",
        "Active member of university technical clubs and coding communities",
      ],
    },
  ],

  achievements: [
    {
      icon: "award",
      title: "JECRC University CSE (AI/DS) Cohort",
      meta: "Academic Track • 2026",
      description:
        "Admitted to the competitive Artificial Intelligence and Data Science engineering program at JECRC University, Jaipur.",
    },
    {
      icon: "video",
      title: "Digital Video Editing & Creative Media",
      meta: "Creative Showcase",
      description:
        "Extensive experience in video editing, motion pacing, and aesthetic visual narrative crafting alongside core coding disciplines.",
    },
    {
      icon: "code",
      title: "Full-Stack Web Development Foundation",
      meta: "Technical Milestones",
      description:
        "Engineered production-quality responsive web solutions adhering to modern semantic HTML5, CSS design systems, and JavaScript best practices.",
    },
  ],

  socialLinks: [
    { name: "GitHub", url: "https://github.com", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { name: "Email", url: "mailto:Uchihaobito1956@gmail.com", icon: "mail" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  ],

  footer: {
    tagline: "Driven by Curiosity, Built with Code",
    copyright: `© 2026 Shubham Singh Bhadauria. All rights reserved.`,
  },
};
