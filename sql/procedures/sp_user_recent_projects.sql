DROP PROCEDURE IF EXISTS sql_web_cloud.recent_user_projects;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.recent_user_projects(IN userId int)
BEGIN
	SELECT 
		proj.project_name,
		proj.description,
		proj.is_public,
		proj.likes,
		proj.createdAt,
		cfg.`database`,
		cfg.web_framework 
	FROM projects proj 
	INNER JOIN configurations cfg 
	ON cfg.project_id = proj.id 
	INNER JOIN requests req 
	ON req.project_id =  proj.id 
	INNER JOIN users usr
	ON usr.id = proj.user_id 
	WHERE proj.user_id = userId AND req.status = "Approved"
	ORDER BY proj.createdAt DESC
	LIMIT 3; 
END$$
DELIMITER ;
