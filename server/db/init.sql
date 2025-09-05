CREATE SCHEMA IF NOT EXISTS usersurvey;

USE usersurvey;

CREATE TABLE IF NOT EXISTS users(user_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255));

CREATE TABLE IF NOT EXISTS survey(survey_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), subtitle VARCHAR(255),
    question VARCHAR(500));

CREATE TABLE IF NOT EXISTS answers(answer_id INT AUTO_INCREMENT PRIMARY KEY, answer VARCHAR(500), survey_id INT NOT NULL, user_id INT NOT NULL,
    CONSTRAINT fk_survey FOREIGN KEY (survey_id) REFERENCES survey(survey_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id));
