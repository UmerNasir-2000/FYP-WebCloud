DROP PROCEDURE IF EXISTS sql_web_cloud.public_repos;

DELIMITER $$
$$
CREATE DEFINER=`root`@`%` PROCEDURE `sql_web_cloud`.`public_repos`()
BEGIN
	SELECT 
	   proj.id AS `project_id`,
	   proj.project_name AS `project_name`, 
	   proj.description AS `project_description`, 
	   proj.likes AS `project_likes`,
	   proj.createdAt AS `project_createdAt`,
	   usr.id AS `user_id`,
	   usr.first_name AS `user_first_name`,
	   usr.profile_picture_url  AS `user_profile_picture_url`,
	   usr.last_name AS `user_last_name`,
	   usr.email AS `user_email`,
	   cfg.web_framework AS `web_framework`,
	   cfg.`database`  AS `database`  
	FROM projects proj
	INNER JOIN users usr
	ON usr.id = proj.user_id 
	INNER JOIN configurations cfg
	ON proj.id = cfg.project_id 
	INNER JOIN requests req
	ON proj.id  = req.project_id 
	WHERE proj.is_public = 1 AND usr.status = "Enable" 
    AND req.status = "Approved" AND usr.is_admin = 0;
END$$
DELIMITER ;
