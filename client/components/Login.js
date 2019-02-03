import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../store/actions/profileActions';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm () {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = {profile: this.state};
    this.props.login(formData);
  }

  render () {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(null, {login})(Login);
