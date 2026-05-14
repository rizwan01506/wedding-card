export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  current?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
