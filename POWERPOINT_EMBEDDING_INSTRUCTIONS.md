# How to Embed Refineries Map in PowerPoint

## ✅ Database Status
- **Database**: Connected and working
- **Processing Facilities**: 31 locations available
- **Priority Minerals**: Aluminum, Cobalt, Copper, Nickel, Lithium

---

## 🎯 Recommended Methods for PowerPoint

### **Method 1: PDF Export (BEST FOR PRESENTATIONS)**

1. **Open the page** in your browser:
   - Navigate to `refineries-powerpoint.html`
   - Wait for both maps to fully load

2. **Click "Print to PDF"** button or use browser print:
   - **Chrome/Edge**: Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
   - Select "Save as PDF" as the destination
   - **Layout**: Landscape
   - **Scale**: 100% or "Fit to page"
   - Save as `canadian-refineries.pdf`

3. **Insert PDF into PowerPoint**:
   - Open PowerPoint → Insert → Pictures → Picture from File
   - Select your PDF file
   - Each page of the PDF can be inserted as an image
   - Resize to fit your slide

**✅ Pros**: Crisp quality, no dependencies, works offline
**❌ Cons**: Static image (no interactivity)

---

### **Method 2: Screenshot (FASTEST)**

1. **Open the page** in full-screen browser (F11)

2. **Take screenshots**:
   - **Windows**: `Win + Shift + S` (Snipping Tool)
   - **Mac**: `Cmd + Shift + 4` (select area)
   - Capture each map view separately

3. **Paste into PowerPoint**:
   - Paste directly (`Ctrl+V` / `Cmd+V`)
   - Or Insert → Pictures → Picture from File

**✅ Pros**: Quick and easy, exact visual match
**❌ Cons**: Resolution depends on screen quality

---

### **Method 3: HTML Embed (ADVANCED - Interactive)**

**⚠️ Important Limitations:**
- Requires internet connection during presentation
- May not work on all PowerPoint versions
- Desktop PowerPoint (Windows/Mac) has better support than web version

**Steps:**

1. **Click "Download HTML"** button
   - This saves a standalone HTML file

2. **Host the file online** (required for PowerPoint):
   - Upload to your company website
   - Or use GitHub Pages (free):
     - Create a GitHub repo
     - Upload the HTML file
     - Enable GitHub Pages in settings
     - Get the public URL (e.g., `https://yourusername.github.io/refineries.html`)

3. **Insert Web Viewer in PowerPoint**:

   **For PowerPoint 365/2019+:**
   - Insert → Online Pictures → From a Web Address
   - Or Insert → Get Add-ins → search "Web Viewer"
   - Enter the URL of your hosted HTML file

   **For PowerPoint 2016 and older:**
   - Developer tab → More Controls → Microsoft Web Browser
   - Right-click → Properties → set NavigateURL to your file URL

**✅ Pros**: Interactive maps, live data
**❌ Cons**: Requires internet, more complex setup

---

### **Method 4: Table Data Export**

1. **Click "Copy Table Data"** button
2. **Paste into PowerPoint**:
   - Insert → Table
   - Paste the copied data
   - Format as needed

**✅ Pros**: Editable data in PowerPoint
**❌ Cons**: No map visualization, just data table

---

## 🧪 Testing Checklist

Before your presentation, verify:

- [ ] Open `refineries-powerpoint.html` in browser
- [ ] Confirm both maps load correctly (View 1 shows 31 facilities, View 2 shows 18 priority facilities)
- [ ] Check that clicking markers shows facility details
- [ ] Test your chosen export method
- [ ] Verify the exported content displays correctly in PowerPoint
- [ ] If using HTML embed, test with internet connection

---

## 🔧 Troubleshooting

### Maps not loading?
- Check your internet connection (needs to load Leaflet maps)
- Open browser console (F12) to see errors
- Verify Supabase is accessible

### Export buttons not working?
- Make sure you're using a modern browser (Chrome, Edge, Firefox, Safari)
- Check if pop-ups are blocked (for PDF/download)

### Low quality in PowerPoint?
- Use PDF method instead of screenshot for best quality
- For screenshots, use highest screen resolution
- Zoom in on the map before capturing

---

## 📊 What's Displayed

**View 1: All Processing Facilities**
- 31 facilities across Canada
- 5 provinces (BC, AB, SK, ON, QC)
- All commodity types

**View 2: Priority Minerals Only**
- 18 facilities (58% of total)
- Focus on: Aluminum (11), Nickel/Cobalt (5), Copper (2)
- Critical minerals for clean energy and batteries

---

## 💡 Best Practices

1. **For static presentations**: Use PDF or Screenshot method
2. **For board meetings**: Use PDF for reliability
3. **For live demos**: Consider HTML embed (but have PDF backup)
4. **For data sharing**: Use Table Data export
5. **Always have a backup**: Export as PDF even if using interactive HTML

---

## 🌐 Page Location

**File**: `refineries-powerpoint.html`
**Access**: Open directly in any modern web browser
**URL**: `file:///path/to/your/project/refineries-powerpoint.html`

Or if hosted online: Access via your web URL

---

**Need help?** The page is fully functional and ready to use. Choose the method that best fits your presentation needs!
