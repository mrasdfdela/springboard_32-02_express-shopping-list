process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
const items = require('./fakeDb');
const ExpressError = require("./expressError");


// beforeEach(function(){ });

// afterEach(function(){ });

// describe("GET /", ()=> {
//   test("items page", async ()=> {
//     const res = await request(app).get("/");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toContain("Jerryville!");
//   });
// });

describe("GET /items", ()=> {
  test("get all items", async ()=> {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(items);
  });
});

describe("POST /items", ()=> {
  let jerkey = {
    name: "beef jerkey",
    price: 0.5,
  };
  test("post a new item", async ()=> {
    const res = await request(app).post("/items").send(jerkey);
    expect(res.statusCode).toBe(201);
    expect(res.body.added).toEqual(jerkey);
  });
  test("post empty item", async () => {
    const res = await request(app).post("/items");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual({
      "msg": "No data sent",
      "status": 400,
    });
  });
});