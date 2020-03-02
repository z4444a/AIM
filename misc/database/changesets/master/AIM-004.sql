CREATE TABLE aim.master
(
    login varchar(30) PRIMARY KEY,
    password char(60) NOT NULL,
    active boolean NOT NULL
);