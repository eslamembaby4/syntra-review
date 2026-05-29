# Email Signature GIF Conversion Guide

## Quick Start

1. **Open the GIF Converter Tool:**
   - Navigate to `email-signature/gif-converter.html` in your browser
   - Or visit: `https://syntrarefining.com/email-signature/gif-converter.html`

2. **Select a signature** from the dropdown menu

3. **Choose output dimensions** (recommended: 600x200px)

4. **Click "Load Preview"** to see the animated signature

5. **Record as GIF** using one of the methods below

---

## Recommended Tools

### 🎯 BEST FOR WINDOWS
**ScreenToGif** (FREE)
- Download: https://www.screentogif.com/
- Features: Built-in editor, optimization, precise recording
- File size: Excellent compression

### 🎯 BEST FOR MAC
**Gifox** ($5)
- Download: https://gifox.app/
- Features: Menu bar access, instant recording, auto-optimization
- File size: Smallest files with best quality

### 🎯 BEST FREE OPTION (ALL PLATFORMS)
**GIPHY Capture** (FREE for Mac) or **LICEcap** (FREE for Windows)
- Simple interface
- Quick recording
- Good quality

---

## Step-by-Step: ScreenToGif (Windows)

1. **Download & Install ScreenToGif**
   - Visit https://www.screentogif.com/
   - Download and install

2. **Open the GIF Converter**
   - Load your desired signature
   - Note the exact dimensions shown

3. **Start ScreenToGif**
   - Click "Recorder"
   - Position the recording frame over the signature
   - Match the exact dimensions (e.g., 600 x 200)

4. **Record**
   - Click "Record" (or press F7)
   - Let it run for 20+ seconds to capture full animation loop
   - Press "Stop" (or F8)

5. **Edit & Optimize**
   - Click "Editor" to review frames
   - Go to "Image" → "Resize" (if needed)
   - Go to "File" → "Save As" → "GIF"
   - Settings:
     - **Encoder**: FFmpeg or System.Drawing
     - **Frame rate**: 25 FPS
     - **Loop**: Forever
     - **Quality**: 90-100%

6. **Save**
   - File size should be under 1MB
   - Save to your email signature folder

---

## Step-by-Step: Gifox (Mac)

1. **Download & Install Gifox**
   - Visit https://gifox.app/
   - Purchase ($5) and install

2. **Open the GIF Converter**
   - Load your desired signature
   - Note the exact dimensions

3. **Start Recording**
   - Click Gifox icon in menu bar
   - Select "Record Area"
   - Draw rectangle around signature (exact dimensions)
   - Recording starts automatically

4. **Stop Recording**
   - Click Gifox icon again
   - Click "Stop"
   - GIF is automatically optimized

5. **Export**
   - Click the GIF thumbnail in Gifox
   - Click "Save to Disk"
   - Choose location

---

## Online Method: HTML CSS to Image

1. **Download Signature HTML**
   - Right-click on signature file
   - "Save As" → save to desktop

2. **Visit htmlcsstoimage.com**
   - Create free account
   - Upgrade for video/GIF support ($9/month)

3. **Upload HTML**
   - Paste HTML code or upload file
   - Set dimensions
   - Set animation duration (20 seconds)

4. **Generate GIF**
   - Click "Create Image"
   - Download optimized GIF

---

## Optimization Tips

### File Size Guidelines
- **Target**: Under 1MB for email
- **Maximum**: 1.5MB (some email clients have limits)
- **Optimal dimensions**: 600x200px or 550x200px

### Quality Settings
- **Frame rate**: 20-30 FPS (higher = smoother but larger file)
- **Colors**: 256 colors max (GIF limitation)
- **Loop count**: Forever (0)
- **Dithering**: Floyd-Steinberg or None

### Reducing File Size
1. **Lower frame rate**: 20 FPS instead of 30 FPS
2. **Reduce dimensions**: 550x200 instead of 600x200
3. **Fewer frames**: Optimize away duplicate frames
4. **Online optimization**: Use ezgif.com/optimize
5. **Compression**: Use tools like gifsicle or ImageOptim

---

## Using GIF in Email

### Method 1: Direct Embed (Recommended)
```html
<img src="path/to/signature.gif" alt="Syntra Refining" width="600" height="200" style="display: block; border: none;" />
```

### Method 2: Host Online
1. Upload GIF to:
   - Your website: `syntrarefining.com/signatures/name.gif`
   - Image hosting: imgur.com or imgbb.com

2. Use in email:
```html
<img src="https://syntrarefining.com/signatures/nifemi.gif" alt="Syntra Refining" width="600" height="200" />
```

### Method 3: Base64 Embed (Not recommended - large)
- Convert GIF to base64
- Inline in HTML (increases email size significantly)

---

## Troubleshooting

### GIF Not Animating in Email
- **Outlook Desktop**: May show only first frame (known limitation)
- **Solution**: Include static fallback or use online version
- **Test**: Send to yourself first

### File Too Large
- Use optimization tools (ezgif.com/optimize)
- Reduce dimensions
- Lower frame rate
- Shorten duration

### Poor Quality
- Increase frame rate (25-30 FPS)
- Use higher quality encoder
- Record at exact pixel dimensions
- Avoid scaling after recording

### Colors Look Wrong
- GIF supports only 256 colors
- Use dithering for gradients
- Consider recording at higher quality then optimizing

---

## Batch Conversion

To convert multiple signatures:

1. **Using ScreenToGif**:
   - Record first signature
   - Save settings as preset
   - Repeat for each signature
   - Use same dimensions and settings

2. **Using Script** (Advanced):
   - Use Puppeteer/Playwright
   - Automate browser screenshots
   - Convert to GIF programmatically

---

## Final Checklist

Before using your GIF signature:

- [ ] File size under 1MB
- [ ] Dimensions are 600x200 or 550x200
- [ ] Animation loops smoothly
- [ ] No visible frame jumps
- [ ] Tested in Gmail, Outlook, Apple Mail
- [ ] Includes alt text for accessibility
- [ ] Backed up original HTML version
- [ ] Named clearly (e.g., `signature-nifemi-animated.gif`)

---

## Need Help?

- GIF Converter Tool: `/email-signature/gif-converter.html`
- Template Files: `/email-signature/signature-*.html`
- Support: Contact web team

---

**Version**: 1.0
**Last Updated**: February 2026
**Created by**: Syntra Web Team
