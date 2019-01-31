const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id : String,
    productName : String,
    listPrice : String,
    salePrice : String,
    type : String,
    images : String
});

mongoose.model('Product', productSchema);
