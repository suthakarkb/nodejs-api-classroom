/*Author: Suthakar
Date Created: 20/05/20
Description: suspend the students from a teacher in the system
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");
const validator = require("./lib/validationUtil");

/**
 * @api {post} /api/suspend This API marks a student as suspendes in register table
 * @apiName SuspendStudent
 * @apiGroup Admin
 *
 * @apiParam {String} [student]  Email ID of Student.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *   "student": "studentjon@gmail.com"
 * }
 */
router.post('/', (req, res) => {
  console.log("Mark a student as suspended..")
  console.log("Student's email ID: " + req.body.student)
  //Send error and return if there is no student parameter in body
  if (req.body.student === undefined || req.body.student.trim() === ""){
    console.log("No student parameter provided")
    res.status(400).json({success: false,"message" : "Email ID for student is not provided"})
    return
  }
  
  if (!validator.validateEmail(req.body.student)) {
	console.log("student emailId provided is not valid")
	res.status(400).json({success: false,"message": "student Email id is not valid"})
	return
  }
  //Update the rows where the student_email matches the given email
  //Return error if there isn't one.
  //Return bad request if there is no rows affects meaning there is no user matching given criteria
  const queryString = "UPDATE register SET valid=? where student_email=?"
  config.getConnection().query(queryString, [0, req.body.student], (err, results) => {
    console.log('Rows affected:', results.affectedRows);
    if (err) {
      //console.log("Failed to query for :"+ mysql.escape(req.body.student) + " : " + err)
      console.error(err);
      res.status(500).json({success: false,"message": "Some Internal Error Occured"})
      return
    }
    if (results.affectedRows === 0) {
      //rows empty or does not exist
      console.log("Student with email id " + req.body.student + " doesn't exists in the system")
      res.status(400).json({success: false,"message" : "No such student exists : " + req.body.student})
    }
    else {
      console.log("Student with email id " + req.body.student + " has been marked suspended for all teachers")
      res.status(204).json({success: true,"message": "Student with email id " + req.body.student + " has been marked suspended for all teachers"})
    }
  })
})
  
module.exports.router = router;