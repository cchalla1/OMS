require('dotenv').config();
const express = require('express');
const path = require('path');
const orderApp = express();
const paymentsApp = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

mongoose.connect(`mongodb://localhost:${process.env.MONGO_DB_PORT || 27017}/OMS`);
require('./models/profileSchema.js');

require('./config.js');
require('./models');

orderApp.engine('html', require('ejs').renderFile);
orderApp.set('view engine', 'html');
orderApp.set('views', path.join(__dirname, '../client'));
orderApp.use(express.static(path.join(__dirname, '../client')));
orderApp.use(bodyParser.json());
orderApp.use(session({secret: 'oms-project', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

paymentsApp.use(bodyParser.json());

const orderRouter = require('./routes/orderRoutes.js');
const paymentRouter = require('./routes/paymentRoutes.js');

orderApp.get('/*', function (req, res, next) {
  if (req.url.indexOf('api') === -1) {
    res.render('index');
  }
  else {
    next();
  }
});

paymentsApp.get('/*', function (req, res, next) {
  if (req.url.indexOf('api') === -1) {
    res.render('index');
  }
  else {
    next();
  }
});

orderApp.use('/api', orderRouter);
paymentsApp.use('/api', paymentRouter);

orderApp.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({message: 'Unauthorized'});
  }
  next();
});

const orderPort = process.env.ORDER_PORT || 5000;
orderApp.listen(orderPort, () => {
  console.log('running at localhost: ' + orderPort);
});

const paymentPort = process.env.PAYMENT_PORT || 6000;
paymentsApp.listen(paymentPort, () => {
  console.log('running at localhost: ' + paymentPort);
});

module.exports = orderApp;
