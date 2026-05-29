# Syntra Refining - Complete Deployment Guide (Dashboard Only)

This guide provides step-by-step instructions for deploying the unified forms system using **ONLY the Supabase Web Dashboard**. No CLI access required.

---

## Overview

You will deploy:
1. Database tables and security policies (SQL Editor)
2. Storage bucket for resume uploads (Storage UI)
3. Edge Function for email routing (Functions UI)
4. Frontend JavaScript modules (upload to hosting)

**Total Time:** 30-45 minutes
**Required Access:** Supabase Dashboard, hosting platform (for static files)

---

## Prerequisites

Before you begin, ensure you have:
- [ ] Access to Supabase Dashboard (https://supabase.com/dashboard)
- [ ] Project created: `syntrarefining` or equivalent
- [ ] Admin access to the project
- [ ] Resend API key (for email notifications) - sign up at https://resend.com
- [ ] Hosting platform access (Netlify, Vercel, GitHub Pages, etc.)

---

## Part 1: Database Setup (SQL Editor)

### Step 1.1: Open SQL Editor

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"** button

### Step 1.2: Run Migration Script

1. Open the file `SYNTRA_FORMS_COMPLETE_MIGRATION.sql` in this repository
2. Copy the **entire contents** of the file
3. Paste into the SQL Editor
4. Click **"Run"** (or press Cmd+Enter / Ctrl+Enter)

### Step 1.3: Verify Migration

Run these verification queries in the SQL Editor:

```sql
-- Check if table exists
SELECT COUNT(*) as total_rows FROM public.form_submissions;

-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'form_submissions';

-- Check policies
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'form_submissions';
```

**Expected Results:**
- `total_rows`: 0 (or more if you included test data)
- `rowsecurity`: true
- 4 policies: INSERT (anon), SELECT (authenticated), UPDATE (authenticated), DELETE (authenticated)

---

## Part 2: Storage Bucket Setup (Dashboard UI)

### Step 2.1: Create Bucket

1. In Supabase Dashboard, click **"Storage"** in left sidebar
2. Click **"New bucket"** button
3. Fill in:
   - **Name:** `career-applications`
   - **Public bucket:** ☐ Unchecked (leave unchecked for private)
   - **File size limit:** `5242880` (5 MB in bytes)
4. Click **"Create bucket"**

### Step 2.2: Create Upload Policy (Anonymous Users)

1. Click on the `career-applications` bucket
2. Go to **"Policies"** tab
3. Click **"New policy"**
4. Select **"For full customization"**
5. Fill in:

**Policy Name:**
```
Allow anonymous resume uploads
```

**Allowed operation:**
- ☑ INSERT

**Policy definition (using):**
```sql
true
```

**Policy definition (with check):**
```sql
(bucket_id = 'career-applications'::text)
AND (LOWER((storage.foldername(name))[1]) = 'resumes')
AND (
  LOWER(storage.extension(name)) = 'pdf'
  OR LOWER(storage.extension(name)) = 'doc'
  OR LOWER(storage.extension(name)) = 'docx'
)
```

**Target roles:**
- ☑ `anon`
- ☑ `authenticated`

6. Click **"Save policy"**

### Step 2.3: Create Download Policy (Authenticated Users)

1. Click **"New policy"** again
2. Select **"For full customization"**
3. Fill in:

**Policy Name:**
```
Allow authenticated users to download resumes
```

**Allowed operation:**
- ☑ SELECT

**Policy definition (using):**
```sql
(auth.role() = 'authenticated')
```

**Leave WITH CHECK empty**

**Target roles:**
- ☑ `authenticated`

4. Click **"Save policy"**

### Step 2.4: Verify Storage

Test upload (optional):
1. Click on the bucket
2. Click **"Upload file"**
3. Create a folder called `resumes`
4. Upload a test PDF file

---

## Part 3: Edge Function Deployment (Dashboard UI)

### Step 3.1: Configure Resend API Key

1. In Supabase Dashboard, go to **"Project Settings"** (gear icon, bottom left)
2. Click **"Edge Functions"** in the left menu
3. Scroll to **"Function Secrets"**
4. Click **"Add new secret"**
5. Fill in:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (get from https://resend.com/api-keys)
6. Click **"Save"**

### Step 3.2: Deploy Edge Function

**IMPORTANT:** Since you cannot use the CLI, you have two options:

#### Option A: Use Supabase Dashboard UI (if available)

1. Go to **"Edge Functions"** in left sidebar
2. Click **"Deploy new function"**
3. Enter:
   - **Function name:** `send-form-notification`
   - **Region:** Choose closest to your users
4. Upload the function code:
   - Copy contents of `supabase/functions/send-form-notification/index.ts`
   - Paste into the editor
5. Click **"Deploy"**

#### Option B: GitHub Integration (Recommended)

1. Connect your repository to Supabase:
   - Go to **"Project Settings"** → **"Integrations"**
   - Connect GitHub repository
2. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add unified forms system"
   git push origin main
   ```
3. Supabase will automatically deploy functions from `supabase/functions/` directory

#### Option C: Manual API Deployment

Use this curl command to deploy via Supabase Management API:

```bash
curl -X POST 'https://api.supabase.com/v1/projects/{project-ref}/functions/send-form-notification' \
  -H "Authorization: Bearer {access-token}" \
  -H "Content-Type: application/json" \
  -d '{
    "entrypoint_path": "index.ts",
    "verify_jwt": false,
    "import_map": false,
    "slug": "send-form-notification",
    "name": "send-form-notification"
  }'
```

Replace `{project-ref}` and `{access-token}` with your values.

### Step 3.3: Configure Function Settings

1. Go to **"Edge Functions"** → `send-form-notification`
2. Click **"Settings"**
3. Ensure:
   - **Verify JWT:** ☐ Unchecked (allow anonymous calls)
   - **Import map:** Not required
4. Note the **Function URL** - you'll need this for testing

### Step 3.4: Test Edge Function

Run this in your browser console (on your site):

```javascript
const { data, error } = await window.syntraSupabase.functions.invoke('send-form-notification', {
  body: {
    formType: 'partner_inquiry',
    referenceId: 'SR-REQ-TEST-001',
    formData: {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      organization: 'Test Company',
      message: 'This is a test submission'
    }
  }
});

console.log('Result:', data, error);
```

**Expected:** You should receive a test email at the configured destination.

---

## Part 4: Frontend Deployment

### Step 4.1: Upload JavaScript Modules

Upload these files to your hosting platform:

```
/js/supabase-client.js
/js/syntra-forms.js
```

**For Netlify/Vercel:**
- Simply commit these files to your repository
- They'll be deployed automatically with your site

**For GitHub Pages:**
```bash
git add js/
git commit -m "Add form submission modules"
git push origin main
```

**For traditional hosting (FTP):**
- Upload `js/` folder to your web root
- Ensure files are accessible at `https://yoursite.com/js/supabase-client.js`

### Step 4.2: Include Scripts in HTML Pages

Add these script tags to **every page with a form**, before the closing `</body>` tag:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Syntra Supabase Client -->
<script src="/js/supabase-client.js"></script>

<!-- Syntra Forms Handler -->
<script src="/js/syntra-forms.js"></script>

<!-- Initialize forms -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize your forms here (see examples below)
  });
