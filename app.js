const personRouter = require('./controllers/person');

const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

console.log('connecting to', config.MONGO_URL);

mongoose
  .connect(config.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

app.use('/api/persons', personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
