const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id : String,
    profile_id : String,
    paymentGroup_id : {type : String, ref : Payments},
    commerceItem_id : [{type : String, ref : CommerceItems}],
    status : String,
    total : String,
    creationDate : Date,
});

orderSchema.static.findAllByProfile = function(profile_id, callback) {
    var populateQuery = [
        {path : 'payments'},
        {path : 'commerceItems', populate : [
            {path : 'product'},
            {path : 'sku'}
        ]}
    ]
    return this.find({profile_id:profile_id})
               .populate(populateQuery)
               .exec(callback);
}

orderSchema.virtual('payments', {
    ref: 'Payments',
    localField: 'paymentGroup_id',
    foreignField: 'paymentGroup_id',
    justOne: true
});

orderSchema.virtual('commerceItems', {
    ref: 'CommerceItems',
    localField: 'commerceItem_id',
    foreignField: 'commerceItem_id',
    justOne: true
});

mongoose.model('Orders', orderSchema);