</script>
```

### Step 4.3: Initialize Forms

For each form on each page, add initialization code. See `FORM_IMPLEMENTATION_GUIDE.md` for complete examples.

**Example - Partner Form (index.html):**

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('partnerForm', {
      formType: 'partner_inquiry'
    });
  });
</script>
```

**Example - Career Form (careers.html):**

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('applicationForm', {
      formType: 'career_application',
      hasFileUpload: true,
      fileInputId: 'resume'
    });
  });
</script>
```

---

## Part 5: Testing

### Step 5.1: Local Testing

**CRITICAL:** Forms will NOT work with `file://` protocol. Use a local server:

```bash
# Option 1: Vite (if you have package.json)
npm run dev

# Option 2: Python
python -m http.server 8000

# Option 3: Node.js http-server
npx http-server -p 8000
```

Visit `http://localhost:8000`

### Step 5.2: Test Each Form

For **each form** on the site:

1. **Fill out form** with test data
2. **Click submit**
3. **Verify:**
   - ✅ Button shows "SUBMITTING..." state
   - ✅ Success message displays with reference ID (e.g., SR-REQ-000001)
   - ✅ No JavaScript errors in console

4. **Check database:**
   - Go to Supabase Dashboard → **"Table Editor"** → `form_submissions`
   - Find your test submission
   - Verify all fields are populated correctly

5. **Check email:**
   - Check the destination email inbox
   - Verify email was received
   - Verify correct routing (e.g., career applications → careers@syntrarefining.com)

6. **Test file upload** (career form only):
   - Submit with a PDF resume
   - Check `additional_data` column for `resume_url`
   - Verify file exists in Storage → `career-applications` → `resumes/`

### Step 5.3: Test Error Handling

1. Disconnect from internet (or use browser DevTools to simulate offline)
2. Try to submit a form
3. **Verify:** Error message displays
4. Reconnect and verify form can now submit

---

## Part 6: Production Deployment

### Step 6.1: Deploy to Production

