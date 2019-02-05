import {Button, Jumbotron} from 'react-bootstrap';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/profileActions';

const mapStateToProps = (state) => ({
  user: state.profile
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
        {
          this.props.user && this.props.user.email &&
          <React.Fragment>
            <center>
              <b>Logged in as - {this.props.user.firstName} {this.props.user.lastName}</b>
            </center>
            <center>
              <Button onClick={this.logout.bind(this)}>Logout</Button> <Link to="/checkout">Checkout</Link>
            </center>
          </React.Fragment>
        }
      </Jumbotron>
    );
  }
}

export default connect(mapStateToProps, {logout})(Header);
