# Email Notification System - Quick Reference

## ✅ What's Been Implemented

Your Syntra Refining website now has a **fully automated email notification system** that routes form submissions to the appropriate department emails.

## How It Works (User Experience)

1. **User fills out any form** on the website
2. **Form submits to database** - saved in Supabase for tracking
3. **Reference ID generated** - unique tracking number (SR-REQ-000001, etc.)
4. **Email notification sent automatically** - routed to correct department
5. **User sees success message** - with their reference ID

## Email Routing (Automatic)

Every form type is automatically routed to the correct email:

| Form | Destination Email |
|------|------------------|
| Partner Ecosystem Access | commercial@syntrarefining.com |
| Investor Relations Inquiry | investors@syntrarefining.com |
| Observer Access Request | commercial@syntrarefining.com |
| Supplier Registration | purchasing@syntrarefining.com |
| Supplier Documents | purchasing@syntrarefining.com |
| Supplier RFQ Response | purchasing@syntrarefining.com |
| TDS Package Request | commercial@syntrarefining.com |
| SDS/HSE Inquiry | hse@syntrarefining.com |
| Career Applications | careers@syntrarefining.com |

**Fallback**: Any unrecognized form types → info@syntrarefining.com

## Email Content Format

Each department receives emails like this:

**Subject:**
```
New INVESTOR INQUIRY - SR-REQ-000042
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
Message: Interested in learning more...

--- END ---

View in admin dashboard: https://syntrarefining.com/admin.html
```

## Technical Implementation

**Edge Function**: `send-form-notification`
- Location: `/supabase/functions/send-form-notification/index.ts`
- Status: Deployed and ready
- Trigger: Called automatically after each form submission
- JWT Verification: Disabled (public access for form submissions)

**Client Integration**: `supabase-client.js`
- Function: `sendEmailNotification(submissionData)`
- Called automatically after database insert
- Non-blocking: Email failures won't affect form submission

## Next Step: Email Service Integration

The system is deployed but needs an **email service provider** to actually send emails.

### Recommended: Resend

**Quick Setup:**

1. Sign up at https://resend.com
2. Verify your domain: syntrarefining.com
3. Get API key
4. Add secret in Supabase: `RESEND_API_KEY`
5. Uncomment code in Edge Function (lines are marked with TODO)

**Cost**: Free tier includes 3,000 emails/month

### Alternative: SendGrid

Also supported - see `/EMAIL_ROUTING_SETUP.md` for setup instructions.

## Testing the System

### Test Without Email Service (Current State)

✅ Forms work right now:
- Save to database ✓
- Generate reference IDs ✓
- Show user confirmations ✓
- Admin dashboard works ✓
- Email function logs notification ✓

⚠️ Emails are logged but not sent (awaiting email service setup)

### Test With Email Service (After Setup)

Once you integrate an email service:
1. Submit a test form
2. Check database (admin dashboard)
3. Check department inbox
4. Verify reference ID in email

## Files Created/Modified

**New Files:**
- `/supabase/functions/send-form-notification/index.ts` - Email routing Edge Function
- `/EMAIL_ROUTING_SETUP.md` - Complete setup guide
- `/EMAIL_NOTIFICATION_SUMMARY.md` - This file

**Modified Files:**
- `/supabase-client.js` - Added `sendEmailNotification()` function
- `/IMPLEMENTATION_SUMMARY.md` - Added email system docs
- `/DEMO_CODES.md` - Added email routing info

## Department Email List

All addresses configured and ready:

- careers@syntrarefining.com
- commercial@syntrarefining.com
- hse@syntrarefining.com
- info@syntrarefining.com
- investors@syntrarefining.com
- legal@syntrarefining.com
- privacy@syntrarefining.com
- purchasing@syntrarefining.com
- support@syntrarefining.com

## Monitoring

**View Email Logs:**
- Supabase Dashboard → Edge Functions → send-form-notification → Logs
- See which emails were triggered and to which addresses

**View Form Submissions:**
- Go to `/admin.html`
- See all submissions with reference IDs
- Filter by form type and status

## Production Checklist

Before launching:

- [ ] Choose email service (Resend recommended)
- [ ] Sign up and verify domain
- [ ] Add API key to Supabase secrets
- [ ] Uncomment email sending code in Edge Function
- [ ] Test with real form submission
- [ ] Check department inbox
- [ ] Verify SPF/DKIM/DMARC DNS records
- [ ] Set up monitoring alerts
- [ ] Test from various email clients

## Support

**Issue**: Emails not being sent
**Solution**: Email service not yet integrated - see `/EMAIL_ROUTING_SETUP.md`

**Issue**: Emails going to wrong department
**Solution**: Update `EMAIL_ROUTES` in `/supabase/functions/send-form-notification/index.ts`

**Issue**: Edge Function errors
**Solution**: Check logs in Supabase Dashboard → Edge Functions

## Summary

✅ **Fully Implemented**: Database storage, reference IDs, routing logic, user confirmations
⚠️ **Setup Required**: Email service integration (15 minutes with Resend)
📖 **Complete Guide**: See `/EMAIL_ROUTING_SETUP.md` for step-by-step instructions

**Current Status**: System is deployed and functional. Forms save to database and generate reference IDs. Email notifications are configured and ready - just needs email service integration to actually send emails.
