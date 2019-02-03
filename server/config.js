const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Profiles = mongoose.model('Profiles');

passport.use(new LocalStrategy({
  usernameField: 'profile[email]',
  passwordField: 'profile[password]',
}, (email, password, done) => {
  Profiles.findOne({email})
    .then((profile) => {
      if (!profile || !profile.validateProfile(password)) {
        return done(null, false, {errors: {'email or password': 'is invalid'}});
      }

      return done(null, profile);
    })
    .catch(done);
}));
