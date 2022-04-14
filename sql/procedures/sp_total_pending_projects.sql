DROP PROCEDURE IF EXISTS sql_web_cloud.total_pending_projects;

DELIMITER $$
$$
CREATE PROCEDURE sql_web_cloud.total_pending_projects()
BEGIN
	SELECT 
		COUNT(*) AS total_pending_projects 
	FROM requests 
	WHERE requests.status = 'Pending';
END$$
DELIMITER ;
