DROP PROCEDURE IF EXISTS sql_web_cloud.trending_projects;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.trending_projects()
BEGIN
	SELECT 
		proj.id as project_id, 
		proj.project_name , 
		proj.description , 
		proj.likes,
		usr.id as user_id,
		usr.first_name,
		usr.last_name,
		usr.email 
	FROM 
	projects proj
	INNER JOIN users usr 
	ON usr.id = proj.user_id 
	INNER JOIN requests req 
	ON req.project_id = proj.id 
	WHERE proj.is_public = 1 AND usr.status = "Enable" AND req.status = "Approved"
	ORDER BY likes DESC 
	LIMIT 5;
END$$
DELIMITER ;