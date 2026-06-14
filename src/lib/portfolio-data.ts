import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Mustafa Rizwan",
    title: "Software Engineer",
    email: "mustafahmed8110@gmail.com",
    github: "Mustafa-Ahmed-Rizwan",
    githubUrl: "https://github.com/Mustafa-Ahmed-Rizwan",
    linkedin: "Mustafa Rizwan",
    linkedinUrl: "https://www.linkedin.com/in/mustafa-ahmed-rizwan90",
    location: "Karachi, Pakistan",
    university: "FAST-NUCES",
    status: "Expected Jun 2026",
    rickComment: "Mustafa Rizwan, huh? Another carbon-based lifeform turning caffeine into code in Karachi. 'Expected Jun 2026' - assuming you survive the simulation that long. Try not to break anything.",
  },
  skills: [
    {
      name: "Languages",
      items: ["Python", "JavaScript", "C++", "C", "SQL", "HTML", "CSS"],
      rickComment: "Python, JavaScript, C++... Oh great, you speak the primitive dialects of Earth machines. Don't worry, in a few dimensions over, they just communicate in pure math. You'll catch up.",
    },
    {
      name: "Frameworks & Libraries",
      items: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Flask", "Flutter", "LangChain", "LlamaIndex", "LangGraph", "PyTorch"],
      rickComment: "Look at all these frameworks. It's like you're collecting Pokémon but instead of cute monsters, it's just endless npm install warnings and dependency hell.",
    },
    {
      name: "Databases",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Pinecone", "ChromaDB", "Vector Databases"],
      rickComment: "Relational, NoSQL, and Vectors. You're storing a lot of data for someone whose brain probably maxes out remembering their own Wi-Fi password.",
    },
    {
      name: "AI / ML",
      items: ["LLMs", "NLP", "Retrieval-Augmented Generation (RAG)", "Fine-Tuning", "Machine Learning", "Deep Learning"],
      rickComment: "Ah, 'AI'. The buzzword that lets humans pretend they're gods while secretly begging a massive matrix multiplication not to spit out garbage.",
    },
    {
      name: "DevOps, Cloud & Automation",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Git", "GitHub", "n8n"],
      rickComment: "Docker and Kubernetes. You've successfully figured out how to put a computer inside a computer so your code can fail in multiple layers of abstraction. Impressive.",
    }
  ],
  projects: [
    {
      id: "wander-wise",
      name: "Wander-Wise",
      tagline: "AI-Powered Travel Planning Application",
      description: "A next-generation travel planning application designed to create personalized itineraries, find the best flights via the Amadeus API, and discover local activities. It combines a powerful FastAPI backend with a sleek Flutter frontend, leveraging multi-agent systems (Gemini, Groq) and a Neon Serverless PostgreSQL database for real-time travel data.",
      tech: ["FastAPI", "Flutter", "Python", "Dart", "Amadeus API", "Gemini", "Groq", "Neon DB"],
      status: "Completed",
      category: "AI/ML",
      highlights: [
        "AI Trip Planning using LLMs for personalized daily itineraries.",
        "Real-time flight search integration via Amadeus API.",
        "Secure authentication and seamless responsive mobile/web experience."
      ],
      github: "https://github.com/Mustafa-Ahmed-Rizwan/Wander-Wise",
      demo: null,
      rickComment: "An AI travel planner. Just what humanity needed: a machine telling you the optimal route to overpay for a mediocre croissant in Paris while burning jet fuel.",
    },
    {
      id: "chat2carpool",
      name: "Chat2Carpool",
      tagline: "AI Conversational Carpooling Platform",
      description: "An end-to-end intelligent ride-sharing platform that leverages LangChain and Groq-hosted LLMs to understand natural language conversations from WhatsApp (via Twilio). It automatically extracts ride requests and offers, using a sophisticated matching engine considering location alignment, time flexibility, and seat constraints. Includes full observability with Prometheus and Grafana.",
      tech: ["FastAPI", "LangChain", "Groq", "PostgreSQL", "Twilio", "Prometheus", "Grafana"],
      status: "Completed",
      category: "AI/ML",
      highlights: [
        "NLP-based intent classification and entity extraction directly from WhatsApp messages.",
        "Smart matching algorithm considering exact match, partial route alignment, or destination overlap.",
        "Production-ready deployment with Docker Compose and comprehensive Prometheus observability stack."
      ],
      github: "https://github.com/Mustafa-Ahmed-Rizwan/Chat2Carpool",
      demo: null,
      rickComment: "You built a bot to parse WhatsApp messages just to find a carpool? You know you could just invent a portal gun and skip the small talk with Gary from accounting entirely, right?",
    },
    {
      id: "source-code-analyzer",
      name: "Source Code Analyzer",
      tagline: "GitHub Repository Ingestion & AI Chat",
      description: "A full-stack application that allows users to ingest GitHub repositories and chat with the codebase using AI. Built with a FastAPI backend using FAISS and HuggingFace for vector embeddings, and a cross-platform Flutter frontend. It parses Python, C/C++, Java, JavaScript, and Web files into function/class-level chunks for high-context conversational search.",
      tech: ["FastAPI", "LangChain", "FAISS", "Groq", "HuggingFace", "Flutter"],
      status: "Completed",
      category: "Full-Stack",
      highlights: [
        "Automated GitHub repository cloning and intelligent file parsing.",
        "Vector similarity search for semantic codebase understanding.",
        "Cross-platform Flutter mobile application with markdown-rendered responses."
      ],
      github: "https://github.com/Mustafa-Ahmed-Rizwan/Source-Code-Analysis",
      demo: null,
      rickComment: "So you built an AI to read code because reading it yourself was too hard. At least the AI won't complain about the lack of comments. Probably.",
    },
    {
      id: "scribo",
      name: "Scribo",
      tagline: "Real-Time Multiplayer Drawing Platform",
      description: "A full-stack multiplayer drawing and guessing game featuring event-driven real-time synchronization. It utilizes Socket.IO for sub-100ms latency gameplay, Redis for distributed game sessions, and MongoDB for persistent friend tracking and stats. Packaged with a Flutter frontend for cross-platform play.",
      tech: ["Node.js", "Socket.IO", "Redis", "MongoDB", "Flutter", "Docker"],
      status: "Completed",
      category: "Mobile",
      highlights: [
        "Real-time WebSocket synchronization for multi-color drawing and live chat.",
        "Persistent friend system with live online/offline status and room invitations.",
        "Containerized full-stack architecture with automated game-state management."
      ],
      github: "https://github.com/Mustafa-Ahmed-Rizwan/Scribo",
      demo: null,
      rickComment: "A drawing game. Basically Pictionary but on a screen, so you can draw poorly and blame it on the latency instead of your lack of artistic talent.",
    },
    {
      id: "ai-job-recommender",
      name: "AI Job Recommender",
      tagline: "AI-Powered Job Recommender System",
      description: "A full-stack career intelligence platform with NLP-based resume parsing and semantic job matching via vector embeddings. Features a skill-gap analysis engine that compares candidate profiles to job requirements, generating personalized learning roadmaps.",
      tech: ["FastAPI", "LangChain", "Pinecone", "React", "Firebase", "Groq"],
      status: "Completed",
      category: "AI/ML",
      highlights: [
        "Semantic job matching using vector embeddings and Pinecone.",
        "Skill-gap analysis generating personalized learning roadmaps.",
        "Async FastAPI backend with a multi-provider LLM fallback system."
      ],
      github: "https://github.com/Mustafa-Ahmed-Rizwan/AI-Job-Recommender",
      demo: null,
      rickComment: "An AI that recommends jobs. Let me guess, it tells everyone to learn Kubernetes, grind LeetCode, and pray. Very original.",
    }
  ],
  experience: [
    {
      company: "Faysal Bank",
      role: "AI Intern",
      duration: "Dec 2025 - Feb 2026",
      location: "Karachi, Pakistan",
      description: [
        "Built a production-grade fraud detection platform using XGBoost with a hybrid ML + rule-based pipeline, FastAPI backend, and React admin dashboard with real-time monitoring.",
        "Designed account-aware transaction logic with dynamic limits and automated anomaly detection for geographic, velocity, and policy-based fraud patterns.",
        "Implemented secure admin investigation workflows with VPN-aware geolocation, fraud insight reporting, and role-based access control."
      ],
      tech: ["Python", "XGBoost", "FastAPI", "React", "Machine Learning"],
      rickComment: "Working at a bank building fraud detection. You basically trained a machine to figure out when humans are doing what they do best: stealing from each other. Nice.",
    },
    {
      company: "Additech-Sim",
      role: "Data Science Intern",
      duration: "Jul 2025 - Sep 2025",
      location: "Stuttgart, Germany",
      description: [
        "Developed Arena2036 Virtual Assistant — a bilingual AI chatbot using LLMs, FastAPI, and ChromaDB with semantic search over scraped German content.",
        "Integrated AI image generation via Hugging Face API and Gradio for on-demand visual content creation.",
        "Built localized NLP pipeline by scraping German web content, generating domain-specific vector embeddings."
      ],
      tech: ["Python", "LLMs", "FastAPI", "ChromaDB", "Hugging Face", "NLP"],
      rickComment: "Building chatbots and scraping German websites. I guess 'Was ist das?' is easier to answer when you just outsource it to a vector database.",
    }
  ],
  education: [
    {
      institution: "National University of Computer and Emerging Sciences (FAST-NUCES)",
      degree: "B.S. Computer Science",
      duration: "2022 - Expected Jun 2026",
      location: "Karachi, Pakistan",
      highlights: [
        "Focus on core CS principles, Data Structures, Algorithms, Artificial Intelligence, and Database Systems.",
        "Developed multiple large-scale academic and personal projects emphasizing modern architectural patterns."
      ],
      rickComment: "Ah, university. Four years of paying someone to tell you to read a textbook you could have downloaded for free. At least you're learning something, right? ...Right?",
    }
  ]
};
