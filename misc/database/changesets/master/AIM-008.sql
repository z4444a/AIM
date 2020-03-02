ALTER TABLE aim.employees DROP CONSTRAINT fk_employees_post;
ALTER TABLE aim.employees DROP COLUMN post_id;
DROP TABLE aim.posts;
ALTER TABLE aim.employees ADD COLUMN post character varying(90) NOT NULL;
