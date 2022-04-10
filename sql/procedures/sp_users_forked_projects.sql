DROP PROCEDURE IF EXISTS sql_web_cloud.users_forked_repos;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.users_forked_repos(IN userId int)
BEGIN
	SELECT 
		proj.project_name,
		proj.description,
		proj.likes,
		usr.first_name ,
		usr.last_name,
		usr.email 
	FROM projects proj 
	INNER JOIN repositories repo 
	ON proj.id = repo.projectId 
	INNER JOIN users usr 
	ON usr.id = proj.user_id 
	WHERE repo.userId = userId;
END$$
DELIMITER ;