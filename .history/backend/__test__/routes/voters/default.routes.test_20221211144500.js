const { jest } = require('jest');
const request = require("supertest");
const app = require("../../../app.ts");


// auto create mock for console.log
jest.mock("console", () => ({
 log: jest.fn(() => undefined),
}))


describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(app).get("/");
  console.log(res.body)
  expect(res.body).toEqual({});
 })
});


