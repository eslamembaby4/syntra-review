# Database Setup Guide

This guide explains how to connect your own Supabase database to the Syntra Refining forms system.

## Overview

The forms system uses **Supabase** (PostgreSQL database) to:
- Store all form submissions
- Send email notifications via Edge Functions
- Provide an admin dashboard to view submissions

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com/signup](https://supabase.com/signup)
2. Create a free account (no credit card required)
3. Verify your email address

## Step 2: Create a New Project

1. Click **"New Project"** in your Supabase dashboard
2. Enter project details:
   - **Name**: Syntra Refining Forms
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

## Step 3: Get Your Database Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. You'll need two values:
   - **Project URL**: Looks like `https://abcdefghijklmnop.supabase.co`
   - **anon/public key**: Long string starting with `eyJhbGci...`

⚠️ **Important**: Use the **anon** key, NOT the service_role key. The anon key is safe for client-side use.

## Step 4: Configure Your Website

### Option 1: Edit the Config File (Recommended)

Edit the file `/js/syntra-config.js`:

```javascript
window.SYNTRA_CONFIG = {
  supabaseUrl: 'https://YOUR-PROJECT-ID.supabase.co',
  supabaseKey: 'eyJhbGci...' // Your anon key here
};
```

### Option 2: Use Environment Variables

If using a build system, update your `.env` file:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

## Step 5: Run Database Migrations

You need to create the database schema. The migrations are located in `supabase/migrations/`.

### Method 1: Using Supabase Dashboard

1. Go to your project dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order:
   - `20251231084533_create_form_submissions.sql`
   - `20251231085358_expand_form_submissions_types_v2.sql`
   - `20251231101518_create_career_applications_storage.sql`
   - `20251231101846_fix_security_issues.sql`
   - And all other files in chronological order...

### Method 2: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR-PROJECT-ID

# Run migrations
supabase db push
```

## Step 6: Deploy Edge Function

The email notification system uses an Edge Function. Deploy it using the Supabase dashboard:

1. Go to **Edge Functions** in your project
2. Create a new function named `send-form-notification`
3. Copy the contents from `supabase/functions/send-form-notification/index.ts`
4. Deploy the function
5. Set JWT verification to **OFF**

Or use the CLI:

```bash
supabase functions deploy send-form-notification --no-verify-jwt
```

## Step 7: Configure Email Notifications

See [EMAIL_SETUP.md](EMAIL_SETUP.md) for detailed instructions on setting up Resend for email notifications.

Quick steps:
1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key
3. Add it as a secret in Supabase: **Edge Functions** > **Secrets** > Add `RESEND_API_KEY`

## Database Schema Overview

The system uses one main table:

### `form_submissions` Table

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Auto-incrementing primary key |
| form_type | text | Type of form (partner_inquiry, etc.) |
| first_name | text | Required - User's first name |
| last_name | text | Optional - User's last name |
| email | text | Required - User's email |
| phone | text | Optional - Phone number |
| organization | text | Required - Company/organization |
| interest_type | text | Required - What they're interested in |
| message | text | Optional - Additional message |
| additional_data | jsonb | Any extra form fields |
| status | text | pending, reviewed, or archived |
| created_at | timestamp | Auto-set on creation |

## Verify Setup

Test your configuration:

1. Open your website in a browser
2. Open browser console (F12)
3. Look for:
   ```
   [Syntra Config] Configuration loaded: {url: "...", keyPrefix: "..."}
   [Syntra Forms] Supabase client initialized
   [Syntra Forms] Initializing N form(s)...
   ```

4. Submit a test form
5. Check:
   - Console shows "Form submitted successfully"
   - Form displays green success message with reference ID
   - Submission appears in admin dashboard (`/admin.html`)
   - Email notification received (if configured)

## Troubleshooting

### "Supabase client not initialized"
- Check that syntra-config.js loads before supabase-client.js
- Verify your URL and key are correct in syntra-config.js

### "Failed to submit form to database"
- Check browser console for specific error
- Verify migrations ran successfully
- Check Row Level Security policies are correct

### Database permissions error
- Ensure RLS is disabled for testing: `ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;`
- Or ensure proper RLS policies are in place for production

### Admin dashboard shows no data
- Check database has submissions: Go to **Table Editor** > `form_submissions`
- Verify supabase-client.js is using correct credentials
- Check browser console for errors

## Security Best Practices

1. **Row Level Security**: For production, enable RLS and create proper policies
2. **API Keys**: Never commit the service_role key to version control
3. **Email Routing**: Verify EMAIL_ROUTES in edge function matches your needs
4. **CORS**: Edge function has CORS enabled - restrict origins in production if needed

## Need Help?

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Support**: [support@supabase.com](mailto:support@supabase.com)
- **Community**: [https://discord.supabase.com](https://discord.supabase.com)

## Summary Checklist

- [ ] Created Supabase account and project
- [ ] Got Project URL and anon key
- [ ] Updated `/js/syntra-config.js` with credentials
- [ ] Ran all database migrations
- [ ] Deployed `send-form-notification` edge function
- [ ] Configured Resend API key for emails
- [ ] Tested form submission
- [ ] Verified admin dashboard works
- [ ] Email notifications working
