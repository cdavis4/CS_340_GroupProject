-- *************************************************************************************
-- CS340 Section 400/401 Summer 2019 Quarter                                          **
-- Project created by: Group 15 "Rainbow Sparkles"                                    **
-- Carrie Davis and Sarah Turner                                                                                   **
-- *************************************************************************************

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `cs340_turnesar`.`Character`;
DROP TABLE IF EXISTS `cs340_turnesar`.`Job`;
DROP TABLE IF EXISTS `cs340_turnesar`.`Type`;
DROP TABLE IF EXISTS `cs340_turnesar`.`Group`;
DROP TABLE IF EXISTS `cs340_turnesar`.`City`;
DROP TABLE IF EXISTS `cs340_turnesar`.`Character_Job`;

CREATE TABLE `Type`(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(25) NOT NULL,
flight BOOLEAN,
magic BOOLEAN,
equestrian BOOLEAN
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `City`(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
characteristics VARCHAR(256)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Job`(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
job VARCHAR(100) NOT NULL DEFAULT 'Unknown',
type_exclusive BOOLEAN DEFAULT 0,
typeOf_id INT,
FOREIGN KEY(`typeOf_id`) REFERENCES `Type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Group`(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
city_id INT,
FOREIGN KEY(`city_id`) REFERENCES `City` (`id`) ON DELETE CASCADE ON UPDATE CASCADE 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Character`(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
typeOf_id INT NOT NULL,
group_id INT,
gender ENUM('M','F','O') NOT NULL,
city_id INT NOT NULL,
photo_id INT,
FOREIGN KEY (`typeOf_id`) REFERENCES `Type` (`id`)  ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`group_id`) REFERENCES `Group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Character_Job`(
character_id INT NOT NULL,
job_id INT NOT NULL,
PRIMARY KEY (character_id, job_id),
FOREIGN KEY (`character_id`) REFERENCES `Character` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`job_id`) REFERENCES `Job` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


SET FOREIGN_KEY_CHECKS = 1;

-- City Tests
INSERT INTO `City` (name, characteristics)
VALUES ('PonyVille', 'small farm town');

INSERT INTO `City` (name, characteristics)
VALUES ('Canterlot', 'royalty headquarters');

INSERT INTO `City` (name, characteristics)
VALUES ('Manehattan', 'metro hot spot');

INSERT INTO `City` (name, characteristics)
VALUES ('Cloudsdale', 'city in the clouds');

INSERT INTO `City` (name, characteristics)
VALUES ('Las Pegasus', 'showbiz center');

-- Type Tests
INSERT INTO `Type`(name, flight, magic, equestrian)
VALUE ('Unicorn',0,1,1);

INSERT INTO `Type`(name, flight, magic, equestrian)
VALUE ('Pegasus',1,0,1);

INSERT INTO `Type`(name, flight, magic, equestrian)
VALUE ('Alicorn',1,1,1);

INSERT INTO `Type`(name, flight, magic, equestrian)
VALUE ('Earth Pony',0,0,1);

-- Job Tests
INSERT INTO `Job`(job, type_exclusive, typeOf_id)
VALUES ('Monarch', 1, (SELECT id FROM `Type` WHERE name = 'Alicorn'));

INSERT INTO `Job`(job, type_exclusive, typeOf_id)
VALUES ('Librarian', 0, NULL);

-- Group Tests
INSERT INTO `Group` (name, city_id)
VALUE ('Mane Six', (SELECT id FROM `City` WHERE name = 'PonyVille'));

INSERT INTO `Group` (name, city_id)
VALUE ('Method Mares', (SELECT id FROM `City` WHERE name = 'Manehattan'));


-- Character Tests
INSERT INTO `Character` (name, typeOf_id, group_id, gender, city_id, photo_id)
VALUES ('Applejack', (SELECT id FROM `Type` WHERE name = 'Earth Pony'), (SELECT id FROM `Group` WHERE name = 'Mane Six'), 'F', (SELECT id FROM `City` WHERE name = 'Ponyville'),1);

INSERT INTO `Character` (name, typeOf_id, group_id, gender, city_id, photo_id)
VALUES ('Twilight Sparkle', (SELECT id FROM `Type` WHERE name = 'Unicorn'), (SELECT id FROM `Group` WHERE name = 'Mane Six'), 'F', (SELECT id FROM `City` WHERE name = 'Canterlot'), 2);

INSERT INTO `Character` (name, typeOf_id, group_id, gender, city_id, photo_id)
VALUES ('Rainbow Dash', (SELECT id FROM `Type` WHERE name = 'Pegasus'), (SELECT id FROM `Group` WHERE name = 'Mane Six'), 'F', (SELECT id FROM `City` WHERE name = 'Cloudsdale'), 3);


-- Character Job tests
INSERT INTO `Character_Job` (character_id, job_id)
VALUES ((SELECT id FROM `Character` WHERE name = 'Twilight Sparkle'), (SELECT id FROM `Job` WHERE job = 'Librarian'));

