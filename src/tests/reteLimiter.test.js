const request = require("supertest");
const { app } = require("../server");
const { cleanRedisKeys } = require("../utils/functions");

describe("Rate Limiting API Tests", () => {

  beforeAll((done) => {
    server = app.listen(5001, () => {
      console.log("Test Server is running on port 5001");
      done(); // Notify Jest that setup is complete
    });
  });

  afterAll((done) => {
    server.close(done);
    console.log("Test server closed"); // Close the server after all tests
  });

  afterEach(async () => {
    // Clean up Redis keys after each test
    await cleanRedisKeys("rateLimiterPerRequest");
    await cleanRedisKeys("rateLimiterPerMinute");
  });

  // Success Case: 1 Request per second
  it("should allow 1 request per second for the same user", async () => {
    const res1 = await request(app)
      .post("/api/task")
      .send({ userId: "user123" });

    expect(res1.statusCode).toBe(200);

    // Wait for 1 second before making the next request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res2 = await request(app)
      .post("/api/task")
      .send({ userId: "user123" });

    expect(res2.statusCode).toBe(200);
  });

  // Failure Case: More than 1 request in the same second
  it("should block the second request within the same second for the same user", async () => {
    const res1 = await request(app)
      .post("/api/task")
      .send({ userId: "user123" });

    expect(res1.statusCode).toBe(200);

    // Make another request immediately (without waiting 1 second)
    const res2 = await request(app)
      .post("/api/task")
      .send({ userId: "user123" });

    expect(res2.statusCode).toBe(429); // Too many requests
  });

  // Success Case: 20 Requests in one minute
  it("should allow up to 20 requests per minute for the same user", async () => {
    for (let i = 0; i < 20; i++) {
      const res = await request(app)
        .post("/api/task")
        .send({ userId: "user123" });

      expect(res.statusCode).toBe(200);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  },30000);

  // Failure Case: More than 20 requests in one minute
  it("should block the 21st request within one minute for the same user", async () => {
    for (let i = 0; i < 20; i++) {
      const res = await request(app)
        .post("/api/task")
        .send({ userId: "user123" });

      expect(res.statusCode).toBe(200);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const res = await request(app)
      .post("/api/task")
      .send({ userId: "user123" });

    expect(res.statusCode).toBe(429); // Too many requests
  },30000);
});


