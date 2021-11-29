CREATE TABLE tracker (
	id INT AUTO_INCREMENT,
    creation_time  DATETIME DEFAULT   CURRENT_TIMESTAMP,
    action_type varchar(100) NOT NULL,
    origin_type varchar(100),
    origin_value varchar(100),
    destination varchar(255),
    customer_id varchar(255) NOT NULL,
    PRIMARY KEY (id)
)