# Canada Critical Minerals Map

## Overview

An interactive map displaying Canadian critical minerals mines, processing facilities, and advanced projects across all provinces and territories.

## Features

### Interactive Map (`critical-minerals-map.html`)
- **Leaflet.js** powered interactive map centered on Canada
- **All locations displayed** - comprehensive view of all mines, facilities, and projects
- **Color-coded markers** indicating type and status:
  - 🟢 Green: Operational Mines
  - 🔵 Blue: Processing Facilities
  - 🟠 Orange: Under Development
  - 🟣 Purple: Advanced Projects
  - ⚫ Gray: Closed/Inactive
- **Interactive popups** with detailed information on each location

### Real-time Statistics
- Total locations count
- Active mines count
- Processing facilities count
- Advanced projects count

### Database Backend
- Supabase PostgreSQL database
- Secure Row Level Security (RLS) policies
- Public read access for map data
- Geographic indexing for performance

## Current Data

The database contains **43 mining locations** including:
- **28 mines** across Canada
- **2 processing facilities**
- **13 advanced projects**
- Coverage across all major mining provinces

### Critical Minerals Tracked
- Lithium
- Cobalt
- Nickel
- Copper
- Rare Earth Elements (REE)
- Platinum Group Elements (PGE)
- Graphite
- Zinc
- Uranium
- Potash
- Diamonds
- Iron
- Molybdenum
- And more...

## Files

1. **critical-minerals-map.html** - Main interactive map interface
2. **mining-data-admin.html** - Data administration and entry interface
3. **Database Migration** - `supabase/migrations/create_mining_locations_table.sql`

## Data Sources

### Official Government Data
The system is designed to work with official Canadian government data:

- **Open Government Portal**: https://open.canada.ca/data/en/dataset/22b2db8a-dc12-47f2-9737-99d3da921751
- **Interactive Map**: https://atlas.gc.ca/critical-minerals/en/index.html
- **Downloadable Data**: Shapefile and GeoJSON formats available

### Adding More Data

#### Method 1: Admin Interface
1. Open `mining-data-admin.html`
2. Fill in the location details form
3. Enter coordinates (latitude/longitude)
4. Specify minerals (comma-separated)
5. Click "Add Location"

#### Method 2: Bulk Import
Use the Supabase SQL console to bulk import data:

```sql
INSERT INTO mining_locations (name, type, minerals, latitude, longitude, province, status, operator, description)
VALUES
('Mine Name', 'mine', ARRAY['Lithium', 'Cobalt'], 45.5000, -75.5000, 'Ontario', 'operational', 'Company Name', 'Description here');
```

#### Method 3: Import from Shapefile
If you download the official shapefile from Natural Resources Canada:
1. Convert shapefile to GeoJSON using tools like QGIS or ogr2ogr
2. Parse the GeoJSON to extract coordinates and attributes
3. Import into Supabase database

## Usage

### View the Map
1. Open `critical-minerals-map.html` in a web browser
2. The map automatically loads and displays all mining locations from the database
3. Click on any marker to view detailed information about that location
4. Pan and zoom to explore different regions across Canada
5. View the statistics dashboard at the top for an overview of all locations

## Database Schema

```sql
mining_locations (
  id                uuid PRIMARY KEY
  name              text NOT NULL
  type              text (mine | processing_facility | advanced_project)
  minerals          text[] (array of mineral names)
  latitude          numeric NOT NULL
  longitude         numeric NOT NULL
  province          text NOT NULL
  status            text (operational | under_development | planned | closed)
  operator          text
  description       text
  created_at        timestamptz
  updated_at        timestamptz
)
```

## Security

- **Row Level Security (RLS)** enabled
- **Public read access** for map viewing (anon and authenticated users)
- **Authenticated write access** for data management
- **Geographic indexes** for performance

## Future Enhancements

Potential additions to the system:
1. **Filtering and search** - Add controls to filter by type, province, mineral, or status
2. **Heat maps** showing mineral concentration by region
3. **Production statistics** integration
4. **Export functionality** (CSV, GeoJSON, KML)
5. **Routing analysis** for supply chain optimization
6. **Real-time status updates** from operators
7. **Mobile responsive design** improvements
8. **Clustering** for better visualization at low zoom levels
9. **Time series data** showing mine openings/closures over time

## Technology Stack

- **Frontend**: HTML5, JavaScript (ES6+), Leaflet.js
- **Database**: Supabase PostgreSQL with PostGIS extensions
- **Styling**: Custom CSS with Syntra brand theme
- **Fonts**: Inter, Oswald, JetBrains Mono
- **Map Tiles**: OpenStreetMap

## Support

For questions or issues:
1. Check database connection in browser console
2. Verify Supabase credentials in `.env` file
3. Ensure RLS policies are properly configured
4. Review migration files for schema changes

## License

This mapping system is built for SYNTRA's internal use and strategic planning. Data sources are credited to Natural Resources Canada and respective provincial/territorial governments.
