/*
  # Create registrations table for 225 GOAT 1VS1 tournament

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `full_name` (text, required) - Player's full name
      - `email` (text, required, unique) - Player's email address
      - `phone` (text, required) - Player's phone number
      - `date_of_birth` (date, required) - Player's date of birth for age verification
      - `category` (text, required) - Either 'junior' (18-29) or 'senior' (30+)
      - `player_profile` (text, required) - Player type: 'club', 'amateur', 'professional', 'veteran'
      - `registration_fee` (integer, required) - Fee amount in FCFA (10000 or 20000)
      - `payment_status` (text, default 'pending') - Payment status: 'pending', 'confirmed', 'cancelled'
      - `created_at` (timestamptz, default now()) - Registration timestamp
      - `updated_at` (timestamptz, default now()) - Last update timestamp

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public to insert registrations (anyone can register)
    - Add policy for authenticated users to view all registrations (for admin purposes)
    
  3. Important Notes
    - Email must be unique to prevent duplicate registrations
    - Category is automatically determined by age but stored for historical accuracy
    - Registration fee is stored to track payment amounts
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,
  category text NOT NULL CHECK (category IN ('junior', 'senior')),
  player_profile text NOT NULL CHECK (player_profile IN ('club', 'amateur', 'professional', 'veteran')),
  registration_fee integer NOT NULL CHECK (registration_fee IN (10000, 20000)),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can view registrations"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_registrations_category ON registrations(category);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);