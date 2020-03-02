ALTER TABLE aim.employees
    ADD COLUMN username VARCHAR(100),
    ADD COLUMN synchronized BOOLEAN NOT NULL DEFAULT FALSE,
    ALTER COLUMN first_name DROP NOT NULL,
    ALTER COLUMN last_name DROP NOT NULL,
    ALTER COLUMN post DROP NOT NULL;

UPDATE aim.employees
SET username = 'FAKE_' || employee_id;

ALTER TABLE aim.employees
    ADD UNIQUE (username);

UPDATE
    aim.employees
SET username = (SELECT login
                FROM aim.master)
WHERE employee_id = -1;
