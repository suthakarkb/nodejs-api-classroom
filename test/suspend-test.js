/*Author: Suthakar
Date Created: 20/05/20
Description: Test for suspend a student from all teachers
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");


//test for suspend student from all teachers - Positive 
describe('suspend a student', function() {
    describe('suspend a student', () => {
        it('suspend a student', (done) => {
        server.post('/api/suspend')
		.send({
        "student" : "Mustafa@gmail.com"
		})	
		.expect(204)
        .end(function(err, res) {
            res.status.should.equal(204);
            done();
         });
      });
   });  
});   

//test for suspend api with empty student - Negative 
describe('Suspend without a student', function() {
    describe('Suspend without a student', () => {
        it('Suspend without a student', (done) => {
        server.post('/api/suspend')
		.send({
			"student" : ""
			})	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 


//test for suspend api with invalid student emailId - Negative 
describe('Suspend with invalid student emailId', function() {
    describe('Suspend with invalid student emailId', () => {
        it('Suspend with invalid student emailId', (done) => {
        server.post('/api/suspend')
		.send({
			"student" : "jerry"
			})	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 


//test for suspend api with student not available in the system - Negative 
describe('Suspend not available student', function() {
    describe('Suspend not available student', () => {
        it('Suspend not available student', (done) => {
        server.post('/api/suspend')
		.send({
			"student" : "jerry"
			})	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 
