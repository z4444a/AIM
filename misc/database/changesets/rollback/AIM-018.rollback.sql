ALTER TABLE aim.employees
    DROP COLUMN username,
    DROP COLUMN synchronized,
    ALTER COLUMN first_name SET NOT NULL,
    ALTER COLUMN last_name SET NOT NULL,
    ALTER COLUMN post SET NOT NULL;
