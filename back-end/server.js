const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/social-media', { useNewUrlParser: true },
  (err) => {
  if (err) { console.log('Error connecting to MongoDB'); }
});

// for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});
 
// body parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Mongoose models
require('./models/index');

// Setup Routes
const AppRouter = require('./routers/router');
app.use('/app', AppRouter);

// Homepage message
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(3001, (err) => {
  if (err) { console.log(err); }
  else { console.log('\nProject server is running at http://localhost:3001'); }
});
