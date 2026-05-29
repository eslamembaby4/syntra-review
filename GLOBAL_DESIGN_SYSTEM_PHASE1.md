# Global Design System - Phase 1 Implementation

## Overview

Phase 1 of the Syntra Refining global design system has been implemented to enforce consistent design across all pages. This system addresses Michelle's video feedback and ensures brand compliance throughout the website.

## What's Been Created

### Core File
- **`/css/syntra-design-system.css`** - Single source of truth for design tokens and global styles

## Phase 1 Components

### A) Typography Tokens

#### Standardized Heading Sizes (Consistent Across ALL Pages)

**H1 - Page Title**
- Mobile: 40px (2.5rem)
- Tablet: 56px (3.5rem)
- Desktop: 72px (4.5rem)
- Line height: 0.95
- Usage: Top-of-page main header

**H2 - Section Header**
- Mobile: 32px (2rem)
- Tablet: 40px (2.5rem)
- Desktop: 48px (3rem)
- Line height: 1.1
- Usage: Major section dividers

**H3 - Sub-section Header**
- Mobile: 24px (1.5rem)
- Tablet: 28px (1.75rem)
- Desktop: 32px (2rem)
- Line height: 1.2
- Usage: Within sections

**H4 - Minor Header**
- Mobile: 20px (1.25rem)
- Tablet: 22px (1.375rem)
- Desktop: 24px (1.5rem)
- Line height: 1.3
- Usage: Cards, small sections

**Enforcement Rules:**
- ALL headings MUST use Oswald Bold ONLY
- NO other fonts for titles
- NO other weights (always 700)
- Always uppercase
- Letter-spacing: 0.02em

### B) Color Tokens

#### Primary Brand Colors
```css
--syntra-midnight-navy: #0B1120
--syntra-signal-yellow: #FFD700
--syntra-deep-slate: #0F172A
--syntra-white: #FFFFFF
--syntra-base: #F9FAFC
```

#### Secondary/Accent Colors
```css
--syntra-cyan: #0891B2
```

#### Grey Scale (Use Sparingly)
```css
--syntra-grey-emphasis: #94A3B8  /* Middle grey - for standout keywords ONLY */
--syntra-grey-muted: #64748B
--syntra-grey-border: #CBD5E1
```

#### Yellow Text Rules
**ALLOWED:**
- "SYNTRA", "SYNHUB", "SYNCORE" in Oswald Bold titles ONLY

**NOT ALLOWED:**
- Yellow text on white background (except titles)
- Yellow text for decoration

**INSTEAD:**
- Use yellow highlight with Deep Navy text:
  ```html
  <span class="highlight-yellow">Text</span>
  ```

#### Grey Emphasis Rules
**VALID USAGE:**
- "THE DIGITAL TWIN ADVANTAGE" → "DIGITAL TWIN" in grey #94A3B8
- Truly standout technical keywords

**INVALID USAGE:**
- Decoration only
- All subtitles
- General aesthetic variation

### C) Button Component (Standardized)

#### Primary Button (Signal Yellow - Default for ALL actions)
```html
<button class="btn-syntra-primary">Action</button>
```

