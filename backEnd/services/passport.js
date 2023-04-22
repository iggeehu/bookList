const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//Set up local strategy for email and password
const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // console.log(user)
    //compare password
    user.comparePassword(password, function (err, ismatch) {
      if (err) {
        return done(err);
      }
      if (!ismatch) {
        console.log("!!!!ismatch");
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

//create JWT strategy, payload here is the decoded jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  //See if the user ID in the payload exists in our database,

  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use("jwt", jwtLogin);
passport.use("local", localLogin);
