/*Author: Suthakar
Date Created: 20/05/20
Description: Test for create a new user
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");


//test for create user API - Positive 
describe('Create a new user test', function() {
    describe('Create a new user', () => {
        it('Create a new user', (done) => {
		//status 200 for success, status 500 for duplicate emailId	
        server.post('/api/user/create')
		.send({
			"first_name":"suthakar",
			"second_name":"kumar",
			"email_id":"suthakarkb@gmail.com",
			"type":"student"})	
		.expect(500)
        .end(function(err, res) {
            res.status.should.equal(500);
            done();
         });
      });
   });  
});   

//test for create user API - Negative 
describe('Create existing user test', function() {
    describe('Create existing user', () => {
        it('Create existing user', (done) => {
		//status 200 for success, status 500 for duplicate emailId	
        server.post('/api/user/create')
		.send({
			"first_name":"suthakar",
			"second_name":"kumar",
			"email_id":"suthakarkb@gmail.com",
			"type":"student"})	
		.expect(500)
        .end(function(err, res) {
            res.status.should.equal(500);
            done();
         });
      });
   });  
}); 

//test for create user without first name - Negative 
describe('Create a new user without name test', function() {
    describe('Create a new user without name', () => {
        it('Create a new user without name', (done) => {
		//status 200 for success, status 500 for duplicate emailId	
        server.post('/api/user/create')
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


//test for create user without email - Negative 
describe('Create a new user without email test', function() {
    describe('Create a new user without email', () => {
        it('Create a new user without email', (done) => {
        server.post('/api/user/create')
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


//test for create user with invalid email - Negative 
describe('Create a new user with invalid email test', function() {
    describe('Create a new user with invalid email', () => {
        it('Create a new user with invalid email', (done) => {
        server.post('/api/user/create')
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


//test for create user without type - Negative 
describe('Create a new user without type test', function() {
    describe('Create a new user without type', () => {
        it('Create a new user without type', (done) => {
        server.post('/api/user/create')
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


//test for create user with invalid type - Negative 
describe('Create a new user with invalid type test', function() {
    describe('Create a new user with invalid type', () => {
        it('Create a new user with invalid  type', (done) => {
        server.post('/api/user/create')
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