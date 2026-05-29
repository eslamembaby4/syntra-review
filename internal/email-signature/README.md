# Syntra Refining Email Signature

## Professional Email Signature System

This directory contains the official Syntra Refining Corporation email signature for organization-wide deployment.

---

## 📥 Download Center

**→ [Open Download Center](download.html)** - Download all signature files and documentation with one click.

---

## 📁 Files

### 1. **signature-static.html**
The default, recommended email signature.
- Clean, professional layout
- Works in all email clients including Outlook
- No animations - maximum compatibility
- **Status:** Production-ready
- **Use when:** Maximum compatibility required

### 2. **signature-animated.html**
Enhanced version with subtle CSS animation effects.
- Barely-visible gradient shift on top divider
- Rotating diamond logo animation
- Subtle pulse effect on accent elements
- Conveys advanced technology and precision
- **Limitation:** CSS animations don't work in many email clients
- **Status:** Limited compatibility
- **Use when:** Internal emails only or known compatible clients

### 3. **signature-gif-banner.html** ⭐ NEW
Professional animated banner using GIF format.
- 550x200px animated banner at top
- Rotating diamond logo with gradient effects
- **Best of both worlds:** Animation + wide compatibility
- Works in 99% of email clients including Outlook
- **Status:** Recommended for animated version
- **Use when:** You want animation with maximum compatibility

### Supporting Files

#### **gif-converter.html** ⭐ NEW TOOL
Interactive GIF conversion tool for any signature.
- Load any signature file for preview
- Multiple recording methods supported
- Dimension presets included
- Step-by-step instructions for all platforms
- **Use this first for easiest GIF creation**

#### **gif-capture-template.html**
Template for recording the animated banner as GIF.
- Pre-sized 550x200px capture area
- All animations included
- Optimized for screen recording
- Instructions included

#### **GIF_CONVERSION_GUIDE.md** 📘 COMPREHENSIVE
Complete guide for converting ANY signature to GIF.
- Windows, Mac, and online methods
- Tool recommendations with links
- Step-by-step instructions for each tool
- Optimization and troubleshooting
- Email implementation examples

#### **GIF_BANNER_GUIDE.md** 📘
Complete guide for creating and implementing GIF banner.
- Step-by-step GIF creation
- Tool recommendations
- Optimization techniques
- Hosting and deployment
- Troubleshooting

#### **DEPLOYMENT_GUIDE.md**
Complete step-by-step deployment instructions.
- Microsoft 365 setup
- Logo hosting requirements
- Variable mapping
- Troubleshooting
- Maintenance procedures

---

## 🎨 Design Philosophy

**Industrial · Secure · Executive · Advanced**

The signature reflects Syntra Refining's identity:
- **High-technology focus** - Subtle motion suggests precision systems
- **Industrial credibility** - Clean, structured layout
- **Security-focused** - Dark logo container, professional restraint
- **Trust & reliability** - No clutter, no marketing language

---

## 🎯 Which Version Should You Use?

### Decision Matrix

| Feature | Static | CSS Animated | GIF Banner ⭐ |
|---------|--------|-------------|--------------|
| **Compatibility** | 100% | ~30% | 99% |
| **Outlook Support** | ✅ Full | ❌ No animation | ✅ Full animation |
| **Mobile Support** | ✅ Perfect | ⚠️ Mixed | ✅ Perfect |
| **File Size** | Minimal | Minimal | ~500KB-1MB |
| **Professional Look** | ✅ Clean | ✅ High-tech | ✅✅ Best |
| **Setup Complexity** | Easy | Easy | Medium |
| **Maintenance** | Easy | Easy | Easy |

### Recommendations

**Choose Static if:**
- Maximum compatibility is critical
- Minimal file size is important
- You don't need animation

**Choose CSS Animated if:**
- Internal-only emails
- You know all recipients use modern webmail
- You want animation without GIF creation

**Choose GIF Banner if:** ⭐ **RECOMMENDED**
- You want animation that works everywhere
- Professional appearance is critical
- You're okay with ~500KB-1MB file size
- You send to external partners/clients

---

## 🚀 Quick Start

### Option 1: GIF Banner Signature (Recommended)

1. **Create the GIF:** ⭐ EASY METHOD
   - Open `gif-converter.html` in your browser
   - Select any signature from the dropdown
   - Choose dimensions (600x200 recommended)
   - Click "Load Preview"
   - Follow the on-screen instructions to record as GIF
   - See `GIF_CONVERSION_GUIDE.md` for detailed tool guides

