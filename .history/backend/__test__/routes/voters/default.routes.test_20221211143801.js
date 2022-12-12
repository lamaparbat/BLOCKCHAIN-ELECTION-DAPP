const request = require("supertest");
const app = require("../../../app.ts");

describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(app).get("/");
  console.log(res.body)
  expect(res.body).toEqual("Server has started.");
 })
});


