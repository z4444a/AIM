ALTER TABLE aim.parameters ADD COLUMN multivalued BOOLEAN DEFAULT FALSE NOT NULL;
ALTER TABLE aim.parameter_value DROP COLUMN "order";
ALTER TABLE aim.pool_parameter_values DROP COLUMN "order";

