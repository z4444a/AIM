CREATE SEQUENCE aim.pool_parameter_value_seq;
CREATE TABLE aim.pool_parameter_values(
    parameter_value_id  integer PRIMARY KEY DEFAULT nextval('aim.pool_parameter_value_seq'),
    parameter_id        integer NOT NULL,
    pool_id             integer NOT NULL,
    number_value        integer,
    string_value        text,
    date_value          timestamp,
    list_value_id       integer
);
ALTER SEQUENCE aim.pool_parameter_value_seq OWNED BY aim.pool_parameter_values.parameter_value_id;

ALTER TABLE aim.pool_parameter_values
ADD CONSTRAINT fk_list_value FOREIGN KEY (list_value_id) REFERENCES aim.value_list (value_list_id);

ALTER TABLE aim.pool_parameter_values
ADD CONSTRAINT fk_parameter FOREIGN KEY (parameter_id) REFERENCES aim.parameters (parameter_id);

ALTER TABLE aim.pool_parameter_values
ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES aim.resource_pools (resource_pool_id);