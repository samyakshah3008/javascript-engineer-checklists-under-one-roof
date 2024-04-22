import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { mockUsers } from "../constants/users.js";
import { createNewUserHandler, getUserByIdHandler } from "../handlers/users.js";
import { resolveIndexByUserIdMiddleware } from "../middlewares/users.js";
import { createUserValidationSchema } from "../schema/validationSchema.js";

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (req, res) => {
    console.log(req.session.id);

    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Inside session store get");
      console.log(sessionData);
    });

    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;

    if (!filter && !value) return res.status(200).json(mockUsers);

    if (filter && value) {
      const appliedFilter = mockUsers.filter((user) =>
        user[filter].toLowerCase().includes(value.toLowerCase())
      );
      res.status(200).json(appliedFilter);
    }
  }
);

router.get(
  "/api/users/:id",
  resolveIndexByUserIdMiddleware,
  getUserByIdHandler
);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req);

    mockUsers.push({ id: mockUsers.length + 1, ...data });
    res.status(201).json(mockUsers);
  }
);

router.post(
  "/api/new-users",
  checkSchema(createUserValidationSchema),
  createNewUserHandler
);

router.patch("/api/users/:id", resolveIndexByUserIdMiddleware, (req, res) => {
  const { body } = req;

  mockUsers[req.findUserIndex] = { ...mockUsers[req.findUserIndex], ...body };
  res.status(200).json(mockUsers[req.findUserIndex]);
});

router.put("/api/users/:id", resolveIndexByUserIdMiddleware, (req, res) => {
  const { body } = req;

  mockUsers[req.findUserIndex] = { ...body };
  res.status(200).json(mockUsers[req.findUserIndex]);
});

router.delete("/api/users/:id", resolveIndexByUserIdMiddleware, (req, res) => {
  mockUsers.splice(req.findUserIndex, 1);
  return res.status(200).json(mockUsers);
});

export default router;
