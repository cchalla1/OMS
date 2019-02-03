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
  listPrice: '100',
  salePrice: '100',
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
    listPrice: '100',
    salePrice: '100'
  });
  sku.save(function (err) {
    if (err) {
      console.log('product', err);

      return;
    }
    console.log('products and children', product, sku);
  });
}); */
