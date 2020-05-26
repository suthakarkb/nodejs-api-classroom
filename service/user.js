/*Author: Suthakar
Date Created: 20/05/20
Description: get http method for retrieve a teacher or student
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");

/**
 * @api {get} /api/user/:email_id This API retrieve a user with a given Email ID.
 * @apiName Get User by Email ID
 * @apiGroup User
 *
 * @apiParam {String} [emaiId]  Email ID of Teacher/Student.
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * [
 *  {
 *    "id": 1,
 *    "first_name": "Tom",
 *    "second_name": "B. Erichsen",
 *    "email_id": "Tom@gmail.com",
 *    "type": "teacher"
 *  }
 * ]
 */
  router.get('/:email_id', (req, res) => {
      console.log("Fetching user with email: " + req.params.email_id)
      const connection = config.getConnection()
      const userEmailId = req.params.email_id
      const queryString = "SELECT * FROM users WHERE email_id = ?"
      connection.query(queryString, [userEmailId], (err, rows, fields) => {
          if (err) {
          console.log("Failed to query for users: " + err)
          res.status(500).json({success: false,"message": err.sqlMessage})
          return
          }
          console.log("Fetched users successfully")
		  //mapping the result //removed primary key id
          const user = rows.map((row) => {
          return {firstName: row.first_name, lastName: row.second_name, email: row.email_id, userType: row.type}
          })
          res.json(user)
      })
  })
  
module.exports.router = router;