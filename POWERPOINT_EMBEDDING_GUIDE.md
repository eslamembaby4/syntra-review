# PowerPoint Embedding Guide

## Three Methods to Get Refineries Data into PowerPoint

You now have multiple options for embedding the Canadian refineries data into your PowerPoint presentations.

---

## Method 1: Interactive HTML Embed (Recommended for Digital Presentations)

**Best for:** Interactive presentations, digital delivery, live demos

**File:** `refineries-powerpoint.html`

### Step-by-Step Instructions

1. **Open the page in your browser:**
   - Navigate to `/refineries-powerpoint.html`
   - Both maps display side-by-side (All 31 facilities vs Priority 18 facilities)

2. **Download the standalone HTML file:**
   - Click the orange "📥 Download HTML" button at the top
   - File saves as `canadian-refineries-powerpoint.html`
   - This file is self-contained with maps embedded

3. **Insert into PowerPoint:**
   - **Windows:** Insert → Object → Object from File → Browse → Select HTML file
   - **Mac:** Insert → Object → HTML File from Web → Browse → Select HTML file
   - Resize to fit your slide layout

4. **During Presentation:**
   - Click the embedded object to interact with maps
   - Zoom in/out, click markers for details
   - Toggle between views

### Features
- ✅ Side-by-side comparison of both views
- ✅ Interactive maps with zoom and markers
- ✅ Facility details on click
- ✅ Professional styling with your brand colors
- ✅ Live counter updates
- ✅ Works offline once downloaded

---

## Method 2: Static HTML Table (Best for Copying Data)

**Best for:** Data tables, quick copy-paste, text-based slides

**File:** `refineries-static.html`

### Step-by-Step Instructions

1. **Open the static page:**
   - Navigate to `/refineries-static.html`
   - See two table views with all facility data

2. **Copy table data:**
   - View 1: All 31 facilities in table format
   - View 2: 18 priority mineral facilities
   - Select the table you want
   - Copy (Cmd+C / Ctrl+C)

3. **Paste into PowerPoint:**
   - Insert → Table → Paste from clipboard
   - PowerPoint automatically formats as table
   - Adjust column widths as needed

4. **Or download complete HTML:**
   - Right-click page → Save As
   - Save as `refineries-static.html`
   - Insert as object like Method 1

### Features
- ✅ Clean, printable tables
- ✅ Priority minerals highlighted with badges
- ✅ Summary statistics included
- ✅ Province distribution breakdown
- ✅ No database connection required (all data hardcoded)
- ✅ Perfect for printed handouts

---

## Method 3: Screenshot (Classic Method)

**Best for:** Static images, quick insertion, maximum compatibility

**File:** `critical-minerals-map.html`

### Step-by-Step Instructions

**Slide 1: All Refineries (31)**

1. Open `/critical-minerals-map.html`
2. Ensure "Show All Refineries" button is active (orange)
3. Adjust zoom to show desired region (Canada-wide or provincial)
4. Take screenshot:
   - **Mac:** Cmd + Shift + 4 → drag to select
   - **Windows:** Win + Shift + S → drag to select
5. Paste into PowerPoint (Cmd+V / Ctrl+V)
6. Add title: "Canadian Processing Facilities - All Commodities (31)"

**Slide 2: Priority Minerals (18)**

1. Stay on same page
2. Click "Al, Co, Cu, Ni, Li Only" button (turns orange)
3. Map updates to show 18 facilities
4. Counter shows "18 refineries"
5. Take screenshot at same zoom level
6. Paste into PowerPoint
7. Add title: "Priority Minerals Processing - Clean Energy Focus (18)"

### Features
- ✅ Full control over what's captured
- ✅ Works in any PowerPoint version
- ✅ Highest compatibility
- ✅ Can annotate in PowerPoint after capture
- ✅ No file size concerns

---

## Method 4: Print to PDF (For Reports)

**Best for:** Appendices, reports, detailed documentation

### Step-by-Step Instructions

1. **Open any of the pages:**
   - `refineries-powerpoint.html` (maps)
   - `refineries-static.html` (tables)
   - `critical-minerals-map.html` (interactive)

2. **Print to PDF:**
   - File → Print (or Cmd+P / Ctrl+P)
   - Select "Save as PDF" as printer
   - Adjust page layout (landscape recommended)
   - Click "Save"

3. **Insert PDF into PowerPoint:**
   - Insert → Object → Adobe Acrobat Document
   - Browse to your saved PDF
   - Resize to fit slide

### Features
- ✅ Professional quality output
- ✅ Vector graphics (crisp at any size)
- ✅ Multi-page PDFs supported
- ✅ Can extract specific pages
- ✅ Great for detailed appendices

---

## Comparison Table

| Method | Interactivity | File Size | Compatibility | Best Use Case |
|--------|--------------|-----------|---------------|---------------|
| **Interactive HTML** | ✅ Full | 100-200 KB | Modern Office | Digital presentations, demos |
| **Static HTML** | ❌ None | 50-100 KB | All versions | Data tables, handouts |
| **Screenshot** | ❌ None | 500 KB - 2 MB | 100% | Quick slides, universal compatibility |
| **Print to PDF** | ❌ None | 1-5 MB | All versions | Reports, appendices |

---

## File Reference

### Main Pages Created

```
✅ refineries-powerpoint.html     - Interactive dual-view for embedding
✅ refineries-static.html          - Static tables with full dataset
✅ critical-minerals-map.html      - Original interactive map
✅ mining-map-admin.html           - Admin CRUD interface
✅ mining-data-admin.html          - Form-based data entry
```

### Documentation Files

