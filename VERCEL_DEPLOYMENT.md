# Deploying to Vercel

This guide will help you deploy your Dream College Path application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository (GitHub, GitLab, or Bitbucket)
3. All environment variables configured

## Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to your Git repository
2. Ensure your `.env` file is NOT committed (it should be in `.gitignore`)

## Step 2: Set Up Environment Variables

You'll need to configure the following environment variables in Vercel:

### Frontend Firebase Config
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Backend Firebase Admin Config
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Azure Table Storage Config
- `AZURE_STORAGE_ACCOUNT`
- `AZURE_STORAGE_KEY`
- `AZURE_TABLE_NAME`

### Auth Server Config
- `SESSION_SECRET`
- `NODE_ENV` (set to "production")
- `PORT` (Vercel will handle this automatically)
- `FRONTEND_URL` (set to your Vercel app URL, e.g., "https://your-app.vercel.app")

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a Vite project
5. Configure your environment variables:
   - Go to "Environment Variables" section
   - Add all the variables listed above
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when prompted

## Step 4: Configure Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add each environment variable:
   - Name: Variable name (e.g., `VITE_FIREBASE_API_KEY`)
   - Value: Your actual value
   - Environment: Select "Production", "Preview", and "Development" as needed

## Step 5: Update Firebase Configuration (if needed)

1. In your Firebase console, add your Vercel domain to:
   - Authentication → Settings → Authorized domains
   - Any other Firebase services you're using

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Test all functionality:
   - User authentication
   - Admin login
   - Database connections
   - File uploads (if any)

## Important Notes

- **Environment Variables**: Make sure all environment variables are properly set in Vercel
- **API Routes**: Your backend API will be available at `https://your-domain.vercel.app/api/*`
- **CORS**: You may need to update CORS settings in your backend to allow your Vercel domain
- **Database**: Ensure your database (Firebase/Azure) allows connections from Vercel's IP ranges

## Troubleshooting

### Build Errors
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation

### Runtime Errors
- Check function logs in Vercel dashboard
- Verify environment variables are set correctly
- Check Firebase/Azure service configurations

### CORS Issues
- Update your backend CORS configuration to include your Vercel domain
- Check Firebase security rules

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Continuous Deployment

Vercel automatically deploys when you push to your main branch. To deploy from a different branch:

1. Go to project settings
2. Navigate to "Git"
3. Change the production branch

Your application should now be live on Vercel! 🚀