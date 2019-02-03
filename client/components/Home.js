import {Grid, Tab, Tabs} from 'react-bootstrap';
import React, {Component} from 'react';
import Header from './Header';
import Login from './Login';
import PDP from './PDP';
import Register from './Register';
import {connect} from 'react-redux';
import {getCurrentOrder} from '../store/actions/orderActions';

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
    this.props.getCurrentOrder();
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
          this.props.user && this.props.user.email ? <PDP />
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

export default connect(mapStateToProps, {getCurrentOrder})(Home);
