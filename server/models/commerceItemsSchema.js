const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');

const commerceItemsSchema = new Schema({
    _id : String,
    product : {type : String, ref : Product},
    sku : {type : String, ref : Sku},
    quantity : Number,
    price : String
});

commerceItemsSchema.statics.createCI = function(products, res) {
    const ci = {
        _id : products._id,
        product : products.product,
        sku : products.sku,
        quantity : products.quantity,
        price : products.price
    }
    return this.create(ci, function(err, ciItem) {
        if (err) {
            res.send(err);
        }
        res.json(ciItem);
    })
}

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
