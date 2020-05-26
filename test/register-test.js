/*Author: Suthakar
Date Created: 20/05/20
Description: Test for regiter students for a teacher
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");


//test for register students API - Positive 
describe('Register students with a teacher', function() {
    describe('Register students with a teacher', () => {
        it('Register students with a teacher', (done) => {
		//status 204 for success, status 500 for duplicate registration
        server.post('/api/register')
		.send({
			"teacher": "larry@gmail.com",
			"students":
			  [
				"Piniyara@gmail.com",
				"Ritz@gmail.com"
			  ]
		  })	
		.expect(500)
        .end(function(err, res) {
            res.status.should.equal(500);
            done();
         });
      });
   });  
});   

//test for Register students without a teacher - Negative 
describe('Register students without a teacher', function() {
    describe('Register students without a teacher', () => {
        it('Register students without a teacher', (done) => {
        server.post('/api/register')
		.send({
			"teacher": "",
			"students":
			  [
				"Piniyara@gmail.com",
				"Ritz@gmail.com"
			  ]
		  })	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 


//test for Register students with a teacher who is not in the system - Negative 
describe('Register students with a invalid teacher', function() {
    describe('Register students with a invalid teacher', () => {
        it('Register students with a invalid teacher', (done) => {
        server.post('/api/register')
		.send({
			"teacher": "Tom1234@gmail.com",
			"students":
			  [
				"Fensuk@gmail.com",
				"Taz@gmail.com"
			  ]
		  })	
		.expect(500)
        .end(function(err, res) {
            res.status.should.equal(500);
            done();
         });
      });
   });  
});

//test for Register students when teacher email id is invalid - Negative 
describe('Register students with invalid teacher emailId', function() {
    describe('Register students with invalid teacher emailId', () => {
        it('Register students with a invalid teacher emailId', (done) => {
        server.post('/api/register')
		.send({
			"teacher": "larry",
			"students":
			  [
				"Piniyara@gmail.com",
				"Ritz@gmail.com"
			  ]
		  })	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 


//test for Register API when students are empty - Negative 
describe('Register API when students are empty', function() {
    describe('Register API when students are empty', () => {
        it('Register API when students are empty', (done) => {
        server.post('/api/register')
		.send({
			"teacher": "Tom1234@gmail.com",
			"students":
			  []
		  })	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 


//test for Register students when one of students email id is invalid - Negative 
describe('Register students with invalid student emailId', function() {
    describe('Register students with invalid student emailId', () => {
        it('Register students with a invalid student emailId', (done) => {
        server.post('/api/register')
		.send({
			"teacher": "larry@gmail.com",
			"students":
			  [
				"Piniyara",
				"Ritz@gmail.com"
			  ]
		  })	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 