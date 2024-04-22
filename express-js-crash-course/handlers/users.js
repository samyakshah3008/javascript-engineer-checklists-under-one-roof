import { validationResult } from "express-validator";
import { mockUsers } from "../constants/users.js";
import { User } from "../schema/user.js";
import { hashPassword } from "../utils/helpers.js";

export const getUserByIdHandler = (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
};

export const createNewUserHandler = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  // const data = matchedData(req.body);
  console.log(req.body, "before");
  req.body.password = hashPassword(req.body.password);
  console.log(req.body, "after");
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    return res.status(201).send(saveUser);
  } catch (err) {
    return res.status(400).send({ msg: err });
  }
};
