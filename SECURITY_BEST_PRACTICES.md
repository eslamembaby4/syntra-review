# Website Security Best Practices
## Syntra Refining Corporation

---

## 1. HTTPS & SSL/TLS Configuration

### Current Status
✅ Your site uses GitHub Pages with custom domain: `www.syntrarefining.com`
✅ GitHub Pages automatically provides HTTPS via Let's Encrypt

### Enforcement Steps
1. **Force HTTPS** - Already enabled by default on GitHub Pages
2. **HSTS (HTTP Strict Transport Security)** - Add security headers (see section 3)
3. **TLS 1.3** - GitHub Pages uses modern TLS protocols automatically

---

## 2. URL Structure Best Practices

### ✅ DO's
- Use clean, descriptive URLs: `/careers`, `/contact`, `/technology`
- Keep URLs lowercase
- Use hyphens for word separation
- Keep URLs short and meaningful
- Use HTTPS for all resources

### ❌ DON'Ts
- **Never expose sensitive data in URLs:**
  - ❌ `/admin?password=xyz`
  - ❌ `/api/user?ssn=123456789`
  - ❌ `/download?token=secret-key`

- **Avoid session IDs in URLs:**
  - ❌ `/page?sessionid=abc123`
  - ✅ Use HTTP-only cookies instead

- **Don't expose internal paths:**
  - ❌ `/internal/admin/c:/users/admin/documents`
  - ✅ Use mapped routes: `/admin/dashboard`

- **Don't use predictable resource IDs:**
  - ❌ `/invoice/1`, `/invoice/2`, `/invoice/3`
  - ✅ `/invoice/a8f7d9e2-4b3c` (use UUIDs)

---

## 3. Security Headers Configuration

### For GitHub Pages
GitHub Pages doesn't allow custom headers configuration files, but you can implement security via:

1. **Meta Tags in HTML** (already implemented in your pages)
2. **Cloudflare** (recommended - see section 5)
3. **JavaScript-based protection** (limited)

### Recommended Security Headers
```http
# Strict-Transport-Security (HSTS)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Content-Security-Policy (CSP)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';

# X-Frame-Options
X-Frame-Options: DENY

# X-Content-Type-Options
X-Content-Type-Options: nosniff

# X-XSS-Protection
X-XSS-Protection: 1; mode=block

# Referrer-Policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions-Policy
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 4. Preventing Information Disclosure

### Browser Address Bar
**The Issue:** Users see the complete URL in the browser address bar.

**This is NORMAL and EXPECTED behavior.**
- The URL is how users navigate the web
- Hiding URLs would break browser functionality
- URLs should be clean and non-sensitive (as yours are)

### What You CAN Control

#### ✅ Good URL Examples (Your Current Site)
```
✅ https://www.syntrarefining.com/
✅ https://www.syntrarefining.com/careers
✅ https://www.syntrarefining.com/contact
✅ https://www.syntrarefining.com/technology
✅ https://www.syntrarefining.com/company
```

These URLs:
- Don't expose sensitive information
- Are user-friendly and SEO-optimized
- Are professional and clean

#### ❌ URLs to Avoid
```
❌ https://www.syntrarefining.com/admin/login.php?debug=true
❌ https://www.syntrarefining.com/api/users?id=123&token=secret
❌ https://www.syntrarefining.com/files/confidential-report.pdf
❌ https://www.syntrarefining.com/?utm_source=internal&employee_id=5678
```

### Protecting Sensitive Data in Your Current Site

**For Form Submissions:**
```javascript
// ✅ CORRECT: Use POST, not GET
fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, message })
});

// ❌ WRONG: Never put sensitive data in URL
fetch('/api/submit?email=user@example.com&message=secret');
```

**For API Keys:**
```javascript
// ✅ CORRECT: Store in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ❌ WRONG: Never in URL
const url = 'https://api.example.com?key=secret-api-key';
```

---

## 5. Enhanced Security with Cloudflare (Recommended)

### Why Cloudflare?
- Free SSL/TLS certificates
- DDoS protection
- Custom security headers
- Web Application Firewall (WAF)
- Bot protection
- Analytics

### Setup Steps
1. Sign up at https://cloudflare.com
2. Add your domain `syntrarefining.com`
3. Update nameservers at your registrar
4. Enable security features:
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - Automatic HTTPS Rewrites: On
   - HTTP Strict Transport Security (HSTS): Enable
   - Bot Fight Mode: On

### Cloudflare Page Rules (Free)
```
Rule 1: Force HTTPS
URL: http://*syntrarefining.com/*
Setting: Always Use HTTPS

