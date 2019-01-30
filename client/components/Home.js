import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render () {
    return (
      <div>
        <Link to="/checkout">Checkout</Link>
      </div>
    );
  }
}

export default Home;
