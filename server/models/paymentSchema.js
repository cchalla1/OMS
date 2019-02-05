const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoId = require('mongoose-better-id');

const paymentSchema = new Schema({
  _id: String,
  paymentType: String,
  authStatus: String,
  cardNumber: String,
  expiryDate: String,
  declineReasons: String
});

paymentSchema.plugin(autoId, {
  connection: mongoose.connection,
  field: '_id',
  prefix: 'pg1',
  suffix: {
    start: 0,
    step: 1,
    max: 9999,
  },
  timestamp: {
    enable: false
  }
});

paymentSchema.statics.createPaymentGroup = function (payment, callback) {
  console.log('called 5');

  return this.create(payment, callback);
};

mongoose.model('Payment', paymentSchema);
