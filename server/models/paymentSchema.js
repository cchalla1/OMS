const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  paymentGroup_id: String,
  paymentType: String,
  authStatus: String,
  cardNumber: String,
  expiryDate: String,
  declineReasons: String
});

mongoose.model('Payment', paymentSchema);
