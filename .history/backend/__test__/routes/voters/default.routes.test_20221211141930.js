const request = require("supertest");
const app = require("../../../app");

describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(app).get("/");
  console.log(res);
  expect(res.body).toEqual("Server has started.");
 })
});

