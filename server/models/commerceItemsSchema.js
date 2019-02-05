const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');
const autoId = require('mongoose-better-id');

const commerceItemsSchema = new Schema({
  _id: String,
  product: {type: String, ref: Product},
  sku: {type: String, ref: Sku},
  quantity: Number,
  price: Number
});

commerceItemsSchema.plugin(autoId, {
  connection: mongoose.connection,
  field: '_id',
  prefix: 'ci',
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

commerceItemsSchema.statics.createCI = function (product) {
  const ci = new this({
    product: product.product_id,
    sku: product.sku_id,
    quantity: product.quantity,
    price: product.quantity * product.unit_price
  });
  const query = ci.save();

  return query;
};

commerceItemsSchema.statics.updateCI = function (product) {
  const query = this.findOneAndUpdate({_id: product.commerceItem_id}, {$set: {quantity: product.quantity,
    price: product.quantity * product.unit_price}
  }, {new: true});

  return query.exec();
};

// commerceItemsSchema.virtual('product', {
//     ref: 'Product',
//     localField: 'product_id',
//     foreignField: 'product_id',
//     justOne: true
// });

// commerceItemsSchema.virtual('sku', {
//     ref: 'Sku',
//     localField: 'sku_id',
//     foreignField: 'sku_id',
//     justOne: true
// });

mongoose.model('CommerceItem', commerceItemsSchema);
