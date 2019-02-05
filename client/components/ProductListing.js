import {Button, Col, Row} from 'react-bootstrap';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createOrUpdateOrder} from '../store/actions/orderActions';
import {listProducts} from '../store/actions/productActions';

const CREATE = 'create';
const UPDATE = 'update';

const mapStateToProps = (state) => ({
  products: state.products,
  order: state.order
});

class ProductListing extends Component {
  componentDidMount () {
    this.props.listProducts();
  }

  prepareProducts () {
    this.productsArray = [];
    this.childSkus = {};
    for (const key in this.props.products) {
      const product = this.props.products[key];
      this.productsArray.push(product);
      const skus = product.children;
      const skuArray = [];
      for (const childKey in skus) {
        skuArray.push(skus[childKey]);
      }
      this.childSkus[product._id] = skuArray;
    }
  }

  buildShoppingCart (product, sku) {
    let items = [];
    if (this.props.order && this.props.order.shoppingCart && this.props.order.shoppingCart.length > 0) {
      items = [...this.props.order.shoppingCart];
    }
    const item = items.filter((i) => product._id === i._id && sku._id === i.child._id);
    if (item && item.length > 0) {
      item[0].quantity += 1;
    }
    else {
      items.push({
        product_id: product._id,
        sku_id: sku._id,
        unit_price: sku.listPrice || product.listPrice,
        quantity: 1
      });
    }

    return items;
  }

  addToCart (product, sku) {
    const _id = this.props.order && this.props.order._id ? this.props.order._id : undefined;
    this.props.createOrUpdateOrder({
      'op': this.props.order._id ? UPDATE : CREATE,
      'payments': [],
      'shoppingCart': this.buildShoppingCart(product, sku),
      _id
    });
  }

  render () {
    this.prepareProducts();

    return (
      this.productsArray && this.productsArray.length > 0
        ? <Row>
          {
            this.productsArray.map((product, index) => (
              this.childSkus[product._id] && this.childSkus[product._id].length > 0
                ? this.childSkus[product._id].map((sku, index) => (
                  <Col xs={6} md={3} key={sku._id + index} style={{marginTop: '1rem'}}>
                    <div>
                      <center>
                        <img src={sku.images ? sku.images : '/img/no-image.jpg'} height={200} width={200} />
                      </center>
                      <center>
                        <b>{product.productName}</b><br />
                        <b>${sku.listPrice}</b><br />
                        <Button onClick={this.addToCart.bind(this, product, sku)}
                          bsStyle="primary"
                          bsSize="small"
                        >
                          Add to Cart
                        </Button>
                      </center>
                    </div>
                  </Col>
                ))
                : <Col xs={6} md={3} key={product._id + index}>
                  <div>
                    <img src={product.images ? product.images : '/img/no-image.jpg'} height={200} width={200} />
                    <center>
                      <b>{product.name}</b>
                      <b>{product.listPrice}</b>
                    </center>
                  </div>
                </Col>
            ))
          }
        </Row>
        : <div></div>
    );
  }
}

export default connect(mapStateToProps, {listProducts, createOrUpdateOrder})(ProductListing);
