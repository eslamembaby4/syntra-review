# Deployment Guide

This guide will help you deploy your application to platforms like Vercel, Netlify, GitHub Pages, or your own server.

## Prerequisites

Before deploying, make sure you have:
- Node.js 18+ installed
- A Supabase account and project
- Git installed (for GitHub)

## Step 1: Set Up Your Supabase Project

Your Supabase database is already configured at:
- **Project URL**: https://rhwsiuchfmtbpeljaaoj.supabase.co
- **Project Reference**: rhwsiuchfmtbpeljaaoj

You can continue using this project or create a new one:

1. Go to https://supabase.com/dashboard
2. If creating a new project, copy your database schema:
   - Go to SQL Editor
   - Run all migrations from `supabase/migrations/` folder in order
3. Copy your API keys from **Settings > API**:
   - Project URL
   - Anon/Public Key

## Step 2: Configure Environment Variables

### For Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### For Production Deployment

**IMPORTANT**: The `supabase-client.js` file contains hardcoded credentials. Before pushing to GitHub:

1. Open `supabase-client.js`
2. Replace the hardcoded values with your credentials:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```

**Note**: The anon key is safe to expose in client-side code as it's protected by Row Level Security (RLS) policies.

## Step 3: Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```

**Security Check**: Make sure `.env` is in `.gitignore` so your local environment variables are never committed!

## Step 4: Deploy to Your Platform

### Option A: Vercel (Recommended)

1. Go to https://vercel.com
2. Click "Import Project"
3. Connect your GitHub repository
4. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option B: Netlify

1. Go to https://netlify.com
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings
6. Deploy!

### Option C: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages in your repository settings

### Option D: Your Own Server

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder to your server

3. Configure your web server (Nginx/Apache) to serve the files

## Step 5: Configure Edge Functions (Optional)

If you want email notifications to work:

1. In your Supabase dashboard, go to **Edge Functions**
2. The function `send-form-notification` should already be deployed
3. If not, deploy it using the Supabase CLI or dashboard
4. Update the function with your email routing logic

## Step 6: Test Your Deployment

1. Visit your deployed URL
2. Test each form:
   - Supplier form: `/supplier.html`
   - Investor form: `/investor.html`
   - Career form: `/careers.html`
   - Observer form: `/observer.html`

3. Check your Supabase dashboard to verify submissions are being saved

## Database Access

You can access your database in several ways:

### Supabase Dashboard (Easiest)
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Table Editor**
4. View the `form_submissions` table

### SQL Editor
1. Go to **SQL Editor** in Supabase Dashboard
2. Run queries like:
   ```sql
   SELECT * FROM form_submissions ORDER BY created_at DESC;
   ```

### Direct Database Connection
Use tools like TablePlus, DBeaver, or pgAdmin:
```
postgresql://postgres:[PASSWORD]@db.rhwsiuchfmtbpeljaaoj.supabase.co:5432/postgres
```

Get your password from **Settings > Database > Connection string**

## Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify Supabase credentials in `supabase-client.js`
- Check that `.env` variables are set correctly
- Verify RLS policies are enabled in Supabase

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Database connection issues
- Verify your Supabase project is active
- Check that API keys are correct
- Ensure RLS policies allow anonymous inserts

## Support

For issues specific to:
- **Supabase**: https://supabase.com/docs
- **Vite**: https://vitejs.dev/guide/
- **React**: https://react.dev/

## Security Notes

- ✅ `.env` is in `.gitignore` - local secrets are protected
- ✅ Anon key is safe to expose (protected by RLS)
- ✅ All tables have Row Level Security enabled
- ⚠️ Never commit your `.env` file
- ⚠️ Never expose your Service Role key in client code
