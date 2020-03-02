ALTER TABLE aim.parameter_value_constraint
    ADD COLUMN min_date_today BOOLEAN DEFAULT FALSE NOT NULL;

ALTER TABLE aim.parameter_value_constraint
    ADD COLUMN max_date_today BOOLEAN DEFAULT FALSE NOT NULL;