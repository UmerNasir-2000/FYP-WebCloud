DROP PROCEDURE IF EXISTS sql_web_cloud.get_repo_detail_by_id;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.get_repo_detail_by_id(IN id int)
BEGIN
	SELECT 
		proj.id AS `project_id`,
		proj.project_name,
		proj.description,
		proj.likes,
		proj.is_public,
		proj.createdAt,
		usr.id AS `usr_id`,
		usr.first_name,
		usr.last_name,
		usr.email,
		usr.profile_picture_url,
		usr.has_subscription,
		cfg.`database`,
		cfg.web_framework
	FROM projects proj
	INNER JOIN users usr  
	ON usr.id = proj.user_id 
	INNER JOIN configurations cfg 
	ON proj.id = cfg.project_id 
	INNER JOIN requests req
	ON proj.id = req.project_id 
	WHERE proj.id = id AND req.status = "Approved";
END$$
DELIMITER ;
