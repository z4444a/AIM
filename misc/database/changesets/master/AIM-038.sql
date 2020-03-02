INSERT INTO aim.parameter_types(parameter_type_id, name) VALUES (6, 'пул ресурсов');

ALTER TABLE aim.parameters ADD COLUMN pool_type_id INTEGER;
ALTER TABLE aim.parameters ADD CONSTRAINT ch_pool_type CHECK (parameter_type_id <> 6 OR (modifier_id = 1 AND pool_type_id IS NOT NULL));


ALTER TABLE aim.parameters ADD CONSTRAINT fk_pool_type FOREIGN KEY (pool_type_id)
        REFERENCES aim.resource_categories (resource_category_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
;

ALTER TABLE aim.pool_parameter_values ADD COLUMN parameter_pool_id INTEGER;
ALTER TABLE aim.pool_parameter_values ADD CONSTRAINT fk_param_pool FOREIGN KEY (parameter_pool_id)
        REFERENCES aim.resource_pools (resource_pool_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
;