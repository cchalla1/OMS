import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.profile
});

class Header extends Component {
  render () {
    return (
      <Jumbotron>
        <center>
          <b>Order Management System</b>
        </center>
        {
          this.props.user && this.props.user.email &&
          <center>
            <b>Logged in as - {this.props.user.firstName} {this.props.user.lastName}</b>
          </center>
        }
      </Jumbotron>
    );
  }
}

export default connect(mapStateToProps)(Header);
