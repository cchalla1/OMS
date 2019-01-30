const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skuSchema = new Schema({
    sku_id : String,
    product_id : String,
    skuName : String,
    listPrice : String,
    salePrice : String,
    type : String,
    images : String
});

mongoose.model('Skus', skuSchema);
