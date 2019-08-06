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
id INT AUTO_INCREMENT PRIMARY KEY,
type_name VARCHAR(25) NOT NULL DEFAULT 'Unknown',
flight BOOLEAN,
magic BOOLEAN,
equestrian BOOLEAN
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `City`(
id INT AUTO_INCREMENT PRIMARY KEY,
city_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
characteristics VARCHAR(256)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Job`(
id INT AUTO_INCREMENT PRIMARY KEY,
job_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
type_exclusive BOOLEAN DEFAULT 0,
type_id INT NULL,
FOREIGN KEY (`type_id`) REFERENCES `Type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Group`(
id INT AUTO_INCREMENT PRIMARY KEY,
group_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
city_id INT NULL,
FOREIGN KEY (`city_id`) REFERENCES `City` (`id`)   ON DELETE SET NULL ON UPDATE CASCADE 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Character`(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
type_id INT NULL,
group_id INT NULL,
gender ENUM('M','F','O') NOT NULL,
city_id INT NULL,
FOREIGN KEY (`type_id`) REFERENCES `Type` (`id`)  ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`group_id`) REFERENCES `Group` (`id`)  ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
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
INSERT INTO `City` (city_name, characteristics)
VALUES ('PonyVille', 'small farm town');

INSERT INTO `City` (city_name, characteristics)
VALUES ('Canterlot', 'royalty headquarters');

INSERT INTO `City` (city_name, characteristics)
VALUES ('Manehattan', 'metro hot spot');

INSERT INTO `City` (city_name, characteristics)
VALUES ('Cloudsdale', 'city in the clouds');

INSERT INTO `City` (city_name, characteristics)
VALUES ('Las Pegasus', 'showbiz center');

-- Type Tests
INSERT INTO `Type`(type_name, flight, magic, equestrian)
VALUE ('Unicorn',0,1,1);

INSERT INTO `Type`(type_name, flight, magic, equestrian)
VALUE ('Pegasus',1,0,1);

INSERT INTO `Type`(type_name, flight, magic, equestrian)
VALUE ('Alicorn',1,1,1);

INSERT INTO `Type`(type_name, flight, magic, equestrian)
VALUE ('Earth Pony',0,0,1);

-- Job Tests
INSERT INTO `Job`(job_name, type_exclusive, type_id)
VALUES ('Monarch', 1, (SELECT id FROM `Type` WHERE type_name = 'Alicorn'));

INSERT INTO `Job`(job_name, type_exclusive, type_id)
VALUES ('Librarian', 0, NULL);

-- Group Tests
INSERT INTO `Group` (group_name, city_id)
VALUE ('Mane Six', (SELECT id FROM `City` WHERE city_name = 'PonyVille'));

INSERT INTO `Group` (group_name, city_id)
VALUE ('Method Mares', (SELECT id FROM `City` WHERE city_name = 'Manehattan'));


-- Character Tests
INSERT INTO `Character` (name, type_id, group_id, gender, city_id)
VALUES ('Applejack', (SELECT id FROM `Type` WHERE type_name = 'Earth Pony'), 
(SELECT id FROM `Group` WHERE group_name = 'Mane Six'), 'F', (SELECT id FROM `City` WHERE city_name = 'Ponyville'));

INSERT INTO `Character` (name, type_id, group_id, gender, city_id)
VALUES ('Twilight Sparkle', (SELECT id FROM `Type` WHERE type_name = 'Unicorn'), 
(SELECT id FROM `Group` WHERE group_name = 'Mane Six'), 'F', (SELECT id FROM `City` WHERE city_name = 'Canterlot'));

INSERT INTO `Character` (name, type_id, group_id, gender, city_id)
VALUES ('Rainbow Dash', (SELECT id FROM `Type` WHERE type_name = 'Pegasus'), (SELECT id FROM `Group` WHERE group_name = 'Mane Six'), 'F', 
(SELECT id FROM `City` WHERE city_name = 'Cloudsdale'));

INSERT INTO `Character` (name, type_id, group_id, gender, city_id)
VALUES ('Princess Celestia', (SELECT id FROM `Type` WHERE type_name = 'Alicorn'), NULL , 'F', 
(SELECT id FROM `City` WHERE city_name = 'Canterlot'));


-- Character Job tests
INSERT INTO `Character_Job` (character_id, job_id)
VALUES ((SELECT id FROM `Character` WHERE name = 'Twilight Sparkle'), (SELECT id FROM `Job` WHERE job_name = 'Librarian'));

