/*Author: Suthakar
Date Created: 20/05/20
Description: get http method for retrieve all teachers and students
Modified By:
Modified Date:
*/

const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const config = require("./lib/config");

/**
 * @api {get} /api/users This API retrieves list of all the users in the system.
 * @apiName Get All Users
 * @apiGroup User
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * [
 *  {
 *    "firstName": "Tom",
 *    "lastName": "B. Erichsen",
 *    "email": "Tom@gmail.com",
 *    "userType": "teacher"
 *  },
 *  {
 *    "firstName": "Nick",
 *    "lastName": "Cott",
 *    "email": "Nick@gmail.com",
 *    "userType": "teacher"
 *  },
 *  {
 *    "firstName": "Patrik",
 *    "lastName": "Luq",
 *    "email": "Patrik@gmail.com",
 *    "userType": "student"
 *  }
 * ]
 */
router.get("/", (req, res) => {
    const connection = config.getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.status(500).json({success: false,"message": err.sqlMessage})
        return
      }
	  //mapping the result //removed primary key id
      const user = rows.map((row) => {
          return {firstName: row.first_name, lastName: row.second_name, email: row.email_id, userType: row.type}
      })
      res.status(200).json(user)
      //res.status(200).json(rows)
    })
  })
  
module.exports.router = router;