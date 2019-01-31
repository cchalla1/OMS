const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = mongoose.model('Product');

const skuSchema = new Schema({
    _id : String,
    product_id : {type : String, ref : Product},
    skuName : String,
    listPrice : String,
    salePrice : String
});

mongoose.model('Sku', skuSchema);
