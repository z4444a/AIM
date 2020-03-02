ALTER TABLE aim.pool_parameter_values DROP CONSTRAINT fk_parameter;
ALTER TABLE aim.pool_parameter_values ADD CONSTRAINT fk_parameter FOREIGN KEY (parameter_id)
        REFERENCES aim.parameters (parameter_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

ALTER TABLE aim.parameter_value DROP CONSTRAINT fk_parameter;
ALTER TABLE aim.parameter_value ADD CONSTRAINT fk_parameter FOREIGN KEY (parameter_id)
        REFERENCES aim.parameters (parameter_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

ALTER TABLE aim.list_values DROP CONSTRAINT fk_parameter;
ALTER TABLE aim.list_values ADD CONSTRAINT fk_list_parameter FOREIGN KEY (parameter_id)
        REFERENCES aim.parameters (parameter_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

ALTER TABLE aim.parameter_value_constraint DROP CONSTRAINT fk_parameter;
ALTER TABLE aim.parameter_value_constraint ADD CONSTRAINT fk_parameter FOREIGN KEY (parameter_id)
        REFERENCES aim.parameters (parameter_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;
