# CareerPilot AI - Deployment Guide

## 🚀 Complete Deployment Instructions

Follow these step-by-step instructions to deploy your CareerPilot AI project to production.

## System Overview

CareerPilot AI consists of four integrated components:

1. **Main CareerPilot AI** (Port 3000)
2. **Online-Meet Module** (Port 3004)
3. **Softskills-Grammar Module** (Port 9002)
4. **CareerPilot-AI-Main Module** (Port 3003)

## Prerequisites

Before starting, ensure you have:

- ✅ Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- ✅ GitHub account
- ✅ Vercel account (free tier available)
- ✅ Node.js 18.17+ installed locally
- ✅ Spotify API credentials (for CareerPilot-AI-Main module)
- ✅ RapidAPI Judge0 key (for Online-Meet module)

---

## Step 1: Prepare All Project Components

### 1.1 Verify Environment Variables

Create `.env.local` files for each component:

**Main CareerPilot AI**:

```bash
GOOGLE_API_KEY=your_actual_gemini_api_key_here
```

**Online-Meet Module**:

```bash
NEXT_PUBLIC_RAPID_API_KEY=your_rapid_api_key
NEXT_PUBLIC_RAPID_API_HOST=judge0-ce.p.rapidapi.com
```

**Softskills-Grammar Module**:

```bash
GOOGLE_API_KEY=your_actual_gemini_api_key_here
```

**CareerPilot-AI-Main Module**:

```bash
GOOGLE_API_KEY=your_actual_gemini_api_key_here
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3003/api/auth/callback/spotify
```

### 1.2 Test Local Build for Each Component

```bash
# Main CareerPilot AI
npm run build
npm run start

# Online-Meet Module
cd CareerPilot-AI/Online-Meet
npm run build
npm run start

# Softskills-Grammar Module
cd CareerPilot-AI/Softskills-Grammar
npm run build
npm run start

# CareerPilot-AI-Main Module
cd CareerPilot-AI/CareerPilot-AI-main
npm run build
npm run start
```

If all builds succeed, you're ready to deploy!

---

## Step 2: Push All Components to GitHub

### 2.1 Initialize Git Repository for Each Component (if not already done)

You can set up one repository with all components or separate repositories for each:

**Option 1: Single Repository (recommended)**

```bash
git init
git add .
git commit -m "Initial commit: Complete CareerPilot AI suite ready for deployment"
```

**Option 2: Separate Repositories**

```bash
# Main CareerPilot AI
git init
git add .
git commit -m "Initial commit: Main CareerPilot AI ready for deployment"

# And repeat for other components...
```

### 2.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and click "New repository"
2. Name it: `careerpilot-ai` (or your preferred name)
3. Set as **Public** or **Private** (your choice)
4. **Don't** initialize with README (we already have one)
5. Click "Create repository"

### 2.3 Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/careerpilot-ai.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3: Deploy to Vercel

### 3.1 Deploy Each Component

You'll need to deploy each component as a separate Vercel project:

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Import Project"
4. Find your repository
5. For monorepo setups, select the appropriate directory for each component
6. Configure each deployment with the appropriate settings

### 3.2 Configure Project Settings for Each Component

Vercel will automatically detect they're Next.js projects. Verify these settings for each:

**Main CareerPilot AI**:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (or appropriate path in monorepo)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**Online-Meet Module**:

- **Framework Preset**: Next.js
- **Root Directory**: `./CareerPilot-AI/Online-Meet` (or appropriate path)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**Softskills-Grammar Module**:

- **Framework Preset**: Next.js
- **Root Directory**: `./CareerPilot-AI/Softskills-Grammar` (or appropriate path)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**CareerPilot-AI-Main Module**:

- **Framework Preset**: Next.js
- **Root Directory**: `./CareerPilot-AI/CareerPilot-AI-main` (or appropriate path)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables for Each Deployment

For each component in the Vercel dashboard:

1. Go to your project
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the appropriate variables as listed in Step 1.1
5. Click "Add"

### 3.4 Deploy

1. Click "Deploy" button
2. Wait for deployment to complete (usually 2-3 minutes)
3. Once complete, you'll get a live URL like: `https://careerpilot-ai.vercel.app`

---

## Step 4: Verify Deployment

### 4.1 Test Core Features

Visit your live site and test:

- ✅ Homepage loads correctly
- ✅ Career planning page works
- ✅ AI responses are generated
- ✅ Navigation works properly
- ✅ Theme switching works

### 4.2 Check Browser Console

Open developer tools and ensure no errors in console.

---

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Step 6: Continuous Deployment

✅ **Automatic Deployments**: Every time you push to GitHub, Vercel will automatically redeploy your site.

### To Update Your Site:

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

Your site will automatically update in 2-3 minutes!

---

## 🔧 Troubleshooting

### Common Issues:

**Build Fails:**

- Check that all dependencies are in `package.json`
- Ensure no TypeScript errors
- Verify all imports are correct

**API Not Working:**

- Verify `GOOGLE_GEMINI_API_KEY` is set in Vercel environment variables
- Check API key is valid and has proper permissions

**404 Errors:**

- Ensure `vercel.json` is properly configured
- Check that all page routes are correctly set up

### Getting Help:

- Check Vercel deployment logs in the dashboard
- Review browser developer console for errors
- Verify all environment variables are set correctly

---

## 🎉 Success!

Your CareerPilot AI is now live and accessible worldwide!

**Next Steps:**

- Share your live URL with users
- Monitor usage through Vercel analytics
- Continue developing new features
- Consider upgrading to Vercel Pro for advanced features

---

## 📊 Project Files Created for Deployment

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.env.example` - Environment variables template
- ✅ Optimized `next.config.mjs` - Production configuration
- ✅ Updated `package.json` - Deployment-ready scripts
- ✅ This deployment guide

Your project is now production-ready! 🚀
