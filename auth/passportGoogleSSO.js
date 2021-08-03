const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

const GOOGLE_CALLBACK_URL =
  'http://localhost:3000/api/login/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      // const defaultUser = {
      //   fullName: `${profile.name.givenName} ${profile.name.familyName}`,
      //   email: profile.emails[0].value,
      //   picture: profile.photos[0].value,
      //   googleId: profile.id,
      // };
      let user;
      try {
        user = User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            fullName: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            googleId: profile.id,
            picture: profile.photos[0].value,
          });
          await user.save();
        }
        if (user && user[0]) return cb(null, user && user[0]);
      } catch (e) {
        cb(e, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log('Serializing user:', user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findOne({ googleId: id });

    console.log('DeSerialized user', user);
    if (user) cb(null, user);
  } catch (err) {
    console.log('Error deserializing', err);
    cb(err, null);
  }
});
