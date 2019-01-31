const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const passport = require('passport');
const Profiles = mongoose.model('Profiles');
const Order = mongoose.model('Order');
const CommerceItem = mongoose.model('CommerceItem');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
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

router.post('/register', auth.optional, (req, res, next) => {
  const { body: { profile } } = req;
  console.log("register", profile);
  if(!profile.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!profile.password) {
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
  finalUser.save(function(err) {
    console.log("saving");
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json({ user: finalUser.toAuthJSON() })
  });
});

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { profile } } = req;

  if(!profile.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!profile.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateToken();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Profiles.findById(id)
    .then((profile) => {
      if(!profile) {
        return res.sendStatus(400);
      }

      return res.json({ profile: profile.toAuthJSON() });
    });
});

router.post('/api/createOrder', auth.required, function(req, res) {
  const {body : {order}} = req;
  order.profile_id = req.payload.id;
  Order.createOrder(order, res);
});

router.post('/api/products', function(req, res) {
  const {body : {products}} = req;
  CommerceItem.createCI(products, res);
});

router.get('/api/orders', auth.required, function(req, res) {
  const {payload : {id}} = req;
  Order.findAllByProfile(id, function(err, orders) {
    if (err) {
      res.send(err);
    }
    res.send(orders);
  });
});

router.get('/', function(req, res, next){
  // res.render('index')
  next();
});
module.exports = router;