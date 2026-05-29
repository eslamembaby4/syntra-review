# Government Deck PDF Export Guide

## Quick Start

Your government-level infrastructure briefing is ready to export as PDF.

**File**: `govt-deck-pdf-version.html`

---

## Method 1: Browser Print to PDF (Recommended)

### Steps:

1. **Open the file** in Google Chrome, Microsoft Edge, or Safari:
   - File location: `govt-deck-pdf-version.html`
   - Simply double-click the file to open it in your default browser

2. **Click the yellow "PRINT TO PDF" button** at the top right
   - OR use keyboard shortcut: `Ctrl+P` (Windows) or `Cmd+P` (Mac)

3. **Configure print settings**:
   - **Destination**: Select "Save as PDF" or "Microsoft Print to PDF"
   - **Layout**: Landscape
   - **Paper size**: Letter (8.5" x 11")
   - **Margins**: None
   - **Background graphics**: Enabled (IMPORTANT)
   - **Scale**: 100%

4. **Save the PDF**:
   - Click "Save" or "Print"
   - Choose your destination folder
   - Filename: `Critical_Minerals_Infrastructure_2.0_Government_Briefing.pdf`

---

## Method 2: Command Line (Advanced)

If you have Chrome installed and prefer automation:

### macOS/Linux:
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --disable-gpu \
  --print-to-pdf="govt-deck.pdf" \
  --print-to-pdf-no-header \
  govt-deck-pdf-version.html
```

### Windows:
```cmd
"C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --headless ^
  --disable-gpu ^
  --print-to-pdf="govt-deck.pdf" ^
  --print-to-pdf-no-header ^
  govt-deck-pdf-version.html
```

---

## Browser-Specific Instructions

### Google Chrome / Microsoft Edge
- Best results with background graphics
- Supports all modern CSS features
- **Recommended browser**

### Safari
- Works well with macOS
- Ensure "Print backgrounds" is checked

### Firefox
- Enable "Print backgrounds" in print dialog
- May require manual color adjustment

---

## Optimal PDF Settings

For the best government-quality output:

- **Resolution**: 300 DPI minimum
- **Color mode**: RGB (for screen viewing) or CMYK (for print)
- **File size**: Approximately 2-4 MB
- **Pages**: 11 pages total
- **Orientation**: Landscape throughout

---

## Quality Checklist

Before finalizing your PDF, verify:

- [ ] All 11 slides are present
- [ ] Signal yellow (#FDB913) renders correctly
- [ ] Navy background (#0B1423) is solid
- [ ] All fonts render (Oswald + Inter)
- [ ] Metrics appear bold and large
- [ ] Page breaks are clean between slides
- [ ] No content is cut off at edges

---

## Troubleshooting

### Background colors not showing
- **Solution**: Enable "Background graphics" or "Print backgrounds" in print settings

### Fonts look different
- **Solution**: Ensure you're connected to the internet when opening (fonts load from Google Fonts)

### Content cut off
- **Solution**: Set margins to "None" and scale to 100%

### File size too large
- **Solution**: After PDF creation, use Adobe Acrobat or similar to compress/optimize

---

## Professional Delivery

Once exported, your PDF is ready for:
- Federal government presentations
- Provincial infrastructure committees
- Strategic investment briefings
- NATO/defense stakeholder meetings
- Executive boardroom presentations

The deck maintains world-class visual standards suitable for the highest levels of government infrastructure planning.

---

**Files Available**:
- `govt-deck-professional.html` - Interactive presentation version
- `govt-deck-pdf-version.html` - Print-optimized PDF version

Both maintain identical content and sovereign design standards.
