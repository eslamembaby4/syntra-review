# Email Notification Setup Guide

This guide explains how to configure email notifications for form submissions in the Syntra Refining website.

## Overview

When users submit forms on your website, the system:
1. Saves the submission to the Supabase database
2. Sends an email notification to the appropriate department
3. Shows a success message with a reference ID to the user

## Email Routing

Forms are automatically routed to the correct department:

| Form Type | Destination Email |
|-----------|------------------|
| Partner Inquiry | commercial@syntrarefining.com |
| Supplier Inquiry | commercial@syntrarefining.com |
| Supplier Document | commercial@syntrarefining.com |
| TDS Request | commercial@syntrarefining.com |
| Newsletter | commercial@syntrarefining.com |
| Investor Inquiry | investors@syntrarefining.com |
| Career Application | careers@syntrarefining.com |
| SDS Inquiry | hse@syntrarefining.com |

## Setup Required

### Step 1: Create a Resend Account

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Create a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the left sidebar
3. Click **Create API Key**
4. Give it a name like "Syntra Production"
5. Copy the API key (starts with `re_`)

### Step 3: Configure Supabase Secret

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
3. Click **Add Secret**
4. Enter:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (paste it here)
5. Click **Save**

### Step 4: Verify Domain (Optional but Recommended)

For production use, you should verify your domain with Resend:

1. In your Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `syntrarefining.com`
4. Add the DNS records shown to your domain registrar
5. Wait for verification (usually takes a few minutes)

Once verified, update the edge function to use your custom domain:
- Change `from: 'Syntra Refining <onboarding@resend.dev>'`
- To: `from: 'Syntra Refining <notifications@syntrarefining.com>'`

## Testing

After setup, test the system:

1. Submit a test form on your website
2. Check the form submission appears in your admin dashboard
3. Check that an email was received at the appropriate department email
4. Verify the email contains all form data and the reference ID

## Troubleshooting

### Emails Not Sending

Check the browser console for errors:
- "Email service not configured" = RESEND_API_KEY not set in Supabase
- "Failed to send email" = Invalid API key or Resend quota exceeded

### Wrong Email Address

If emails go to the wrong department:
- Check the `form_type` value in your HTML forms
- Verify it matches one of the types in the routing table above
- Update the email routing in the edge function if needed

### Free Tier Limits

Resend's free tier includes:
- 100 emails per day
- 1 verified domain
- Email API access

For higher volumes, upgrade to a paid plan.

## Support

For issues with:
- **Resend**: Contact [support@resend.com](mailto:support@resend.com)
- **Form system**: Check browser console logs and Supabase logs
- **Edge function**: View logs in Supabase Dashboard → Edge Functions → Logs
