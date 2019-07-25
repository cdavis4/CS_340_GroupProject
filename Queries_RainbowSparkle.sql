-- *************************************************************************************
--                                                                                    **
-- Queries against the MLP Database for CS340 Section 400/401 Summer 2019 Quarter     **
-- Project created by: Group 15 "Rainbow Sparkles"                                    **          
-- Carrie Davis & Sarah Turner                                                        **
-- *************************************************************************************


-- ***************
-- CITY Queries **
-- ***************

-- Query for selecting a city from the database
SELECT * FROM `City` WHERE name='city_name';

-- Query for adding a new city into the database
INSERT INTO `City` (name, characteristics)
VALUES (city_name, city_characteristics);

-- Query for deleting a city from the database
DELETE FROM `City` WHERE name='city_name';

-- Update Name and Characteristics separately  
UPDATE `City`
SET characteristics= new_characteristics
WHERE city_id=(SELECT id FROM `City` WHERE name='city_name');


-- ****************
-- GROUP Queries **
-- ****************

-- Query for selecting a hotel from the database using its name
SELECT * FROM `Group` WHERE name='group_name';

-- Query for selecting all groups in a given city
SELECT * FROM `Group` WHERE city_id=(SELECT id FROM `City` WHERE name='city_name');

-- Query for adding a group to the database
INSERT INTO `Group`(name, city_id)
VALUE (new_group_name, (SELECT id FROM `City` WHERE name = 'new_group_city'));

-- Query for removing a group from the database
DELETE FROM `Group` WHERE name='group_name';

-- ******************
-- TYPE Queries **
-- ******************

-- Query for selecting an type from the database using its name
SELECT * FROM `Type` WHERE name='type_name';

-- Query for selecting all types that are magic
SELECT * FROM `Type` WHERE magic=1;

-- Query for selecting all types that can fly
SELECT * FROM `Type` WHERE flight=1;

-- Query for selecting all types that are equestrian
SELECT * FROM `Type` WHERE equestrian=1;

-- Query for adding a type to the database
INSERT INTO `Type` (name, flight, magic, equestrian)
VALUES ('new_type', 'new_f', 'new_m', 'new_e');

-- Query for removing a type from the database
DELETE FROM `Type` WHERE name='old_type';

-- Query for updating a type magic
UPDATE `Type`
SET magic='new_magic', flight'new_flight', equestrian':new_state'
WHERE name = 'type_name';

-- *********************
-- CHARACTER Queries **
-- *********************

-- Query for selecting a character from the database using its name
SELECT * FROM `Character` WHERE name='character_name';

-- Query for selecting all characters from a given city
SELECT * FROM `Character` WHERE id=(SELECT id FROM `City` WHERE name='city_name');

-- Query for selecting all characters from a given group
SELECT * FROM `Character` WHERE id=(SELECT id FROM `Group` WHERE name ='group_name');

-- Query for selecting all characters from a given type
SELECT * FROM `Character` WHERE id=(SELECT id FROM `Type` WHERE name = 'type_name');

-- Query for adding a character to the database
INSERT INTO `Character` (name,typeOf_id, group_id, gender, city_id, photo_id)
VALUES ('new_name',(SELECT id FROM `Type` WHERE name ='type_name'),
(SELECT id from `Group` WHERE name = 'group_name'),'new_gender',
(SELECT id FROM `City` WHERE name='city_name'), 'new_photo');

-- Query for removing a character from the database
DELETE FROM `Character` WHERE name='character_name';

--Updating query character

-- *******************
-- JOB Queries **
-- *******************

-- Query for selecting a job based on its name
SELECT * FROM `Job` WHERE job='job_name';

-- Query for adding a job 
INSERT INTO `Job` (job, type_exclusive, typeOf_id)
VALUES ('new_job','type_ex',(SELECT id FROM `Type` WHERE name ='new_type_name');

-- Query for deleting a job
DELETE FROM `Job` WHERE job='old_job'

-- *******************
-- CHARACTER_JOB Queries **
-- *******************

--Query for selecting character to job table
SELECT * FROM `Character_Job` WHERE id=(SELECT id FROM `Character` WHERE name='character_name');

--Query for selecting character to job table
SELECT * FROM `Character_Job` WHERE id=(SELECT id FROM `Job` WHERE name='job_name');

--Query for inserting into Character Job
INSERT INTO `Character_Job` (character_id, job_id)
VALUES ((SELECT id FROM `Character` WHERE name ='character_name'), (SELECT id FROM `Job` WHERE job='job_name'));

--Query for deleting character job 
DELETE FROM `Character_Job` WHERE id=(SELECT id FROM `Character` WHERE name='character_name');