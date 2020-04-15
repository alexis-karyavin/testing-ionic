CREATE TABLE IF NOT EXISTS `questions` (
	`id`	INTEGER,
	`question`	TEXT,
	PRIMARY KEY(`id`)
);
INSERT or IGNORE INTO `questions` VALUES (1,'Сколько жабр у окуня?');
INSERT or IGNORE INTO `questions` VALUES (2,'Сколько молекул водорода у воды?');
INSERT or IGNORE INTO `questions` VALUES (3,'Сколько нужно спать часов в день, чтобы высыпаться?');
CREATE TABLE IF NOT EXISTS `answers` (
	`id_answer`	INTEGER,
	`id_question`	INTEGER,
	`answer`	TEXT,
	`right`	NUMERIC,
	FOREIGN KEY(`id_question`) REFERENCES `questions`(`id`),
	PRIMARY KEY(`id_answer`)
);
INSERT or IGNORE INTO `answers` VALUES (1,1,'1',0);
INSERT or IGNORE INTO `answers` VALUES (2,1,'2',1);
INSERT or IGNORE INTO `answers` VALUES (3,1,'3',0);
INSERT or IGNORE INTO `answers` VALUES (4,2,'Ноль',0);
INSERT or IGNORE INTO `answers` VALUES (5,2,'Одна',0);
INSERT or IGNORE INTO `answers` VALUES (6,2,'Две',1);
INSERT or IGNORE INTO `answers` VALUES (7,3,'Можно не спать',0);
INSERT or IGNORE INTO `answers` VALUES (8,3,'5 часов',0);
INSERT or IGNORE INTO `answers` VALUES (9,3,'8 часов',1);
