# Microsoft 365 Email Signature Setup Guide

## Brand-Compliant Syntra Email Signatures

This guide will help you deploy the updated Syntra brand-compliant email signatures to your Microsoft 365 tenant.

---

## Available Signatures

### 1. **Static Version** (`signature-static.html`)
- Clean, professional design
- No animations (maximum compatibility)
- Best for all email clients

### 2. **Animated Version** (`signature-animated.html`)
- Rotating diamond logo
- Subtle glow effects on accent line
- Animated top divider
- Best for modern email clients

---

## Brand Elements Included

- **Diamond & Square Logo**: Syntra's iconic logo in Signal Yellow (#FFD700)
- **Brand Colors**: Midnight Navy (#0B1120), Signal Yellow (#FFD700), brand slate tones
- **Typography**: Inter font family with fallbacks
- **Positioning Statement**: "SMART REFINING ■ UNIVERSAL INTAKE ■ DISTRIBUTED NETWORK"
- **Sharp Angles**: No rounded corners, maintaining brand precision

---

## Deployment Options

### Option 1: Individual User Setup (Outlook Desktop & Web)

#### For Each User:

1. **Open the signature HTML file** in a web browser
2. **Select all content** (Ctrl+A or Cmd+A)
3. **Copy** (Ctrl+C or Cmd+C)
4. **In Outlook**:
   - Go to **Settings** > **View all Outlook settings**
   - Navigate to **Mail** > **Compose and reply**
   - Under **Email signature**, click **+ New signature**
   - Name it (e.g., "Syntra Brand 2026")
   - **Paste** into the signature editor (Ctrl+V or Cmd+V)
5. **Replace placeholders**:
   - `{{FULL_NAME}}` → Your full name
   - `{{JOB_TITLE}}` → Your job title
   - `{{EMAIL}}` → Your email address
   - `{{PHONE}}` → (Optional) Uncomment and add phone number
6. **Set as default** for new emails and replies
7. **Save**

---

### Option 2: Centralized Deployment (Exchange Admin)

#### Prerequisites:
- Exchange Online Admin rights
- PowerShell access

#### Steps:

1. **Open PowerShell** as Administrator

2. **Install Exchange Online Management Module** (if not already installed):
   ```powershell
   Install-Module -Name ExchangeOnlineManagement
   ```

3. **Connect to Exchange Online**:
   ```powershell
   Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com
   ```

4. **Create Transport Rule for Organization-Wide Signatures**:
   ```powershell
   New-TransportRule -Name "Syntra Brand Signature" `
     -FromScope InOrganization `
     -ApplyHtmlDisclaimerLocation Append `
     -ApplyHtmlDisclaimerText (Get-Content "C:\path\to\signature-static.html" -Raw) `
     -ApplyHtmlDisclaimerFallbackAction Wrap
   ```

5. **Customize per user** using Active Directory attributes:
   - Replace `{{FULL_NAME}}` with `%%DisplayName%%`
   - Replace `{{EMAIL}}` with `%%Email%%`
   - Replace `{{JOB_TITLE}}` with `%%Title%%`

6. **Test** by sending emails from different users

---

### Option 3: Microsoft 365 Admin Center (Cloud-Based Signatures)

1. **Navigate to** [Microsoft 365 Admin Center](https://admin.microsoft.com)
2. Go to **Settings** > **Org settings** > **Organization profile** > **Custom themes**
3. While M365 doesn't support HTML signatures directly in admin center, you can:
   - Use **third-party tools** like:
     - **CodeTwo Email Signatures 365**
     - **Exclaimer Cloud**
     - **Hornetsecurity**
   - These tools integrate with M365 and allow centralized HTML signature management

---

## Customization Instructions

### Editing Placeholders

Both signature files use the following placeholders:

- `{{FULL_NAME}}` - Replace with employee's full name
- `{{JOB_TITLE}}` - Replace with employee's job title
- `{{EMAIL}}` - Replace with employee's email address
- `{{PHONE}}` - (Optional) Uncomment the phone section and add number

### Adding Phone Numbers

To enable phone numbers, find this section in the HTML:

```html
<!-- Phone (Optional) -->
<!-- Uncomment if phone number is required -->
<!--
<tr>
    <td style="padding: 0 0 4px 0; font-size: 13px; color: #64748B; line-height: 1.4; font-family: 'Inter', Arial, sans-serif;">
        <span style="color: #0B1120; font-weight: 500;">{{PHONE}}</span>
    </td>
</tr>
-->
```

Remove the `<!--` and `-->` comment markers and replace `{{PHONE}}` with the actual number.

---

## Testing Checklist

Before deploying organization-wide, test the signature by:

- [ ] Sending test emails to internal recipients
- [ ] Sending test emails to external recipients
- [ ] Testing on **Outlook Desktop** (Windows & Mac)
- [ ] Testing on **Outlook Web App**
- [ ] Testing on **Mobile devices** (iOS & Android)
- [ ] Verifying all links work correctly
- [ ] Checking animations in animated version (if used)
- [ ] Confirming SVG logo renders properly

---

## Brand Compliance Notes

These signatures follow the **Syntra Brand Brief (January 2026)**:

- **Colors**: Signal Yellow (#FFD700), Midnight Navy (#0B1120), Deep Slate (#0F172A)
- **Typography**: Reflects brand fonts (web-safe alternatives used)
- **Square Period**: Uses ■ symbol throughout
- **Left-Aligned**: All text follows brand alignment rules
- **Sharp Angles**: No rounded corners on any elements

---

## Support

For questions about:
- **Brand guidelines**: Contact your marketing team
- **Technical deployment**: Contact IT support
- **Signature content**: Contact HR or your manager

---

## File Versions

- `signature-static.html` - Static version (recommended)
- `signature-animated.html` - Animated version (optional)
- `preview.html` - Preview both versions in browser

**Last Updated**: January 2026
