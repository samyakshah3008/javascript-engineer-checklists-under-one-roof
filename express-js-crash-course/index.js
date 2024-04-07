import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

let mockUsers = [
  {
    id: 1,
    displayName: "Samyak",
    role: "Software Engineer",
  },
  {
    id: 2,
    displayName: "Anson",
    role: "Senior Software Engineer",
  },
  {
    id: 3,
    displayName: "Harkirat",
    role: "Chief Technology Officer",
  },

  {
    id: 4,
    displayName: "Striver",
    role: "Co-founder",
  },
];

// Parsing JSON for JSON Body Response

app.use(express.json());

// Create a GET API to get all the users

app.get("/api/users", (req, res) => {
  res.status(200).json(mockUsers);
});

// Create a GET API to get a particular user with params concept

app.get("/api/users/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  if (isNaN(parsedID)) return res.status(400).send({ message: "Bad Request" }); // Case 1
  const findUser = mockUsers.find((user) => user.id === parsedID);
  if (findUser) {
    res.status(200).json(findUser); // Case 2
  } else {
    res.status(404).send({ message: "User not found" }); // Case 3
  }
});

// Create a GET API and apply some filters with query params concept

// Apply a search by keyword filter

app.get("/api/users", (req, res) => {
  const {
    params,
    query: { filter, value },
  } = req;

  if (!filter && !value) return res.status(200).json(mockUsers);

  if (filter && value) {
    const appliedFilter = mockUsers.filter((user) =>
      user[filter].toLowerCase().includes(value.toLowerCase())
    );
    res.status(200).json(appliedFilter);
  }
});

// POST Method to add a user

app.post("/api/users", (req, res) => {
  const { body } = req;
  mockUsers.push({ id: mockUsers.length + 1, ...body });
  res.status(201).json(mockUsers);
});

// PATCH Method to update a particular detail from a particular user of DB

app.patch("/api/users/:id", (req, res) => {
  const { params, body } = req;
  const parsedID = parseInt(params.id);
  if (isNaN(parsedID)) return res.status(400).send({ message: "Bad Request" }); // Case 1
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  res.status(200).json(mockUsers[findUserIndex]);
});

// PUT Method to update whole detail from a particular user of DB

app.put("/api/users/:id", (req, res) => {
  const { params, body } = req;
  const parsedID = parseInt(params.id);
  if (isNaN(parsedID)) return res.status(400).send({ message: "Bad Request" }); // Case 1
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID);
  mockUsers[findUserIndex] = { ...body };
  res.status(200).json(mockUsers[findUserIndex]);
});

// DELETE Method to remove a user from DB

app.delete("/api/users/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  if (isNaN(parsedID)) return res.status(400).send({ message: "Bad Request" });
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID);
  if (findUserIndex == -1) {
    return res.status(404).send({ message: "User not found" });
  } else {
    mockUsers.splice(findUserIndex, 1);
    return res.status(200).json(mockUsers);
  }
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
