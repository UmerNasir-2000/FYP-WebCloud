DROP PROCEDURE IF EXISTS sql_web_cloud.public_repos;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.public_repos()
BEGIN
	SELECT 
	   proj.project_name AS `project_name`, 
	   proj.description AS `project_description`, 
	   proj.likes AS `project_likes`,
	   proj.createdAt AS `project_createdAt`,
	   usr.first_name AS `user_first_name`,
	   usr.last_name AS `user_last_name`,
	   usr.email AS `user_email`,
	   cfg.web_framework AS `web_framework`,
	   cfg.`database`  AS `database`  
	FROM projects proj
	INNER JOIN users usr
	ON usr.id = proj.user_id 
	INNER JOIN configurations cfg
	ON proj.id = cfg.project_id 
	WHERE proj.is_public = 1 AND usr.status = "Enable";
END$$
DELIMITER ;
