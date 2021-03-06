const express = require('express');
const passport = require('passport');

const router = express.Router();

const successLoginUrl = 'http://localhost:5000/login/success';
const errorLoginUrl = 'http://localhost:5000/login/error';

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/login/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
      console.log("User::", req.user);
  }
);
