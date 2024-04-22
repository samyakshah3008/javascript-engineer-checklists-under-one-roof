import express from "express";
import request from "supertest";

const app = express();

app.get("/hello", (req, res) => res.status(200).send({}));

describe("hello endpoint", () => {
  it("get /hello and expect 200", async () => {
    const result = await request(app).get("/hello");
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({});
  });
});
