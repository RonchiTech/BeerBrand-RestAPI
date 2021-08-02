const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const products = require('./api/products');

const MONGODB_URI =
  'mongodb+srv://ronchinodejs:3vPLxB5YBlzDn0R0@cluster0.d74th.mongodb.net/beerbrand-dev';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,PUT,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use('/api', products);
app.use((req, res, next) => {
  res.status(404).send( '404 Page not Found!' );
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running at port 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
