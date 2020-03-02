ALTER TABLE aim.list_values
    ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;
UPDATE aim.list_values val
SET "order" = (
	SELECT count(*)
	FROM aim.list_values lv
	WHERE lv.parameter_id = val.parameter_id AND lv.list_value_id < val.list_value_id
);