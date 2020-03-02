ALTER TABLE aim.resource_categories
  ADD COLUMN quantitative BOOLEAN;

UPDATE aim.resource_categories c
  SET quantitative = FALSE WHERE c.quantitative IS NULL;

ALTER TABLE aim.resource_categories
  ALTER COLUMN quantitative SET NOT NULL;