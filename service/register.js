/*Author: Suthakar
Date Created: 20/05/20
Description: register list of students for a teacher in the system
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");
const validator = require("./lib/validationUtil");

/**
 * @api {post} /api/register This API registers student with the teachers. The list of student and the teacher is given in the post body.
 * @apiName RegisterStudent
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of Teacher.
 * @apiParam {Array} [students]  Email ID of Student.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "teacher": "teacher1@gmail.com",
 *  "students":
 *   [
 *      "student1@gmail.com",
 *      "student2@gmail.com"
 *   ]
 * }
 */
router.post('/', (req, res) => {
  console.log("Trying to register students with teacher...")
  console.log("Teacher's email ID: " + req.body.teacher)
  const teacherEmail = req.body.teacher
  const studentEmails = req.body.students
  //check validity of body params and return error if there is any discrepancy
  var validInput = true
  var message = ""
  if (teacherEmail == undefined || teacherEmail == ""){
    validInput = false
    message = "Teacher Email ID not present"
  }
  else if (studentEmails === undefined || studentEmails.length == 0) {
    validInput = false
    message = "No Student Email ID present"
  }
  else if (!validator.validateEmail(teacherEmail)) {
    validInput = false;
    message = "Email id of teacher is not valid";
  }
  
  const values = studentEmails.map((studEmail) => {	  
	  if (!validator.validateEmail(studEmail)) {
		validInput = false;
		message = "One of the sudent's Email id is not valid";
	  }
  })
  
  if (!validInput){
    console.log("Input params not valid")
    res.status(400).json({success: false,"message": message})
    return
  }
  	 
  //validation passed, registering process started	 
  const connection = config.getConnection()

  //find if the teacher is present in users
  //return an error the teacher is not there in the system
  const queryString = "SELECT * FROM users where email_id=" + mysql.escape(teacherEmail) + " limit 1"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
        console.log("Failed to query for users: " + err)
        console.error(err);
        res.status(500).json({success: false,"message": err.sqlMessage})
        return
    }
    if (rows === undefined || rows.length == 0) {
      // rows empty or does not exist
      console.log("No teacher found with provided email id: " + teacherEmail)
      res.status(500).json({success: false,"message": "No teacher found with provided email id " + teacherEmail})
      return
    }
    //find if all the students are present in the users
    //return an error if a student is not there in the system
    //assign all the students to the given teacher if all the students are present
    const studentTeacherInsertString = "INSERT INTO register (teacher_email, student_email, valid) VALUES ?"
    const values = studentEmails.map((studentEmail) => {
      return [teacherEmail, studentEmail, 1]
    })
    connection.query(studentTeacherInsertString, [values], (errStudentTeacherInsert, resultsStudentTeacherInsert, fieldsStudentTeacherInsert) => {
      if (errStudentTeacherInsert) {
        console.log("Failed to insert new association: " + errStudentTeacherInsert)
        res.status(500).json({success: false,"message": errStudentTeacherInsert.message})
        return
      }
      console.log("Inserted new associations");
      res.status(204).json({success: true,"message": "New teacher student associations sucessfully added"})
    })
  })
})
  
module.exports.router = router;