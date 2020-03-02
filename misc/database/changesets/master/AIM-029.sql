ALTER TABLE aim.parameters
    ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
UPDATE aim.parameters param
SET "order" = (
	SELECT count(*)
	FROM aim.parameters par
	WHERE par.category_id = param.category_id AND par.parameter_id < param.parameter_id
);