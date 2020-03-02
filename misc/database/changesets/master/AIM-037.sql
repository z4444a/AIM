ALTER TABLE aim.parameters ADD COLUMN buffer VARCHAR(128);
UPDATE aim.parameters SET buffer = identifier;
ALTER TABLE aim.parameters DROP COLUMN identifier;

ALTER TABLE aim.parameters ADD COLUMN identifier VARCHAR(128);
UPDATE aim.parameters SET identifier = buffer;
ALTER TABLE aim.parameters DROP COLUMN buffer;

ALTER TABLE aim.parameters ADD CONSTRAINT identifier_regex CHECK (identifier IS NULL OR identifier ~ '^([a-zA-Z]\w*)?$');
