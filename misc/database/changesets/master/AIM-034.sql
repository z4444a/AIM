CREATE SEQUENCE aim.requests_status_changes_seq;
CREATE TABLE aim.request_status_changes
(
    id integer PRIMARY KEY DEFAULT nextval('aim.requests_status_changes_seq'::regclass),
	  request_id integer NOT NULL,
    status_id integer NOT NULL,
    datetime timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id integer NOT NULL,
    CONSTRAINT status_changes_status_fk FOREIGN KEY (status_id) REFERENCES aim.request_status (request_status_id),
    CONSTRAINT status_changes_author_fk FOREIGN KEY (author_id) REFERENCES aim.employees (employee_id),
	  CONSTRAINT status_changes_request_fk FOREIGN KEY (request_id) REFERENCES aim.requests (request_id)
);

INSERT INTO aim.request_status(request_status_id, name)
  VALUES (5, 'Приостановлена');
UPDATE aim.requests
	SET   status_id = 5, state_id = 2
	WHERE pause;
ALTER TABLE aim.requests DROP COLUMN pause;