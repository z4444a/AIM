ALTER TABLE aim.pool_parameter_values
    ALTER COLUMN date_value TYPE timestamp USING date_value::timestamp;

ALTER TABLE aim.parameter_value
    ALTER COLUMN date_value TYPE timestamp USING date_value::timestamp;