ALTER TABLE aim.requests
    RENAME COLUMN capacity TO amount;

--Модификатор параметра: параметр пула, запроса или выделения.
CREATE TABLE aim.parameter_modifiers (
    id    integer  PRIMARY KEY ,
    name                  varchar(30) NOT NULL
);

INSERT INTO aim.parameter_modifiers(id, name)
VALUES  (1, 'параметр запроса'),
        (2, 'параметр пула'),
        (3, 'параметр выделения');

ALTER TABLE aim.parameters
    ADD COLUMN modifier_id INTEGER;

UPDATE aim.parameters
	SET modifier_id=CASE
	WHEN technical THEN 2
	ELSE 1
END;

ALTER TABLE aim.parameters
    ADD CONSTRAINT fk_modifier FOREIGN KEY (modifier_id) REFERENCES aim.parameter_modifiers;

ALTER TABLE aim.parameters
    DROP COLUMN technical;

ALTER TABLE aim.parameters
  ALTER COLUMN modifier_id SET NOT NULL;
