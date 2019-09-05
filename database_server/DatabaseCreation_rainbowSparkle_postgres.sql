-- *************************************************************************************
-- CS340 Section 400/401 Summer 2019 Quarter                                          **
-- Project created by: Group 15 "Rainbow Sparkles"                                    **
-- Carrie Davis and Sarah Turner                                                                                   **
-- *************************************************************************************
-- *************************************************************************************
-- CS340 Section 400/401 Summer 2019 Quarter                                          **
-- Project created by: "Group" 15 "Rainbow Sparkles"                                    **
-- Carrie Davis and Sarah Turner                                                                                   **
-- *************************************************************************************

DROP TABLE IF EXISTS Character;
DROP TABLE IF EXISTS Job;
DROP TABLE IF EXISTS Type;
/* use double quotes because group happens to be reserved word in postgres */
DROP TABLE IF EXISTS "Group";
DROP TABLE IF EXISTS City;
DROP TABLE IF EXISTS Character_Job;

CREATE TABLE Type (
id serial PRIMARY KEY,
type_name VARCHAR(25) NOT NULL DEFAULT 'Unknown',
flight BOOLEAN,
magic BOOLEAN,
equestrian BOOLEAN
);

CREATE TABLE City(
id serial PRIMARY KEY,
city_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
characteristics VARCHAR(256)
)

CREATE TABLE Job(
id serial PRIMARY KEY,
job_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
type_exclusive BOOLEAN DEFAULT FALSE,
type_id INT NULL,
CONSTRAINT job_type_id_type_id_fkey FOREIGN KEY (type_id) REFERENCES Type (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "Group"(
id serial PRIMARY KEY,
"Group"_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
city_id INT NULL,
CONSTRAINT "Group"_city_id_city_id_fkey FOREIGN KEY (city_id) REFERENCES City (id)   ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TYPE gender_t as ENUM('M','F','O');

CREATE TABLE Character(
id serial PRIMARY KEY,
name VARCHAR(100) NOT NULL,
type_id INT NULL,
"Group"_id INT NULL,
gender gender_t NOT NULL,
city_id INT NULL,
CONSTRAINT character_type_id_type_id_fkey FOREIGN KEY (type_id) REFERENCES Type (id)  ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT character_"Group"_id_"Group"_id_fkey FOREIGN KEY ("Group"_id) REFERENCES "Group" (id)  ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT character_city_id_city_id_fkey FOREIGN KEY (city_id) REFERENCES City (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Character_Job(
character_id INT NOT NULL,
job_id INT NOT NULL,
PRIMARY KEY (character_id, job_id),
CONSTRAINT character_job_character_character_id_fkey FOREIGN KEY (character_id) REFERENCES Character (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT character_job_job_id_job_id_fkey FOREIGN KEY (job_id) REFERENCES Job (id) ON DELETE CASCADE ON UPDATE CASCADE
)

-- City Tests
INSERT INTO City (city_name, characteristics)
VALUES ('PonyVille', 'small farm town');

INSERT INTO City (city_name, characteristics)
VALUES ('Canterlot', 'royalty headquarters');

INSERT INTO City (city_name, characteristics)
VALUES ('Manehattan', 'metro hot spot');

INSERT INTO City (city_name, characteristics)
VALUES ('Cloudsdale', 'city in the clouds');

INSERT INTO City (city_name, characteristics)
VALUES ('Las Pegasus', 'showbiz center');

-- Type Tests
INSERT INTO Type(type_name, flight, magic, equestrian)
VALUE ('Unicorn',0,1,1);

INSERT INTO Type(type_name, flight, magic, equestrian)
VALUE ('Pegasus',1,0,0);

INSERT INTO Type(type_name, flight, magic, equestrian)
VALUE ('Alicorn',1,1,1);

INSERT INTO Type(type_name, flight, magic, equestrian)
VALUE ('Earth Pony',0,0,1);

-- Job Tests
INSERT INTO Job(job_name, type_exclusive, type_id)
VALUES ('Monarch', 1, (SELECT id FROM Type WHERE type_name = 'Alicorn'));

INSERT INTO Job(job_name, type_exclusive, type_id)
VALUES ('Librarian', 0, NULL);

-- "Group" Tests
INSERT INTO "Group"("Group"_name, city_id)
VALUE ('Mane Six', (SELECT id FROM City WHERE city_name = 'PonyVille'));

INSERT INTO "Group"("Group"_name, city_id)
VALUE ('Method Mares', (SELECT id FROM City WHERE city_name = 'Manehattan'));


-- Character Tests
INSERT INTO Character (name, type_id, "Group"_id, gender, city_id)
VALUES ('Applejack', (SELECT id FROM Type WHERE type_name = 'Earth Pony'),
(SELECT id FROM "Group" WHERE "Group"_name = 'Mane Six'), 'F', (SELECT id FROM City WHERE city_name = 'Ponyville'));

INSERT INTO Character (name, type_id, "Group"_id, gender, city_id)
VALUES ('Twilight Sparkle', (SELECT id FROM Type WHERE type_name = 'Unicorn'),
(SELECT id FROM "Group" WHERE "Group"_name = 'Mane Six'), 'F', (SELECT id FROM City WHERE city_name = 'Canterlot'));

INSERT INTO Character (name, type_id, "Group"_id, gender, city_id)
VALUES ('Rainbow Dash', (SELECT id FROM Type WHERE type_name = 'Pegasus'), (SELECT id FROM "Group" WHERE "Group"_name = 'Mane Six'), 'F',
(SELECT id FROM City WHERE city_name = 'Cloudsdale'));

INSERT INTO Character (name, type_id, "Group"_id, gender, city_id)
VALUES ('Princess Celestia', (SELECT id FROM Type WHERE type_name = 'Alicorn'), NULL , 'F',
(SELECT id FROM City WHERE city_name = 'Canterlot'));


-- Character Job tests
INSERT INTO Character_Job (character_id, job_id)
VALUES ((SELECT id FROM Character WHERE name = 'Twilight Sparkle'), (SELECT id FROM Job WHERE job_name = 'Librarian'));

