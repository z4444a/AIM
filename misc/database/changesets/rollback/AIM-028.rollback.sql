ALTER TABLE aim.resource_pools
ADD COLUMN capacity integer;

UPDATE aim.resource_pools
SET capacity = total_capacity;

ALTER TABLE aim.resource_pools
ALTER COLUMN capacity SET NOT NULL;

ALTER TABLE aim.resource_pools
DROP COLUMN total_capacity CASCADE,
DROP COLUMN current_capacity CASCADE;