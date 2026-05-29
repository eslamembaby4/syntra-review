# Critical Minerals Map Guide

## Overview

The critical minerals refineries map (`critical-minerals-map.html`) displays Canadian refining facilities with blue square markers, based on data inspired by the [Government of Canada's Critical Minerals Atlas](https://atlas.gc.ca/critical-minerals/en/index.html).

## Features

### Slide 1: All Refineries
- Shows **all refining facilities** as blue squares
- Click "Show All Refineries" button (default view)
- Perfect for PowerPoint screenshots showing complete refining infrastructure

### Slide 2: Priority Minerals Only
- Shows **only refineries that process Al, Co, Cu, Ni, and Li**
- Click "Al, Co, Cu, Ni, Li Only" button
- Automatically filters out refineries that don't process these critical minerals

## How to Use

### For PowerPoint Presentations

1. **All Refineries Slide:**
   - Open `critical-minerals-map.html` in browser
   - Ensure "Show All Refineries" is active (orange button)
   - Zoom/pan to desired view
   - Take screenshot (Win+Shift+S or Cmd+Shift+4)
   - Paste into PowerPoint

2. **Filtered Refineries Slide:**
   - Click "Al, Co, Cu, Ni, Li Only" button
   - The map will show only refineries processing Aluminum, Cobalt, Copper, Nickel, or Lithium
   - Take screenshot for your next slide

### Understanding the Markers

**Blue Squares** = Refining facilities

**Click any marker** to see:
- Refinery name
- Province
- Status
- Minerals processed (priority minerals shown with orange badges)

### Priority Minerals Detection

The map automatically identifies these critical minerals and their variations:
- **Aluminum** (Al, Aluminium)
- **Cobalt** (Co)
- **Copper** (Cu)
- **Nickel** (Ni)
- **Lithium** (Li)

## Data Source

Pulls from your Supabase `mining_locations` table, filtering for:
- `type = 'processing'`
- `type = 'refinery'`
- `type = 'processing_facility'`

## Tips

- Active button turns **orange** to show current filter
- Counter shows how many refineries are displayed
- Orange badges in popups highlight priority minerals
- Full-screen map makes screenshot-taking easy
