const express = require('express');
const passport = require('passport');

const middleware = require('../middleware/auth');
const router = express.Router();

const successLoginUrl = 'http://localhost:3001/login/success';
const errorLoginUrl = 'http://localhost:3001/login/error';

router.get(
  '/login/google',
  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
    },
    (err, user, failureDetails) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Something went wrong authenticating user' });
      }
      if (!user) {
        return res.status(401).json(failureDetails);
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Session save went bad.' });
          return;
        }
        console.log('---123456789098765432345678---', req.user);
        res.status(200).json({ errors: false, user: theUser });
      });
    }
  )
);

router.get(
  '/login/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log('THIS IS REQ.USER::', req.user);
    res.send('Thank you for signing in friends!');
  }
);

router.get('/auth/user', middleware.isAuthenticated, (req, res) => {
  console.log('AUTH USER', req.user);
  console.log('AUTH session', req.session);
  res
    .status(200)
    .json({ user: req.user, expiresIn: req.session.cookie._expires });
});
router.get('/auth/logout', middleware.isAuthenticated, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json(req.user);
  console.log('AUTH USER', req.user);
  console.log('AUTH session', req.session);
});
module.exports = router;
