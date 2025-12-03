ALTER TABLE users
    ADD COLUMN first_name VARCHAR(50),
    ADD COLUMN last_name VARCHAR(50);

UPDATE users
SET first_name = name,
    last_name = name;

ALTER TABLE users
    ALTER COLUMN first_name SET NOT NULL,
    ALTER COLUMN last_name SET NOT NULL;

ALTER TABLE users
    DROP COLUMN name;