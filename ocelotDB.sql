CREATE TABLE ocelot_user (
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
    validated TINYINT(1) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE friendship (
	id INT NOT NULL AUTO_INCREMENT,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user1_id) REFERENCES ocelot_user(id),
    FOREIGN KEY(user2_id) REFERENCES ocelot_user(id)
) ENGINE=INNODB;

CREATE UNIQUE INDEX friendship_unique_idx1
on friendship (user1_id, user2_id);

-- CREATE TABLE team_grouping (
-- 	id INT NOT NULL AUTO_INCREMENT,
--     username VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
-- 	email VARCHAR(255) NOT NULL UNIQUE,
--     validated TINYINT(1) NOT NULL,
--     PRIMARY KEY(id)
-- ) ENGINE=INNODB;