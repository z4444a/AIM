--Тип выделения ресурса: автоматический, полуавтоматический, ручной
CREATE TABLE aim.type_allocation (
    type_allocation_id    integer  PRIMARY KEY ,
    name                  varchar(30) NOT NULL
);
INSERT INTO aim.type_allocation VALUES(1,'Автоматический'),(2,'Полуавтоматический'),(3,'Ручной');

--Тип ресурса
CREATE SEQUENCE aim.resource_categories_seq;
CREATE TABLE aim.resource_categories (
    resource_category_id       integer PRIMARY KEY DEFAULT nextval('aim.resource_categories_seq'),
    name                       varchar(20) NOT NULL,
    description                text,
    picture_id                 integer,
    need_backup                boolean NOT NULL, --необходимость backup
    active                     boolean NOT NULL  --активна ли категория
);
ALTER SEQUENCE aim.resource_categories_seq OWNED BY aim.resource_categories.resource_category_id ;


--Пул ресурсов
CREATE SEQUENCE aim.resource_pools_seq;
CREATE TABLE aim.resource_pools (
    resource_pool_id            integer  PRIMARY KEY DEFAULT nextval('aim.resource_pools_seq'),
    name                         varchar(40) NOT NULL,
    description                  text,
    capacity                     integer NOT NULL,
    type_allocation_id           integer NOT NULL,
    resource_category_id         integer NOT NULL,
    priority                     integer NOT NULL,
    state_monitoring_available   boolean NOT NULL, --возможен ли мониторинг состояния
    active                       boolean NOT NULL  --активен ли пул ресурсов
);
ALTER SEQUENCE aim.resource_pools_seq OWNED BY aim.resource_pools.resource_pool_id;

ALTER TABLE aim.resource_pools
ADD CONSTRAINT fk_res_allocation FOREIGN KEY (type_allocation_id) REFERENCES aim.type_allocation (type_allocation_id);

ALTER TABLE aim.resource_pools
ADD CONSTRAINT fk_category FOREIGN KEY (resource_category_id) REFERENCES aim.resource_categories (resource_category_id);


--Должность
CREATE SEQUENCE aim.posts_seq;
CREATE TABLE aim.posts (
    post_id        integer  PRIMARY KEY DEFAULT nextval('aim.posts_seq'),
    name           varchar(30) NOT NULL
);
ALTER SEQUENCE aim.posts_seq OWNED BY aim.posts.post_id;

--Роли
CREATE TABLE aim.roles (
    role_id       integer PRIMARY KEY,
    name          varchar(30) NOT NULL
);


--Сотрудники
CREATE SEQUENCE aim.employees_seq;
CREATE TABLE aim.employees (
    employee_id        integer  PRIMARY KEY DEFAULT nextval('aim.employees_seq'),
    first_name         varchar(30) NOT NULL,
    last_name          varchar(30) NOT NULL,
    middle_name        varchar(30),
    post_id            integer NOT NULL,
    role_id            integer NOT NULL
);
ALTER SEQUENCE aim.employees_seq OWNED BY aim.employees.employee_id;

ALTER TABLE aim.employees
ADD CONSTRAINT fk_employees_post FOREIGN KEY (post_id) REFERENCES aim.posts (post_id);

ALTER TABLE aim.employees
ADD CONSTRAINT fk_employees_role FOREIGN KEY (role_id) REFERENCES aim.roles (role_id);


--Таблица для раскрытия связи многие-ко-многим между пулом ресурсов и владельцами
CREATE TABLE aim.resources_owners (
    resource_pool_id         integer NOT NULL,
    owner_id             integer NOT NULL,
    PRIMARY KEY(owner_id,resource_pool_id )
);

ALTER TABLE aim.resources_owners
ADD CONSTRAINT fk_resources FOREIGN KEY (resource_pool_id) REFERENCES aim.resource_pools (resource_pool_id);

ALTER TABLE aim.resources_owners
ADD CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES aim.employees (employee_id);


--Статус проекта
CREATE TABLE aim.project_status (
    project_status_id  integer  PRIMARY KEY,
    name               varchar(30) NOT NULL
);

--Проекты
CREATE SEQUENCE aim.projects_seq;
CREATE TABLE aim.projects (
    project_id    integer  PRIMARY KEY DEFAULT nextval('aim.projects_seq'),
    name          varchar(30) NOT NULL,
    status_id     integer NOT NULL
);
ALTER SEQUENCE aim.projects_seq OWNED BY aim.projects.project_id;

