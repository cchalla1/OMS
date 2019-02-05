import {Badge, Jumbotron} from 'react-bootstrap';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/profileActions';

const mapStateToProps = (state) => ({
  user: state.profile,
  noOfItems: state.order && state.order.shoppingCart ? state.order.shoppingCart.length : 0
});

class Header extends Component {

  logout () {
    this.props.logout();
  }

  render () {
    return (
      <Jumbotron>
        <center>
          <b>Order Management System</b>
        </center>
        <center>
          <Link to="/">Home</Link>
        </center>
        {
          this.props.user && this.props.user.email &&
          <React.Fragment>
            <center>
              <b>Logged in as - {this.props.user.firstName} {this.props.user.lastName}</b>
            </center>
            <center>
              <Link to="/" onClick={this.logout.bind(this)}>Logout</Link> {' '}
              <Link to="/checkout">Checkout <Badge>{this.props.noOfItems}</Badge></Link> {' '} <Link to="/orderHistory">Order History</Link>
            </center>
          </React.Fragment>
        }
      </Jumbotron>
    );
  }
}

export default connect(mapStateToProps, {logout})(Header);
