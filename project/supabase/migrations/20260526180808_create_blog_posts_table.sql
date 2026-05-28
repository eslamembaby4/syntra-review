/*
  # Create blog_posts table

  ## Summary
  Adds a blog_posts table so admins can author and publish articles from the admin panel.

  ## New Tables

  ### blog_posts
  - `id` (uuid, PK) — unique post identifier
  - `title` (text) — post headline
  - `slug` (text, unique) — URL-safe identifier, auto-derived from title on insert
  - `excerpt` (text, nullable) — short summary shown in listing cards
  - `body` (text) — full post content (plain text / basic markdown)
  - `cover_image_url` (text, nullable) — optional hero image URL
  - `category` (text) — e.g. "Technology", "Company", "Industry"
  - `tags` (text[]) — array of tag strings
  - `status` (text) — 'draft' | 'published' | 'archived'
  - `published_at` (timestamptz, nullable) — set when status becomes 'published'
  - `author_id` (uuid, FK → auth.users) — Supabase auth user who created the post
  - `author_name` (text) — display name cached at write time
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public SELECT only for published posts
  - INSERT/UPDATE/DELETE restricted to authenticated admins (app_metadata.role = 'admin')
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL,
  slug             text UNIQUE NOT NULL,
  excerpt          text,
  body             text NOT NULL DEFAULT '',
  cover_image_url  text,
  category         text NOT NULL DEFAULT 'General',
  tags             text[] NOT NULL DEFAULT '{}',
  status           text NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('draft','published','archived')),
  published_at     timestamptz,
  author_id        uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name      text NOT NULL DEFAULT '',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Index for fast public feed queries
CREATE INDEX IF NOT EXISTS blog_posts_status_published_at_idx
  ON blog_posts (status, published_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_blog_posts_updated_at();

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts only
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admins can read all posts (including drafts)
CREATE POLICY "Admins can read all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Admins can insert
CREATE POLICY "Admins can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Admins can update
CREATE POLICY "Admins can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Admins can delete
CREATE POLICY "Admins can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
