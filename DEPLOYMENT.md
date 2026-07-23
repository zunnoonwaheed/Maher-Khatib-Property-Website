# Cloudflare Pages Deployment Guide

This guide will help you deploy the Maher Khatib Property Website to Cloudflare Pages.

## Prerequisites

- GitHub repository: https://github.com/zunnoonwaheed/Maher-Khatib-Property-Website
- Cloudflare account (sign up at https://dash.cloudflare.com/sign-up)

## Deployment Steps

### 1. Connect GitHub to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click on **Workers & Pages** in the left sidebar
3. Click **Create application**
4. Select the **Pages** tab
5. Click **Connect to Git**

### 2. Configure Your Project

1. **Select your repository**:
   - Choose `zunnoonwaheed/Maher-Khatib-Property-Website`
   - Click **Begin setup**

2. **Set up builds and deployments**:
   - **Project name**: `maher-khatib-property` (or choose your own)
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `.output/public`
   - **Root directory**: Leave blank (use root)

3. **Environment variables** (if needed):
   - Click **Add variable** if you have any API keys or secrets
   - For this project, none are required currently

4. Click **Save and Deploy**

### 3. Deployment Process

Cloudflare will:
1. Clone your repository
2. Install dependencies with `npm install`
3. Run the build command `npm run build`
4. Deploy the `.output/public` directory

This usually takes 2-5 minutes.

### 4. Access Your Site

Once deployment is complete:
- Your site will be available at: `https://maher-khatib-property.pages.dev`
- You can also add a custom domain in the Cloudflare Pages settings

## Automatic Deployments

Every time you push to the `main` branch on GitHub, Cloudflare will automatically rebuild and redeploy your site.

## Custom Domain Setup (Optional)

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `maherkhatib.com`)
4. Follow the DNS configuration instructions
5. Cloudflare will automatically provision an SSL certificate

## Build Configuration Details

The project uses:
- **Framework**: TanStack Start with React
- **Build system**: Vite + Nitro
- **Target**: Cloudflare Workers (already configured in vite.config.ts)
- **SSR**: Server-side rendering enabled
- **Output**: Static files + edge functions in `.output/public`

## Troubleshooting

### Build fails
- Check the build logs in Cloudflare dashboard
- Ensure all dependencies are in `package.json`
- Verify the build command works locally: `npm run build`

### Site not loading
- Check the build output directory is correct: `.output/public`
- Verify the production build works locally: `npm run preview`

### Environment issues
- Add any missing environment variables in Cloudflare Pages settings
- Ensure compatibility_date in wrangler.toml matches your needs

## Support

For issues specific to:
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **TanStack Start**: https://tanstack.com/start/latest
