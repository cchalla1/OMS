const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Payment = mongoose.model('Payment');
const CommerceItem = mongoose.model('CommerceItem');
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');

const orderSchema = new Schema({
    _id : String,
    profile_id : String,
    paymentGroup_id : {type : String, ref : Payment},
    commerceItems : [{type : String, ref : CommerceItem}],
    status : String,
    total : String,
    creationDate : {type : Date, default : Date.now}
});

orderSchema.statics.findAllByProfile = function(profile_id, callback) {
    var populateQuery = [
        {path : 'payments'},
        {path : 'commerceItems', model : CommerceItem, populate : [
            {path : 'product', model : Product},
            {path : 'sku', model : Sku}
        ]}
    ]
    return this.find({profile_id:profile_id})
               .populate(populateQuery)
               .exec(callback);
}

orderSchema.statics.createOrder = function(order, res) {
    return this.create(order, function(err) {
        if (err) {
            console.log('cretaing order', err);
            res.send(err);
        }
        res.json({message : 'Order Created Succsessfully', success : true});
    })
}

// orderSchema.virtual('payments', {
//     ref: 'Payment',
//     localField: 'paymentGroup_id',
//     foreignField: 'paymentGroup_id',
//     justOne: true
// });

// orderSchema.virtual('commerceItems', {
//     ref: 'CommerceItem',
//     localField: 'commerceItem_id',
//     foreignField: 'commerceItem_id',
//     justOne: true
// });

mongoose.model('Order', orderSchema);
