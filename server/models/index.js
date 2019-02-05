require('./profileSchema');
require('./paymentSchema');
require('./productSchema');
require('./skuSchema');
require('./commerceItemsSchema');
require('./orderSchema');

/* const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Sku = mongoose.model('Sku');

const product = new Product({
  productName: 'Gift Card',
  listPrice: 100,
  salePrice: 100,
  type: 'Base',
  images: ''
});

product.save(function (err) {
  if (err) {
    console.log('product', err);

    return;
  }
  const sku = new Sku({
    product_id: product._id,
    skuName: 'Sku 100',
    listPrice: 100,
    salePrice: 10
  });
  sku.save(function (err) {
    if (err) {
      console.log('product', err);

      return;
    }
    console.log('products and children', product, sku);
  });

  const sku1 = new Sku({
    product_id: product._id,
    skuName: 'Sku 200',
    listPrice: 200,
    salePrice: 100
  });
  sku1.save(function (err) {
    if (err) {
      console.log('product', err);

      return;
    }
    console.log('products and children', product, sku);
  });

  const sku2 = new Sku({
    product_id: product._id,
    skuName: 'Sku 300',
    listPrice: 300,
    salePrice: 150
  });
  sku2.save(function (err) {
    if (err) {
      console.log('product', err);

      return;
    }
    console.log('products and children', product, sku);
  });

  const sku3 = new Sku({
    product_id: product._id,
    skuName: 'Sku 400',
    listPrice: 400,
    salePrice: 200
  });
  sku3.save(function (err) {
    if (err) {
      console.log('product', err);

      return;
    }
    console.log('products and children', product, sku);
  });
}); */
