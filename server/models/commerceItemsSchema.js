const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commerceItemsSchema = new Schema({
    _id : String,
    product_id : {type : String, ref : Products},
    sku_id : {type : String, ref : Skus},
    quantity : Number,
    price : String
});

commerceItemsSchema.virtual('product', {
    ref: 'Products',
    localField: 'product_id',
    foreignField: 'product_id',
    justOne: true
});

commerceItemsSchema.virtual('sku', {
    ref: 'Skus',
    localField: 'sku_id',
    foreignField: 'sku_id',
    justOne: true
});

mongoose.model('CommerceItems', commerceItemsSchema);
