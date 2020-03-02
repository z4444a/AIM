DELETE FROM aim.parameter_types WHERE parameter_type_id = 5;

UPDATE aim.parameter_types SET name = 'число' WHERE name = 'целое число';