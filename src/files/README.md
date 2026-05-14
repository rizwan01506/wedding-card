# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 18, TypeScript, and Tailwind CSS
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Fast Performance**: Optimized images, code splitting, and SSR
- **SEO Friendly**: Meta tags, semantic HTML, and optimized structure
- **Smooth Animations**: Framer Motion for beautiful transitions
- **Clean Code**: Well-organized, modular, and reusable components
- **Type Safe**: Full TypeScript support for better development experience

## 📁 Project Structure

```
portfolio-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Footer with social links
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx         # Hero/landing section
│   │   ├── About.tsx        # About section
│   │   ├── Skills.tsx       # Skills showcase
│   │   ├── Experience.tsx   # Work experience
│   │   ├── Projects.tsx     # Portfolio projects
│   │   └── Contact.tsx      # Contact form
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx       # Button component
│       ├── Card.tsx         # Card wrapper
│       ├── Container.tsx    # Section container
│       └── SectionTitle.tsx # Section titles
├── data/
│   └── portfolio.ts         # Portfolio data (projects, skills, etc.)
├── types/
│   └── index.ts             # TypeScript type definitions
└── public/                  # Static assets

```

## 🛠️ Installation & Setup

1. **Clone or extract the project**:
   ```bash
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Update Personal Information

Edit `data/portfolio.ts` to customize:

- **Personal Info**: Name, title, bio, email, location
- **Social Links**: GitHub, LinkedIn, Twitter, etc.
- **Skills**: Technologies and proficiency levels
- **Experience**: Work history and descriptions
- **Projects**: Portfolio projects with images and links

### Update Styling

- **Colors**: Modify `tailwind.config.ts` for color scheme
- **Fonts**: Change fonts in `app/layout.tsx`
- **Animations**: Customize in `tailwind.config.ts` keyframes

### Add Images

1. Place images in the `public/` directory
2. Update image paths in `data/portfolio.ts`
3. For better performance, use Next.js Image component

## 🎨 Sections

1. **Hero**: Landing section with name, title, and CTAs
2. **About**: Introduction and highlights
3. **Skills**: Technologies organized by category with progress bars
4. **Experience**: Work history timeline
5. **Projects**: Portfolio showcase with filtering
6. **Contact**: Contact form and information

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **AWS/DigitalOcean**: Build and upload the `.next` folder

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Mohd Rizwan**

- Website: [codewithrizwan.in](https://www.codewithrizwan.in/)
- GitHub: [@yourusername](https://github.com/yourusername)

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ using Next.js and TypeScript
