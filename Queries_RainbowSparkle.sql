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
-- * MADE A STAR INSTEAD
SELECT * FROM `City`;

-- Query for adding a new city into the database
INSERT INTO `City` (city_name, characteristics)
VALUES (:city_name, :city_characteristics);

-- REMOVED DELETE QUERY


-- ****************
-- GROUP Queries **
-- ****************

-- Query for group dropdown
SELECT id, group_name FROM `Group`;

-- get all groups with associated cities 
-- * MADE A LEFT JOIN INSTEAD
SELECT Group.group_name, City.city_name    
FROM `Group` 
LEFT JOIN `City` ON Group.city_id = City.id; 


-- Query for adding a group to the database
INSERT INTO `Group`(group_name, city_id)
VALUES (:new_group_name, :city_id_dropdown);

-- DELETED QUERY FOR DELETE

-- ******************
-- TYPE Queries **
-- ******************

-- Query for selecting a type for dropdown
SELECT id, type_name FROM `Type`;

-- Query for seeing all the fields for type
-- * MADE A STAR INSTEAD
SELECT * FROM `Type`;

-- Query for adding a type to the database
INSERT INTO `Type` (type_name, flight, magic, equestrian)
VALUES (':new_type', ':new_f', ':new_m', ':new_e');

-- REMOVED DELETE QUERY

-- *********************
-- CHARACTER Queries **
-- *********************

-- Query for selecting a Character dropdown 
SELECT id, name FROM `Character`;

-- Query for selecting all characters with joins 
-- *UPDATED to LEFT JOINS
SELECT Character.id, Character.name, Type.type_name,
 Group.group_name, Character.gender, City.city_name 
 FROM `Character`
  LEFT JOIN `Type` ON Character.type_id = Type.id 
 LEFT JOIN `Group` ON Character.group_id = Group.id 
 LEFT JOIN `City` ON Character.city_id = City.id;   

-- Query for seelcting character by type
-- * NEW ADDITION  
SELECT Character.id, Character.name, Type.type_name, Group.group_name,
Character.gender, City.city_name
 FROM `Character`
  LEFT JOIN `Type` ON Character.type_id = Type.id 
  LEFT JOIN `Group` ON Character.group_id = Group.id 
  LEFT JOIN `City` ON Character.city_id = City.id 
  WHERE type_name =?;   

-- Query for selecting character by group 
-- * NEW ADDITION
SELECT Character.id,Character.name, Type.type_name, Group.group_name,
Character.gender, City.city_name
 FROM `Character` 
 LEFT JOIN `Type` ON Character.type_id = Type.id 
 LEFT JOIN `Group` ON Character.group_id = Group.id 
 LEFT JOIN `City` ON Character.city_id = City.id
 WHERE group_name =?;   


-- Query for adding a character to the database
INSERT INTO `Character` (name,type_id, group_id, gender, city_id)
VALUES (':new_name', ':type_id_dropdown', ':group_id_dropdown', ':new_gender',
'city_id_dropdown', 'new_photo');

-- Query for removing a character from the database
DELETE FROM `Character` WHERE id=':character_id_dropdown';

--Updating query character
-- *REMOVED photo_id
UPDATE `Character` SET name = :name_input, type_id = :type_dropdown,
group_id = :group_dropdown,  gender= :gender_Input, city_id = :city_dropdown 
WHERE id= :character_form_id

-- *******************
-- JOB Queries **
-- *******************

-- Query for selecting a job on dropdown
SELECT id, job_name FROM `Job`;

-- Query for selecting type exclusive jobs  
-- * UPDATED TO LEFT JOIN 
SELECT Job.job_name, Type.type_name
FROM `Job`
LEFT JOIN `Type` ON Job.type_id = Type.id
ORDER BY job_name;

-- Query for adding a job 
INSERT INTO `Job` (job_name, type_exclusive, type_id)
VALUES (':new_job',':type_ex',':type_id_dropdown');

-- REMOVED DELETE QUERY

-- *******************
-- CHARACTER_JOB Queries **
-- *******************

--Query for inserting into Character Job
INSERT INTO `Character_Job` (character_id, job_id)
VALUES (:character_id_dropdown, :job_id_dropdown)

-- dis-associate a job from a character
DELETE FROM `Character_Job` WHERE character_id = :character_id_list AND job_id = :job_id_list

--Query for getting IDs
-- * NEW 
SELECT * FROM Character_Job;

-- get all characters with their current associated jobs to list
-- * ADDED IDs TO LIST 
SELECT Character.id, Character.name, Job.id,
 Job.job_name 
 FROM `Character_Job` 
 INNER JOIN `Character` ON Character.id = Character_Job.character_id
 NER JOIN `Job` ON Character_Job.job_id =  Job.id;
