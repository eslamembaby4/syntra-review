# Quick GitHub Setup Guide

Follow these steps to push your code to GitHub and deploy it.

## Step 1: Prepare Your Code

The project is already configured for GitHub with:
- ✅ `.gitignore` includes `.env` (your secrets are protected)
- ✅ `.env.example` shows what variables are needed
- ✅ All dependencies are in `package.json`

## Step 2: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: Complete form submission system with Supabase"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (public or private)
3. **DO NOT** initialize with README, .gitignore, or license

## Step 4: Push to GitHub

Replace `yourusername` and `your-repo` with your actual GitHub username and repository name:

```bash
# Add GitHub as remote
git remote add origin https://github.com/yourusername/your-repo.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Verify Your Push

1. Go to your GitHub repository
2. Verify all files are there
3. **Important**: Check that `.env` is NOT in the repository (it should be ignored)
4. Confirm `.env.example` IS in the repository

## Step 6: Deploy (Choose One)

### Option A: Vercel (Easiest)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Import Project" and select your repository
4. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://rhwsiuchfmtbpeljaaoj.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Click "Deploy"

### Option B: Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Select your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in deploy settings
6. Click "Deploy"

### Option C: Keep Using Current Supabase Database

You can continue using the existing database at:
- **URL**: https://rhwsiuchfmtbpeljaaoj.supabase.co
- **Project**: rhwsiuchfmtbpeljaaoj

Just make sure to:
1. Update `supabase-client.js` with your credentials (already done)
2. Set environment variables in your deployment platform

### Option D: Create New Supabase Project

If you want a fresh database:

1. Go to https://supabase.com/dashboard
2. Create new project
3. Run migrations:
   - Go to SQL Editor
   - Copy and run each file from `supabase/migrations/` in order
4. Deploy edge function:
   - Go to Edge Functions
   - Deploy `send-form-notification` from `supabase/functions/`
5. Update your credentials everywhere

## What Gets Deployed

Your deployment includes:
- ✅ Main landing page (`index.html`)
- ✅ Supplier form (`supplier.html`)
- ✅ Investor form (`investor.html`)
- ✅ Career applications form (`careers.html`)
- ✅ Observer form (`observer.html`)
- ✅ Admin dashboard (`admin.html`)
- ✅ Privacy & Terms pages
- ✅ Database with form submissions table
- ✅ Email notification system (Edge Function)

## Testing Your Deployment

After deployment:

1. Visit your deployed URL
2. Test a form submission
3. Check Supabase dashboard to see the submission
4. Verify reference ID is generated (SR-REQ-XXXXXX)

## Database Access

Access your submissions at:
https://supabase.com/dashboard/project/rhwsiuchfmtbpeljaaoj/editor

Or use SQL Editor:
```sql
SELECT * FROM form_submissions ORDER BY created_at DESC;
```

## Troubleshooting

**"Failed to submit form"**
- Check browser console for errors
- Verify Supabase credentials are correct
- Check that RLS policies are enabled

**Build fails**
- Run `npm install` first
- Check Node.js version (need 18+)
- Try `npm run build` locally first

**Forms work locally but not in production**
- Verify environment variables are set in deployment platform
- Check `supabase-client.js` has correct credentials
- Ensure Supabase project is active

## Need Help?

Check the full deployment guide: `DEPLOYMENT_GUIDE.md`

## Security Checklist

Before pushing to GitHub:
- ✅ `.env` is in `.gitignore`
- ✅ No secrets in source code
- ✅ Only anon key is exposed (safe)
- ✅ All tables have RLS enabled
- ✅ Edge function uses secure authentication

You're all set! 🚀
