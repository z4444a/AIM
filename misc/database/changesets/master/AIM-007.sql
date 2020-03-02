CREATE TABLE aim.request_state
(
  request_state_id INTEGER PRIMARY KEY,
  name             VARCHAR(20) NOT NULL
);

INSERT INTO aim.request_state
VALUES (1, 'Активен'),
       (2, 'Не активен'),
       (3, 'Не отслеживается');

ALTER TABLE aim.requests
  ADD COLUMN state_id INTEGER;

ALTER TABLE aim.requests
  ADD CONSTRAINT fk_state FOREIGN KEY (state_id) REFERENCES aim.request_state;

UPDATE aim.requests r
SET state_id =
      CASE
        WHEN state IN (SELECT name FROM aim.request_state) THEN
          (SELECT request_state_id
           FROM aim.request_state s
           WHERE s.name = r.state)
        ELSE 3
        END;

ALTER TABLE aim.requests
  ALTER COLUMN state_id SET NOT NULL;

ALTER TABLE aim.requests
  DROP COLUMN state;