ALTER TABLE aim.projects
ADD CONSTRAINT fk_project_status FOREIGN KEY (status_id) REFERENCES aim.project_status (project_status_id);


--Таблица для раскрытия связи многие-ко-многим между сотрудниками и проектами
CREATE TABLE aim.employees_projects (
    project_id            integer NOT NULL,
    employee_id           integer NOT NULL,
    PRIMARY KEY(employee_id,project_id)
);

ALTER TABLE aim.employees_projects
ADD CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES aim.projects (project_id);

ALTER TABLE aim.employees_projects
ADD CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES aim.employees (employee_id);


--Иконка типа ресурса
CREATE SEQUENCE aim.category_picture_seq;
CREATE TABLE aim.category_picture (
    category_picture_id   integer PRIMARY KEY DEFAULT nextval('aim.category_picture_seq'),
    picture               bytea,
    picture_path          text
);
ALTER SEQUENCE aim.category_picture_seq OWNED BY aim.category_picture.category_picture_id;


--Статус запроса
CREATE TABLE aim.request_status(
    request_status_id  integer  PRIMARY KEY,
    name               varchar(30) NOT NULL
);
INSERT INTO aim.request_status VALUES (1,'Новая'),(2,'В работе'),(3,'Исполнена'),(4,'Отменена');


--Заявка на аренду ресурса
CREATE SEQUENCE aim.requests_seq;
CREATE TABLE aim.requests (
    request_id            integer PRIMARY KEY DEFAULT nextval('aim.requests_seq'),
    datetime_creation     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    category_id           integer NOT NULL,  --тип ресурса
    resource_pools_id     integer,
    date_start_using      date,
    date_finish_using     date,
    author_id             integer NOT NULL,
    project_id            integer NOT NULL,
    responsive_id         integer,
    status_id             integer NOT NULL,
    description           text,
    pause                 boolean NOT NULL,  --приостановлено ли использование
    need_backup           boolean NOT NULL,  --необходим ли backup
    state_monitoring      boolean NOT NULL,  --необходим ли мониторинг состояния
    state                 varchar(20)

);
ALTER SEQUENCE aim.requests_seq OWNED BY aim.requests.request_id;

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_category FOREIGN KEY (category_id) REFERENCES aim.resource_categories (resource_category_id);

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_resources FOREIGN KEY (resource_pools_id) REFERENCES aim.resource_pools (resource_pool_id);

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_author FOREIGN KEY (author_id) REFERENCES aim.employees (employee_id);

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_project FOREIGN KEY (project_id) REFERENCES aim.projects (project_id);

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_responsive FOREIGN KEY (responsive_id) REFERENCES aim.employees (employee_id);

ALTER TABLE aim.requests
ADD CONSTRAINT fk_request_status FOREIGN KEY (status_id) REFERENCES aim.request_status (request_status_id);


--Комментарий
CREATE SEQUENCE aim.comments_seq;
CREATE TABLE aim.comments (
    comment_id           integer PRIMARY KEY DEFAULT nextval('aim.comments_seq'),
    request_id           integer NOT NULL,
    employee_id          integer NOT NULL,
    datetime             timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content              text
);
ALTER SEQUENCE aim.comments_seq OWNED BY aim.comments.comment_id;

ALTER TABLE aim.comments
ADD CONSTRAINT fk_comment_request FOREIGN KEY (request_id) REFERENCES aim.requests (request_id);

ALTER TABLE aim.comments
ADD CONSTRAINT fk_comment_author FOREIGN KEY (employee_id) REFERENCES aim.employees (employee_id);



--Файлы комментария
CREATE SEQUENCE aim.comments_files_seq;
CREATE TABLE aim.comments_files (
    comments_file_id    integer PRIMARY KEY DEFAULT nextval('aim.comments_files_seq'),
    comment_id          integer NOT NULL,
    file                bytea NOT NULL
);
ALTER SEQUENCE aim.comments_files_seq OWNED BY aim.comments_files.comments_file_id;

ALTER TABLE aim.comments_files
ADD CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES aim.comments(comment_id);


--Статус команды агента очереди
CREATE TABLE aim.command_status(
    command_status_id   integer  PRIMARY KEY,
    name                varchar(30) NOT NULL
);

--Тип команды: grant, revoke, pause, resume
CREATE TABLE aim.command_types(
    command_type_id      integer PRIMARY KEY,
    name                 varchar(30) NOT NULL
);

INSERT INTO aim.command_types VALUES (1,'grant'),(2,'revoke'),(3,'pause'),(4,'resume');


