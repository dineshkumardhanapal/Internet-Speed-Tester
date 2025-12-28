# Deploying to Netlify

This guide will help you deploy your Next.js Internet Speed Test application to Netlify.

## Prerequisites

- A GitHub account with the repository pushed
- A Netlify account (free tier works fine)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Sign in to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign in with your GitHub account

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub repositories

3. **Select Repository**
   - Find and select `Internet-Speed-Tester` repository
   - Click "Connect"

4. **Configure Build Settings**
   Netlify should auto-detect Next.js, but verify these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (or leave empty - the plugin handles it)
   - **Base directory:** Leave empty (or `Internet-Speed-Tester-main` if needed)

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 2-5 minutes)

6. **Configure Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain if you have one

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   cd Internet-Speed-Tester-main
   netlify init
   ```
   - Follow the prompts to link to an existing site or create a new one

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Build Settings Summary

- **Framework preset:** Next.js
- **Build command:** `npm run build`
- **Publish directory:** `.next` (handled by @netlify/plugin-nextjs)
- **Node version:** 18 (configured in netlify.toml)

## Important Notes

1. **Netlify Next.js Plugin**: The `@netlify/plugin-nextjs` plugin is included in devDependencies and will be automatically installed during build.

2. **Environment Variables**: If you need to add environment variables:
   - Go to Site settings → Environment variables
   - Add any required variables

3. **Build Time**: First build may take 3-5 minutes. Subsequent builds are faster.

4. **Automatic Deployments**: Once connected to GitHub, Netlify will automatically deploy on every push to the main branch.

## Troubleshooting

### Build Fails
- Check the build logs in Netlify dashboard
- Ensure Node version is 18 or higher
- Verify all dependencies are in package.json

### 404 Errors
- The Netlify Next.js plugin should handle routing automatically
- Check that `netlify.toml` is in the root directory

### Performance Issues
- Enable Netlify's Edge Functions if needed
- Check build logs for optimization suggestions

## Post-Deployment

After successful deployment:
1. Your site will be available at `https://your-site-name.netlify.app`
2. Update your README.md with the new live URL
3. Test all pages to ensure everything works correctly

## Support

For more help, visit:
- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Support](https://www.netlify.com/support/)
