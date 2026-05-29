# Forms Database Setup - Complete

## ✅ Database Connection Configured

Your forms are now connected to your Supabase database and ready to receive submissions.

### Database Credentials Updated

**Project Details:**
- Project Name: `eslamembaby4`
- Project ID: `woailjjdiamgvahcxnrj`
- Database URL: `https://woailjjdiamgvahcxnrj.supabase.co`

**Files Updated:**
1. `.env` - Environment variables
2. `js/supabase-client.js` - Database client configuration

---

## 📋 Database Structure

### Table: `form_submissions`

**Required Fields:**
- `form_type` (text) - Type of form submission
- `email` (text) - User's email address

**Optional Fields:**
- `reference_id` (text) - Auto-generated unique reference (e.g., REF-SYN-000001)
- `first_name` (text) - User's first name
- `last_name` (text) - User's last name
- `organization` (text) - Company/organization name
- `company` (text) - Alternative company field
- `phone` (text) - Phone number
- `interest_type` (text) - Type of inquiry
- `message` (text) - Message content
- `additional_data` (jsonb) - Extra data (e.g., resume URLs)
- `read_status` (boolean) - Whether admin has read it (default: false)
- `created_at` (timestamp) - When submission was created
- `updated_at` (timestamp) - Last update time

---

## 🔐 Security Setup

### Row Level Security (RLS) - ENABLED ✓

**Anonymous Users Can:**
- ✅ Insert new form submissions
- ❌ Read submissions (protected)
- ❌ Update submissions (protected)
- ❌ Delete submissions (protected)

**Authenticated Users Can:**
- ✅ View all submissions
- ✅ Update submissions
- ✅ Delete submissions

### Storage Bucket: `career-applications`

**Public Bucket - Configured for resume uploads:**
- Anonymous users can upload files
- Public read access for viewing resumes
- Files stored in `/resumes/` folder

---

## 📝 Forms Currently Active

### 1. Partner Inquiry Form (Modal)
- **Form Type:** `partner_inquiry`
- **Location:** All pages (opens via modal)
- **Trigger:** Click "Send Inquiry" or "Contact Us" buttons
- **Fields:** First Name, Last Name, Organization, Email, Interest Type, Message

### 2. Career Application Form
- **Form Type:** `career_application`
- **Location:** `careers.html`
- **Fields:** All standard fields + Resume upload
- **File Upload:** Resumes stored in `career-applications` bucket

### 3. Additional Forms
The system supports these form types:
- `investor_inquiry`
- `supplier_inquiry`
- `supplier_document`
- `tds_request`
- `sds_inquiry`
- `newsletter`

---

## 🧪 Testing Your Forms

### Test Page Created: `test-db-connection.html`

Visit this page to:
1. Test database connectivity
2. View connection status
3. Submit test forms
4. Verify data is being saved

**How to Access:**
- Development: `http://localhost:5173/test-db-connection.html`
- Production: `https://yoursite.com/test-db-connection.html`

---

## 📊 Viewing Submissions

### Option 1: Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/woailjjdiamgvahcxnrj
2. Click "Table Editor" in sidebar
3. Select `form_submissions` table
4. View all submissions in real-time

### Option 2: SQL Query
```sql
SELECT
  reference_id,
  form_type,
  first_name || ' ' || last_name AS full_name,
  email,
  organization,
  interest_type,
  message,
  created_at
FROM form_submissions
ORDER BY created_at DESC;
```

---

## 🔧 How It Works

### 1. User Fills Out Form
- User enters information on your website
- Form has `data-syntra-form="form_type"` attribute

### 2. Automatic Processing
- `syntra-forms.js` detects form submission
- Validates required fields
- Uploads resume files (if applicable)

### 3. Database Storage
- `supabase-client.js` sends data to database
- Auto-generates reference ID
- Returns confirmation to user

### 4. Email Notification (Optional)
- Sends notification email via Edge Function
- Non-blocking (form succeeds even if email fails)

---

## 🚀 Form Submission Flow

```
User Submits Form
       ↓
Form Validation (client-side)
       ↓
File Upload (if resume)
       ↓
Database Insert (form_submissions)
       ↓
Email Notification (optional)
       ↓
Success Message + Reference ID
```

---

## 🎯 Current Database Status

**Existing Submissions:** 4 test submissions already in database
**Latest Submission:** REF-SYN-000017
**Status:** ✅ Fully operational

---

## 🛠️ Troubleshooting

### Form Not Submitting?

1. **Check Browser Console** - Look for errors
2. **Verify Required Fields** - All required fields must be filled
3. **Check Network Tab** - Look for 400/500 errors
4. **Test Connection** - Visit `test-db-connection.html`

### Common Issues:

**Issue:** "Database connection failed"
- **Solution:** Check if Supabase URL and key are correct in `.env`

**Issue:** "Row level security policy violation"
- **Solution:** RLS policies are already configured correctly

**Issue:** Resume upload failing
- **Solution:** Check file size (max 5MB) and format (PDF, DOC, DOCX only)

---

## 📧 Email Notifications

Email notifications are configured via Edge Function:
- **Function:** `send-form-notification`
- **Status:** Optional (form succeeds even if email fails)
- **Recipients:** Configure in Edge Function settings

To view/edit email notifications:
```bash
# View function
Supabase Dashboard → Edge Functions → send-form-notification
```

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Row Level Security enabled
- Anonymous users can only insert
- Authenticated users manage data
- Input validation on client and server
- File size and type restrictions
- Auto-generated reference IDs

❌ **Do NOT:**
- Expose service role key in frontend
- Allow anonymous users to read submissions
- Store sensitive data without encryption
- Skip input validation

---

## 📈 Next Steps

1. ✅ Database connected and tested
2. ✅ Forms configured and working
3. ✅ Security policies in place
4. ⏭️ Set up email notifications (optional)
5. ⏭️ Create admin dashboard to view submissions
6. ⏭️ Add custom form validation rules
7. ⏭️ Configure automated responses

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Visit the test page to verify connectivity
3. Check Supabase dashboard for RLS policy errors
4. Review the logs in Supabase Dashboard → Logs

---

## ✨ Summary

Your Syntra Refining forms are now:
- ✅ Connected to Supabase database (woailjjdiamgvahcxnrj)
- ✅ Secured with Row Level Security
- ✅ Ready to accept submissions
- ✅ Storing data reliably
- ✅ Auto-generating reference IDs
- ✅ Supporting file uploads (resumes)

**All forms on your website will now save submissions to your database automatically.**
