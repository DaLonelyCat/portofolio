# Cloudflare Pages Deployment Guide

Your portfolio has been pre-configured for **Cloudflare Pages** using Next.js static HTML export (`output: 'export'`).

---

## Method 1: Git Integration (Recommended - Automated CI/CD)

Whenever you push commits to GitHub/GitLab, Cloudflare Pages will automatically build and deploy your site:

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, click **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository (`gallant-pasteur` or your portfolio repo).
4. Configure the **Build Settings**:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. *(Optional but recommended)* Under **Environment variables**, add:
   - Variable name: `NODE_VERSION`
   - Value: `20`
6. Click **Save and Deploy**. Your site will be live across Cloudflare's global edge network in ~30 seconds!

---

## Method 2: Instant CLI Deployment (via Wrangler)

You can also deploy directly from your local terminal with zero Git setup:

1. In your project directory, build the static export:
   ```bash
   npm run build
   ```
2. Deploy to Cloudflare Pages using Wrangler:
   ```bash
   npx wrangler pages deploy out --project-name=portfolio-cv
   ```
3. Wrangler will prompt you to authenticate with Cloudflare in your browser once, and then upload your `out` folder directly.

---

## Pre-configured Files in this Project

- `next.config.mjs`: Configured with `output: 'export'` and `images: { unoptimized: true }`.
- `wrangler.toml`: Configured with `pages_build_output_dir = "out"`.
- `.nvmrc`: Sets Node.js version `20` for Cloudflare's build environment.
- `package.json`: Contains `"pages:build": "next build"` and `"pages:deploy": "npx wrangler pages deploy out"`.
- `src/app/cv/page.tsx`: Embedded CV viewer at `/cv` that displays your PDF in-browser without getting intercepted by download managers like IDM.
