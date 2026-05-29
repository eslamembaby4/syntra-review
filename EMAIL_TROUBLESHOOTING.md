# Email Troubleshooting Guide

## Problem: No Emails Received at support@syntrarefining.com

### Current Status
- ✅ Forms ARE submitting to database successfully
- ✅ Edge function IS deployed and active
- ❌ Emails are NOT being sent

### Root Cause
The SENDGRID_API_KEY is likely not configured in Supabase, causing the email notification to fail silently.

## Solution: Configure SendGrid

### Step 1: Get SendGrid API Key

1. **Create SendGrid Account** (if you don't have one):
   - Go to https://signup.sendgrid.com/
   - Sign up for a free account (100 emails/day)
   - Verify your email address

2. **Create API Key**:
   - Log in to SendGrid dashboard
   - Go to **Settings** → **API Keys** (https://app.sendgrid.com/settings/api_keys)
   - Click **Create API Key**
   - Name: `Syntra Production`
   - Permission Level: **Full Access** or **Mail Send** (restricted)
   - Click **Create & View**
   - **COPY THE API KEY** (it starts with `SG.`)
   - ⚠️ You can only see this once! Save it securely

### Step 2: Configure Supabase Secret

1. Go to your Supabase project dashboard:
   - URL: https://supabase.com/dashboard/project/smrfpquwwojfvnypjmkd

2. Navigate to **Project Settings** → **Edge Functions**

3. Scroll to **Secrets** section

4. Click **Add Secret**:
   - Name: `SENDGRID_API_KEY`
   - Value: [Paste your SendGrid API key here]
   - Click **Save**

### Step 3: Verify Sender Email

SendGrid requires sender verification:

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**

2. **Option A: Single Sender Verification** (Quick):
   - Click **Verify a Single Sender**
   - Use email: `noreply@syntrarefining.com`
   - Fill in your details
   - Verify the confirmation email

3. **Option B: Domain Authentication** (Recommended for production):
   - Click **Authenticate Your Domain**
   - Enter domain: `syntrarefining.com`
   - Add the DNS records shown to your domain registrar
   - Wait for verification (5-10 minutes)

### Step 4: Update Email Routing

Currently, test emails go to: `eslam.embaby4@gmail.com`

To route to support@syntrarefining.com:

1. Open `/supabase/functions/send-form-notification/index.ts`

2. Find line 27:
   ```typescript
   const toEmail = "eslam.embaby4@gmail.com";
   ```

3. Change to:
   ```typescript
   const toEmail = SUPPORT_EMAIL; // This will use support@syntrarefining.com
   ```

4. Redeploy the edge function (I can help with this)

## Testing

### Use the Diagnostic Tool

1. Open `diagnostic-email.html` in your browser
2. Click **Run Full Diagnostic**
3. Review the test results

Expected results after configuration:
- ✅ Database Connection: Success
- ✅ Edge Function URL: Available
- ✅ Recent Submissions: Found
- ✅ Test Email: Sent successfully
- ✅ Configuration: Complete

### Manual Test

1. Open `test-email.html`
2. Fill out the test form
3. Click **Send Test Email**
4. Check inbox at the configured email address

## Common Issues

### Issue 1: "Email service not configured"
- **Cause**: SENDGRID_API_KEY not set in Supabase
- **Fix**: Complete Step 2 above

### Issue 2: "Failed to send email"
- **Cause**: Invalid API key or sender not verified
- **Fix**: Check API key is correct and complete Step 3

### Issue 3: Emails in spam folder
- **Cause**: Domain not authenticated
- **Fix**: Complete Step 3, Option B (Domain Authentication)

### Issue 4: "The from address does not match a verified Sender Identity"
- **Cause**: Sender email not verified in SendGrid
- **Fix**: Complete Step 3

## Current Configuration

- **Provider**: SendGrid
- **Edge Function**: `send-form-notification` (deployed ✅)
- **From Email**: `noreply@syntrarefining.com`
- **Current Test Email**: `eslam.embaby4@gmail.com`
- **Target Production Email**: `support@syntrarefining.com`

## Email Routing Rules

Once configured, emails will route to:

| Form Type | Destination |
|-----------|-------------|
| Partner Inquiry | support@syntrarefining.com |
| Supplier Inquiry | support@syntrarefining.com |
| Investor Inquiry | support@syntrarefining.com |
| Career Application | support@syntrarefining.com |
| All Others | support@syntrarefining.com |

All forms currently route to the central support email. This can be customized in the edge function if needed.

## Quick Checklist

- [ ] SendGrid account created
- [ ] SendGrid API key created and copied
- [ ] SENDGRID_API_KEY configured in Supabase
- [ ] Sender email verified in SendGrid
- [ ] Diagnostic test passed
- [ ] Test email received
- [ ] Production email routing updated

## Next Steps

After configuration:
1. Run diagnostic test
2. Send test form submission
3. Verify email received at support@syntrarefining.com
4. Update edge function to route to production email
5. Test each form type

## Need Help?

Check these logs:
- **Browser Console**: Form submission errors
- **Supabase Logs**: https://supabase.com/dashboard/project/smrfpquwwojfvnypjmkd/logs/edge-functions
- **SendGrid Activity**: https://app.sendgrid.com/email_activity

The edge function logs will show exactly what's happening when an email send is attempted.
