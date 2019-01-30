const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id : String,
    productName : String,
    listPrice : String,
    salePrice : String,
    type : String,
    children : {sku_id : {type : String, ref : Skus}},
    images : String
});

mongoose.model('Products', productSchema);
