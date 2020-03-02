ALTER TABLE aim.parameters
    ADD COLUMN multivalued BOOLEAN DEFAULT FALSE NOT NULL;

ALTER TABLE aim.parameter_value_constraint
    ADD COLUMN multiple_max INTEGER CHECK (multiple_max > 0 AND multiple_max < 51);