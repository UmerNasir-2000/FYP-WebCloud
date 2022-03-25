USE `sql_web_cloud`;
DROP procedure IF EXISTS `admin_dashboard`;

DELIMITER $$
USE `sql_web_cloud`$$
CREATE PROCEDURE `admin_dashboard` ()
BEGIN
	SELECT
		req.id, 
		req.status, 
		req.createdAt, 
		usr.email, 
		usr.first_name , 
		usr.last_name ,
		prj.is_public,
		prj.description,
		prj.project_name, 
		COUNT(usr.id) as `total_users`,
		COUNT(prj.id) as `total_projects`
	FROM requests req 
	INNER JOIN projects prj 
	ON req.project_id  = prj.id 
	INNER JOIN users usr 
	ON usr.id = prj.user_id
    ORDER BY req.createdAt
    LIMIT 5;
END$$

DELIMITER ;


# To Call The SP
{ CALL sql_web_cloud.admin_dashboard() }

