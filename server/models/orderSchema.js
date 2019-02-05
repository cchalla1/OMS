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

orderSchema.statics.findAllByProfile = function (profile_id, callback) {
  // const populateQuery = [
  //   {path: 'payments'},
  //   {path: 'commerceItems', model: CommerceItem, populate: [
  //     {path: 'product', model: Product},
  //     {path: 'sku', model: Sku}
  //   ]}
  // ];

  return this.find({profile_id, status: {$ne: 'created'}})
    .exec(callback);
};

orderSchema.statics.findOrder = function (orderId, callback) {
  const populateQuery = [
    {path: 'payments'},
    {path: 'commerceItems', model: CommerceItem, populate: [
      {path: 'product', model: Product},
      {path: 'sku', model: Sku}
    ]}
  ];

  return this.findOne({orderId})
    .populate(populateQuery)
    .exec(callback);
};

orderSchema.statics.getCurrentOrder = function (profile_id, callback) {
  const populateQuery = [
    {path: 'payments'},
    {path: 'commerceItems', model: CommerceItem, populate: [
      {path: 'product', model: Product},
      {path: 'sku', model: Sku}
    ]}
  ];

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
    for (const value of values) {
      commerceItem_ids.push(value._id);
    }
    const ord = {
      profile_id: order.profile_id,
      commerceItems: commerceItem_ids,
      status: 'created',
      total: '100'
    };

    return this.create(ord, callback);
  });
};

orderSchema.statics.updateOrder = function (order, callback) {
  const promises = [];
  const populateQuery = [
    {path: 'payments'},
    {path: 'commerceItems', model: CommerceItem, populate: [
      {path: 'product', model: Product},
      {path: 'sku', model: Sku}
    ]}
  ];
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
  const populateQuery = [
    {path: 'payments'},
    {path: 'commerceItems', model: CommerceItem, populate: [
      {path: 'product', model: Product},
      {path: 'sku', model: Sku}
    ]}
  ];

  return this.findOneAndUpdate({_id: orderId}, {$set: {payments: payment._id, status}}, {new: true})
    .populate(populateQuery)
    .exec(callback);
};

// orderSchema.virtual('payments', {
//     ref: 'Payment',
//     localField: 'paymentGroup_id',
//     foreignField: 'paymentGroup_id',
//     justOne: true
// });

// orderSchema.virtual('commerceItems', {
//     ref: 'CommerceItem',
//     localField: 'commerceItem_id',
//     foreignField: 'commerceItem_id',
//     justOne: true
// });

mongoose.model('Order', orderSchema);
