# Complete Formspree Setup Guide

All forms across the Syntra Refining website now use Formspree for submissions. This guide walks you through setting up each form.

## Why Formspree?

Formspree handles all form submissions without requiring a database or backend code. Benefits include:
- Simple setup - just add form IDs
- Built-in spam protection
- Email notifications
- File upload support (paid plan)
- Form analytics

## Setup Steps

### 1. Create a Formspree Account

1. Go to [formspree.io](https://formspree.io/)
2. Sign up for an account (free plan works for most forms)
3. **Note**: File uploads require a paid plan ($10/month)

### 2. Create Forms in Formspree Dashboard

You need to create **9 separate forms** in your Formspree dashboard. For each form:

1. Click "New Form" in your Formspree dashboard
2. Give it a descriptive name
3. After creation, note the Form ID (looks like `xyzabc123`)
4. The full endpoint will be: `https://formspree.io/f/xyzabc123`

## Forms to Create

### Form 1: Partner Ecosystem Access
**File**: `index.html` (line 1035)
**Form Name**: Partner Ecosystem Access
**Purpose**: Main partner inquiry form for observers, investors, suppliers
**Email Recipient**: commercial@syntrarefining.com

**Fields Collected**:
- First Name, Last Name
- Organization
- Email
- Interest Type (Observer Status, Investor Relations, Supplier/Vendor, etc.)
- Message

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_PARTNER"
```
With your actual form ID.

---

### Form 2: Newsletter Subscription
**File**: `index.html` (line 864)
**Form Name**: Briefing List / Newsletter
**Purpose**: Email list signup for Syntra updates
**Email Recipient**: marketing@syntrarefining.com

**Fields Collected**:
- First Name, Last Name
- Work Email
- Organization
- Primary Interest
- Consent checkbox

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_NEWSLETTER"
```

---

### Form 3: TDS Package Request
**File**: `index.html` (line 1143)
**Form Name**: TDS Package Request
**Purpose**: Technical data sheet requests from customers
**Email Recipient**: commercial@syntrarefining.com

**Fields Collected**:
- First Name, Last Name
- Organization
- Email
- Products of Interest
- Notes / Intended Use

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_TDS"
```

---

### Form 4: SDS / HSE Inquiry
**File**: `index.html` (line 1202)
**Form Name**: HSE Inquiry
**Purpose**: Safety data sheets and environmental inquiries
**Email Recipient**: hse@syntrarefining.com

**Fields Collected**:
- Name
- Company
- Email
- Topic (SDS Request, Handling & Storage, Environmental, Other)
- Message

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_SDS"
```

---

### Form 5: Investor Documents Request
**File**: `index.html` (line 1261)
**Form Name**: Investor Materials Request
**Purpose**: Request access to investor materials and data room
**Email Recipient**: investors@syntrarefining.com

**Fields Collected**:
- Name
- Firm / Organization
- Email
- Role / Title
- Interest Type (Equity Investor, Project Finance, etc.)
- Message / Context

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_INVESTOR_DOCS"
```

---

### Form 6: Career Applications
**File**: `careers.html` (line 437)
**Form Name**: Career Applications
**Purpose**: Job applications for open positions
**Email Recipient**: careers@syntrarefining.com

**Fields Collected**:
- First Name, Last Name
- Email, Phone
- LinkedIn Profile
- **Resume/CV (file upload)** ⚠️ Requires paid plan
- Cover Letter / Why Syntra
- Role (hidden field with job title)

**Important**: File uploads require Formspree Gold plan ($10/month).

**Alternative Options**:
1. Upgrade to paid plan (recommended)
2. Remove file upload and ask candidates to email resumes
3. Replace file input with Google Drive link field

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_CAREERS"
```

**Note**: Form includes `enctype="multipart/form-data"` for file uploads.

---

### Form 7: Investor Relations Inquiry
**File**: `investor.html` (line 237)
**Form Name**: Investor Relations Inquiry
**Purpose**: Initial investor contact and materials request
**Email Recipient**: investors@syntrarefining.com

**Fields Collected**:
- Name
- Email
- Organization / Fund
- Investment Interest (Equity, Project Finance, Strategic Partnership)
- Investment Thesis / Message
- NDA Consent checkbox

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_INVESTOR_RELATIONS"
```

---

### Form 8: Supplier Document Submission
**File**: `supplier.html` (line 220)
**Form Name**: Supplier Document Submission
**Purpose**: Submit specs, assay reports, certifications
**Email Recipient**: commercial@syntrarefining.com

**Fields Collected**:
- Company Name
- Contact Email
- Document Type (Spec Sheet, Assay Report, MSDS, etc.)
- Notes

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_SUPPLIER_DOCS"
```

---

### Form 9: Supplier RFQ Response
**File**: `supplier.html` (line 365)
**Form Name**: Supplier RFQ Response
**Purpose**: Respond to RFQs for feedstock supply
**Email Recipient**: commercial@syntrarefining.com

**Fields Collected**:
- Company Name
- Contact Name, Email, Phone
- Material / Product (pre-filled from RFQ)
- Available Quantity (with unit selector)
- Grade / Specs
- Location / Origin
- Pricing Structure
- Lead Time
- Notes

**Replace**:
```html
action="https://formspree.io/f/YOUR_FORM_ID_SUPPLIER_RFQ"
```

---

## 3. Configure Email Settings in Formspree

For each form in your Formspree dashboard:

1. Click on the form name
2. Go to "Settings" → "Email Notifications"
3. Set the recipient email address:

| Form | Email Recipient |
|------|----------------|
| Partner Ecosystem Access | commercial@syntrarefining.com |
| Newsletter Subscription | marketing@syntrarefining.com |
| TDS Package Request | commercial@syntrarefining.com |
| SDS / HSE Inquiry | hse@syntrarefining.com |
| Investor Documents Request | investors@syntrarefining.com |
| Career Applications | careers@syntrarefining.com |
| Investor Relations Inquiry | investors@syntrarefining.com |
| Supplier Document Submission | commercial@syntrarefining.com |
| Supplier RFQ Response | commercial@syntrarefining.com |

4. Configure the email subject line (optional):
   - Example: `New Submission: [Form Name] - {{name}}`

5. Enable/configure confirmation emails to users (optional):
   - Formspree can send auto-reply emails to form submitters

## 4. Optional: Configure Advanced Settings

### Spam Protection
- **reCAPTCHA**: Enable Google reCAPTCHA in form settings (recommended)
- **Honeypot**: Already enabled by Formspree by default
- **Rate Limiting**: Set max submissions per IP per day

### Custom Success Messages
Formspree redirects to a generic thank-you page by default. Options:

1. **Custom URL**: Redirect to your own success page
   - Add to form: `<input type="hidden" name="_next" value="https://yoursite.com/thank-you" />`

2. **AJAX Submission**: Handle success in JavaScript (advanced)
   - Prevents page reload
   - Show custom success message on same page

### Form Analytics
- View submission counts and trends in Formspree dashboard
- Export submissions as CSV
- Set up webhooks to send data to other services

## 5. Test All Forms

After updating form IDs, test each form:

1. Fill out the form with test data
2. Submit the form
3. Check that:
   - Submission appears in Formspree dashboard
   - Email notification arrives at correct recipient
   - User receives confirmation email (if configured)

## Quick Reference: All Form IDs

Create these 9 forms and replace the placeholders:

1. `YOUR_FORM_ID_PARTNER` → Partner Ecosystem Access
2. `YOUR_FORM_ID_NEWSLETTER` → Newsletter Subscription
3. `YOUR_FORM_ID_TDS` → TDS Package Request
4. `YOUR_FORM_ID_SDS` → SDS/HSE Inquiry
5. `YOUR_FORM_ID_INVESTOR_DOCS` → Investor Documents Request
6. `YOUR_FORM_ID_CAREERS` → Career Applications
7. `YOUR_FORM_ID_INVESTOR_RELATIONS` → Investor Relations Inquiry
8. `YOUR_FORM_ID_SUPPLIER_DOCS` → Supplier Document Submission
9. `YOUR_FORM_ID_SUPPLIER_RFQ` → Supplier RFQ Response

## File Upload Considerations (Career Applications)

The career application form includes file upload for resumes. This requires:

**Formspree Gold Plan** ($10/month):
- Unlimited file uploads
- Up to 10MB per file
- PDF, DOC, DOCX supported

**Free Plan Alternatives**:

### Option 1: Use Google Drive/Dropbox Link
Replace file input with URL input:
```html
<label>Resume/CV Link</label>
<input type="url" name="resumeLink" placeholder="https://drive.google.com/..." required>
<p class="text-xs text-slate-500">Upload your resume to Google Drive or Dropbox and share the link</p>
```

### Option 2: Email Resume Separately
Add instruction text:
```html
<p class="text-sm text-slate-600 bg-blue-50 p-4 rounded">
  Please email your resume to <strong>careers@syntrarefining.com</strong>
  with the subject line: "Resume - [Your Name] - [Position]"
</p>
```

### Option 3: Remove Resume Field
Simply remove the resume input and collect information through cover letter only.

## Pricing

**Formspree Plans**:
- **Free**: 50 submissions/month, no file uploads
- **Gold ($10/month)**: 1,000 submissions/month, file uploads, custom redirects
- **Platinum ($40/month)**: Unlimited submissions, priority support

**Recommendation**: Start with Gold plan ($10/month) if you need file uploads for career applications.

## Troubleshooting

### Form not submitting
- Check that form ID is correct (no typos)
- Verify form method is `POST`
- Check browser console for errors

### Not receiving emails
- Check spam folder
- Verify email address in Formspree settings
- Check form submission in Formspree dashboard

### File uploads not working
- Verify you have Gold plan or higher
- Check form has `enctype="multipart/form-data"`
- Verify file size is under 10MB

### Spam submissions
- Enable reCAPTCHA in Formspree settings
- Set rate limits per IP address
- Use honeypot fields (Formspree includes by default)

## Support

- **Formspree Documentation**: https://help.formspree.io/
- **Formspree Support**: support@formspree.io
- **Formspree Status**: https://status.formspree.io/

---

## Summary

You now have all forms configured to use Formspree:

✅ **index.html**: 5 forms (Partner, Newsletter, TDS, SDS, Investor Docs)
✅ **careers.html**: 1 form (Career Applications with file upload)
✅ **investor.html**: 1 form (Investor Relations)
✅ **supplier.html**: 2 forms (Document Submission, RFQ Response)

**Total**: 9 forms requiring 9 Formspree form IDs

**Next Steps**:
1. Create Formspree account
2. Create 9 forms in dashboard
3. Replace all `YOUR_FORM_ID_*` placeholders with actual form IDs
4. Configure email recipients for each form
5. Test all forms
6. Go live!
