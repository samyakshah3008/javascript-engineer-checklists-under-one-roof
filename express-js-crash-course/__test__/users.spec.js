import * as validator from "express-validator";
import { createNewUserHandler, getUserByIdHandler } from "../handlers/users.js";
import { User } from "../schema/user.js";
import * as helpers from "../utils/helpers.js";

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid Field" }]),
  })),
}));

jest.mock("../utils/helpers.js", () => ({
  hashPassword: jest.fn((password) => `hashed_${password}`),
}));

jest.mock("../schema/user.js");

const mockRequest = {
  findUserIndex: 1,
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => mockResponse),
};

describe("get users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by id", () => {
    getUserByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 2,
      displayName: "Anson",
      role: "Senior Software Engineer",
      username: "anson",
      password: "hello2",
    });
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });

  it("should call sendStatus with 404 when user not found", () => {
    const copyMockReq = { ...mockRequest, findUserIndex: 100 };
    getUserByIdHandler(copyMockReq, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
    expect(mockResponse.send).not.toHaveBeenCalled();
  });
});

describe("create users", () => {
  const mockRequest = {};

  it("should send status of 400 when there are errors", async () => {
    await createNewUserHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(1);
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([{ msg: "Invalid Field" }]);
  });

  it("should return status of 201 and user is created", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));
    await createNewUserHandler(mockRequest, mockResponse);
    expect(helpers.hashPassword).toHaveBeenCalledWith("password");
    expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
    expect(User).toHaveBeenCalledWith({
      username: "test",
      password: "hashed_password",
      displayName: "test_name",
    });

    expect(User.mock.instances[0].save).toHaveBeenCalled();

    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      username: "test",
      password: "hashed_password",
      displayName: "test_name",
    });
  });
});
