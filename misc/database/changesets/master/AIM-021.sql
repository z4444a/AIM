ALTER TABLE aim.parameter_value_constraint
    ADD COLUMN min_real_value REAL,
    ADD COLUMN max_real_value REAL;

ALTER TABLE aim.parameter_value
    ADD COLUMN real_value REAL;

ALTER TABLE aim.pool_parameter_values
    ADD COLUMN real_value REAL;