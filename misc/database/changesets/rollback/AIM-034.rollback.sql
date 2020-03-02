DROP TABLE aim.request_status_changes;
DROP SEQUENCE aim.requests_status_changes_seq;
DELETE FROM aim.request_status WHERE request_status_id = 5;
ALTER TABLE aim.requests ADD COLUMN pause boolean DEFAULT FALSE;