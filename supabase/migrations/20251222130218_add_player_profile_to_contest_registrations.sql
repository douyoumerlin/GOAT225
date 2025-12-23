/*
  # Add player_profile column to contest_registrations

  1. Changes
    - Add `player_profile` column to `contest_registrations` table
      - Type: text
      - Required field (NOT NULL)
      - Allowed values: 'amateur' or 'professional'
      - Constraint check to ensure only valid values are accepted
  
  2. Notes
    - This allows participants to specify their playing level when registering for contests
    - Aligns with the registration form which now captures this information
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contest_registrations' AND column_name = 'player_profile'
  ) THEN
    ALTER TABLE contest_registrations 
    ADD COLUMN player_profile text NOT NULL DEFAULT 'amateur'
    CHECK (player_profile IN ('amateur', 'professional'));
  END IF;
END $$;