/*Author: Suthakar
Date Created: 20/05/20
Description: post http method to update an user existing in the system
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");
const validator = require("./lib/validationUtil");

/**
 * @api {post} /user/update This API updates an user in the system.
 * @apiName UserCreate
 * @apiGroup User
 *
 * @apiParam {String} [firstName]  First name of user
 * @apiParam {String} [secondName]  Second name of user
 * @apiParam {String} [emailId]  EmailID of user
 * @apiParam {String} [type]  type of user - teacher/student
 * 
 */
router.post('/', (req, res) => {
  console.log("update user by emailid...")
  //Validations before updating user
  var validInput = true;
  var message = "";
  if (req.body.first_name == undefined || req.body.first_name.trim() == ""){
    validInput = false;
    message = "First name of the user is not provided";
  }
  else if (req.body.email_id === undefined || req.body.email_id.trim() == "") {
    validInput = false;
    message = "Email id of the user is not provided";
  }
  else if (!validator.validateEmail(req.body.email_id)) {
    validInput = false;
    message = "Email id of the user is not valid";
  } 
  else if (req.body.type === undefined || req.body.type.trim() == "") {
    validInput = false;
    message = "Type of the user is not provided";
  }else if (!(req.body.type.toLowerCase() == "teacher" || req.body.type.toLowerCase() == "student")) {
	validInput = false;
    message = "Type of the user is not valid";
  }	  
  if (!validInput){
    console.log("Input params not valid");
    res.status(400).json({"message": message});
    return;
  }	
	
	//Validation Passed. Updating given user in the system
    const firstName = req.body.first_name
    const secondName = req.body.second_name
    const emailId = req.body.email_id
    const type = req.body.type
	console.log(firstName,secondName,emailId,type);
    const queryString = "UPDATE users SET first_name = ?, second_name = ?, type=?  WHERE email_id=?"
    config.getConnection().query(queryString, [firstName, secondName, type, emailId], (err, results, fields) => {
      if (err) {
		// SQL Error Occured  
        console.log("Failed to update the user: " + err)
        res.status(500).json({success: false,"message": err.sqlMessage})
        return
      }
	  else if (results.affectedRows == 0) {
		// Email Is is not available in the system  
        res.status(500).json({success: false,"message":"User not found with provided emailId: "+emailId})
        return		  
	  }	  
      console.log("Updated the user with emailId: ", emailId);
      res.status(200).json({success: true,"message": "Updated the user with emailId: "+emailId})
    })
  })
  
module.exports.router = router;