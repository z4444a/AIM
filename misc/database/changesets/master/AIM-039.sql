ALTER TABLE aim.parameters DROP COLUMN multivalued;
ALTER TABLE aim.parameter_value ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE aim.pool_parameter_values ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
