CREATE SEQUENCE aim.posts_seq;
CREATE TABLE aim.posts (
    post_id        integer  PRIMARY KEY DEFAULT nextval('aim.posts_seq'),
    name           varchar(30) NOT NULL
);
ALTER TABLE aim.employees DROP COLUMN post;
ALTER TABLE aim.employees ADD COLUMN post_id integer NOT NULL;
ALTER TABLE aim.employees ADD CONSTRAINT fk_employees_post FOREIGN KEY (post_id) REFERENCES aim.posts (post_id);