**For Netlify:**
```bash
netlify deploy --prod
```

**For Vercel:**
```bash
vercel --prod
```

**For GitHub Pages:**
```bash
git push origin main
# Wait for GitHub Actions to complete
```

**For traditional hosting:**
- Upload all files via FTP/SFTP
- Ensure permissions are correct (644 for files, 755 for directories)

### Step 6.2: Test Production Site

Visit your production URL and test:
- [ ] All forms submit successfully
- [ ] Database records created
- [ ] Emails sent to correct addresses
- [ ] File uploads work (career form)
- [ ] Forms work on mobile devices
- [ ] Forms work in all major browsers (Chrome, Firefox, Safari, Edge)

### Step 6.3: Monitor Submissions

1. Bookmark admin dashboard: `https://yourdomain.com/admin.html`
2. Check Supabase Dashboard → **"Table Editor"** → `form_submissions`
3. Monitor email inbox for notifications
4. Check Supabase Dashboard → **"Edge Functions"** → Logs for any errors

---

## Troubleshooting

### Issue: "syntraSupabase is not defined"

**Cause:** Scripts not loaded in correct order

**Solution:**
1. Ensure Supabase SDK loads first
2. Then supabase-client.js
3. Then syntra-forms.js
4. Then your initialization code

### Issue: Form submits but no database entry

**Cause:** RLS policy blocking insert

**Solution:**
1. Check SQL Editor: `SELECT * FROM pg_policies WHERE tablename = 'form_submissions';`
2. Verify INSERT policy exists for `anon` role
3. Check that policy has WITH CHECK (true)

### Issue: "new row violates row-level security policy"

**Cause:** Sequence permissions not granted

**Solution:**
Run in SQL Editor:
```sql
GRANT USAGE ON SEQUENCE public.form_submissions_ref_seq TO anon;
GRANT INSERT ON TABLE public.form_submissions TO anon;
```

### Issue: File upload fails (career form)

**Cause:** Storage policy blocking upload

**Solution:**
1. Check Storage → career-applications → Policies
2. Verify INSERT policy exists for `anon`
3. Verify WITH CHECK validates file type and folder
4. Check file is under 5MB and correct type (PDF/DOC/DOCX)

### Issue: Email not received

**Cause:** Edge function error or Resend API issue

**Solution:**
1. Check Edge Functions → send-form-notification → Logs
2. Verify RESEND_API_KEY is set correctly
3. Check Resend dashboard for delivery status
4. Verify email addresses are valid
5. Check spam folder

### Issue: CORS errors

**Cause:** Edge function CORS headers missing

**Solution:**
Edge function already includes CORS headers. If you still see errors:
1. Check Edge Function → Settings
2. Verify "Verify JWT" is unchecked
3. Check browser console for specific CORS error

---

## Post-Deployment Checklist

- [ ] Database table created with correct schema
- [ ] RLS policies enabled and tested
- [ ] Storage bucket created with correct policies
- [ ] Edge function deployed and accessible
- [ ] Resend API key configured
- [ ] JavaScript modules uploaded to hosting
- [ ] All HTML pages include script tags
- [ ] All forms initialized with correct configuration
- [ ] Tested all 8 forms end-to-end
- [ ] Verified email routing to correct addresses
- [ ] Tested file upload on career form
- [ ] Tested error handling
- [ ] Tested on mobile devices
- [ ] Tested in all major browsers
- [ ] Admin dashboard accessible
- [ ] Monitored first few real submissions

---

## Maintenance

### Daily
- Check email inbox for form notifications
- Review admin dashboard for new submissions

### Weekly
- Check Supabase Dashboard → Table Editor for submission count
- Review Edge Function logs for errors

### Monthly
- Audit storage usage (resume files)
- Review and clean up old submissions if needed
- Check Resend usage and costs

---

## Support Resources

- **Supabase Documentation:** https://supabase.com/docs
- **Resend Documentation:** https://resend.com/docs
- **Forms Implementation Guide:** See `FORM_IMPLEMENTATION_GUIDE.md`
- **Storage Setup:** See `STORAGE_BUCKET_SETUP.md`
- **Forms Inventory:** See `FORMS_INVENTORY.md`

---

## Success Criteria

✅ **Deployment is successful when:**

1. All 8 forms submit without errors
2. Database entries created with reference IDs
3. Emails sent to correct destinations
4. File uploads work (career form)
5. Admin dashboard displays submissions
6. No JavaScript console errors
7. Forms work on production URL
8. Mobile responsive
9. Cross-browser compatible

---

**Deployment Complete!** Your unified form system is now live.

For questions or issues, refer to the troubleshooting section or check Supabase Dashboard logs.
