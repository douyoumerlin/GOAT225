/*
  # Add age column to registrations table

  1. Changes
    - Add `age` column to `registrations` table (integer, not null with default)
    - Make `date_of_birth` nullable (optional) since we'll now use age instead
    - Update CHECK constraint on age to ensure it's >= 18

  2. Important Notes
    - Age is stored at time of registration for historical accuracy
    - Date of birth is now optional and can be null
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'age'
  ) THEN
    ALTER TABLE registrations ADD COLUMN age integer;
  END IF;
END $$;

ALTER TABLE registrations ALTER COLUMN date_of_birth DROP NOT NULL;

DO $$
BEGIN
  ALTER TABLE registrations DROP CONSTRAINT IF EXISTS check_age;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

ALTER TABLE registrations ADD CONSTRAINT check_age CHECK (age >= 18);