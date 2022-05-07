DROP PROCEDURE IF EXISTS sql_web_cloud.get_all_repositories;

DELIMITER $$
$$
CREATE DEFINER=`root`@`%` PROCEDURE `sql_web_cloud`.`get_all_repositories`()
BEGIN
	SELECT 
	   proj.id AS `project_id`,
	   proj.project_name AS `project_name`, 
	   proj.description AS `project_description`, 
	   proj.likes AS `project_likes`,
	   proj.createdAt AS `project_createdAt`,
	   proj.is_public  AS `project_is_public`,
	   usr.first_name AS `user_first_name`,
	   usr.last_name AS `user_last_name`,
	   usr.profile_picture_url  AS `user_profile_picture_url`,
	   usr.email AS `user_email`,
	   cfg.web_framework AS `web_framework`,
	   cfg.`database`  AS `database`  
	FROM projects proj
	INNER JOIN users usr
	ON usr.id = proj.user_id 
	INNER JOIN configurations cfg
	ON proj.id = cfg.project_id 
	WHERE usr.status = "Enable";
END$$
DELIMITER ;
