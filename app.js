if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./api/users');
const products = require('./api/products');
const passport = require('passport');
require('./auth/passportGoogleSSO')
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// app.use(passport.session())

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
