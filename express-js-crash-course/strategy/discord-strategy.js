import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../schema/discord-user.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await DiscordUser.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: "1229019063095656478",
      clientSecret: "Vq_-WVVFWxJDiPPOL45KRacIADZLA_fJ",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id });
      } catch (err) {
        return done(err, null);
      }

      try {
        let newUser;
        if (!findUser) {
          newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          const newSavedUser = await newUser.save();
          return done(null, newSavedUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
