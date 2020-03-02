ALTER TABLE aim.pool_parameter_values
  ALTER COLUMN date_value TYPE date USING date_value::date;

ALTER TABLE aim.parameter_value
  ALTER COLUMN date_value TYPE date USING date_value::date;