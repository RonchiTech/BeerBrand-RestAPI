const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI;


const server = http.createServer(app)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
