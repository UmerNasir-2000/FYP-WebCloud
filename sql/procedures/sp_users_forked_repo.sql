DROP procedure IF EXISTS `users_forked_repo`;

DELIMITER $$
USE `sql_web_cloud`$$
CREATE PROCEDURE `users_forked_repo` (
	IN projectId int)
BEGIN
	SELECT 
		usr.first_name, 
		usr.last_name, 
		usr.email, 
		usr.profile_picture_url, 
		usr.has_subscription 
	FROM repositories repo 
	INNER JOIN users usr 
	ON repo.userId = usr.id
	WHERE repo.projectId = projectId;
END$$

DELIMITER ;

/* CALL `sql_web_cloud`.`users_forked_repo`(1); */