import { hasUncaughtExceptionCaptureCallback } from "node:process";
import { describe } from "node:test";
import request from "supertest";
import app from "../../../app";

describe("Default route test", () => {
 test("Default route call", async () => {
  const res = await request(app).get("/");
  expect(res.body).toEqual("Server has started.");
 })
});

