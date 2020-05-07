DROP DATABASE IF EXISTS UserDao3;
CREATE DATABASE UserDao3;
USE UserDao3;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS UserRoles;

CREATE TABLE Users (
    id CHAR(36),
    username varchar(255) UNIQUE,
    password varchar(255),
    CPRnummer varchar(255),
    PRIMARY KEY(id, username)
);

CREATE TABLE Roles(
	id CHAR(36),
    rolename varchar(255),
    PRIMARY KEY(id, rolename)
);

CREATE TABLE UserRoles(
    userid CHAR(36) NOT NULL,
    roleid CHAR(36) NOT NULL,
    PRIMARY KEY (userid, roleid),
    CONSTRAINT fk_userid FOREIGN KEY (userid)
    REFERENCES users(id),
    CONSTRAINT fk_roleid FOREIGN KEY (roleid)
    REFERENCES roles(id)
);
INSERT INTO roles
VALUES ("089c0268-0eb5-465d-ac91-334c90bd6d60", "Admin"), ("c88f3498-9fe6-4036-a4f9-9e9f796c93d9", "Pharmaceut"), ("642097d0-01f8-4de8-a3e8-61368defee8a", "Produktionsleder"), ("8a57a4d5-7abf-42de-b255-007c87d7b948", "Laborant");

/* HERFRA BEHØBES IKKE UDFØRES DA DET BLOT ER TIL TEST */
INSERT INTO users
VALUES ("c9c59968-9805-431c-837c-0f8581e85881", "kagen", "koden", "1010951999");
INSERT INTO userroles
VALUES ("c9c59968-9805-431c-837c-0f8581e85881", "c88f3498-9fe6-4036-a4f9-9e9f796c93d9");
UPDATE users SET username="blah", password="lala", cprnummer="1234569393" WHERE id="c9c59968-9805-431c-837c-0f8581e85881";
SELECT * FROM users;
SELECT username, rolename FROM roles, userroles, users WHERE roles.id = userroles.roleid AND users.id = userroles.userid;

