# Syntra Refining Email Signature - Deployment Guide

## Overview
This document provides step-by-step instructions for deploying the standardized Syntra Refining email signature across the organization using Microsoft 365 Exchange Admin Center.

---

## Pre-Deployment Checklist

### 1. Host the Logo
The signature references the Syntra logo. You must host it publicly:

**Option A: Use your website**
- Upload `SYNTRA REFINING WHITE LOGO KIT - SBG.png` to your web server
- Recommended path: `https://www.syntrarefining.com/assets/email/syntra-logo-white.png`
- Ensure HTTPS is enabled
- Test the URL in a browser

**Option B: Use a CDN or asset hosting service**
- Upload to a reliable CDN (e.g., Cloudflare, Azure Blob Storage)
- Get the public HTTPS URL
- Update the signature HTML files

**Critical:** Update the image source in both signature files:
```html
<img src="https://www.syntrarefining.com/assets/email/syntra-logo-white.png"
```

---

## Microsoft 365 Deployment

### Step 1: Access Exchange Admin Center
1. Sign in to [Microsoft 365 Admin Center](https://admin.microsoft.com)
2. Navigate to **Exchange** → **Exchange admin center**
3. In the left menu, select **Mail flow** → **Rules**

### Step 2: Create Email Signature Rule
1. Click **+ Add a rule** → **Apply disclaimers...**
2. Configure the rule:

   **Name:** `Syntra Refining - Standard Email Signature`

   **Apply this rule if:**
   - Select: `The sender is located...` → `Inside the organization`

   **Do the following:**
   - Select: `Append the disclaimer...`
   - Click **Enter text** and paste the HTML from `signature-static.html`

   **Important Settings:**
   - Select disclaimer location: `Append`
   - Fallback action: `Wrap`

3. Replace template variables with Exchange dynamic fields:

   | Template Variable | Exchange Field |
   |------------------|----------------|
   | `{{FULL_NAME}}`  | `%%displayName%%` |
   | `{{JOB_TITLE}}`  | `%%title%%` |
   | `{{EMAIL}}`      | `%%emailAddress%%` |
   | `{{PHONE}}`      | `%%mobilePhone%%` (if enabled) |

   **Example:**
   ```html
   <td>%%displayName%%</td>
   <td>%%title%%</td>
   <td><a href="mailto:%%emailAddress%%">%%emailAddress%%</a></td>
   ```

4. Click **Save**

### Step 3: Set Priority and Scope
1. Set rule priority to **0** (highest priority)
2. Under **Choose a mode for this rule:** select **Enforce**
3. Ensure the rule applies to all users or create exceptions if needed

### Step 4: Test the Signature
1. Send a test email from your account
2. Check the signature appears correctly
3. Verify on multiple clients:
   - Outlook Desktop (Windows/Mac)
   - Outlook Web App
   - Outlook Mobile (iOS/Android)
4. Confirm logo displays correctly

---

## Using the Animated Version (Optional)

The animated version includes subtle motion effects that work in modern email clients.

**Note:** Some email clients (especially older Outlook versions) may not support CSS animations and will fall back to the static version automatically.

**Recommendation:** Start with the static version. Consider the animated version only if:
- Your organization primarily uses modern email clients
- You've tested extensively across all platforms
- Leadership approves the subtle motion

To deploy animated version:
- Use `signature-animated.html` instead of `signature-static.html`
- Follow the same deployment process

---

## Variable Mapping Reference

### Required Fields
These fields MUST be populated in Active Directory/Microsoft 365:

| Field | AD Attribute | Description |
|-------|-------------|-------------|
| Display Name | `displayName` | Full name (e.g., "John Smith") |
| Job Title | `title` | Official job title |
| Email | `mail` | Primary email address |

### Optional Fields
| Field | AD Attribute | Description |
|-------|-------------|-------------|
| Mobile Phone | `mobile` | Direct phone number |
| Office Phone | `telephoneNumber` | Office line |

**Action Required:**
- Audit all user accounts in Microsoft 365
- Ensure Display Name and Job Title are complete
- Update any missing information before deployment

---

## Customization Rules

### ✅ Allowed Customizations
- Name (automatic from AD)
- Job Title (automatic from AD)
- Email address (automatic from AD)
- Phone number (optional, role-based)

### ❌ Not Allowed
- Logo modifications
- Layout changes
- Color customizations
- Additional links or text
- Social media icons
- Marketing slogans
- Personal branding

---

## Troubleshooting

### Logo Not Displaying
**Cause:** Image URL not accessible
**Solution:**
- Verify logo is uploaded and publicly accessible
- Test URL in an incognito browser window
- Check HTTPS certificate is valid
- Ensure no firewall/security rules block the image

### Signature Not Applying
**Cause:** Rule priority or scope issue
**Solution:**
- Verify rule is set to **Enforce** mode
- Check rule priority (should be 0 or high priority)
- Confirm user is in scope of the rule
- Wait up to 15 minutes for changes to propagate

### Formatting Issues in Outlook
**Cause:** Email client rendering differences
**Solution:**
- Ensure using tables-based layout (already implemented)
- Verify inline CSS only (no external stylesheets)
- Test in Outlook Safe Mode
- Check if user has disabled HTML emails

### Variables Not Populating
**Cause:** Missing Active Directory attributes
**Solution:**
- Verify user profile in Microsoft 365 Admin Center
- Update missing fields (Display Name, Title)
- Sync changes from on-premises AD if applicable
- Wait for Exchange Online to process updates

---

## Maintenance & Updates

### When to Update
- Logo change or rebranding
- Contact information changes (address, website)
- Legal/compliance requirement changes

### Update Process
1. Modify the HTML signature file
2. Test thoroughly on all platforms
3. Update the Exchange transport rule
4. Notify IT support team
5. Monitor for issues during first 48 hours

### Audit Schedule
- **Quarterly:** Review user profile data completeness
- **Annually:** Re-test signature across all email clients
- **As needed:** Update for rebranding or policy changes

---

## Technical Specifications

### File Inventory
- `signature-static.html` - Default version (recommended)
- `signature-animated.html` - Subtle animation version (optional)
- `DEPLOYMENT_GUIDE.md` - This document

### Browser/Client Compatibility
| Platform | Static | Animated |
|----------|--------|----------|
| Outlook Desktop 2016+ | ✅ | ⚠️ Limited |
| Outlook Web App | ✅ | ✅ |
| Outlook Mobile | ✅ | ❌ |
| Gmail | ✅ | ✅ |
| Apple Mail | ✅ | ✅ |

### Image Specifications
- **Format:** PNG (transparency-capable)
- **Recommended width:** 116-140px
- **File size:** < 100KB
- **Background:** Designed for dark backgrounds

---

## Support & Governance

### Policy Enforcement
This signature is mandatory for all Syntra Refining employees. Non-compliance should be escalated to IT Security.

### Questions or Issues
Contact IT Support: [support@syntrarefining.com]

### Approval Authority
Any modifications to this signature require approval from:
- Chief Information Officer (CIO)
- Marketing/Brand Manager
- IT Security Lead

---

## Appendix: Exchange Dynamic Fields

Full list of available Microsoft 365 Exchange dynamic fields:

```
%%displayName%% - Full name
%%firstName%% - First name
%%lastName%% - Last name
%%emailAddress%% - Email address
%%title%% - Job title
%%department%% - Department
%%mobilePhone%% - Mobile phone
%%telephoneNumber%% - Office phone
%%company%% - Company name
%%streetAddress%% - Street address
%%city%% - City
%%state%% - State/Province
%%zipCode%% - Postal code
%%country%% - Country
```

---

## Version History
- **v1.0** - Initial release
- **Date:** January 2026
- **Approved by:** [Pending]

---

**End of Deployment Guide**
