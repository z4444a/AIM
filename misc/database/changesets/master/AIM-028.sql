ALTER TABLE aim.resource_pools
ADD COLUMN total_capacity integer,
ADD COLUMN current_capacity integer;

UPDATE aim.resource_pools
SET total_capacity = capacity, current_capacity = capacity;

ALTER TABLE aim.resource_pools
ALTER COLUMN total_capacity SET NOT NULL,
ALTER COLUMN current_capacity SET NOT NULL;

ALTER TABLE aim.resource_pools
DROP COLUMN capacity CASCADE;