Rule 2: Security Headers
URL: *syntrarefining.com/*
Settings:
  - Security Level: High
  - Browser Integrity Check: On
```

---

## 6. URL Security Checklist

### ✅ Current Status (Your Site)

**HTTPS Enforcement**
- ✅ GitHub Pages auto-HTTPS enabled
- ✅ Custom domain configured
- ✅ Certificate auto-renewal

**URL Structure**
- ✅ Clean URLs (no `.html` extensions visible)
- ✅ Descriptive paths
- ✅ No sensitive data in URLs
- ✅ Lowercase convention

**Forms & Data Submission**
- ✅ POST method for form submissions
- ✅ Supabase backend for data storage
- ✅ Environment variables for API keys

**Public Content**
- ✅ Appropriate content is public
- ✅ Admin pages are separate (`admin.html`)
- ⚠️ Admin page needs authentication (see section 7)

---

## 7. Admin Page Security

### Current Issue
Your `admin.html` page is publicly accessible at:
`https://www.syntrarefining.com/admin.html`

### Solution: Add Authentication

I'll create a secure admin authentication system using Supabase.

**Options:**
1. **Supabase Auth** (Recommended) - Enterprise-grade authentication
2. **Password Protection** - Simple but less secure
3. **IP Whitelisting via Cloudflare** - Additional layer

---

## 8. Additional Recommendations

### A. robots.txt Configuration
```txt
# Prevent indexing of admin/sensitive pages
User-agent: *
Disallow: /admin
Disallow: /admin.html
Disallow: /test-*.html
Disallow: /diagnostic-*.html
Allow: /

Sitemap: https://www.syntrarefining.com/sitemap.xml
```

### B. Content Security Policy (CSP)
Add to all HTML pages:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://*.supabase.co;">
```

### C. Subresource Integrity (SRI)
For CDN resources:
```html
<!-- Add integrity attribute -->
<script src="https://cdn.tailwindcss.com"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

### D. HTTPS Everywhere
Ensure all resources use HTTPS:
```html
<!-- ✅ HTTPS -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2...">

<!-- ❌ HTTP (insecure) -->
<script src="http://cdn.example.com/script.js"></script>
```

---

## 9. Monitoring & Maintenance

### Regular Security Audits
- Monthly review of access logs
- Quarterly security header checks
- Annual penetration testing
- Continuous monitoring via:
  - Google Search Console
  - Cloudflare Analytics
  - Supabase Dashboard

### Security Scanning Tools
1. **Mozilla Observatory**: https://observatory.mozilla.org
2. **Security Headers**: https://securityheaders.com
3. **SSL Labs**: https://www.ssllabs.com/ssltest/

---

## 10. Summary: Your Current Security Posture

### ✅ Strengths
- HTTPS enabled via GitHub Pages
- Clean URL structure
- No sensitive data in URLs
- Modern frontend architecture
- Supabase backend security

### ⚠️ Improvements Needed
1. Add security headers via Cloudflare
2. Implement admin authentication
3. Add robots.txt
4. Add CSP meta tags
5. Configure HSTS preload

### 🎯 Priority Actions
1. **Immediate**: Add admin authentication
2. **This Week**: Configure Cloudflare
3. **This Month**: Add security meta tags
4. **Quarterly**: Security audit & penetration test

---

## Questions?

**Q: Why can users see the full URL?**
A: This is normal browser behavior and essential for web navigation. Your URLs are already clean and secure.

**Q: How do I hide admin pages?**
A: Add authentication (Supabase Auth), not URL obfuscation. Security through obscurity doesn't work.

**Q: Should I use URL shorteners?**
A: No, for your main site. They hide destinations and reduce trust. Use clean, descriptive URLs.

**Q: What about query parameters?**
A: Fine for non-sensitive data (filters, pagination). Never use for passwords, tokens, or PII.

---

**Document Version**: 1.0
**Last Updated**: January 2026
**Maintained By**: Technology Team
