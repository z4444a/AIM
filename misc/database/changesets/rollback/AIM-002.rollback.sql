ALTER TABLE aim.parameter_value_constraint ADD COLUMN parameter_value_constraint_id INTEGER;
UPDATE aim.parameter_value_constraint SET parameter_value_constraint_id = parameter_id;

ALTER TABLE aim.parameter_value_constraint DROP COLUMN parameter_id;
ALTER TABLE aim.parameter_value_constraint ADD CONSTRAINT parameter_value_constraint_pkey PRIMARY KEY (parameter_value_constraint_id);

ALTER TABLE aim.parameters ADD COLUMN constraint_value_id INTEGER;
UPDATE aim.parameters p SET constraint_value_id =
                            (SELECT parameter_value_constraint_id
                              FROM parameter_value_constraint c
                              WHERE c.parameter_value_constraint_id = p.parameter_id);
ALTER TABLE aim.parameters ADD CONSTRAINT fk_parameter_value_constraint FOREIGN KEY (constraint_value_id) REFERENCES aim.parameter_value_constraint;