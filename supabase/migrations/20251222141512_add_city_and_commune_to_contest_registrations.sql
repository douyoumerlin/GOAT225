/*
  # Add city and commune columns to contest_registrations table

  1. Changes
    - Add `city` column to `contest_registrations` table
      - Type: text
      - Required field (NOT NULL)
    - Add `commune` column to `contest_registrations` table
      - Type: text
      - Required field (NOT NULL)
  
  2. Notes
    - These fields capture location information for contest participants
    - Both fields are mandatory to ensure complete participant data
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contest_registrations' AND column_name = 'city'
  ) THEN
    ALTER TABLE contest_registrations 
    ADD COLUMN city text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contest_registrations' AND column_name = 'commune'
  ) THEN
    ALTER TABLE contest_registrations 
    ADD COLUMN commune text NOT NULL DEFAULT '';
  END IF;
END $$;