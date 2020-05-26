DROP TABLE IF EXISTS register;
CREATE TABLE register(  
   id INT NOT NULL AUTO_INCREMENT,  
   teacher_email VARCHAR(100) NOT NULL,  
   student_email VARCHAR(100) NOT NULL,  
   valid NUMBER(1) NOT NULL,
   PRIMARY KEY ( id )  
);  


DROP TABLE IF EXISTS users;
CREATE TABLE user(  
   id INT NOT NULL AUTO_INCREMENT,  
   first_name VARCHAR(50) NOT NULL,  
   second_name VARCHAR(50) NOT NULL, 
   email_id VARCHAR(50) NOT NULL, 
   type VARCHAR(10) NOT NULL, 
   PRIMARY KEY ( id )  
); 

INSERT INTO register VALUES (41,'Tom@gmail.com','May@gmail.com',1),(42,'Tom@gmail.com','jerry@gmail.com',1),(43,'Tom@gmail.com','Kestov@gmail.com',1),(44,'Tom@gmail.com','hdjh@kd.com',1),(58,'larry@gmail.com','jerry@gmail.com',1),(59,'gerrad@gmail.com','jerry@gmail.com',1),(60,'gerrad@gmail.com','Kestov@gmail.com',1),(61,'gerrad@gmail.com','Katrin@gmail.com',1),(62,'gerrad@gmail.com','Piniyara@gmail.com',1),(63,'gerrad@gmail.com','Ritz@gmail.com',1),(64,'gerrad@gmail.com','Taz@gmail.com',1),(65,'gerrad@gmail.com','Fensuk@gmail.com',1),(66,'gerrad@gmail.com','Joe@gmail.com',0),(67,'gerrad@gmail.com','Mustafa@gmail.com',1),(69,'Tom@gmail.com','Fensuk@gmail.com',1),(70,'Tom@gmail.com','Taz@gmail.com',1);

INSERT INTO users VALUES (1,'Tom','B. Erichsen','Tom@gmail.com','teacher'),(2,'Jerry','C. Erichdad','jerry@gmail.com','student'),(3,'Larry','Page','larry@gmail.com','teacher'),(4,'Kestov','Nova','Kestov@gmail.com','student'),(5,'Gerrad','Butler','gerrad@gmail.com','teacher'),(6,'Katrin','Korna','Katrin@gmail.com','student'),(7,'Taz','Jared','Taz@gmail.com','student'),(8,'Ritz','Barlord','Ritz@gmail.com','student'),(9,'Piniyara','Laztory','Piniyara@gmail.com','student'),(10,'Fensuk','Wangdu','Fensuk@gmail.com','student'),(11,'Joe','Burns','Joe@gmail.com','student'),(12,'Mustafa','Naz','Mustafa@gmail.com','student'),(13,'Patrik','Lauzart','patrik@gmail.com','teacher'),(14,'May','Joe','May@gmail.com','student'),(15,'April','June','april.june@gmail.com','student'),(16,'Natham','Polsky','Natham@gmail.com','teacher');
