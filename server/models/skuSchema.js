const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoId = require('mongoose-better-id');

const skuSchema = new Schema({
  _id: String,
  product_id: String,
  skuName: String,
  listPrice: String,
  salePrice: String
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

mongoose.model('Sku', skuSchema);
