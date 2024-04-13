import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../constants/users.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside deserialized user");
  console.log("Deserialized user id", id);
  try {
    const findUser = mockUsers.find((user) => user.username === username);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) {
        throw new Error("Invalid Credentials");
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
