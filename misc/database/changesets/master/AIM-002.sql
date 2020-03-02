--Move reference from parameter to constraint.

ALTER TABLE aim.parameter_value_constraint ADD COLUMN parameter_id INTEGER;

UPDATE aim.parameter_value_constraint c SET parameter_id =
  (SELECT parameter_id
    FROM aim.parameters p
    WHERE p.constraint_value_id = c.parameter_value_constraint_id);

ALTER TABLE aim.parameters DROP COLUMN constraint_value_id;
ALTER TABLE aim.parameter_value_constraint DROP COLUMN parameter_value_constraint_id;

ALTER TABLE aim.parameter_value_constraint ADD CONSTRAINT parameter_constraint_pk PRIMARY KEY (parameter_id);
ALTER TABLE aim.parameter_value_constraint ADD CONSTRAINT fk_parameter FOREIGN KEY (parameter_id) REFERENCES aim.parameters;