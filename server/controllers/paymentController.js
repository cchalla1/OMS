const mongoose = require('mongoose');
const Payment = mongoose.model('Payment');
const Order = mongoose.model('Order');

module.exports.processPayments = (req, res) => {
  console.log('called 2', req.body);
  const order = req.body;
  const {paymentType, cardNumber, expiryDate} = order.payments;
  const payment = {paymentType, cardNumber, expiryDate};
  const ts = Date.now();
  let orderStatus = '';
  if (ts % 1000 > 900) {
    console.log('called 3');
    payment.authStatus = 'REJECTED';
    payment.declineReasons = 'Card Number is not valid';
    orderStatus = 'cancelled';
  }
  else {
    console.log('called 4');
    payment.authStatus = 'SUCCESS';
    orderStatus = 'confirmed';
  }
  Payment.createPaymentGroup(payment, function (err, pPayment) {
    console.log('called 6', pPayment);
    Order.updatePaymentGroup(order._id, pPayment, orderStatus, function (err, pOrder) {
      console.log('called 8', pOrder);
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(pOrder);
      }
    });
  });
};

