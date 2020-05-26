# Node JS Project - Node.js API 
This Rest API is made with Node.js framework. 
This project works in context of a school where teachers and students are the users and there are few admin tasks that can be performed using the APIs.
This set of APIs allow to do some admin related tasks like following:


* Get all users or a user by email id.
* Create a new user with given data
* Associate a student with teacher by registering.
* Mark a student suspended.
* Find Common students for given set of teachers.
* Get list of students of the given teacher and students mentioned with @ annotation in the message string for sending notifications.


## Inventory List 
## User Related APIs
* user/:email_id - This API retrieves list of user id with a given Email ID.
* users - This API retrieves list of all the users in the system.
* user/create - This API create a new user in the system
* user/update - This API updates information of an existing user in the system
## Admin Related APIs
* register - This API registers student with the teachers. The list of student and the teacher is given in the post body.
* commonstudents - This API retrieves list of common students for the given list of teachers.
* suspend - This API marks a student as suspendes in register table.
* retrievefornotifications - This API retrives list of student associated with a teacher and the students mentioned with @ annotation.


## Database
This solution uses mysql as database and uses following two objects. 
Use the db dump file to get db file from resources folder misc/db_backup.sql

User Object
```json
{
	"id": 919819,
	"first_name": "Jhon",
	"second_name": "Silver",
	"email_id": "jhon.silver@gmail.com",
	"type": "teacher"
}
```
Register Object
```json
{
	"id": 897897,
	"teacher_email": "jack.snider@gmail.com",
	"student_email": "jhon.silver@gmail.com",
	"valid": 1
}
```

## How to setup
* Use the db dump file to get db file from misc folder misc/db_backup.sql
* Import the postman file using the misc/classroom_project.postman_collection.json
* Install the dependencies using "npm install" command
* Start the app using "npm start" command
* After this API server should be available at http://localhost:3000/ or http://127.0.0.1:3000/.
* Use Postman to permform admin/user functions using these APIs
* To create a new user use the html form at http://localhost:3000/form

## Mocha Unit Test
Unit test cases have been written using moacha framework with supertest and should. 
35 Unit test cases have been written for all the positive and negative scenarios of this nodejs api app
To run the unit test cases
* Start the node.js app using "npm start".
* Then run test command "npm run test".
