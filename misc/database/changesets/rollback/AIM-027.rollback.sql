ALTER TABLE aim.parameters
    ADD COLUMN technical boolean NOT NULL;

DELETE FROM aim.parameters
	WHERE modifier_id = 3;

UPDATE aim.parameters
	SET technical = CASE
	WHEN modifier_id = 2 THEN 1
	WHEN modifier_id = 1 THEN 0
	ELSE modifier_id
END;

ALTER TABLE aim.parameters
    DROP CONSTRAINT fk_modifier;

ALTER TABLE aim.parameters
    DROP COLUMN modifier_id;

DROP TABLE aim.parameter_modifiers;