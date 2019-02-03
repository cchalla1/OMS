import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerProfile} from '../store/actions/profileActions';

const mapping = {
  registerEmail: 'email',
  registerPassword: 'password'
};

class Register extends Component {
  constructor (props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  validateForm () {
    return this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
    this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0;
  }

  handleChange = event => {
    const attribute = mapping[event.target.id] || event.target.id;
    this.setState({
      [attribute]: event.target.value
    });
  }

  handleSubmit = () => {
    const data = Object.assign({}, this.state, {_id: Date.now()});
    this.props.registerProfile({profile: data});
  }

  render () {
    return (
      <div className="Login">
        <form>
          <FormGroup controlId="firstName">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              value={this.state.firstName}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="lastName">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="registerEmail">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="registerPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            onClick={this.handleSubmit.bind(this)}
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, {registerProfile})(Register);
