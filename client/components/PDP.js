import {Col, Row} from 'react-bootstrap';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listProducts} from '../store/actions/productActions';

const mapStateToProps = (state) => ({
  products: state.products
});

class PDP extends Component {
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

  render () {
    this.prepareProducts();

    return (
      this.productsArray && this.productsArray.length > 0
        ? <Row>
          {
            this.productsArray.map((product, index) => (
              this.childSkus[product._id] && this.childSkus[product._id].length > 0
                ? this.childSkus[product._id].map((sku, index) => (
                  <Col xs={6} md={3} key={sku._id + index}>
                    <div>
                      <center>
                        <img src={sku.images ? sku.images : '/img/no-image.jpg'} height={200} width={200} />
                      </center>
                      <center>
                        <b>{product.productName}</b><br />
                        <b>${sku.listPrice}</b>
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

export default connect(mapStateToProps, {listProducts})(PDP);
