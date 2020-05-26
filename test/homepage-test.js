/*Author: Suthakar
Date Created: 20/05/20
Description: unit test for home page access
Modified By:
Modified Date:
*/
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.
var server = supertest.agent("http://localhost:3000");

// Home page URL Access
describe("Homepage access test",function(){
  describe('Homepage access', () => {
	it("Return Homepage",function(done){
    // calling home page api
    server
    .get("/")
    .expect(200)
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
		});
	  });
   });
});	