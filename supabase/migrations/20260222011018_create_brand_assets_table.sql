/*
  # Create Brand Assets Table

  ## Summary
  Creates a table to store Syntra brand assets and marketing materials.

  ## New Tables
  - `brand_assets`
    - `id` (uuid, primary key)
    - `name` (text) - display name of the asset
    - `filename` (text) - original filename
    - `asset_type` (text) - category: logo, wordmark, icon, brochure, etc.
    - `variant` (text) - color variant: dark, light, yellow, etc.
    - `description` (text) - description of intended use
    - `file_url` (text) - URL or path to file
    - `storage_path` (text) - Supabase storage path
    - `metadata` (jsonb) - additional metadata
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public SELECT (brand assets are public)
  - Admin-only INSERT/UPDATE/DELETE
*/

CREATE TABLE IF NOT EXISTS brand_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  filename text NOT NULL,
  asset_type text NOT NULL DEFAULT 'logo',
  variant text NOT NULL DEFAULT 'default',
  description text,
  file_url text,
  storage_path text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand assets are publicly viewable"
  ON brand_assets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert brand assets"
  ON brand_assets FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update brand assets"
  ON brand_assets FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can delete brand assets"
  ON brand_assets FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE OR REPLACE FUNCTION update_brand_assets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER brand_assets_updated_at
  BEFORE UPDATE ON brand_assets
  FOR EACH ROW EXECUTE FUNCTION update_brand_assets_updated_at();
