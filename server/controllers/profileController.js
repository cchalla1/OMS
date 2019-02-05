const jwt = require('express-jwt');
const mongoose = require('mongoose');
const passport = require('passport');
const Profiles = mongoose.model('Profiles');

const getTokenFromHeaders = (req) => {
  const {headers: {authorization}} = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

module.exports.auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports.register = (req, res) => {
  const {body: {profile}} = req;
  console.log('register', profile);
  if (!profile.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!profile.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  profile.active = true;
  const finalUser = new Profiles(profile);

  finalUser.setPassword(profile.password);
  console.log(finalUser);
  finalUser.save(function (err) {
    console.log('saving');
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json({user: finalUser.toAuthJSON()});
  });
};

module.exports.login = (req, res, next) => {
  const {body: {profile}} = req;

  if (!profile.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!profile.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', {session: false}, (err, passportUser) => {
    if (err) {
      return res.status(401).send(err);
    }
    console.log(passportUser);

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateToken();

      return res.json({user: user.toAuthJSON()});
    }

    return res.status(500).send({message: 'Invalid username or password'});
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    console.log(req.payload.id);
    req.logout();
    if (err) {
      res.status(500).send(err);
    }
    res.json({message: 'User logged out', success: 'true'});
  });
};

module.exports.getCurrentProfile = (req, res) => {
  const {payload: {id}} = req;

  return Profiles.findById(id)
    .then((profile) => {
      if (!profile) {
        return res.sendStatus(400);
      }

      return res.json({profile: profile.toAuthJSON()});
    });
};
