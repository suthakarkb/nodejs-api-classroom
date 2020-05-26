/*Author: Suthakar
Date Created: 20/05/20
Description: retrive common students for teacher(s)
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");
const validator = require("./lib/validationUtil");

/**
 * @api {get} /api/commonstudents This API retrieves list of common students for the given list of teachers.
 * @apiName Common Students
 * @apiGroup Admin
 *
 * @apiParam {String} [teacher]  Email ID of Teacher.
 * 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *  {
 *    "students" :
 *    [
 *      "commonstudent1@gmail.com",
 *      "commonstudent2@gmail.com",
 *      "student_only_under_teacher_ken@gmail.com"
 *    ]
 *  }
 */
router.get('/', (req, res) => {
  console.log("Trying to retrieve common students of given teachers...")
  console.log("Teacher's email IDs: " + req.query.teacher)
  var commonStudents
  var validInput = true
  var message = ""
  var queryString = ""
  const teacherEmailIDs = req.query.teacher
  const connection = config.getConnection()
  console.log(teacherEmailIDs)
  
  //Validation to check input parameters
  if (req.query.teacher === undefined){
		console.log("Aborting execution and sending back 400 since there are no arguments")
		message = "No tecchers provided"
		validInput = false
  } 
  
  if (!validInput) {
		res.status(400).json({success: false,"message": message})
		return
  }
  //Validation completed
  
  //console.log('type',typeof req.query.teacher)
  if (typeof req.query.teacher == "string") {
    console.log("Single Teacher Email Query")
	//Single Teacher Students List
	if (!validator.validateEmail(req.query.teacher)) {
		res.status(400).json({success: false,"message": "One of the teacher's Email id is not valid"})
		return
	}	
	teacherQueryString = "SELECT student_email from register where teacher_email = ? and valid=1"
	connection.query(teacherQueryString, [teacherEmailIDs], (errTeacherQueryString, rowsStudentsForTeacher) => {
		if(errTeacherQueryString) {
			console.log("Failed to query for users: " + errTeacherQueryString)
			console.error(errTeacherQueryString);
			res.status(500).json({success: false,"message": err.sqlMessage})		
			}
			if (rowsStudentsForTeacher === undefined || rowsStudentsForTeacher.length == 0) {
				console.log("No Students found for this teacher")
				commonStudents = []
				res.status(200).json({"students": commonStudents})
				return
			}else{
				console.log("students Found" + rowsStudentsForTeacher.length)
				commonStudents = rowsStudentsForTeacher.map((commonStudent) => {
					return commonStudent.student_email
				})
				res.status(200).json({"students": commonStudents})
			}
		  return			
		})	
	  	
	 return 
  }

	  console.log("teachers are : " + teacherEmailIDs)
	  console.log("Multiple Teachers Email Query")
	  //Multiple Teachers Common Students
	  const commonStudentsForTeachersQueryString = "SELECT a.student_email FROM register a JOIN register b ON a.teacher_email = b.teacher_email WHERE a.teacher_email IN (?) And a.valid=1 GROUP BY a.student_email HAVING COUNT(DISTINCT a.teacher_email)=?;"
	  connection.query(commonStudentsForTeachersQueryString, [teacherEmailIDs, teacherEmailIDs.length], (errCommonStudentTeacher, rowsCommonStudentTeacher) => {
		if (errCommonStudentTeacher) {
		  console.log("Failed to query for users: " + errCommonStudentTeacher)
		  console.error(errCommonStudentTeacher);
		  res.status(500).json({"message": "Some Internal Error Occured"})
		  return
		}
		if (rowsCommonStudentTeacher === undefined || rowsCommonStudentTeacher.length == 0) {
		  //rows empty  (no common students)
		  console.log("No common students")
		  commonStudents = []
		}
		else{
		  //common students found
		  console.log("Common students Found :" + rowsCommonStudentTeacher.length)
		  commonStudents = rowsCommonStudentTeacher.map((commonStudent) => {
			return commonStudent.student_email
		  })
		}
	 	res.status(200).json({"students": commonStudents})		  	
  })
})
  
module.exports.router = router;