```
✅ POWERPOINT_EMBEDDING_GUIDE.md   - This comprehensive guide
✅ REFINERIES_DATA_COMPLETE.md     - Complete data documentation
✅ REFINERIES_QUICK_START.md       - Quick reference guide
✅ CRITICAL_MINERALS_MAP_GUIDE.md  - Interactive map usage
```

---

## Recommended Workflow by Presentation Type

### Executive Briefing (High-Level)
1. Use **Method 3 (Screenshot)** for simplicity
2. One slide with all 31 facilities
3. Second slide with 18 priority facilities
4. Add text boxes with key insights:
   - "Quebec dominates with 17 facilities (55%)"
   - "11 aluminum smelters, mostly in Quebec"
   - "No operational lithium refineries yet"

### Investor Presentation (Interactive)
1. Use **Method 1 (Interactive HTML)**
2. Embed full interactive map on one slide
3. Allow investors to click and explore
4. Include live counter for credibility
5. Follow with **Method 2** table slide for detailed breakdown

### Technical Report (Comprehensive)
1. Use **Method 4 (Print to PDF)**
2. Create multi-page PDF with all views
3. Include as appendix in PowerPoint
4. Add **Method 2** tables for raw data
5. Reference page numbers in main presentation

### Educational/Training (Detailed)
1. Combine all methods:
   - **Slide 1:** Screenshot overview (Method 3)
   - **Slide 2:** Interactive exploration (Method 1)
   - **Slide 3:** Data table (Method 2)
   - **Slide 4:** Summary statistics (from static HTML)
2. Allow audience to explore at their own pace

---

## PowerPoint-Specific Tips

### For Windows PowerPoint

**Embedding HTML:**
1. Insert → Object
2. Select "Create from File"
3. Browse to HTML file
4. Uncheck "Display as icon"
5. Check "Link to file" for auto-updates

**Embedding PDF:**
1. Insert → Object
2. Select "Adobe Acrobat Document"
3. Browse to PDF
4. Adjust size and position

### For Mac PowerPoint

**Embedding HTML:**
1. Insert → Object → HTML File from Web
2. Browse to local HTML file
3. Resize embedded frame
4. Test in slideshow mode

**Embedding PDF:**
1. Insert → Picture → Picture from File
2. Select PDF (imports as image)
3. Or use Insert → Object → File for full PDF

### For PowerPoint Online / Office 365

**Note:** Online version has limited embedding support

**Best approach:**
1. Use **Method 3 (Screenshot)** for images
2. Upload HTML files to OneDrive
3. Insert as hyperlink to open in browser
4. Or use Insert → Online Pictures for screenshots

---

## Troubleshooting

### Interactive HTML not working in PowerPoint

**Issue:** HTML file doesn't display or interact

**Solutions:**
1. Check PowerPoint version (needs 2016 or later)
2. Enable macros/scripts: File → Options → Trust Center → Enable All Content
3. Try opening HTML in browser first to verify it works
4. Save PowerPoint as .pptx (not .ppt)
5. Fallback: Use screenshot method instead

### Tables pasting incorrectly

**Issue:** Table formatting breaks when pasted

**Solutions:**
1. Use "Paste Special" → "HTML Format"
2. Or manually copy column by column
3. Or insert as object instead of pasting
4. Adjust table borders in PowerPoint: Table Design → Borders

### File size too large

**Issue:** PowerPoint file becomes huge

**Solutions:**
1. Compress embedded objects: File → Compress Pictures
2. Use screenshots at lower resolution (1920x1080 max)
3. Link to external files instead of embedding
4. Use Method 2 (static HTML) which is smaller

### Maps not displaying correctly

**Issue:** Maps show blank or distorted

**Solutions:**
1. Ensure internet connection (for tile loading)
2. Wait 5-10 seconds for tiles to load
3. Try refreshing the page
4. Check browser console for errors
5. Verify Supabase credentials in `.env`

---

## Advanced: Custom Export Button

Want a one-click export? Add this to any HTML page:

```javascript
function exportForPowerPoint() {
    // Clone the document
    const clone = document.cloneElement.outerHTML;

    // Create blob
    const blob = new Blob([clone], { type: 'text/html' });

    // Download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'powerpoint-export.html';
    a.click();
    URL.revokeObjectURL(url);
}
```

Add button:
```html
<button onclick="exportForPowerPoint()">Export for PowerPoint</button>
```

---

## Data Updates

When new facilities come online:

1. **Update Database:**
   - Open `/mining-data-admin.html`
   - Enter new facility details
   - Submit to database

2. **Update Static HTML:**
   - Open `refineries-static.html`
   - Add row to table manually
   - Update counters (31 → 32, etc.)

3. **Re-export:**
   - Download new HTML files
   - Replace in PowerPoint
   - Or take new screenshots

---

## Summary

You now have **4 methods** to embed Canadian refineries data into PowerPoint:

1. **Interactive HTML** - Best for digital presentations with live exploration
2. **Static HTML** - Best for data tables and quick copy-paste
3. **Screenshot** - Best for universal compatibility and quick slides
4. **Print to PDF** - Best for reports and detailed appendices

All methods display:
- **31 total refineries** (Government of Canada official data)
- **18 priority mineral refineries** (Al, Co, Cu, Ni, Li)
- **Geographic distribution** across 5 provinces
- **Operator details** and facility types

Choose the method that best fits your presentation style and audience needs.

---

**Files Ready:**
- ✅ `refineries-powerpoint.html` - Interactive dual-view
- ✅ `refineries-static.html` - Static tables
- ✅ `critical-minerals-map.html` - Main interactive map

**Next Step:** Open any file and choose your preferred export method!
