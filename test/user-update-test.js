/*Author: Suthakar
Date Created: 20/05/20
Description: Test for update user
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");


//test for update user API - Positive 
describe('Update a user test', function() {
    describe('Update a user', () => {
        it('Update a user', (done) => {
        server.post('/api/user/update')
		.send({
			"first_name":"suthakar.",
			"second_name":"kumar.bose",
			"email_id":"suthakarkb@gmail.com",
			"type":"student"})	
		.expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
         });
      });
   });  
});   

//test for update user without first name - Negative 
describe('Update a user without name test', function() {
    describe('Update a user without name', () => {
        it('Update a user without name', (done) => {	
        server.post('/api/user/update')
		.send({
			"first_name":"",
			"second_name":"kumar",
			"email_id":"suthakarkb@gmail.com",
			"type":"student"})	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});


//test for Update a user without email - Negative 
describe('Update a user without email test', function() {
    describe('Update a user without email', () => {
        it('Update a user without email', (done) => {
        server.post('/api/user/update')
		.send({
			"first_name":"Suthakar",
			"second_name":"Kumar",
			"email_id":"",
			"type":"student"})	
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});


//test for Update a user with invalid email - Negative 
describe('Update a user with invalid email test', function() {
    describe('Update a user with invalid email', () => {
        it('Update a user with invalid email', (done) => {
        server.post('/api/user/update')
		.send({
			"first_name":"Suthakar",
			"second_name":"Kumar",
			"email_id":"suthakar.kumar.bose",
			"type":"student"})
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});


//test for Update a user without type - Negative 
describe('Update a user without type test', function() {
    describe('Update a user without type', () => {
        it('Update a user without type', (done) => {
        server.post('/api/user/update')
		.send({
			"first_name":"Suthakar",
			"second_name":"Kumar",
			"email_id":"suthakarkb@gmail.com",
			"type":""})
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});


//test for Update a user with invalid type - Negative 
describe('Update a user with invalid type test', function() {
    describe('Update a user with invalid type', () => {
        it('Update a user with invalid type', (done) => {
        server.post('/api/user/update')
		.send({
			"first_name":"Suthakar",
			"second_name":"Kumar",
			"email_id":"suthakarkb@gmail.com",
			"type":"student and teacher"})
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});