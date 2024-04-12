import { mockUsers } from "../constants/users.js";

export const resolveIndexByUserIdMiddleware = (request, response, next) => {
  const { params, body } = request;
  const parsedID = parseInt(params.id);
  if (isNaN(parsedID))
    return response.status(400).send({ message: "Bad Request" }); // Case 1
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID);
  if (findUserIndex == -1)
    return response.status(404).send({ message: "Not found" });
  request.findUserIndex = findUserIndex;
  next();
};
