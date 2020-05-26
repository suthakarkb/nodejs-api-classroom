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


//test for retrive students for one teacher- Positive 
describe('Retrive students for one teacher', function() {
    describe('retrive students for one teacher', () => {
		const queryParam = "?teacher=Tom@gmail.com";
        it('retrive students for one teacher', (done) => {
        server.get('/api/commonstudents'+queryParam)
		.expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
         });
      });
   });  
}); 

//test for retrive common students for multiple teachers - Positive 
describe('Retrive commong students for multiple teachers', function() {
    describe('retrive commong students for multiple teachers', () => {
		const queryParam = "?teacher=Tom@gmail.com&teacher=Natham@gmail.com&teacher=larry@gmail.com";
        it('retrive commong students for multiple teachers', (done) => {
        server.get('/api/commonstudents'+queryParam)
		.expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
         });
      });
   });  
}); 
  

//test for retrive students when no teacher parameter- Negative 
describe('Retrive students when no teacher', function() {
    describe('retrive students when no  teacher', () => {
        it('retrive students when no teacher', (done) => {
        server.get('/api/commonstudents')
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
}); 


//test for retrive common students when teacher email id is invalid - Negative 
describe('Retrive commong students when teacher email id is invalid', function() {
    describe('retrive commong students when teacher email id is invalid', () => {
		const queryParam = "?teacher=Tom";
        it('retrive commong students when teacher email id is invalid', (done) => {
        server.get('/api/commonstudents'+queryParam)
		.expect(400)
        .end(function(err, res) {
            res.status.should.equal(400);
            done();
         });
      });
   });  
});
