DELETE FROM aim.parameter_value_constraint
WHERE parameter_id IN
      (SELECT parameter_id
       FROM aim.parameters p
       WHERE p.name IN ('Тип лицензии', 'Количество лицензий'));

DELETE FROM aim.parameters
WHERE category_id IN
      (SELECT resource_category_id
       FROM aim.resource_categories c
       WHERE c.name = 'Лицензия на ПО');

DELETE FROM aim.resource_categories
WHERE "name" = 'Лицензия на ПО';


DELETE FROM aim.list_values
WHERE parameter_id IN
      (SELECT parameter_id
       FROM aim.parameters p
       WHERE p.identifier = 'vm_drive_type');

DELETE FROM aim.parameters
WHERE category_id IN
      (SELECT resource_category_id id
       FROM aim.resource_categories c
       WHERE c.name = 'Виртуальная машина');

DELETE FROM aim.resource_categories
WHERE name = 'Виртуальная машина';
