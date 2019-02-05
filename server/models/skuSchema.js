const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoId = require('mongoose-better-id');

const skuSchema = new Schema({
  _id: String,
  product_id: String,
  skuName: String,
  listPrice: Number,
  salePrice: Number
});

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
  return Math.min(this.listPrice, this.salePrice);
});

mongoose.model('Sku', skuSchema);
