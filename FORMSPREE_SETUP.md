# Formspree Integration Setup Guide

Your forms are now configured to use Formspree instead of a database. This is much simpler - no database setup required!

## Setup Steps

### 1. Create a Formspree Account
- Go to [formspree.io](https://formspree.io/)
- Sign up for a free account

### 2. Create Forms in Formspree

You need to create **4 separate forms** in your Formspree dashboard:

#### Form 1: Career Applications
- **Name**: Career Applications
- **Purpose**: Receive job applications from careers.html
- **Note**: File uploads (resume) require a paid Formspree plan ($10/month)
- **Alternative**: Remove file upload field or ask applicants to email resumes separately

#### Form 2: Supplier Documents
- **Name**: Supplier Document Requests
- **Purpose**: Receive document submission requests from supplier.html

#### Form 3: Supplier RFQ Responses
- **Name**: Supplier RFQ Responses
- **Purpose**: Receive RFQ responses from supplier.html

#### Form 4: Investor Inquiries
- **Name**: Investor Inquiries
- **Purpose**: Receive investor inquiries from investor.html

### 3. Get Your Form IDs

After creating each form, Formspree will give you a unique form endpoint like:
```
https://formspree.io/f/xyzabc123
```

The part after `/f/` is your Form ID (e.g., `xyzabc123`)

### 4. Update Your HTML Files

Replace the placeholder `YOUR_FORM_ID` with your actual Form IDs:

#### careers.html
Line 438: Replace `YOUR_FORM_ID` with your Career Applications form ID
```html
<form id="applicationForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### supplier.html
Line 222: Replace `YOUR_FORM_ID_DOCS` with your Supplier Documents form ID
```html
<form action="https://formspree.io/f/YOUR_FORM_ID_DOCS" method="POST">
```

Line 367: Replace `YOUR_FORM_ID_RFQ` with your Supplier RFQ form ID
```html
<form id="rfqResponseForm" action="https://formspree.io/f/YOUR_FORM_ID_RFQ" method="POST">
```

#### investor.html
Line 237: Replace `YOUR_FORM_ID_INVESTOR` with your Investor Inquiries form ID
```html
<form action="https://formspree.io/f/YOUR_FORM_ID_INVESTOR" method="POST">
```

### 5. Configure Email Recipients

In your Formspree dashboard, configure where each form's submissions should be sent:

- **Career Applications** → careers@syntrarefining.com
- **Supplier Documents** → commercial@syntrarefining.com
- **Supplier RFQ Responses** → commercial@syntrarefining.com
- **Investor Inquiries** → investors@syntrarefining.com

### 6. Test Your Forms

After updating the form IDs, test each form to make sure submissions are working correctly.

## Important Notes

### File Uploads (Career Applications)
The career application form includes a resume file upload field. This requires a **paid Formspree plan** ($10/month).

**Options:**
1. **Upgrade to paid plan** - Recommended if you want file uploads
2. **Remove file upload** - Change the resume field to ask for a link (Google Drive, Dropbox, etc.)
3. **Ask for email** - Add text saying "Please email your resume to careers@syntrarefining.com"

### Spam Protection
Formspree includes built-in spam protection. You can also:
- Enable reCAPTCHA in Formspree settings
- Set up custom spam filters
- Limit submissions per IP address

### Form Redirects
By default, Formspree shows a generic "Thank you" page. You can customize this in Formspree settings or add a custom success page.

## What Was Removed

The following database-related files are no longer needed:
- Supabase database setup
- Edge functions for email notifications
- Migration files
- supabase-client.js (removed from forms, but kept for reference)

Your site will work immediately once you add the Formspree form IDs - no database configuration required!
