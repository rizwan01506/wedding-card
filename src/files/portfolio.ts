import { Project, Skill, Experience, SocialLink } from "@/types";

export const personalInfo = {
  name: "Mohd Rizwan",
  title: "Full Stack Developer",
  bio: "I'm a passionate Full Stack Developer with expertise in building modern web applications. I love creating elegant solutions to complex problems and learning new technologies.",
  email: "contact@codewithrizwan.in",
  location: "India",
  resume: "/resume.pdf",
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "FaGithub",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "FaLinkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "FaTwitter",
  },
  {
    name: "Email",
    url: "mailto:contact@codewithrizwan.in",
    icon: "FaEnvelope",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express", level: 80, category: "backend" },
  { name: "MongoDB", level: 75, category: "backend" },
  { name: "PostgreSQL", level: 70, category: "backend" },
  { name: "REST API", level: 85, category: "backend" },
  
  // Tools
  { name: "Git", level: 85, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
  { name: "Figma", level: 75, category: "tools" },
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Company",
    period: "2023 - Present",
    current: true,
    description: [
      "Led development of multiple client projects using React and Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 40%",
      "Mentored junior developers and conducted code reviews",
      "Architected scalable microservices infrastructure",
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
    description: [
      "Developed responsive web applications using React and Next.js",
      "Built RESTful APIs with Node.js and Express",
      "Optimized application performance improving load times by 50%",
      "Collaborated with designers to implement pixel-perfect UIs",
    ],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Startup Inc",
    period: "2019 - 2021",
    description: [
      "Created interactive user interfaces with React",
      "Implemented responsive designs using Tailwind CSS",
      "Worked with cross-functional teams in Agile environment",
      "Contributed to open-source projects",
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, featuring product management, cart functionality, and secure payment integration.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redux"],
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard that displays current weather conditions and forecasts for multiple locations.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop",
    technologies: ["React", "TypeScript", "Chart.js", "Weather API"],
    githubUrl: "https://github.com/yourusername/weather",
    liveUrl: "https://weather-demo.vercel.app",
    featured: false,
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "A modern blog platform with markdown support, syntax highlighting, and SEO optimization.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/yourusername/blog",
    liveUrl: "https://blog-demo.vercel.app",
    featured: true,
  },
  {
    id: 5,
    title: "Portfolio Generator",
    description: "A tool to help developers create beautiful portfolio websites with customizable themes and templates.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
    technologies: ["React", "Styled Components", "Firebase"],
    githubUrl: "https://github.com/yourusername/portfolio-gen",
    liveUrl: "https://portfolio-gen.vercel.app",
    featured: false,
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "An analytics dashboard for social media metrics with beautiful data visualizations and insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/social-dashboard",
    liveUrl: "https://social-dashboard.vercel.app",
    featured: false,
  },
];
