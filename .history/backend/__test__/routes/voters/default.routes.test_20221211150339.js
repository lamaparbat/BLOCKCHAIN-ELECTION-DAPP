const request = require("supertest");
const app = require("../../../app.ts");


// default route test
describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(app).get("/");
  expect(res.text).toEqual("Server has started.");
 })
});


// voter signup test
describe("Voter Test", () => {
 test("Signup", async () => {
  const res = await request(app)
   .post("/voter/signup")
   .send({ email: "parbat@gmail.com", password: "hacker123" });

  expect(res.body).toEqual({
   message: "Voter registered successfully.",
   statusCode: 200
  });
 });
})


