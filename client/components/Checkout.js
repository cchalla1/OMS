import {Button, Col, FormControl, FormGroup, Grid, Jumbotron, Row, Table} from 'react-bootstrap';
import React, {Component} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../store/actions/profileActions';
import {submitOrder} from '../store/actions/orderActions';

const mapStateToProps = (state) => ({
  order: state.order,
  user: state.profile
});

class Checkout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      'ccNumber': '',
      'ccExpiryMonth': '',
      'ccExpiryYear': '',
      'ccCVV': '',
    };
  }

  validateForm () {
    return this.state.ccNumber.length > 0 &&
    this.state.ccExpiryMonth.length > 0 && this.state.ccExpiryMonth.length === 2 &&
    this.state.ccExpiryYear.length > 0 && this.state.ccExpiryYear.length === 4 &&
    this.state.ccCVV.length > 0 && this.state.ccCVV.length === 3;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidMount () {
    this.props.getCurrentProfile();
  }

  placeOrder () {
    const _id = this.props.order && this.props.order._id ? this.props.order._id : undefined;
    if (_id) {
      this.props.submitOrder({
        'op': 'complete',
        'payments': {
          paymentType: 'cc',
          cardNumber: this.state.ccNumber,
          expiryDate: this.state.ccExpiryMonth + '/' + this.state.ccExpiryYear
        },
        'shoppingCart': this.props.order.shoppingCart,
        _id
      });
    }
  }

  render () {
    return (
      <Grid bsClass="container">
        <Header />
        {
          !this.props.user && !this.props.user.email
            ? <Jumbotron style={{backgroundColor: 'white'}}>
              <center>
                Please <Link to="/">Login</Link> to view the contents of this page
              </center>
            </Jumbotron>
            : this.props.order && this.props.order.shoppingCart && this.props.order.shoppingCart.length > 0
              ? <React.Fragment>
                <h1> Your Cart </h1>
                <Table responsive={'md'}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.order.shoppingCart.map((item, index) => (
                        <tr key={item.child.skuName + index}>
                          <td>
                            <span><img width={50} height={50} src={item.images ? item.images : '/img/no-image.jpg'} /></span><br />
                            <span>{item.productName}</span><br />
                            <span>{item.child.skuName}</span>
                          </td>
                          <td>
                            <span>{item.quantity}</span>
                          </td>
                          <td>
                            <span>{item.quantity} @ {item.price}</span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table></React.Fragment> : <Jumbotron style={{backgroundColor: 'white'}}>
                <center>
                  <b>Empty Cart</b>
                </center>
              </Jumbotron>
        }
        <React.Fragment>
          <h1> Payment </h1>
          <form>
            <Row>
              <Col md={3}>
                <FormGroup controlId="ccNumber">
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="Credit Card Number"
                    value={this.state.ccNumber}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroup controlId="ccExpiryMonth">
                  <FormControl
                    value={this.state.ccExpiryMonth}
                    size="2"
                    placeholder="Expiry Month"
                    onChange={this.handleChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId="ccExpiryYear">
                  <FormControl
                    value={this.state.ccExpiryYear}
                    size="4"
                    placeholder="Expiry Year"
                    onChange={this.handleChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroup controlId="ccCVV">
                  <FormControl
                    value={this.state.ccCVV}
                    placeholder="CVV"
                    size="3"
                    onChange={this.handleChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </form>
        </React.Fragment>
        <Button
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          onClick={this.placeOrder.bind(this)}
        >
            Place Order
        </Button>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, {getCurrentProfile, submitOrder})(Checkout);
