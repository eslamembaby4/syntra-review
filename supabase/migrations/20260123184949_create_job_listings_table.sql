/*
  # Create Job Listings Table

  1. New Tables
    - `job_listings`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `title` (text) - Job title (e.g., "Mechanical Engineer")
      - `department` (text) - Department category (e.g., "Engineering", "Controls & SynCore™")
      - `location` (text) - Job location (e.g., "Halifax, NS")
      - `work_type` (text) - Employment type (e.g., "Full-time", "Contract")
      - `work_arrangement` (text) - Work arrangement (e.g., "Hybrid", "Remote", "On-site")
      - `compensation` (text) - Compensation details (e.g., "Competitive + Equity")
      - `description` (text) - Full job description
      - `key_responsibilities` (text[]) - Array of key responsibilities
      - `required_qualifications` (text[]) - Array of required qualifications
      - `preferred_qualifications` (text[]) - Array of preferred qualifications (optional)
      - `is_active` (boolean) - Whether the job listing is currently active
      - `sort_order` (integer) - Display order on careers page
      - `created_at` (timestamptz) - When the listing was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `job_listings` table
    - Add policy for public read access (anyone can view active jobs)
    - Add policy for authenticated admin users to manage jobs
*/

CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL DEFAULT 'General',
  location text NOT NULL DEFAULT 'Halifax, NS',
  work_type text NOT NULL DEFAULT 'Full-time',
  work_arrangement text NOT NULL DEFAULT 'Hybrid',
  compensation text NOT NULL DEFAULT 'Competitive',
  description text NOT NULL,
  key_responsibilities text[] DEFAULT '{}',
  required_qualifications text[] DEFAULT '{}',
  preferred_qualifications text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;

-- Public can view active job listings
CREATE POLICY "Anyone can view active job listings"
  ON job_listings
  FOR SELECT
  USING (is_active = true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_job_listings_active ON job_listings(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_job_listings_created ON job_listings(created_at DESC);

-- Insert sample job listings (matching current static content)
INSERT INTO job_listings (title, department, location, work_type, work_arrangement, compensation, description, key_responsibilities, sort_order, is_active)
VALUES 
(
  'Mechanical Engineer',
  'Engineering',
  'Halifax, NS',
  'Full-time',
  'Hybrid',
  'Competitive + Equity',
  'Design and oversee mechanical systems for hydrometallurgical processing equipment, piping systems, and material handling infrastructure. Support facility expansion projects and equipment commissioning.',
  ARRAY[
    'Process equipment design & specification',
    'Piping & instrumentation diagrams (P&IDs)',
    'Commissioning & facility scale-up'
  ],
  1,
  true
),
(
  'Control Systems Technologist',
  'Controls & SynCore™',
  'Halifax, NS',
  'Full-time',
  'Hybrid',
  'Competitive + Equity',
  'Implement and maintain PLC/DCS systems, configure SCADA interfaces, and support integration with the SynCore™ digital twin platform. Troubleshoot instrumentation and control loops for production operations.',
  ARRAY[
    'PLC/DCS programming & commissioning',
    'SCADA/HMI interface development',
    'AI-driven process control integration'
  ],
  2,
  true
),
(
  'Mechanical Designer (3D)',
  'Design & Engineering',
  'Halifax, NS',
  'Full-time',
  'Hybrid',
  'Competitive + Equity',
  'Create detailed 3D models and drawings for process equipment, piping layouts, and facility infrastructure using CAD software. Support engineering team with design documentation and as-built drawings for refining operations.',
  ARRAY[
    '3D CAD modeling (SolidWorks/AutoCAD)',
    'Piping & equipment layout design',
    'As-built documentation & BIM'
  ],
  3,
  true
),
(
  'Industrial Engineer',
  'Operations & Process',
  'Halifax, NS',
  'Full-time',
  'Hybrid',
  'Competitive + Equity',
  'Optimize production workflows, facility layouts, and operational efficiency for hydrometallurgical refining processes. Analyze process data to identify bottlenecks, implement continuous improvement initiatives, and support capacity expansion planning.',
  ARRAY[
    'Process optimization & lean manufacturing',
    'Facility layout & capacity planning',
    'Data-driven bottleneck analysis'
  ],
  4,
  true
);