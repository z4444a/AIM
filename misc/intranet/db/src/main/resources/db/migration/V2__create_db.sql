CREATE TABLE public.users
(
    id integer PRIMARY KEY,
    login varchar(30) NOT NULL UNIQUE,
    first_name varchar(30) NOT NULL,
    middle_name varchar(30),
    last_name varchar(30) NOT NULL,
    "position" varchar(90) NOT NULL
);