const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost:27017/OMS');
require('./models/profileSchema.js');

require('./config.js');
require('./models');

app.engine("html", require("ejs").__express);
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(session({ secret: 'oms-project', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
const router = require('./routes/routes.js')
app.use('/', router);
module.exports=app;