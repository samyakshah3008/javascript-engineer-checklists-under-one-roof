import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../schema/user.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  //   console.log("Inside deserialized user");
  //   console.log("Deserialized user id", id);
  try {
    // const findUser = mockUsers.find((user) => user.username === username); //mock
    const findUser = await User.findById(id);

    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      //   const findUser = mockUsers.find((user) => user.username === username); // mock
      const findUser = await User.findOne(username);
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
