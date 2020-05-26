/*Author: Suthakar
Date Created: 20/05/20
Description: retrieve student email ids for notification email
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");
const validator = require("./lib/validationUtil");

/**
 * @api {post} /api/retrievefornotifications This API retrives list of student associated with a teacher and the students mentioned with @ annotation.
 * @apiName RetrieveForNotifications
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of teacher.
 * @apiParam {String} [notification]  Content of notification with email IDs of students intended for receiving notification.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "teacher":  "teacherken@gmail.com",
 *  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "recipients":
 *   [
 *     "studentbob@gmail.com",
 *     "studentagnes@gmail.com", 
 *     "studentmiche@gmail.com"
 *   ]   
 * }
 */
router.post('/', (req, res) => {
  console.log("Retriving list of student associated with a teacher and the students mentioned with @ annotation..");
  console.log("Teachers's email ID: " + mysql.escape(req.body.teacher));
  const teacherEmail = req.body.teacher;
  var studentEmails;
  var validStudentEmails = [];
  const notificationMessage = req.body.notification;
  
  //check validity of body params and return error if there is any discrepancy
  var validInput = true;
  var message = "";
  if (teacherEmail == undefined || teacherEmail.trim() == ""){
    validInput = false;
    message = "Email ID for teacher is not provided";
  }
  if (notificationMessage === undefined || notificationMessage.trim().length == 0) {
    validInput = false;
    message = "Notification message is not provided";
  }
  if (!validator.validateEmail(teacherEmail)) {
    validInput = false;
    message = "Email id of teacher is not valid";
  }
  if (!validInput){
    console.log("Input params not valid");
    res.status(400).json({success: false,"message": message});
    return;
  }

  //Check if teacher exists in the system.
  //Return error if there isn't one.
  //Get union of all the students associated with the teacher which are valid too with
  //and all the students mentioned in message with @ annotation which are valid.
  //Return the distinct list of students found.

  //find if the teacher is present in users
  //return an error the teacher is not there in the system
  const queryString = "SELECT * FROM users where email_id=" + mysql.escape(teacherEmail) + " limit 1";
  const connection = config.getConnection();
  const query = connection.query(queryString, (err, rows) => {
    if (err) {
        console.log("Failed to query for users: " + err)
        console.error(err);
        res.status(500).json({success: false,"message": "Some Internal Error Occured"})
        return
      }
    if (rows === undefined || rows.length == 0) {
      // rows empty or does not exist
      console.log("No teacher found with mentioned email id: " + teacherEmail)
      res.status(400).json({success: false,"message": "No teacher found with mentioned email id " + teacherEmail})
      return
    }
    else{
      //meaning teacher is present in the system
      //extract the email ids from notification message
      studentEmails = validator.extractEmails(notificationMessage)
      
      if (studentEmails)
        console.log("Students in notification :: " + studentEmails)

      const studentQueryString ="select a.student_email from register a where a.student_email in (?) and a.valid=? UNION select student_email from register where teacher_email=? and valid=?";
      const studentQuery = connection.query(studentQueryString, [studentEmails, 1, teacherEmail, 1], (errStudent, rowsStudent) => {
        if (errStudent) {
          console.log("Failed to query for users: " + errStudent)
          res.status(500).json({success: false,"message": "Some Internal Error Occured"})
          return
        }
        if (rowsStudent === undefined || rowsStudent.length == 0) {
          // rows empty or does not exist
          console.log("No Students found for this query")
          res.status(400).json({success: false,"message": "No Students found for this query"})
          return
        }
        else{
          //students exists
          console.log("Number of valid students found: " + rowsStudent.length)
          validStudentEmails = rowsStudent.map((row) => {
            return row.student_email
          })
          res.status(200).json({"recipients": validStudentEmails})
        }
      })
    }
  })
})
  
module.exports.router = router;