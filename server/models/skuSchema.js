const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoId = require('mongoose-better-id');

const skuSchema = new Schema({
  _id: String,
  product_id: String,
  skuName: String,
  listPrice: Number,
  salePrice: Number
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

skuSchema.plugin(autoId, {
  connection: mongoose.connection,
  field: '_id',
  prefix: 'sku',
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

skuSchema.virtual('unit_price').get(function () {
  return this.salePrice ? this.salePrice : this.listPrice;
});

mongoose.model('Sku', skuSchema);
