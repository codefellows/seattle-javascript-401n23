"use strict";

const supertest = require("supertest");
const { server } = require("../server.js");
const mockRequest = supertest(server);
const { dbInstance } = require("../models/index.js");

describe("web server", () => {
  beforeAll(async () => {
    await dbInstance.sync();
  });
  afterAll(async () => {
    await dbInstance.drop();
  });
  it("should respond with a 404 on an invalid route", () => {
    return mockRequest.get("/foobar").then((results) => {
      expect(results.status).toBe(404);
    });
  });

  // These tests are wired with async/await --- so much cleaner!
  it("should respond with a 404 on an invalid method", async () => {
    const response = await mockRequest.put("/foobar");
    expect(response.status).toBe(404);
  });

  it("can create a record", async () => {
    const person = {
      firstName: "MJ",
      lastName: "McBarksalot",
    };

    //what do we know about what we get back and what happens when we create a record
    // WHAT IS RETURNED from the function
    // does it have a status of 200 if the request was good
    // does the return object have a first name and lastname and an id

    const response = await mockRequest.post("/people").send(person);
    expect(response.status).toBe(200);

    //Did we get an ID?
    // {id: 1, firstName: MJ, lastName: McBarksalot}
    // the id property is defined aka exists with a value on our res.body
    expect(response.body.id).toBeDefined();
    expect(response.body["firstName"]).toEqual("MJ");

    // Is the data we sent in the database?
    // Object.keys takes in an OBJECT returns and array of the key names ["firstName", "lastName"]
    // ["firstName", "lastName"].forEach(key = McBarksalot === response.body[key])
    Object.keys(person).forEach((key) => {
      expect(person[key]).toEqual(response.body[key]);
    });
  });

  it("can get list of records", async () => {
    // since we added a person above we can expect that the body will be an array with one person in it
    const response = await mockRequest.get("/people");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  // I could test for status and if I got a person object back
  it("can get a record", async () => {
    const response = await mockRequest.get("/people/1");
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.id).toEqual(1);
  });

  it("can update a record", async () => {
    const data = { lastName: "Russert" };
    const response = await mockRequest.put("/people/1").send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.id).toEqual(1);
    expect(response.body.lastName).toEqual("Russert");
  });

  it("can delete a record", async () => {
    const response = await mockRequest.delete("/people/1");
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const getResponse = await mockRequest.get("/people");
    expect(getResponse.body.length).toEqual(0);
  });
});
