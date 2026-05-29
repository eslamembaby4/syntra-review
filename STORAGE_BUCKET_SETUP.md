# Supabase Storage Bucket Setup Guide

This document provides step-by-step instructions for creating the `career-applications` storage bucket using **Supabase Web Dashboard only** (no CLI required).

---

## Storage Bucket: `career-applications`

### Purpose
Store resume/CV files uploaded via the Careers application form.

### File Specifications
- **Allowed MIME types:** `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- **Max file size:** 5 MB
- **Naming convention:** `{timestamp}-{reference_id}-{original_filename}`

---

## Setup Instructions

### Step 1: Navigate to Storage

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `syntrarefining`
3. Click **Storage** in the left sidebar

### Step 2: Create New Bucket

1. Click the **"New bucket"** button (top right)
2. Fill in the bucket details:
   - **Name:** `career-applications`
   - **Public bucket:** ☐ **Unchecked** (private bucket)
   - **File size limit:** `5242880` bytes (5 MB)
   - **Allowed MIME types:** Leave blank for now (will configure via policies)

3. Click **"Create bucket"**

### Step 3: Configure Bucket Policies

#### Policy 1: Allow Anonymous Uploads (INSERT)

This policy allows anyone to upload files (needed for public career form).

1. Click on the `career-applications` bucket
2. Go to the **"Policies"** tab
3. Click **"New policy"**
4. Select **"For full customization"** (not a template)
5. Fill in the policy:

**Policy Name:**
```
Allow anonymous resume uploads
```

**Allowed operation:**
- ☑ INSERT

**Policy definition (USING expression):**
```sql
true
```

**WITH CHECK expression:**
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

#### Policy 2: Allow Authenticated Users to Read Files (SELECT)

This policy allows authenticated admin users to download/view uploaded resumes.

1. Click **"New policy"** again
2. Select **"For full customization"**
3. Fill in the policy:

**Policy Name:**
```
Allow authenticated users to download resumes
```

**Allowed operation:**
- ☑ SELECT

**Policy definition (USING expression):**
```sql
(auth.role() = 'authenticated')
```

**WITH CHECK expression:**
```
Leave empty
```

**Target roles:**
- ☑ `authenticated`

4. Click **"Save policy"**

---

## Folder Structure

Files should be organized in the bucket as follows:

```
career-applications/
└── resumes/
    ├── 1735651200000-SR-REQ-000001-john-doe-resume.pdf
    ├── 1735651300000-SR-REQ-000002-jane-smith-cv.pdf
    └── ...
```

All files must be uploaded to the `resumes/` folder (enforced by policy).

---

## Verification

### Test Upload (via JavaScript Console)

After setting up the bucket and policies, test the upload functionality:

```javascript
// In browser console on your site
const supabase = window.supabase.createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_ANON_KEY'
);

const testFile = new File(['test content'], 'test-resume.pdf', { type: 'application/pdf' });

const { data, error } = await supabase.storage
  .from('career-applications')
  .upload(`resumes/test-${Date.now()}.pdf`, testFile);

if (error) {
  console.error('Upload failed:', error);
} else {
  console.log('Upload successful:', data);
}
```

### Check Files in Dashboard

1. Go to **Storage** → `career-applications` bucket
2. Navigate to the `resumes/` folder
3. You should see uploaded files listed

---

## Getting File URLs

### For Admin Download (Authenticated)

```javascript
const { data } = supabase.storage
  .from('career-applications')
  .getPublicUrl('resumes/filename.pdf');

console.log(data.publicUrl); // Use this URL for download links
```

### For Signed URLs (Temporary Access)

If you want time-limited access URLs:

```javascript
const { data, error } = await supabase.storage
  .from('career-applications')
  .createSignedUrl('resumes/filename.pdf', 3600); // Valid for 1 hour

console.log(data.signedUrl);
```

---

## Troubleshooting

### Issue: "new row violates row-level security policy"

**Solution:** Make sure both policies are created and enabled. Check that:
- Policy 1 allows `anon` role to INSERT
- WITH CHECK clause correctly validates file type and folder

### Issue: File upload succeeds but file not visible

**Solution:** Check that the file is in the `resumes/` folder. The policy requires files to be in this subfolder.

### Issue: Cannot download files in admin

**Solution:** Ensure you're logged in as an authenticated user and Policy 2 (SELECT for authenticated) is enabled.

---

## Security Notes

1. **Private Bucket:** Files are NOT publicly accessible by default
2. **Anonymous Upload:** Only anonymous users can upload (not download)
3. **Admin Access:** Only authenticated users can view/download files
4. **File Type Validation:** Only PDF, DOC, DOCX files are allowed
5. **Size Limit:** 5 MB max per file
6. **Folder Enforcement:** All files must be in `resumes/` subfolder

---

## Alternative: Public Bucket (Not Recommended)

If you want resumes to be publicly accessible (not recommended for privacy):

1. Edit the bucket settings
2. Check ☑ **"Public bucket"**
3. Update policies to allow public SELECT

**Warning:** This makes all resume files publicly accessible via direct URL. Only use if you have a specific requirement for public access.

---

## Next Steps

After setting up the storage bucket:

1. ✅ Deploy the form submission JavaScript handlers
2. ✅ Test career application form with file upload
3. ✅ Verify files appear in admin dashboard
4. ✅ Test download functionality for authenticated users

---

**Setup Complete!** Your `career-applications` storage bucket is now ready to receive resume uploads from the Careers page.
