/*Author: Suthakar
Date Created: 20/05/20
Description: unit test for retrive all users
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");


//Test for get one User - Posotive  
describe('Get one user test', function() {
    describe('Get one user', () => {
		const id = "Tom@gmail.com";
        it('Get one user', (done) => {
        server.get("/api/user/"+id)
		.expect(200)
        .end(function(err, res) {
			res.body.length.should.equal(1);
            res.status.should.equal(200);
            done();
         });
      });
   });  
});   

//Test for get one User - Negative  
describe('Get one not available user test', function() {
    describe('Get one not available user', () => {
		const id = "Tom1234@gmail.com";
        it('Get one not available user', (done) => {
        server.get("/api/user/"+id)
		.expect(200)
        .end(function(err, res) {
			res.body.length.should.equal(0);
            res.status.should.equal(200);
            done();
         });
      });
   });  
});