const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const orderController = require('../controllers/orderController');

router.post('/register', profileController.auth.optional, profileController.register);

router.post('/login', profileController.auth.optional, profileController.login);

router.get('/profile/current', profileController.auth.required, profileController.getCurrentProfile);

router.post('/order/current', profileController.auth.required, orderController.processOrder);

router.get('/order/current', profileController.auth.required, orderController.getCurrentOrder);

router.get('/listProducts', orderController.listProducts);

router.get('/orders', profileController.auth.required, orderController.listOrders);

module.exports = router;
