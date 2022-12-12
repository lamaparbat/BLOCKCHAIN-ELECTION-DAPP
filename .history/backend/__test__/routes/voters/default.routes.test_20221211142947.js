const request = require("supertest");
const routes = require("../../../app/routes/index");

describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(routes).get("/");
  expect(res.body).toEqual("Server has started.");
 })
});


