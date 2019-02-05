import {Grid, Tab, Tabs} from 'react-bootstrap';
import React, {Component} from 'react';
import Header from './Header';
import Login from './Login';
import ProductListing from './ProductListing';
import Register from './Register';
import {connect} from 'react-redux';
import {getCurrentOrder} from '../store/actions/orderActions';
import {getCurrentProfile} from '../store/actions/profileActions';

const mapStateToProps = (state) => ({
  user: state.profile
});

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      login: true
    };
  }

  componentDidMount () {
    // this.props.getCurrentOrder();
    this.props.getCurrentProfile();
  }

  handleChange = () => {
    this.setState({
      login: !this.state.login
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render () {
    return (
      <Grid bsClass="container">
        <Header />
        {
          this.props.user && this.props.user.email ? <ProductListing />
            : <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
              <Tab eventKey="login" title="Login">
                <Login />
              </Tab>
              <Tab eventKey="register" title="Register">
                <Register />
              </Tab>
            </Tabs>
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps, {getCurrentOrder, getCurrentProfile})(Home);
