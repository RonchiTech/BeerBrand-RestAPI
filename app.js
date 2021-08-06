if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./api/users');
const products = require('./api/products');
const session = require('express-session');
require('./auth/passportGoogleSSO');
const passport = require('passport');

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('secretkey123'));
app.use(
  session({
    secret: 'secretkey123',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
  })
);
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,PUT,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('REQUSER', req.user);
  next();
});

app.use('/api', users);
// app.use('/api', products);
app.use((req, res, next) => {
  res.status(404).send('404 Page not Found!');
});

app.use((error, req, res, next) => {
  console.log('ERR:::', error);
});
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
