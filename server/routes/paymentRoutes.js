const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const paymentController = require('../controllers/paymentController');

router.post('/payments', profileController.auth.required, paymentController.processPayments);

module.exports = router;
