const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const profileSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  salt: String,
  hash: String,
  phoneNumber: String,
  dob: Date,
  registeredOn: {type: Date, default: Date.now},
  active: Boolean,
  marketingEmails: {type: Boolean, default: false}
}, {minimize: false});

profileSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

profileSchema.methods.validateProfile = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');

  return this.hash === hash;
};

profileSchema.methods.generateToken = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setMinutes(today.getMinutes() + 15);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

profileSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    token: this.generateToken(),
  };
};

mongoose.model('Profiles', profileSchema);
