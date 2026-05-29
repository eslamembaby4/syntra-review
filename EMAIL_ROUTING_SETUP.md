# Email Notification System - Setup Guide

## Overview

All form submissions are now configured to automatically send email notifications to the appropriate department. The system:

1. **Saves to Database** - Form data is stored in Supabase for tracking and admin access
2. **Sends Email Notification** - Automated email sent to the appropriate department email
3. **Shows User Confirmation** - User receives reference ID and success message

## Email Routing Configuration

### Current Routing Map

| Form Type | Department Email |
|-----------|-----------------|
| `partner_inquiry` | commercial@syntrarefining.com |
| `investor_inquiry` | investors@syntrarefining.com |
| `observer_access_request` | commercial@syntrarefining.com |
| `supplier_registration` | purchasing@syntrarefining.com |
| `supplier_document_submission` | purchasing@syntrarefining.com |
| `supplier_rfq_response` | purchasing@syntrarefining.com |
| `tds_package_request` | commercial@syntrarefining.com |
| `sds_inquiry` | hse@syntrarefining.com |
| `career_application` | careers@syntrarefining.com |
| **Default (fallback)** | info@syntrarefining.com |

### Available Department Emails

All configured in your domain:
- **Careers**: careers@syntrarefining.com
- **Commercial**: commercial@syntrarefining.com
- **HSE**: hse@syntrarefining.com
- **Information**: info@syntrarefining.com
- **Investors**: investors@syntrarefining.com
- **Legal**: legal@syntrarefining.com
- **Privacy**: privacy@syntrarefining.com
- **Purchasing**: purchasing@syntrarefining.com
- **Support**: support@syntrarefining.com

## How It Works

### 1. Form Submission Flow

```
User Fills Form
    ↓
Submit to Supabase Database
    ↓
Generate Reference ID (SR-REQ-######)
    ↓
Trigger Edge Function (send-form-notification)
    ↓
Route to Appropriate Email
    ↓
Send Email Notification
    ↓
Show Success to User
```

### 2. Email Content Format

Each notification includes:

**Subject:**
```
New [FORM TYPE] - [REFERENCE ID]
Example: New INVESTOR INQUIRY - SR-REQ-000042
```

**Body:**
```
New form submission received:

Reference ID: SR-REQ-000042
Form Type: investor_inquiry
Submitted: 2025-12-31T10:30:00.000Z

--- DETAILS ---

First Name: John
Last Name: Doe
Email: john@example.com
Organization: Example Corp
Interest Type: Strategic Investment
Message: Interested in learning more about expansion plans...

--- END ---

View in admin dashboard: https://syntrarefining.com/admin.html
```

## Setting Up Email Service (Required)

The Edge Function is deployed but **needs an email service integration** to actually send emails.

### Option 1: Resend (Recommended)

Resend is a modern email API with great deliverability.

**Steps:**

1. **Sign up for Resend**
   - Go to https://resend.com
   - Create an account
   - Verify your domain (syntrarefining.com)

2. **Get API Key**
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add to Supabase**
   - Go to Supabase Dashboard → Project Settings → Edge Functions
   - Add secret: `RESEND_API_KEY` = `your_api_key_here`

4. **Update Edge Function Code**

Edit `supabase/functions/send-form-notification/index.ts`:

```typescript
// Add after the body construction
const resendApiKey = Deno.env.get('RESEND_API_KEY');

const emailResponse = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${resendApiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'notifications@syntrarefining.com',
    to: toEmail,
    subject: subject,
    text: body,
  }),
});

if (!emailResponse.ok) {
  throw new Error('Failed to send email');
}
```

### Option 2: SendGrid

**Steps:**

1. Sign up at https://sendgrid.com
2. Create API key
3. Add to Supabase secrets as `SENDGRID_API_KEY`
4. Update function to use SendGrid API

```typescript
const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY');

const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${sendGridApiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: toEmail }],
    }],
    from: { email: 'notifications@syntrarefining.com' },
    subject: subject,
    content: [{
      type: 'text/plain',
      value: body,
    }],
  }),
});
```

### Option 3: SMTP (Any Provider)

Use Deno's built-in SMTP capability or a library.

## Testing the System

### 1. Test Form Submission

1. Go to any form page (e.g., `/investor.html`)
2. Fill out the form
3. Submit
4. Check:
   - ✅ Success message appears
   - ✅ Reference ID is displayed
   - ✅ Form data saved to database (check admin dashboard)
   - ✅ Email sent (check department inbox)

### 2. Check Edge Function Logs

```bash
# View logs in Supabase Dashboard
Project → Edge Functions → send-form-notification → Logs

# Or via Supabase CLI
supabase functions logs send-form-notification
```

### 3. Verify Email Delivery

- Check spam/junk folders
- Verify domain is authenticated
- Check email service dashboard for delivery status

## Troubleshooting

### Emails Not Sending

**Check 1: Edge Function Deployed**
```bash
# List functions
supabase functions list
# Should show: send-form-notification
```

**Check 2: Secrets Configured**
- Supabase Dashboard → Settings → Edge Functions
- Verify API key is set

**Check 3: Domain Verification**
- Verify your domain with email provider
- Add SPF, DKIM, DMARC records

**Check 4: Function Logs**
```bash
# Check for errors
supabase functions logs send-form-notification --limit 50
```

### Common Issues

**Issue**: "Failed to send email notification" in console
**Fix**: Email service integration not set up. Follow setup steps above.

**Issue**: Emails in spam
**Fix**: Configure SPF/DKIM/DMARC DNS records for syntrarefining.com

**Issue**: Wrong department receiving emails
**Fix**: Update EMAIL_ROUTES mapping in Edge Function

## Customizing Email Routes

To change which emails go where, edit the Edge Function:

1. Open `supabase/functions/send-form-notification/index.ts`
2. Update the `EMAIL_ROUTES` object:

```typescript
const EMAIL_ROUTES: Record<string, string> = {
  partner_inquiry: "commercial@syntrarefining.com",
  investor_inquiry: "investors@syntrarefining.com",
  // Add or modify routes here
  new_form_type: "newemail@syntrarefining.com",
};
```

3. Redeploy the function

## Production Checklist

Before going live:

- [ ] Email service integrated (Resend/SendGrid/SMTP)
- [ ] Domain verified with email provider
- [ ] SPF/DKIM/DMARC DNS records configured
- [ ] Test emails from all form types
- [ ] Verify routing to correct departments
- [ ] Check spam scores
- [ ] Set up email monitoring/alerts
- [ ] Configure bounce/complaint handling
- [ ] Test from various email clients (Gmail, Outlook, etc.)

## Monitoring & Maintenance

### Email Metrics to Track

- Delivery rate
- Bounce rate
- Spam complaint rate
- Time to deliver
- Form submission volume by type

### Recommended Monitoring

Set up alerts for:
- Edge Function errors
- Email delivery failures
- High bounce rates
- Unusual submission volumes

## Support

If you encounter issues:

1. Check Edge Function logs in Supabase Dashboard
2. Verify email service dashboard for delivery status
3. Review form submission in admin dashboard
4. Check browser console for errors

## Next Steps

1. **Choose an email service** (Resend recommended)
2. **Follow setup steps** above
3. **Test thoroughly** with all form types
4. **Monitor delivery** for first week
5. **Adjust routing** as needed

---

**Current Status**: Edge Function deployed, email routing configured, awaiting email service integration.
