require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

mongoose.connect(`mongodb://localhost:${process.env.MONGO_DB_PORT || 27017}/OMS`);
require('./models/profileSchema.js');

require('./config.js');
require('./models');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(session({secret: 'oms-project', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

const router = require('./routes/routes.js');

app.get('/*', function (req, res, next) {
  if (req.url.indexOf('api') === -1) {
    res.render('index');
  }
  else {
    next();
  }
});

app.use('/api', router);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({message: 'Unauthorized'});
  }
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('running at localhost: ' + port);
});

module.exports = app;
