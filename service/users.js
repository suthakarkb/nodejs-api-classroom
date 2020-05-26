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
 *    "id": 1,
 *    "first_name": "Tom",
 *    "second_name": "B. Erichsen",
 *    "email_id": "Tom@gmail.com",
 *    "type": "teacher"
 *  },
 *  {
 *    "id": 2,
 *    "first_name": "Nick",
 *    "second_name": "Cott",
 *    "email_id": "Nick@gmail.com",
 *    "type": "teacher"
 *  },
 *  {
 *    "id": 3,
 *    "first_name": "Patrik",
 *    "second_name": "Luq",
 *    "email_id": "Patrik@gmail.com",
 *    "type": "student"
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
      res.status(200).json(rows)
    })
  })
  
module.exports.router = router;