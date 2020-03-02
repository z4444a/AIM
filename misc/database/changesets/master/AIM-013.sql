ALTER TABLE aim.value_list
    RENAME TO list_values;

ALTER TABLE aim.list_values
    RENAME COLUMN value_list_id TO list_value_id;

ALTER SEQUENCE aim.value_list_seq
    RENAME TO list_values_seq;