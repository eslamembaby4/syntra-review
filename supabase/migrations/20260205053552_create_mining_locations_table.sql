/*
  # Create Mining Locations Table
  
  1. New Tables
    - `mining_locations`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the mine or processing facility
      - `type` (text) - Type: 'mine', 'processing_facility', 'advanced_project'
      - `minerals` (text[]) - Array of critical minerals
      - `latitude` (numeric) - Location latitude
      - `longitude` (numeric) - Location longitude
      - `province` (text) - Province/Territory
      - `status` (text) - Status: 'operational', 'under_development', 'planned'
      - `operator` (text) - Operating company
      - `description` (text) - Additional details
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `mining_locations` table
    - Add policy for public read access (public map data)
    - Add policy for authenticated admin insert/update
*/

CREATE TABLE IF NOT EXISTS mining_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('mine', 'processing_facility', 'advanced_project')),
  minerals text[] DEFAULT '{}',
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  province text NOT NULL,
  status text NOT NULL CHECK (status IN ('operational', 'under_development', 'planned', 'closed')),
  operator text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE mining_locations ENABLE ROW LEVEL SECURITY;

-- Public can view all mining locations
CREATE POLICY "Public can view mining locations"
  ON mining_locations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can insert (for admin purposes)
CREATE POLICY "Authenticated users can insert mining locations"
  ON mining_locations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update mining locations"
  ON mining_locations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete mining locations"
  ON mining_locations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for geographic queries
CREATE INDEX IF NOT EXISTS idx_mining_locations_coords ON mining_locations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_mining_locations_province ON mining_locations(province);
CREATE INDEX IF NOT EXISTS idx_mining_locations_type ON mining_locations(type);
CREATE INDEX IF NOT EXISTS idx_mining_locations_minerals ON mining_locations USING GIN(minerals);
