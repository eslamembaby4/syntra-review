# Refineries Map - Quick Start Guide

## Your Map is Ready!

Open `/critical-minerals-map.html` to see all 31 Canadian refineries from the official Government of Canada dataset.

## Two Clicks for PowerPoint

### Slide 1: All Refineries (31 total)
1. Open the map - default view
2. Screenshot
3. Done

### Slide 2: Priority Minerals Only (18 refineries)
1. Click "Al, Co, Cu, Ni, Li Only" button
2. Screenshot
3. Done

## What's Included

### Aluminum Refineries (11 - Quebec/BC/Ontario)
- Alouette (QC) - Rio Tinto
- Baie-Comeau (QC) - Alcoa
- Grande-Baie (QC) - Rio Tinto
- Laterrière (QC) - Rio Tinto
- Vaudreuil Works (QC) - Rio Tinto
- Arvida (QC) - Rio Tinto
- Alma (QC) - Rio Tinto
- Deschambault (QC) - Alcoa
- Bécancour (QC) - Alcoa
- Mississauga (ON) - Real Alloy
- Kitimat (BC) - Rio Tinto

### Nickel & Cobalt Refineries (5)
- Long Harbour (NL) - Vale
- Port Colborne (ON) - Vale
- Sudbury (ON) - Glencore
- Copper Cliff Complex (ON) - Vale
- The Cobalt Refinery Company (AB) - Sherritt

### Copper Refineries (2)
- CCR (QC) - Glencore
- Horne (QC) - Glencore

### Other Refineries (13 - filtered out in View 2)
Including: Iron, Uranium, Zinc, Lead, Silicon, Titanium, Magnesium, and specialty metals

## Key Features

✅ Blue square markers for all refineries
✅ Two-button filter system
✅ Orange badges for priority minerals (Al, Co, Cu, Ni, Li)
✅ Live counter showing number of refineries
✅ Click markers for details
✅ Full-screen layout perfect for screenshots

## Admin Panels

Need to add more refineries?

1. `/mining-map-admin.html` - Table view with edit/delete
2. `/mining-data-admin.html` - Form-based data entry

Both panels work now - you can add, edit, and delete refineries.

## What the Filter Does

**"Show All Refineries"** - Shows all 31 facilities from the Government of Canada dataset

**"Al, Co, Cu, Ni, Li Only"** - Filters to 18 facilities processing priority minerals:
- Keeps: Aluminum, Cobalt, Copper, Nickel, Lithium
- Removes 13 facilities: Iron, Uranium, Zinc, Lead, Silicon, Titanium, Magnesium, and specialty metals

Result: 18 refineries focused on clean energy and battery materials

## Files Created

```
✅ critical-minerals-map.html           - Your main map
✅ mining-map-admin.html                - Admin interface (table view)
✅ mining-data-admin.html               - Admin interface (form view)
✅ CRITICAL_MINERALS_MAP_GUIDE.md       - Detailed guide
✅ ADMIN_PANELS_FIXED.md                - Admin panel fixes
✅ REFINERIES_MAP_COMPLETE.md           - Complete documentation
✅ REFINERIES_QUICK_START.md            - This file
```

## Database

**Table:** `mining_locations`
**Refineries:** 31 processing facilities
**Data Source:** Government of Canada official registry
**Supabase:** Connected and working

## Data Breakdown

- **31 total refineries** (all operational)
- **18 priority mineral refineries** (Al, Co, Cu, Ni, Li)
- **13 other mineral refineries** (filtered out in View 2)
- **17 in Quebec** (55% of total)
- **8 in Ontario** (26% of total)
- **2 each** in BC, Alberta, and Newfoundland & Labrador

## Next Steps

1. Open the map to see all 31 facilities
2. Try both filter buttons
3. Take your PowerPoint screenshots
4. (Optional) Add new facilities via admin panel as they come online

## Key Insights

- **Quebec dominates aluminum** production (9 of 11 smelters)
- **Ontario leads nickel/cobalt** processing (3 of 5 facilities)
- **No operational lithium refineries** in Canada yet (gap in battery supply chain)
- **Rio Tinto is largest operator** (8 facilities, all aluminum)

---

That's it! Your refineries map now displays the complete official dataset with two presentation views.
