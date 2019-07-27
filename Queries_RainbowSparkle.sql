-- *************************************************************************************
-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language
--                                                                                    **
-- Queries against the MLP Database for CS340 Section 400/401 Summer 2019 Quarter     **
-- Project created by: Group 15 "Rainbow Sparkles"                                    **          
-- Carrie Davis & Sarah Turner                                                        **
-- *************************************************************************************


-- ***************
-- CITY Queries **
-- ***************

-- Query for selecting a city from the database for dropdown
SELECT id, city_name FROM `City`;

-- Show all the things for city
SELECT city_name, characteristics FROM `City`;

-- Query for adding a new city into the database
INSERT INTO `City` (city_name, characteristics)
VALUES (:city_name, :city_characteristics);

-- Query for deleting a city from the database
DELETE FROM `City` WHERE id=':city_id_dropdown';

-- ****************
-- GROUP Queries **
-- ****************

-- Query for group dropdown
SELECT id, group_name FROM `Group`;

-- get all groups with associated cities 
SELECT Group.group_name, City.city_name    
FROM `Group` 
INNER JOIN `City` ON Group.city_id = City.id; 


-- Query for adding a group to the database
INSERT INTO `Group`(group_name, city_id)
VALUES (:new_group_name, :city_id_dropdown);

-- Query for deleting a city from the database
DELETE FROM `Group` WHERE id=':group_id_dropdown';

-- ******************
-- TYPE Queries **
-- ******************

-- Query for selecting a type for dropdown
SELECT id, type_name FROM `Type`;

-- Query for seeing all the fields for type
SELECT type_name, flight, magic, equestrian FROM `Type`;

-- Query for adding a type to the database
INSERT INTO `Type` (type_name, flight, magic, equestrian)
VALUES (':new_type', ':new_f', ':new_m', ':new_e');

-- Query for removing a type from the database
DELETE FROM `Type` WHERE id=':type_id_dropdown';

-- *********************
-- CHARACTER Queries **
-- *********************

-- Query for selecting a Character dropdown 
SELECT id, name FROM `Character`;

-- Query for selecting all characters with joins 
SELECT Character.name, Type.type_name, Group.group_name,
Character.gender, City.city_name, Character.photo_id  
FROM `Character` 
INNER JOIN `Type` ON Character.typeOf_id = Type.id 
INNER JOIN `Group` on Character.group_id = Group.id 
INNER JOIN `City` on Character.city_id = City.id
ORDER BY name;

-- Query for adding a character to the database
INSERT INTO `Character` (name,typeOf_id, group_id, gender, city_id, photo_id)
VALUES (':new_name', ':type_id_dropdown', ':group_id_dropdown', ':new_gender',
'city_id_dropdown', 'new_photo');

-- Query for removing a character from the database
DELETE FROM `Character` WHERE id=':character_id_dropdown';

--Updating query character
UPDATE `Character` SET name = :name_input, typeOf_id = :type_dropdown,
group_id = :group_dropdown,  gender= :gender_Input, city_id = :city_dropdown, photo_id = :photo_Input WHERE id= :character_form_id

-- *******************
-- JOB Queries **
-- *******************

-- Query for selecting a job on dropdown
SELECT id, job_name FROM `Job`;

-- Query for selecting type exclusive jobs  
SELECT Job.job_name As Name, Type.type_name AS Type
FROM `Job`
INNER JOIN `Type` ON Job.typeOf_id = Type.id
ORDER BY Name;

-- Query for adding a job 
INSERT INTO `Job` (job_name, type_exclusive, typeOf_id)
VALUES (':new_job',':type_ex',':type_id_dropdown');

-- Query for deleting a job
DELETE FROM `Job` WHERE job_name=':job_id_dropdown';

-- *******************
-- CHARACTER_JOB Queries **
-- *******************

--Query for inserting into Character Job
INSERT INTO `Character_Job` (character_id, job_id)
VALUES (:character_id_dropdown, :job_id_dropdown)

-- dis-associate a job from a character
DELETE FROM `Character_Job` WHERE character_id = :character_id_list AND job_id = :job_id_list

--Query for deleting character job 
DELETE FROM `Character_Job` WHERE id= :character_id_dropdown;

-- get all characters with their current associated jobs to list
SELECT Character.name, Job.job_name    
FROM `Character_Job` 
INNER JOIN `Character` ON character.id = Character_Job.character_id 
INNER JOIN `Job` on Character_Job.job_id = Job.id 
ORDER BY name, job_name;