--Команда агента очереди
CREATE SEQUENCE aim.commands_seq;
CREATE TABLE aim.commands (
    command_id           integer PRIMARY KEY DEFAULT nextval('aim.commands_seq'),
    request_id           integer NOT NULL,
    name                 varchar(30) NOT NULL,
    command_type_id      integer NOT NULL,
    priority             integer,
    status_id            integer NOT NULL
);
ALTER SEQUENCE aim.commands_seq OWNED BY aim.commands.command_id ;

ALTER TABLE aim.commands
ADD CONSTRAINT fk_command_type FOREIGN KEY (command_type_id) REFERENCES aim.command_types (command_type_id);

ALTER TABLE aim.commands
ADD CONSTRAINT fk_command_status FOREIGN KEY (status_id) REFERENCES aim.command_status (command_status_id);

--Тип параметра: число, дата, тект, список, файл
CREATE TABLE aim.parameter_types(
    parameter_type_id   integer PRIMARY KEY,
    name                varchar(30) NOT NULL
);

INSERT INTO aim.parameter_types VALUES (1,'число'),(2,'дата'),(3,'текст'),(4,'список');


--Ограничение на значение параметров
CREATE SEQUENCE aim.parameter_value_constraint_seq;
CREATE TABLE aim.parameter_value_constraint (
    parameter_value_constraint_id   integer PRIMARY KEY DEFAULT nextval('aim.parameter_value_constraint_seq'),
    min_number_value                integer,
    max_number_value                integer,
    min_date_value                  date,
    max_date_value                  date,
    max_string_length               integer
);
ALTER SEQUENCE aim.parameter_value_constraint_seq OWNED BY aim.parameter_value_constraint.parameter_value_constraint_id;


--Параметр
CREATE SEQUENCE aim.parameters_seq;
CREATE TABLE aim.parameters(
    parameter_id          integer PRIMARY KEY DEFAULT nextval('aim.parameters_seq'),
    identifier            varchar(30) NOT NULL,
    category_id           integer NOT NULL,
    parameter_type_id     integer NOT NULL,
    name                  varchar(20) NOT NULL,
    technical             boolean NOT NULL,   --является техническим
    required              boolean NOT NULL,   --является обязательным
    constraint_value_id   integer
);
ALTER SEQUENCE aim.parameters_seq OWNED BY aim.parameters.parameter_id;

ALTER TABLE aim.parameters
ADD CONSTRAINT fk_parameter_category FOREIGN KEY (category_id) REFERENCES aim.resource_categories (resource_category_id);

ALTER TABLE aim.parameters
ADD CONSTRAINT fk_parameter_type FOREIGN KEY (parameter_type_id) REFERENCES aim.parameter_types (parameter_type_id);

ALTER TABLE aim.parameters
ADD CONSTRAINT fk_parameter_value_constraint FOREIGN KEY (constraint_value_id) REFERENCES aim.parameter_value_constraint (parameter_value_constraint_id);


--Список возможных значений параметра
CREATE SEQUENCE aim.value_list_seq;
CREATE TABLE aim.value_list (
    value_list_id       integer PRIMARY KEY DEFAULT nextval('aim.value_list_seq'),
    parameter_id        integer NOT NULL,
    content             varchar(30) NOT NULL
);
ALTER SEQUENCE aim.value_list_seq OWNED BY aim.value_list.value_list_id;

ALTER TABLE aim.value_list
ADD CONSTRAINT fk_list_parameter FOREIGN KEY (parameter_id) REFERENCES aim.parameters (parameter_id);


--Значение параметра
CREATE SEQUENCE aim.parameter_value_seq;
CREATE TABLE aim.parameter_value(
    parameter_value_id  integer PRIMARY KEY DEFAULT nextval('aim.parameter_value_seq'),
    parameter_id        integer NOT NULL,
    request_id          integer NOT NULL,
    number_value        integer,
    string_value        text,
    date_value          timestamp,
    list_value_id       integer
);
ALTER SEQUENCE aim.parameter_value_seq OWNED BY aim.parameter_value.parameter_value_id;

ALTER TABLE aim.parameter_value
ADD CONSTRAINT fk_list_value FOREIGN KEY (list_value_id) REFERENCES aim.value_list (value_list_id);

ALTER TABLE aim.parameter_value
ADD CONSTRAINT fk_parameter FOREIGN KEY (parameter_id) REFERENCES aim.parameters (parameter_id);

ALTER TABLE aim.parameter_value
ADD CONSTRAINT fk_request FOREIGN KEY (request_id) REFERENCES aim.requests (request_id);