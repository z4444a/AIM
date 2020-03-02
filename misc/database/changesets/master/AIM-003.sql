--Licence resource type
INSERT INTO aim.resource_categories(name, need_backup, active)
VALUES ('Лицензия на ПО', FALSE, TRUE);

--Licence type parameter
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('licence_type', currval('aim.resource_categories_seq'), 3, 'Тип лицензии', FALSE, TRUE);

--Licence type parameter constraint
INSERT INTO aim.parameter_value_constraint(max_string_length, parameter_id)
VALUES (20, currval('aim.parameters_seq'));

--Amount of licences parameter type
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('licences_amount', currval('aim.resource_categories_seq'), 1, 'Количество лицензий', FALSE, TRUE);

--Amount of licences parameter constraint
INSERT INTO aim.parameter_value_constraint(min_number_value, parameter_id)
VALUES (1, currval('aim.parameters_seq'));


--VM resource type
INSERT INTO aim.resource_categories(name, need_backup, active)
VALUES ('Виртуальная машина', TRUE, TRUE);

--VM CPU core amount parameter
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('vm_core_amount', currval('aim.resource_categories_seq'), 1, 'Количество ядер ЦПУ', FALSE, TRUE);

--VM CPU core frequency parameter
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('vm_cpu_frequency', currval('aim.resource_categories_seq'), 1, 'Частота ядер ЦПУ', TRUE, FALSE);

--VM drive size parameter
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('vm_drive_size', currval('aim.resource_categories_seq'), 1, 'Объем ЗУ', FALSE, TRUE);

--VM drive type parameter
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('vm_drive_type', currval('aim.resource_categories_seq'), 4, 'Тип ЗУ', FALSE, TRUE);

--VM drive type values
INSERT INTO aim.value_list(parameter_id, content)
VALUES (currval('aim.parameters_seq'), 'HDD'), (currval('aim.parameters_seq'), 'SSD'), (currval('aim.parameters_seq'), 'HDD & SDD');

--VM RAM size type parameter
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('vm_ram_size', currval('aim.resource_categories_seq'), 1, 'Объем ОЗУ', FALSE, TRUE);

--VM RAM frequency
INSERT INTO aim.parameters (identifier, category_id, parameter_type_id, name, technical, required)
VALUES ('vm_ram-frequency', currval('aim.resource_categories_seq'), 1, 'Частота ОЗУ', TRUE, FALSE);