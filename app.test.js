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
      msg: expect.any(String),
      status: 400,
    });
  });
});

describe("GET /items/:name", ()=> {
  test("get an existing item", async ()=> {
    item = "popsicle";
    itemsArr = [{name:item, price:expect.any(Number)}]
    const res = await request(app).get(`/items/${item}`)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(itemsArr);
  });
  test("get nonexistant item", async () => {
    const res = await request(app).get(`/items/nonexistant`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual({
      msg: expect.any(String),
      status: 400,
    });
  });
});

describe("PATCH /items/:name", ()=> {
  test("updating an existing item", async ()=> {
    item = "popsicle";
    itemsArr = {name:item, price:1.15}
    const res = await request(app).patch(`/items/${item}`).send(itemsArr);
    expect(res.statusCode).toBe(200);
    expect(res.body.updated[0]).toEqual(itemsArr);
  });
  test("patch nonexistant item", async () => {
    const res = await request(app).patch(`/items/nonexistant`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual({
      msg: expect.any(String),
      status: 400,
    });
  });
});

describe("DELETE /items/:name", ()=> {
  test("delete existing item", async ()=> {
    item = "popsicle";
    const res = await request(app).delete(`/items/${item}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"message":"deleted"});
  });
  test("delete nonexistant item", async () => {
    const res = await request(app).delete(`/items/nonexistant`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual({
      msg: expect.any(String),
      status: 400,
    });
  });
});