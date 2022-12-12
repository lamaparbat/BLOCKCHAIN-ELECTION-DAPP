const request = require("supertest");

describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request().get("/");
  expect(res.body).toEqual("Server has started.");
 })
});


