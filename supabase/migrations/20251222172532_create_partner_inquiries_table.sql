/*
  # Create partner_inquiries table

  1. New Tables
    - `partner_inquiries`
      - `id` (uuid, primary key) - Unique identifier
      - `company_name` (text) - Name of the company
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone number
      - `message` (text) - Inquiry message
      - `created_at` (timestamptz) - Timestamp of inquiry submission
  
  2. Security
    - Enable RLS on `partner_inquiries` table
    - Add policy for anonymous users to insert inquiries (public form)
    - No read/update/delete policies (admin only access via service role)
*/

CREATE TABLE IF NOT EXISTS partner_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit partner inquiry"
  ON partner_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);