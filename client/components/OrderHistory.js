import {Grid, Jumbotron, Table} from 'react-bootstrap';
import React, {Component} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../store/actions/profileActions';
import {getOrders} from '../store/actions/orderHistoryActions';

const mapStateToProps = (state) => ({
  orders: state.orderHistory[0],
  user: state.profile
});

class OrderHistory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      'ccNumber': '',
      'ccExpiryMonth': '',
      'ccExpiryYear': '',
      'ccCVV': '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  componentDidMount () {
    this.props.getCurrentProfile();
    this.props.getOrders();
  }

  // placeOrder () {
  //   const _id = this.props.order && this.props.order._id ? this.props.order._id : undefined;
  //   if (_id) {
  //     this.props.submitOrder({
  //       'op': 'complete',
  //       'payments': {
  //         paymentType: 'cc',
  //         cardNumber: this.state.ccNumber,
  //         expiryDate: this.state.ccExpiryMonth + '/' + this.state.ccExpiryYear
  //       },
  //       'shoppingCart': this.props.order.shoppingCart,
  //       _id
  //     });
  //   }
  // }

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
            : this.props.orders && this.props.orders.length > 0
              ? <React.Fragment>
                <h1> Order History </h1>
                <Table responsive={'md'}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.orders.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <span>{item._id}</span>
                          </td>
                          <td>
                            <span>{item.status}</span>
                          </td>
                          <td>
                            <Link
                              to={`/orderDetails/${item._id}`}
                            >
                                Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table></React.Fragment> : <Jumbotron style={{backgroundColor: 'white'}}>
                <center>
                  <b>You did not place any order!!!</b>
                </center>
              </Jumbotron>
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps, {getCurrentProfile, getOrders})(OrderHistory);
