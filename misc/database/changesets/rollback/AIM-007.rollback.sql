ALTER TABLE aim.requests
  ADD COLUMN state VARCHAR(20);

UPDATE aim.requests r
SET state = (SELECT name
             FROM aim.request_state s
             WHERE s.request_state_id = r.state_id)
WHERE (state_id IS NOT NULL);

ALTER TABLE aim.requests
  DROP COLUMN state_id;

DROP TABLE aim.request_state;