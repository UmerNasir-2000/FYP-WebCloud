DROP PROCEDURE IF EXISTS sql_web_cloud.admin_view_user_id;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.admin_view_user_id(IN userId int)
BEGIN
	SELECT 
		usr.id as `user_id`, 
		usr.first_name as `first_name`, 
		usr.last_name as `last_name`, 
		usr.email as `email`, 
		usr.status as `user_status`, 
		usr.profile_picture_url as `profile_picture_url`,
		proj.id as `project_id`,
		proj.project_name as `project_name`,
		proj.description as `project_description`,
		proj.is_public as `is_public`,
		proj.likes as `likes`,
		proj.createdAt as `project_created_at`,
		cfg.`database` as `database`,
		cfg.web_framework as `web_framework`
	FROM users usr 
	INNER JOIN projects proj
	ON usr.id = proj.user_id
	INNER JOIN configurations cfg
	ON proj.id = cfg.project_id  
	WHERE usr.id = userId AND usr.status != "Deleted";
END$$
DELIMITER ;
