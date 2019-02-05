// import './css/App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Checkout from './components/Checkout';
import Home from './components/Home';
import OrderDetails from './components/OrderDetails';
import OrderHistory from './components/OrderHistory';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store.js';

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path = '/orderHistory' component = {OrderHistory}/>
      <Route path = '/checkout' component = {Checkout}/>
      <Route path = '/orderDetails/:orderId' render={(props) => {
        <OrderDetails {...props}
          id={props.match.params.orderId}/>;
      }}/>
      <Route path='/' component={Home}/>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
