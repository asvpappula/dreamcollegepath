# Vercel Deployment Troubleshooting Guide

## Common Issues and Solutions for Blank Screen

### 1. Build Configuration Issues

**Problem**: Vercel shows a blank screen after deployment

**Solutions**:

#### A. Check Build Output
- Ensure `dist` folder is created during build
- Verify `index.html` exists in the build output
- Check that JavaScript and CSS files are properly referenced

#### B. Update vercel.json
Make sure your `vercel.json` has proper routing:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. Environment Variables

**Problem**: App loads but functionality doesn't work

**Check these in Vercel Dashboard**:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `NODE_ENV=production`
- `FRONTEND_URL` (your Vercel app URL)

### 3. Build Logs Analysis

**How to check**:
1. Go to Vercel Dashboard
2. Click on your deployment
3. Go to "Functions" or "Build Logs"
4. Look for errors

**Common errors**:
- Missing dependencies
- TypeScript compilation errors
- Environment variable issues
- Build timeout

### 4. Local Testing

**Test build locally**:
```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Or serve the dist folder
npx serve dist
```

### 5. React Router Issues

**Problem**: Routes don't work (404 on refresh)

**Solution**: Ensure your `vercel.json` has the catch-all route:
```json
{
  "src": "/(.*)",
  "dest": "/index.html"
}
```

### 6. Asset Loading Issues

**Problem**: CSS/JS files not loading

**Solutions**:
- Check if assets are in the correct path
- Verify base URL in `vite.config.ts`
- Ensure proper MIME types

### 7. Console Errors

**How to debug**:
1. Open browser developer tools
2. Check Console tab for JavaScript errors
3. Check Network tab for failed requests
4. Look for CORS errors

### 8. Firebase Configuration

**Problem**: Firebase not working in production

**Solutions**:
- Add your Vercel domain to Firebase authorized domains
- Check Firebase project settings
- Verify environment variables are set correctly

### 9. API Routes Not Working

**Problem**: Backend API calls fail

**Solutions**:
- Check if `server/index.js` is properly configured
- Verify CORS settings allow your domain
- Check function logs in Vercel
- Ensure environment variables for backend are set

### 10. Step-by-Step Debugging

1. **Check Build Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the failed deployment
   - Check build logs for errors

2. **Verify Files**:
   - Ensure `dist/index.html` exists
   - Check if JavaScript bundles are created
   - Verify asset paths are correct

3. **Test Locally**:
   ```bash
   npm run build
   npx serve dist
   ```

4. **Check Environment Variables**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Ensure all required variables are set
   - Make sure they're enabled for Production

5. **Redeploy**:
   ```bash
   git add .
   git commit -m "Fix deployment issues"
   git push origin main
   ```

### 11. Quick Fixes

**Try these first**:
1. Clear Vercel build cache and redeploy
2. Check if your domain is correctly configured
3. Verify your Git branch is correct
4. Ensure all dependencies are in `package.json`
5. Check for any console errors in browser

### 12. Getting Help

**If still having issues**:
1. Check Vercel's status page
2. Look at Vercel community forums
3. Check GitHub issues for similar problems
4. Contact Vercel support with:
   - Deployment URL
   - Build logs
   - Error messages
   - Steps to reproduce

---

## Quick Deployment Checklist

- [ ] `vercel.json` configured correctly
- [ ] `package.json` has `vercel-build` script
- [ ] All environment variables set in Vercel
- [ ] Firebase domains updated
- [ ] Build works locally (`npm run build`)
- [ ] No console errors in browser
- [ ] API routes working (if applicable)
- [ ] CORS configured for production domain