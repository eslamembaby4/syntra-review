# Mining Map - Simple Setup

## For PowerPoint Presentations (Static)

### File: `mining-map.html`

**What it does:**
- Full-screen interactive map with all 43 mining locations hardcoded
- No database connection needed
- Perfect for screenshots

**How to use:**
1. Open `mining-map.html` in your browser
2. Zoom and pan to your desired view
3. Take a screenshot (Windows: Win+Shift+S, Mac: Cmd+Shift+4)
4. Paste into PowerPoint

**Features:**
- Color-coded markers (green=operational, orange=development, purple=projects, gray=closed)
- Click markers for details
- Clean legend overlay
- Fully responsive

---

## To Update Mining Data

### File: `export-mining-data.html`

**When to use:**
- When mining-map-admin.html has been used to add/update locations in the database
- You want to refresh the static map with new data

**Steps:**
1. Open `export-mining-data.html` in browser
2. Click "Load from Database"
3. Click "Copy to Clipboard"
4. Open `mining-map.html` in a text editor
5. Find the `const LOCATIONS = [...]` array
6. Replace it with the copied data
7. Save the file

---

## For Managing Data (Dynamic)

### File: `mining-map-admin.html`

**What it does:**
- Full admin interface to add, edit, delete locations
- Saves directly to Supabase database
- Real-time updates

**How to use:**
1. Open `mining-map-admin.html`
2. Add/edit mining locations as needed
3. When ready to update static map, use `export-mining-data.html`

---

## The Logic

**Static Map (mining-map.html)**
- All 43 locations hardcoded in JavaScript
- No API calls, no database
- Works offline
- Perfect for presentations
- Fast loading

**Admin Panel (mining-map-admin.html)**
- Updates database
- Use when data changes

**Export Tool (export-mining-data.html)**
- Bridges the gap
- Pulls from database, formats for static map
- Copy/paste workflow

This approach gives you the best of both worlds:
- Static, reliable map for PowerPoint
- Dynamic admin when you need to update data
