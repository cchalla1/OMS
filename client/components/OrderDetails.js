import {Grid, Jumbotron, Table} from 'react-bootstrap';
import React, {Component} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../store/actions/profileActions';
import {getOrderDetails} from '../store/actions/orderDetailActions';

const mapStateToProps = (state) => ({
  orderDetail: state.orderDetail,
  user: state.profile
});

class OrderDetails extends Component {
  componentDidMount () {
    this.props.getCurrentProfile();
    this.props.getOrderDetails(this.props.id);
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
            : this.props.orderDetail && this.props.orderDetail._id
              ? <React.Fragment>
                <h1> Order Details </h1>
                <h3>Order: {this.props.orderDetail._id}</h3>
                <h5>{this.props.orderDetail.status}</h5>
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
                      this.props.orderDetail.shoppingCart.map((item, index) => (
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
                </Table>
                <div>
                  <div>
                    <h3>Payment Method</h3>
                    <div>
                      <div><b>Payment Type:</b> {this.props.orderDetail.payments.paymentType}</div>
                      <div><b>Card Number:</b> {this.props.orderDetail.payments.cardNumber}</div>
                      <div><b>Auth Status:</b> {this.props.orderDetail.payments.authStatus}</div>
                      <div>{this.props.orderDetail.payments.declineReasons
                        ? <span><b>Decline Reasons:</b> this.props.orderDetail.payments.declineReasons</span> : <span></span>
                      }</div>
                    </div>
                  </div>
                </div>
              </React.Fragment> : <Jumbotron style={{backgroundColor: 'white'}}>
                <center>
                  <b>You did not place this order!!!</b>
                </center>
              </Jumbotron>
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps, {getCurrentProfile, getOrderDetails})(OrderDetails);
