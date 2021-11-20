import userService from "../services/user";
import passport from "passport";

const GoogleTokenStrategy = require("passport-google-id-token");

const GOOGLE_CLIENT_ID =
  "634958478111-32garfk7ttd62rvjpp3tqmp0f58ijdsn.apps.googleusercontent.com";

export default new GoogleTokenStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
  },
  console.log("backend connect to google"),
  async function (parsedToken: any, googleId: string, done: Function) {
    console.log(parsedToken);
    const userPayload = {
      email: parsedToken?.payload?.email,
      firstName: parsedToken?.payload?.firstName,
      lastName: parsedToken?.payload?.lastName,
    };

    try {
      const user = await userService.findOrCreate(userPayload);
      done(undefined, user);
      console.log("To the authenticate controller");
    } catch (error) {
      done(error);
    }
  }
);
