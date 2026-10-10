export type ProjectCategory = string;

export interface ProjectScreenshot {
  src: string;
  caption: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  overview: string;
  problem?: string;
  solution?: string;
  impact?: string;
  tags: string[];
  screenshots?: ProjectScreenshot[];
  liveUrl?: string;
  repoUrl?: string;
  figmaUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  context: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  notes?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  figma?: string;
  twitter?: string;
  email: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  philosophy?: string;
  location: string;
  status: string;
  statusAvailable: boolean;
  socials: SocialLinks;
}

export interface PortfolioData {
  personal: PersonalInfo;
  categories: ProjectCategory[];
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
}
