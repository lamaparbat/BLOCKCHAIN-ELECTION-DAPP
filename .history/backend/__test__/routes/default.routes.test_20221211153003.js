const request = require("supertest");
const app = require("../../../app.ts");


// default route test
describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(app).get("/");
  expect(res.text).toEqual("Server has started.");
 })
});



