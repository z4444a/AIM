ALTER TABLE aim.parameters DROP CONSTRAINT fk_pool_type;
ALTER TABLE aim.parameters DROP CONSTRAINT ch_pool_type;
ALTER TABLE aim.pool_parameter_values DROP CONSTRAINT fk_param_pool;
ALTER TABLE aim.parameters DROP COLUMN pool_type_id integer;
DELETE FROM aim.parameter_types WHERE parameter_type_id = 6;
ALTER TABLE aim.pool_parameter_values DROP COLUMN parameter_pool_id;
