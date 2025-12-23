/*
  # Add registration identifier to tables

  1. Changes
    - Add `registration_number` column to `registrations` table
      - Type: integer
      - Auto-incrementing sequence starting from 1
      - Not null with unique constraint
      - Default value from sequence
    
    - Add `registration_number` column to `contest_registrations` table
      - Type: integer
      - Auto-incrementing sequence starting from 1
      - Not null with unique constraint
      - Default value from sequence

    - Add `registration_number` column to `partner_inquiries` table
      - Type: integer
      - Auto-incrementing sequence starting from 1
      - Not null with unique constraint
      - Default value from sequence
  
  2. Security
    - No RLS changes needed
  
  3. Important Notes
    - Creates separate sequences for each table to ensure unique numbering
    - Backfills existing records with sequential numbers
    - New registrations will automatically get the next number in sequence
*/

-- Create sequence for registrations
CREATE SEQUENCE IF NOT EXISTS registrations_number_seq START WITH 1 INCREMENT BY 1;

-- Add registration_number column to registrations table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'registration_number'
  ) THEN
    ALTER TABLE registrations 
    ADD COLUMN registration_number integer UNIQUE DEFAULT nextval('registrations_number_seq');
    
    -- Backfill existing records
    UPDATE registrations 
    SET registration_number = nextval('registrations_number_seq')
    WHERE registration_number IS NULL;
    
    -- Make it NOT NULL after backfilling
    ALTER TABLE registrations ALTER COLUMN registration_number SET NOT NULL;
  END IF;
END $$;

-- Create sequence for contest_registrations
CREATE SEQUENCE IF NOT EXISTS contest_registrations_number_seq START WITH 1 INCREMENT BY 1;

-- Add registration_number column to contest_registrations table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contest_registrations' AND column_name = 'registration_number'
  ) THEN
    ALTER TABLE contest_registrations 
    ADD COLUMN registration_number integer UNIQUE DEFAULT nextval('contest_registrations_number_seq');
    
    -- Backfill existing records
    UPDATE contest_registrations 
    SET registration_number = nextval('contest_registrations_number_seq')
    WHERE registration_number IS NULL;
    
    -- Make it NOT NULL after backfilling
    ALTER TABLE contest_registrations ALTER COLUMN registration_number SET NOT NULL;
  END IF;
END $$;

-- Create sequence for partner_inquiries
CREATE SEQUENCE IF NOT EXISTS partner_inquiries_number_seq START WITH 1 INCREMENT BY 1;

-- Add registration_number column to partner_inquiries table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'partner_inquiries' AND column_name = 'inquiry_number'
  ) THEN
    ALTER TABLE partner_inquiries 
    ADD COLUMN inquiry_number integer UNIQUE DEFAULT nextval('partner_inquiries_number_seq');
    
    -- Backfill existing records
    UPDATE partner_inquiries 
    SET inquiry_number = nextval('partner_inquiries_number_seq')
    WHERE inquiry_number IS NULL;
    
    -- Make it NOT NULL after backfilling
    ALTER TABLE partner_inquiries ALTER COLUMN inquiry_number SET NOT NULL;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_number ON registrations(registration_number);
CREATE INDEX IF NOT EXISTS idx_contest_registrations_number ON contest_registrations(registration_number);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_number ON partner_inquiries(inquiry_number);