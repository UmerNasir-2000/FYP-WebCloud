# List of Projects Forked By Logged In User

DROP PROCEDURE IF EXISTS sql_web_cloud.projects_forked_logged_user;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.projects_forked_logged_user(IN userId int)
BEGIN
	SELECT 
		proj.id AS `project_id`,
		proj.project_name,
		proj.description,
		proj.likes,
		proj.is_public,
		proj.createdAt,
		cfg.`database`,
		cfg.web_framework,
		usr.id, 
		usr.first_name,
		usr.last_name,
		usr.email,
		usr.profile_picture_url 
FROM repositories repo 
INNER JOIN projects proj
ON proj.id = repo.projectId 
INNER JOIN configurations cfg
ON cfg.project_id = proj.id  
INNER JOIN users usr 
ON usr.id = proj.user_id 
WHERE repo.userId = userId;

END$$
DELIMITER ;
