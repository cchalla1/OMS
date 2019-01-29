const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const profileSchema = new Schema({
    profile_id : Number,
    firstName : String,
    lastName : String,
    email : String,
    salt : String,
    hash : String,
    phoneNumber : String,
    dob : Date,
    registeredOn : {type: Date, default: Date.now},
    active : Boolean,
    marketingEmails : Boolean
}, { minimize: false });

profileSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

profileSchema.methods.validateProfile = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

profileSchema.methods.generateToken = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setMinutes(today.getMinutes() + 5);

  return jwt.sign({
    email: this.email,
    id: this.profile_id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

profileSchema.methods.toAuthJSON = function() {
  return {
    _id: this.profile_id,
    email: this.email,
    token: this.generateJWT(),
  };
};

mongoose.model('Profiles', profileSchema);