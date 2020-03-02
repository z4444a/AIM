ALTER TABLE aim.list_values
    RENAME TO value_list;

ALTER TABLE aim.list_values
    RENAME COLUMN list_value_id TO value_list_id;

ALTER SEQUENCE aim.list_values_seq
    RENAME TO value_list_seq;