# Portfolio Website Setup Guide

This guide will help you set up and customize your portfolio website.

## 📋 Prerequisites

Before you begin, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- A code editor (VS Code recommended)
- Git (optional, for version control)

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

### Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization Guide

### 1. Update Personal Information

Open `data/portfolio.ts` and update the `personalInfo` object:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Professional Title",
  bio: "Your bio description...",
  email: "your.email@example.com",
  location: "Your City, Country",
  resume: "/resume.pdf",
};
```

### 2. Update Social Links

In the same file, update the `socialLinks` array:

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/YOUR_USERNAME",
    icon: "FaGithub",
  },
  // Add more social links...
];
```

### 3. Add Your Skills

Update the `skills` array with your technologies:

```typescript
export const skills: Skill[] = [
  { name: "React", level: 90, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  // Add more skills...
];
```

Categories available:
- `frontend` - Frontend technologies
- `backend` - Backend technologies
- `tools` - Tools and other technologies

### 4. Add Work Experience

Update the `experiences` array:

```typescript
export const experiences: Experience[] = [
  {
    id: 1,
    title: "Job Title",
    company: "Company Name",
    period: "Start - End Date",
    current: true, // Set to true for current job
    description: [
      "Responsibility 1",
      "Responsibility 2",
      // Add more responsibilities...
    ],
  },
];
```

### 5. Add Projects

Update the `projects` array with your portfolio projects:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description...",
    image: "/path/to/image.jpg", // or external URL
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/repo",
    liveUrl: "https://your-project.com",
    featured: true, // Featured projects show first
  },
];
```

### 6. Add Project Images

**Option 1: Use External URLs**
```typescript
image: "https://images.unsplash.com/photo-..."
```

**Option 2: Use Local Images**
1. Add images to `public/images/` folder
2. Reference them:
```typescript
image: "/images/project-1.jpg"
```

### 7. Customize Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "#your-color",
      secondary: "#your-color",
      accent: "#your-color",
    },
  },
},
```

### 8. Change Fonts

Edit `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({ 
  subsets: ["latin"],
  variable: "--font-your-font"
});
```

Browse Google Fonts: https://fonts.google.com/

### 9. Add Your Resume

1. Place your resume PDF in the `public/` folder
2. Update the path in `data/portfolio.ts`:
```typescript
resume: "/your-resume.pdf"
```

## 🎯 Component Structure

### Reusable Components (`components/ui/`)

- **Button**: Customizable button with variants
- **Card**: Container with hover effects
- **Container**: Section wrapper with consistent padding
- **SectionTitle**: Styled section headings

### Layout Components (`components/layout/`)

- **Header**: Navigation bar with mobile menu
- **Footer**: Footer with social links

### Section Components (`components/sections/`)

- **Hero**: Landing section
- **About**: About me section
- **Skills**: Skills showcase
- **Experience**: Work timeline
- **Projects**: Portfolio gallery
- **Contact**: Contact form

## 🔧 Customizing Sections

### Hide/Remove Sections

Edit `app/page.tsx` and comment out sections you don't need:

```typescript
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* <Skills /> */}  // Hidden
      <Projects />
      {/* <Contact /> */}  // Hidden
    </>
  );
}
```

### Reorder Sections

Change the order in `app/page.tsx`:

```typescript
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />  // Now before About
      <About />
      <Skills />
    </>
  );
}
```

### Add New Sections

1. Create component in `components/sections/YourSection.tsx`
2. Import and add to `app/page.tsx`

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints:

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

Tailwind responsive prefixes:
- `md:` - Tablet and up
- `lg:` - Desktop and up

Example:
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Your site will be live at `your-project.vercel.app`

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Deploy to Netlify

1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `.next` folder

## 🐛 Troubleshooting

### Images not loading
- Check image paths are correct
- For external images, add domain to `next.config.js`:
```javascript
images: {
  domains: ['your-image-domain.com'],
}
```

### Styles not applying
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`

### TypeScript errors
- Run type check: `npm run build`
- Check all imports are correct

### Build errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

## 💡 Tips for Best Results

1. **Use High-Quality Images**: Optimize images before adding (use TinyPNG)
2. **Keep Content Concise**: Focus on quality over quantity
3. **Test on Multiple Devices**: Check mobile, tablet, and desktop
4. **Update Regularly**: Keep projects and skills current
5. **Optimize Performance**: Use Next.js Image component for images
6. **SEO**: Update meta tags in `app/layout.tsx`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🆘 Need Help?

- Check the README.md file
- Review Next.js documentation
- Search for solutions on Stack Overflow
- Check GitHub issues

## ✅ Launch Checklist

Before deploying:

- [ ] Update all personal information
- [ ] Add your projects with images
- [ ] Update skills and experience
- [ ] Add your resume PDF
- [ ] Update social media links
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Optimize images
- [ ] Update meta tags for SEO
- [ ] Test contact form
- [ ] Run `npm run build` successfully

---

**Congratulations! Your portfolio is ready to launch! 🎉**
