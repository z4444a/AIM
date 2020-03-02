ALTER TABLE aim.requests
ADD COLUMN created_by_id integer;

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_created_by FOREIGN KEY (created_by_id) REFERENCES aim.employees (employee_id);


UPDATE aim.requests
SET created_by_id = author_id;

ALTER TABLE aim.requests
ALTER COLUMN created_by_id SET NOT NULL;