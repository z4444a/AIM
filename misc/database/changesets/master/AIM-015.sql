ALTER TABLE aim.master
    ADD COLUMN employee_id INTEGER NOT NULL;

ALTER TABLE aim.master
    ADD CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES aim.employees (employee_id);