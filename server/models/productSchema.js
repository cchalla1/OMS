const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoId = require('mongoose-better-id');

const productSchema = new Schema({
  _id: String,
  productName: String,
  listPrice: Number,
  salePrice: Number,
  type: String,
  images: String
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

productSchema.plugin(autoId, {
  connection: mongoose.connection,
  field: '_id',
  prefix: 'prod',
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

productSchema.virtual('children', {
  ref: 'Sku',
  localField: '_id',
  foreignField: 'product_id',
  justOne: false
});

productSchema.virtual('unit_price').get(function () {
  return this.salePrice ? this.salePrice : this.listPrice;
});

mongoose.model('Product', productSchema);
