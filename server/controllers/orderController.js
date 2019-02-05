const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');
const fetch = require('node-fetch');

function buildOrder (order) {
  const orderDup = JSON.parse(JSON.stringify(order));
  const {_id, payments, status, total} = orderDup;
  const processedOrder = {
    _id,
    payments,
    status,
    total
  };
  processedOrder.shoppingCart = [];
  for (let i = 0; i < orderDup.commerceItems.length; i++) {
    // console.log(orderDup.commerceItems[i]);
    const {_id, product, sku, quantity, price} = orderDup.commerceItems[i];
    product.child = sku;
    delete product.children;
    product.commerceItem_id = _id;
    Object.assign(product, {quantity, price});
    processedOrder.shoppingCart.push(product);
  }

  return processedOrder;
}

module.exports.processOrder = (req, res) => {
  const order = req.body;
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
    });
  }
  else if (order.op === 'update') {
    Order.updateOrder(order, function (err, resOrder) {
      if (err) {
        res.sendStatus(400).send(err);
      }
      console.log(resOrder);
      const result = buildOrder(resOrder);
      res.json(result);
    });
  }
  else if (order.op === 'complete') {
    const orderPayload = JSON.stringify(order);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization
    };
    // console.log('called 1', req.headers);
    fetch('http://localhost:9000/api/payments', {method: 'POST', body: orderPayload, headers})
      .then(response => response.json())
      .then(json => {
        const result = buildOrder(json);
        if (json.status === 'confirmed') {
          setTimeout(() => {
            Order.updateStatus(json._id, 'delivered', function () {
              console.log('Order', json._id, 'is delivered');
            });
          }, 15000);
        }
        res.json(result);
      })
      .catch(err => res.status(500).send(err));
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
    res.json(orders);
  });
};

module.exports.getOrder = (req, res) => {
  const {params: {orderId}} = req;
  console.log(req.params);
  Order.findOrder(orderId, function (err, order) {
    if (err) {
      res.status(500).send(err);
    }
    res.json(buildOrder(order));
  });
};
