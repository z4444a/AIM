ALTER TABLE aim.parameter_value_constraint
    DROP COLUMN min_real_value,
    DROP COLUMN max_real_value;

ALTER TABLE aim.parameter_value
    DROP COLUMN real_value;

ALTER TABLE aim.pool_parameter_values
    DROP COLUMN real_value;