const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');

function buildOrder (order) {
  const orderDup = order.toObject();
  const {_id, payments, status, total} = orderDup;
  const processedOrder = {
    _id,
    payments,
    status,
    total
  };
  processedOrder.shoppingCart = [];
  for (let i = 0; i < orderDup.commerceItems.length; i++) {
    const {_id, product, sku, quantity, price} = orderDup.commerceItems[i];
    product.child = sku;
    product.commerceItem_id = _id;
    Object.assign(product, {quantity, price});
    processedOrder.shoppingCart.push(product);
  }

  return processedOrder;
}

function buildOrders (orders) {
  const resultArray = [];
  for (const order of orders) {
    const processedOrder = buildOrder(order);
    resultArray.push(processedOrder);
  }

  return resultArray;
}

module.exports.processOrder = (req, res) => {
  const {body: {order}} = req;
  order.profile_id = req.payload.id;
  if (order.op === 'create') {
    Order.createOrder(order, function (err) {
      if (err) {
        res.send(err);
      }
      Order.getCurrentOrder(order.profile_id, function (err, resOrder) {
        if (err) {
          res.sendStatus(400).send(err);
        }
        const result = buildOrder(resOrder);
        res.json(result);
      });
    //   console.log('resOrder', resOrder);
    //   const result = buildOrder(resOrder);
    //   res.json(result);
    });
  }
  else if (order.op === 'update') {
    Order.updateOrder(order, function (err, resOrder) {
      if (err) {
        res.sendStatus(400).send(err);
      }
      const result = buildOrder(resOrder);
      res.json(result);
    });
  }
};

module.exports.getCurrentOrder = (req, res) => {
  console.log('called order controller');
  Order.getCurrentOrder(req.payload.id, function (err, resOrder) {
    if (err) {
      res.sendStatus(400).send(err);
    }
    let result = {};
    if (resOrder && resOrder._id) {
      result = buildOrder(resOrder);
    }
    res.json(result);
  });
};

module.exports.listProducts = (req, res) => {
  Product.find({}).populate({path: 'children', model: Sku})
    .exec((err, products) => {
      if (err) {
        res.sendStatus(400).send(err);
      }
      else {
        res.json(products);
      }
    });
};

module.exports.listOrders = (req, res) => {
  const {payload: {id}} = req;
  Order.findAllByProfile(id, function (err, orders) {
    if (err) {
      res.send(err);
    }
    res.send(buildOrders(orders));
  });
};
