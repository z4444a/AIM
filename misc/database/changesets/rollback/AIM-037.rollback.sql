ALTER TABLE aim.parameters DROP CONSTRAINT identifier_and_modifier_unique;
ALTER TABLE aim.parameters DROP CONSTRAINT identifier_regex;

ALTER TABLE aim.parameters ADD COLUMN buffer VARCHAR(30);
UPDATE aim.parameters SET buffer = identifier;
ALTER TABLE aim.parameters DROP COLUMN identifier;

ALTER TABLE aim.parameters ADD COLUMN identifier VARCHAR(30);
UPDATE aim.parameters SET identifier = buffer;
ALTER TABLE aim.parameters DROP COLUMN buffer;


