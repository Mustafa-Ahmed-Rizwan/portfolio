// Portfolio data types — single source of truth for all portfolio information

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Completed" | "In Progress";
  category: "FYP" | "AI/ML" | "Full-Stack" | "Systems" | "DevOps" | "Mobile";
  highlights: string[];
  github: string | null;
  demo: string | null;
  rickComment: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  tech: string[];
  rickComment?: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  gpa?: string;
  highlights: string[];
  rickComment?: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
  rickComment?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  location: string;
  university: string;
  status: string;
  rickComment?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
}
