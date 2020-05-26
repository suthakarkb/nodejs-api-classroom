/*Author: Suthakar
Date Created: 20/05/20
Description: Test for retrive common students for one or more teachers
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");


//test for retrievefornotifications API - Positive- Positive 
describe('Retrieve list of students emailIds for notification test', function() {
    describe('retrieve list of students emailIds for notification', () => {
        it('retrieve list of students emailIds for notification', (done) => {
        server.post('/api/retrievefornotifications')
		.send({
			"teacher":  "gerrad@gmail.com",
			"notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
		  })
		.expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
         });
      });
   });  
}); 

//test for retrievefornotifications API - Positive 
describe('Retrieve list of students emailIds for notification2 test', function() {
    describe('retrieve list of students emailIds for notification2', () => {
        it('retrieve list of students emailIds for notification2', (done) => {
        server.post('/api/retrievefornotifications')
		.send({
			"teacher":  "gerrad@gmail.com",
			"notification": "Hello students"
		  })
		.expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
         });
      });
   });  
}); 


//test for retrievefornotifications API - Negative 
describe('Retrieve list of students emailIds when teacher emailId is empty test', function() {
    describe('retrieve list of students emailIds when teacher emailId is empty', () => {
        it('retrieve list of students emailIds when teacher emailId is empty', (done) => {
        server.post('/api/retrievefornotifications')
		.send({
			"teacher":  "",
			"notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
		  })
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});


//test for retrievefornotifications invalid teacher email Id - Negative 
describe('Retrieve list of students emailIds when teacher emailId is invalid test', function() {
    describe('retrieve list of students emailIds when teacher emailId is invalid', () => {
        it('retrieve list of students emailIds when teacher emailId is invalid', (done) => {
        server.post('/api/retrievefornotifications')
		.send({
			"teacher":  "gerrad",
			"notification": "Hello students! @Piniyara@gmail.com @Mustafa@gmail.com"
		  })
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});


