# Deployment Guide

This guide covers deploying your portfolio website to various platforms.

## 🚀 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Method 1: Deploy via Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site is live at `your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts** and your site will be deployed

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `www.yoursite.com`)
3. Update DNS records:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

## 🌐 Netlify

### Deploy to Netlify

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Choose "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Deploy**

### Netlify CLI Method

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

## ☁️ AWS Amplify

1. **Push to GitHub**

2. **Connect to Amplify**:
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect to GitHub
   - Select your repository

3. **Build settings** (auto-detected):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Save and deploy**

## 🌊 DigitalOcean App Platform

1. **Create a DigitalOcean account**

2. **Deploy from GitHub**:
   - Click "Create App"
   - Connect GitHub
   - Select repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Run Command: `npm start`

3. **Deploy**

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🔧 Environment Variables

### For Production

Create environment variables in your hosting platform:

1. **Vercel**:
   - Go to Project Settings → Environment Variables
   - Add variables

2. **Netlify**:
   - Go to Site Settings → Build & Deploy → Environment
   - Add variables

3. **Other platforms**:
   - Check platform documentation for adding env vars

## 📊 Performance Optimization

Before deploying, optimize your site:

### 1. Optimize Images

```bash
# Install sharp for image optimization
npm install sharp
```

### 2. Enable Compression

In `next.config.js`:
```javascript
module.exports = {
  compress: true,
}
```

### 3. Analyze Bundle

```bash
npm install @next/bundle-analyzer
```

Add to `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})
```

Run analysis:
```bash
ANALYZE=true npm run build
```

## 🔍 SEO Optimization

### 1. Add sitemap.xml

Create `app/sitemap.ts`:
```typescript
export default function sitemap() {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
    },
  ]
}
```

### 2. Add robots.txt

Create `app/robots.ts`:
```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

### 3. Update Meta Tags

In `app/layout.tsx`, update metadata:
```typescript
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your compelling description',
  keywords: ['web developer', 'react', 'nextjs'],
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'Your description',
    url: 'https://yoursite.com',
    siteName: 'Your Name',
    images: ['/og-image.jpg'],
  },
}
```

## 📈 Analytics Setup

### Google Analytics

1. **Get GA4 ID** from Google Analytics

2. **Create analytics component**:

`components/Analytics.tsx`:
```typescript
import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR_GA_ID');
        `}
      </Script>
    </>
  )
}
```

3. **Add to layout**:
```typescript
import Analytics from '@/components/Analytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## ✅ Pre-Deployment Checklist

- [ ] All personal information updated
- [ ] Projects and images added
- [ ] Resume PDF uploaded
- [ ] Social links verified
- [ ] Test all links and navigation
- [ ] Mobile responsive check
- [ ] Run `npm run build` successfully
- [ ] Check for console errors
- [ ] Test contact form
- [ ] Optimize images
- [ ] Set up analytics
- [ ] Configure custom domain
- [ ] Add SSL certificate (usually automatic)
- [ ] Test site speed (PageSpeed Insights)
- [ ] Submit sitemap to Google Search Console

## 🔄 Continuous Deployment

Both Vercel and Netlify automatically deploy when you push to GitHub:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Your site will automatically rebuild and redeploy!

## 📱 Testing Your Live Site

1. **Check responsive design**: Use Chrome DevTools
2. **Test page speed**: [PageSpeed Insights](https://pagespeed.web.dev/)
3. **Validate SEO**: [SEO Site Checkup](https://seositecheckup.com/)
4. **Check accessibility**: [WAVE Tool](https://wave.webaim.org/)
5. **Test links**: [Broken Link Checker](https://www.brokenlinkcheck.com/)

## 🆘 Troubleshooting

### Build Fails

1. Check all imports are correct
2. Ensure all dependencies are in package.json
3. Test locally: `npm run build`
4. Check build logs for specific errors

### Site Not Loading

1. Check deployment status
2. Verify build completed successfully
3. Check browser console for errors
4. Verify all environment variables are set

### Images Not Showing

1. Check image paths
2. Add domains to `next.config.js`
3. Verify images are in `public/` folder

---

**Your portfolio is now live! 🎉**

Share it with the world and start getting those opportunities!
