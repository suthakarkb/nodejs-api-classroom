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


//Test for Get all Users - Posotive  
describe('Get all users test', function() {
    describe('Get all users', () => {
        it('Get all users', (done) => {
        server.get('/api/users')
		.expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
         });
      });
   });  
});   