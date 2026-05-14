# 🚀 Quick Start Guide

Get your portfolio running in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd portfolio-website
npm install
```

## Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

## Step 3: Customize Your Content (2 minutes)

Open `data/portfolio.ts` and update:

1. **Your Name & Info**:
```typescript
export const personalInfo = {
  name: "Your Name Here",
  title: "Your Title Here",
  email: "your.email@example.com",
  // ...
}
```

2. **Your Social Links**:
```typescript
export const socialLinks = [
  { name: "GitHub", url: "https://github.com/YOUR_USERNAME", ... },
  // ...
]
```

3. **Your Skills**: Add/remove as needed
4. **Your Experience**: Add your work history
5. **Your Projects**: Add your portfolio projects

## Step 4: Add Your Images

1. Put project images in `public/images/`
2. Update image paths in `data/portfolio.ts`

## Step 5: Deploy (Optional)

### Free Deployment to Vercel:

1. Push to GitHub:
```bash
git init
git add .
git commit -m "My portfolio"
git push
```

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy!

**Done! Your portfolio is live! 🌟**

---

## 📁 Project Structure Overview

```
portfolio-website/
├── app/                    # Main application
│   ├── layout.tsx         # Layout wrapper
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── layout/            # Header & Footer
│   └── ui/                # Reusable components (Button, Card)
│
├── data/
│   └── portfolio.ts       # ⭐ EDIT THIS - Your content!
│
└── public/                # Static files (images, resume)
```

## 🎨 Key Files to Customize

1. **`data/portfolio.ts`** - All your content (MOST IMPORTANT!)
2. **`tailwind.config.ts`** - Colors and styling
3. **`public/`** - Your images and resume
4. **`app/layout.tsx`** - Site metadata and SEO

## 💡 Common Tasks

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  accent: "#3b82f6",  // Change this!
}
```

### Hide a Section
Edit `app/page.tsx`, comment out:
```typescript
{/* <Skills /> */}
```

### Add More Projects
Add to `data/portfolio.ts`:
```typescript
export const projects = [
  // ... existing projects
  {
    id: 7,
    title: "New Project",
    // ...
  }
]
```

## 📚 Full Documentation

- **Setup**: See `SETUP_GUIDE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **General**: See `README.md`

## 🆘 Need Help?

**Build not working?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

**TypeScript errors?**
Check all imports in the error message

**Images not showing?**
- Use full URLs or put in `public/` folder
- Reference as `/image.jpg` not `./image.jpg`

---

**Happy coding! 🎉**

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
