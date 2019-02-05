const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Payment = mongoose.model('Payment');
const CommerceItem = mongoose.model('CommerceItem');
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');
const autoId = require('mongoose-better-id');

const orderSchema = new Schema({
  _id: String,
  profile_id: String,
  payments: {type: String, ref: Payment},
  commerceItems: [{type: String, ref: CommerceItem}],
  status: String,
  total: Number,
  creationDate: {type: Date, default: Date.now}
});

orderSchema.plugin(autoId, {
  connection: mongoose.connection,
  field: '_id',
  prefix: 'o',
  suffix: {
    start: 0,
    step: 1,
    max: 99,
  },
  timestamp: {
    enable: true,
    format: '100'
  }
});

const populateQuery = [
  {path: 'payments'},
  {path: 'commerceItems', model: CommerceItem, populate: [
    {path: 'product', model: Product},
    {path: 'sku', model: Sku}
  ]}
];

orderSchema.statics.findAllByProfile = function (profile_id, callback) {
  return this.find({profile_id, status: {$ne: 'created'}})
    .exec(callback);
};

orderSchema.statics.findOrder = function (orderId, callback) {
  return this.findOne({_id: orderId})
    .populate(populateQuery)
    .exec(callback);
};

orderSchema.statics.getCurrentOrder = function (profile_id, callback) {
  return this.findOne({profile_id, status: 'created'})
    .populate(populateQuery)
    .exec(callback);
};

orderSchema.statics.createOrder = function (order, callback) {
  const promises = [];
  console.log('called createOrder');
  for (const product of order.shoppingCart) {
    if (product.commerceItem_id) {
      promises.push(CommerceItem.updateCI(product));
    }
    else {
      promises.push(CommerceItem.createCI(product));
    }
  }
  Promise.all(promises).then((values) => {
    console.log('resolved promises... createOrder');
    const commerceItem_ids = [];
    let totalPrice = 0;
    for (const value of values) {
      commerceItem_ids.push(value._id);
      totalPrice += value.price;
    }
    const ord = {
      profile_id: order.profile_id,
      commerceItems: commerceItem_ids,
      status: 'created',
      total: totalPrice
    };

    return this.create(ord, callback);
  });
};

orderSchema.statics.updateOrder = function (order, callback) {
  const promises = [];
  for (const product of order.shoppingCart) {
    if (product.commerceItem_id) {
      promises.push(CommerceItem.updateCI(product));
    }
    else {
      promises.push(CommerceItem.createCI(product));
    }
  }
  Promise.all(promises).then((values) => {
    const commerceItem_ids = [];
    let totalPrice = 0;
    for (const value of values) {
      commerceItem_ids.push(value._id);
      totalPrice += value.price;
    }

    return this.findOneAndUpdate({_id: order._id}, {$set: {commerceItems: commerceItem_ids, total: totalPrice}}, {new: true})
      .populate(populateQuery)
      .exec(callback);
  });
};

orderSchema.statics.updatePaymentGroup = function (orderId, payment, status, callback) {
  console.log('called 7');

  return this.findOneAndUpdate({_id: orderId}, {$set: {payments: payment._id, status}}, {new: true})
    .populate(populateQuery)
    .exec(callback);
};

orderSchema.statics.updateStatus = function (orderId, status, callback) {
  return this.findOneAndUpdate({_id: orderId}, {$set: {status}}, {new: true})
    .exec(callback);
};

mongoose.model('Order', orderSchema);
