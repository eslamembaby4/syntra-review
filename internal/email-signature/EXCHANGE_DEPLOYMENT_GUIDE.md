# Microsoft Exchange Email Signature Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying Syntra Refining's static email signatures in Microsoft Exchange/Office 365.

## Static Signature Files
The following static (non-animated) signature files are Microsoft Exchange compatible:

- `signature-static-exchange.html` - Master template with placeholders
- `exchange-nifemi-oguntuase.html` - Nifemi Oguntuase, Founder & CEO
- `exchange-steven-gravelsins.html` - Steven Gravelsins, CTO
- `exchange-michelle-ernest.html` - Michelle Ernest, COO
- `exchange-mark-mikhail.html` - Mark Mikhail, CFO

## Design Features
- Clean, professional layout with Syntra branding
- Diamond logo with gold square accent
- Midnight Navy (#0B1120) and Signal Yellow (#FFD700) brand colors
- No animations (Exchange-compatible)
- Responsive HTML table structure
- All styling inline for maximum compatibility

## Deployment Options

### Option 1: Individual User Setup (Outlook Desktop)

**For Windows:**
1. Open the signature HTML file in a web browser
2. Select all content (Ctrl+A)
3. Copy (Ctrl+C)
4. Open Outlook
5. Go to File > Options > Mail > Signatures
6. Click "New" to create a new signature
7. Name it "Syntra Refining"
8. Paste (Ctrl+V) into the signature editor
9. Click "OK" to save

**For Mac:**
1. Open the signature HTML file in a web browser
2. Select all content (Cmd+A)
3. Copy (Cmd+C)
4. Open Outlook
5. Go to Outlook > Preferences > Signatures
6. Click "+" to create a new signature
7. Name it "Syntra Refining"
8. Paste (Cmd+V) into the signature editor
9. Close to save

### Option 2: Outlook Web App (OWA)

1. Sign in to Outlook on the web (outlook.office.com)
2. Click Settings (gear icon) > View all Outlook settings
3. Go to Mail > Compose and reply
4. Under "Email signature", click in the text box
5. Open your signature HTML file in a browser
6. Select all (Ctrl+A or Cmd+A) and copy (Ctrl+C or Cmd+C)
7. Paste into the signature text box
8. Select "Automatically include my signature on messages I send"
9. Click "Save"

### Option 3: Exchange Admin Center (Organization-Wide)

**Prerequisites:**
- Exchange admin access
- PowerShell with Exchange Online Management module

**Steps:**

1. **Prepare the HTML:**
   ```powershell
   # Read the HTML file
   $signatureHTML = Get-Content "exchange-template.html" -Raw
   ```

2. **Create Transport Rule:**
   - Sign in to Exchange Admin Center
   - Go to Mail flow > Rules
   - Click "+" to add a new rule
   - Name it "Syntra Email Signature"
   - Apply this rule if: The sender is located > Inside the organization
   - Do the following: Append the disclaimer > Use custom text

3. **Configure the disclaimer:**
   - Paste your HTML signature
   - Select fallback action: "Wrap" or "Ignore"
   - Save the rule

### Option 4: PowerShell Deployment (Bulk)

**For IT Administrators:**

```powershell
# Connect to Exchange Online
Connect-ExchangeOnline

# Define users and their signature files
$users = @(
    @{Email="nifemi@syntrarefining.com"; File="exchange-nifemi-oguntuase.html"},
    @{Email="steven@syntrarefining.com"; File="exchange-steven-gravelsins.html"},
    @{Email="michelle@syntrarefining.com"; File="exchange-michelle-ernest.html"},
    @{Email="mark@syntrarefining.com"; File="exchange-mark-mikhail.html"}
)

# Loop through each user
foreach ($user in $users) {
    $signature = Get-Content $user.File -Raw

    # Set signature using Exchange Online cmdlet
    Set-MailboxMessageConfiguration -Identity $user.Email `
        -SignatureHTML $signature `
        -AutoAddSignature $true
}

# Disconnect
Disconnect-ExchangeOnline
```

## Customization Guide

To create a new signature from the master template:

1. Open `signature-static-exchange.html`
2. Replace these placeholders:
   - `{{FULL_NAME}}` - Employee full name
   - `{{JOB_TITLE}}` - Job title
   - `{{EMAIL}}` - Email address
   - `{{PHONE}}` - Phone number with extension
   - `{{PHONE_DISPLAY}}` - Formatted phone display
3. Save as `exchange-[firstname-lastname].html`

## Testing Checklist

Before deployment, verify:
- [ ] All links are clickable (email, phone, website)
- [ ] Logo displays correctly
- [ ] Colors match brand standards (#0B1120, #FFD700, #0891B2)
- [ ] Text is readable and properly formatted
- [ ] Signature displays correctly in:
  - [ ] Outlook Desktop (Windows)
  - [ ] Outlook Desktop (Mac)
  - [ ] Outlook Web App
  - [ ] Outlook Mobile (iOS/Android)
  - [ ] Gmail (when receiving emails)
  - [ ] Apple Mail
  - [ ] Other email clients

## Troubleshooting

### Signature doesn't display correctly
- Ensure all inline styles are present
- Check that HTML is not being stripped by security settings
- Try the "wrap" fallback option for transport rules

### Logo doesn't appear
- SVG is embedded inline and should work universally
- If issues persist, consider converting to a base64 image

### Fonts don't match
- System fonts (Inter, Arial) are used as fallbacks
- Web fonts may not work in all email clients

### Colors look different
- Ensure hex values are correct (#0B1120, #FFD700, #0891B2)
- Some email clients may modify colors based on dark mode settings

## Best Practices

1. **Keep it simple** - Avoid complex CSS or JavaScript
2. **Use inline styles** - External stylesheets don't work in email
3. **Test thoroughly** - Check in multiple clients before organization-wide deployment
4. **Regular updates** - Keep signatures current with staff changes
5. **Brand consistency** - Ensure all signatures match company standards

## Support

For technical issues or customization requests, contact:
- IT Department: it@syntrarefining.com
- Brand Guidelines: marketing@syntrarefining.com

## Version History

- **v1.0** (2024-02-13) - Initial Microsoft Exchange compatible signatures
  - Static design without animations
  - Diamond logo with gold square
  - SYNCORE™ technology section
  - Brand-compliant colors and typography