**Styling:**
- Background: Signal Yellow (#FFD700)
- Text: Midnight Navy (#0B1120)
- Font: Oswald Bold
- Text-transform: Uppercase
- Padding: 0.75rem 1.5rem
- Border-radius: 2px
- NO outlines

**Hover:**
- Background: Midnight Navy
- Text: Signal Yellow
- Transform: translateY(-1px)
- Shadow: Yellow glow

#### Secondary Button (Alternative style)
```html
<button class="btn-syntra-secondary">Action</button>
```

**Styling:**
- Background: Midnight Navy (#0B1120)
- Text: Signal Yellow (#FFD700)
- Same hover behavior (inverted)

#### Button Rules
1. **ALL buttons must be Signal Yellow** (unless admin/system buttons)
2. **NO outline buttons** - All converted to solid Signal Yellow
3. **NO border buttons** - Use solid fills only
4. **Font MUST be Oswald Bold uppercase**

### D) Layout Consistency

#### Yellow Bar Line Element
```html
<div class="syntra-yellow-bar"></div>
```
- Height: 3px
- Width: 60px
- Color: Signal Yellow
- Keep consistent across pages

#### Section Spacing
```html
<section class="syntra-section syntra-section-spacing">
  <!-- Content -->
</section>
```
- Padding top/bottom: 4rem (mobile), 6rem (desktop)
- Reduces excessive vertical space

#### Container Width
```html
<div class="syntra-container">
  <!-- Content -->
</div>
```
- Max-width: 1400px
- Consistent padding: 1.5rem (mobile), 3rem (tablet+)

#### Alignment
- **ALWAYS left-aligned** (Michelle's video reference)
- NO centered text in sections
- Consistent left edges across pages

## How to Use

### 1. Add to HTML Pages

Add this line to the `<head>` section of all HTML pages:

```html
<link rel="stylesheet" href="/css/syntra-design-system.css">
```

**Important:** This should load AFTER `syntra-brand-theme.css` to ensure proper cascading.

### 2. Apply Standard Classes

#### Page Structure
```html
<section class="syntra-section syntra-section-spacing syntra-container">
  <!-- Yellow bar -->
  <div class="syntra-yellow-bar"></div>

  <!-- Section header -->
  <h2 class="h2-section-header">
    Section Title
  </h2>

  <!-- Content -->
  <p>Content here...</p>

  <!-- Button -->
  <button class="btn-syntra-primary">
    Call to Action
  </button>
</section>
```

#### Title with Yellow Keywords
```html
<h1>
  Building
  <span class="text-syntra-brand-yellow">SYNTRA</span>
  Technology
</h1>
```

#### Title with Grey Emphasis
```html
<h2>
  The
  <span class="text-emphasis-grey">Digital Twin</span>
  Advantage
</h2>
```

#### Yellow Highlight (Not Yellow Text)
```html
<p>
  This is
  <span class="highlight-yellow">highlighted text</span>
  in Deep Navy on Yellow background
</p>
```

### 3. Button Migration

**Old (Various styles):**
```html
<!-- Inconsistent buttons -->
<button class="bg-white border-2 border-syntra-accent">...</button>
<a class="bg-syntra-text text-white">...</a>
<button class="bg-blue-600 text-white">...</button>
```

**New (Standardized):**
```html
<!-- All use Signal Yellow -->
<button class="btn-syntra-primary">Primary Action</button>
<button class="btn-syntra-secondary">Secondary Action</button>
```

## CSS Variables Reference

All design tokens are available as CSS variables:

### Typography
```css
var(--font-heading)        /* Oswald */
var(--font-body)           /* Inter */
var(--font-mono)           /* JetBrains Mono */
var(--weight-heading)      /* 700 */
var(--h1-size-desktop)     /* 4.5rem */
var(--h2-size-desktop)     /* 3rem */
/* etc... */
```

### Colors
```css
var(--syntra-midnight-navy)
var(--syntra-signal-yellow)
var(--syntra-deep-slate)
var(--syntra-grey-emphasis)
/* etc... */
```

### Buttons
```css
var(--btn-padding-x)
var(--btn-padding-y)
var(--btn-radius)
/* etc... */
```

## Enforcement & Linting

The design system includes automatic enforcement:

1. **All headings** force Oswald Bold via `!important`
2. **Yellow text on white** automatically converted to Midnight Navy
3. **Outline buttons** automatically converted to solid Signal Yellow
4. **Centered text** forced to left alignment

## Next Steps (Future Phases)

**Phase 2** (Not yet implemented):
- Page-by-page implementation
- Remove inline styles
- Migrate all buttons to new system
- Standardize all header sizes
- Audit yellow text usage

**Phase 3** (Not yet implemented):
- Component library
- Form standardization
- Card patterns
- Navigation standardization

## Testing Checklist

Before considering Phase 1 complete:

- [ ] Design system CSS loaded on all pages
- [ ] All H1 headers same size across pages
- [ ] All H2 headers same size across pages
- [ ] All H3 headers same size across pages
- [ ] All buttons Signal Yellow (except admin)
- [ ] No outline buttons
- [ ] Yellow text only on SYNTRA/SYNHUB/SYNCORE in titles
- [ ] No yellow text on white background
- [ ] Grey emphasis used sparingly
- [ ] Consistent left alignment
- [ ] Yellow bar line consistent
- [ ] Reduced excessive vertical space

## Files Modified

### Created:
- `/css/syntra-design-system.css` - Core design system
- `GLOBAL_DESIGN_SYSTEM_PHASE1.md` - This documentation

### To Be Modified (Phase 2):
- `index.html`
- `technology.html`
- `company.html`
- `commercial.html`
- `supplier.html`
- `investor.html`
- `network.html`
- `careers.html`
- `contact.html`
- All other HTML pages

## Support

For questions about the design system:
- Brand Guidelines: `BRAND_COMPLIANCE_COMPLETE.md`
- Brand Theme: `/css/syntra-brand-theme.css`
- Design System: `/css/syntra-design-system.css`

---

**Phase 1 Status:** ✅ Design tokens defined and ready for implementation
**Next Phase:** Begin page-by-page application of design system
