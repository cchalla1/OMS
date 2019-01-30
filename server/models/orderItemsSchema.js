const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemsSchema = new Schema({
    order_id : String,
    commerceItem_id : {type : String, ref : CommerceItems}
});

orderItemsSchema.static.findItems = function(order, callback) {
    return this.find({order_id:order.order_id})
               .populate('commerceItems')
               .exec(function(err, items) {
                   return CommerceItems.findProductDetails
               })
}

orderItemsSchema.virtual('commerceItems', {
    ref: 'CommerceItems',
    localField: 'commerceItem_id',
    foreignField: 'commerceItem_id',
    justOne: true
});

mongoose.model('OrderItems', orderItemsSchema);