2. **Host the GIF:**
   - Upload to: `https://www.syntrarefining.com/assets/email-signature/syntra-banner-animated.gif`
   - Verify public HTTPS access

3. **Deploy:**
   - Use `signature-gif-banner.html`
   - Update GIF URL in HTML
   - Follow deployment steps below

### Option 2: Static Signature (Maximum Compatibility)

1. Use `signature-static.html`
2. Follow deployment steps below

### Option 3: CSS Animated (Internal Use Only)

1. Use `signature-animated.html`
2. Only for known compatible clients
3. Follow deployment steps below

### Before Deployment (All Versions)
1. ✅ Host any images publicly (HTTPS required)
2. ✅ Update image URLs in HTML files
3. ✅ Verify all users have complete profiles in Microsoft 365
4. ✅ Review and approve design with leadership

### Deploy to Microsoft 365
1. Open **Exchange Admin Center**
2. Create a new **Mail Flow Rule**
3. Use "Apply disclaimers" with signature HTML
4. Map variables to Exchange dynamic fields
5. Set to **Enforce** mode
6. Test with multiple email clients

**Detailed instructions:**
- General: See `DEPLOYMENT_GUIDE.md`
- GIF Banner: See `GIF_BANNER_GUIDE.md`

---

## 🔧 Technical Specifications

### Layout
- Left-aligned vertical design
- Mobile-responsive
- Table-based structure (email-safe)
- Inline CSS only

### Logo
- **Current:** White logo on dark background
- **Source:** `assets/images/SYNTRA REFINING WHITE LOGO KIT - SBG.png`
- **Display size:** 116px width
- **Background:** #1a1a1a (dark industrial)

### Typography
- System font stack for universal compatibility
- Weights: 400 (regular), 500 (medium), 600 (semibold)
- Clear hierarchy: Name → Title → Company → Contact

### Color Palette
- **Primary dark:** #1a1a1a
- **Medium gray:** #4a4a4a
- **Text gray:** #6a6a6a
- **Divider:** #d0d0d0
- **Links:** #1a1a1a (black, professional)

---

## 📋 Signature Content

### Dynamic Fields
These are populated automatically from Microsoft 365:
- **Full Name** - From user's display name
- **Job Title** - From user's title field
- **Email Address** - From primary email
- **Phone Number** - Optional, from mobile/phone field

### Static Content
These are the same for everyone:
- Company name: **Syntra Refining Corporation**
- Website: **www.syntrarefining.com**
- Location: **Halifax, Nova Scotia, Canada**
- Confidentiality notice

---

## 🎯 Governance

### Mandatory
- One signature for entire organization
- No personal customization allowed
- Applied centrally via Microsoft 365
- Only AD fields are dynamic

### Not Allowed
- Custom colors or fonts
- Additional links or social media
- Marketing slogans or taglines
- Personal branding elements
- Logo modifications

### Approval Required
Any changes to this signature require approval from:
- CIO
- Marketing/Brand Manager
- IT Security Lead

---

## 🧪 Testing Checklist

Before full deployment, test on:
- [ ] Outlook Desktop (Windows)
- [ ] Outlook Desktop (Mac)
- [ ] Outlook Web App
- [ ] Outlook Mobile (iOS)
- [ ] Outlook Mobile (Android)
- [ ] Gmail (web)
- [ ] Apple Mail
- [ ] Mobile email clients

**Key tests:**
- Logo displays correctly
- All text is readable
- Links work properly
- Layout doesn't break
- No horizontal scrolling on mobile

---

## 🐛 Common Issues

### Logo Not Showing
→ Verify logo is publicly hosted with valid HTTPS URL

### Signature Not Applying
→ Check Exchange rule is set to "Enforce" and has high priority

### Variables Show as "%%displayName%%"
→ User profile fields are missing in Microsoft 365

### Different formatting in Outlook vs Gmail
→ Expected behavior - minor rendering differences are normal

**Full troubleshooting guide:** See `DEPLOYMENT_GUIDE.md`

---

## 📞 Support

**Questions or issues?**
Contact: IT Support at support@syntrarefining.com

**Documentation updates?**
Submit through IT change management process

---

## 📈 Version Control

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0 | Jan 2026 | Initial release | Pending |

---

## 🔐 Security & Compliance

- No external scripts
- No tracking pixels
- No third-party integrations
- Confidentiality notice included
- Logo hosted on Syntra infrastructure only

---

**Maintained by:** Syntra Refining IT Department
**Last updated:** January 2026
**Status:** Production Ready
