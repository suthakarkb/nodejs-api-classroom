const mysql = require('mysql')

//Configuration of mysql connections
const pool = mysql.createPool({
	connectionLimit: 20,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'test'
})

//return connection pool
module.exports = {
    getConnection:function() {
        return pool
    }
}	