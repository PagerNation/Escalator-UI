import React from "react";
import { connect } from 'react-redux';
import { logIn, signUp } from '../../store/user';
import { clearLoginError } from '../../store/api';
import { Grid, Message } from 'semantic-ui-react';
import "./Login.scss";
import LoginForm from  "./LoginForm";
import SignupForm from "./SignupForm";
import _ from 'lodash';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      showLogin: true
    };
  }

  componentWillMount() {
    _.bindAll(this, 'onLoginSubmit', 'onSignupSubmit', 'toggleForm');
  }

  componentWillUnmount() {
    this.props.clearLoginError();
  }

  renderForm() {
    if (this.state.showLogin) {
      return (
        <div>
          <LoginForm loginError={!!this.props.loginError} onSubmit={this.onLoginSubmit} />
          <Message
            content={<span>New to us? <a onClick={this.toggleForm}>Sign Up</a></span>} />
        </div>
      );
    } else {
      return (
        <div>
          <SignupForm error={this.props.signupError} onSubmit={this.onSignupSubmit} />
          <Message
            content={<span>Already have an account? <a onClick={this.toggleForm}>Log In</a></span>} />
        </div>
      )
    }
  }

  render() {
    return (
      <Grid verticalAlign='middle' centered>
        <Grid.Column>
          {this.renderForm()}
        </Grid.Column>
      </Grid>
    );
  }

  onLoginSubmit(event, data) {
    event.preventDefault();
    this.props.logIn(data.email, data.password);
  }

  onSignupSubmit(event, data) {
    event.preventDefault();
    this.props.signUp(data.name, data.email, data.password, data.password2);
  }

  toggleForm() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }
}

const mapStateToProps = (state) => ({
  loginError: state.api.loginError,
  signupError: state.api.signupError
});

const mapDispatchToProps = {
  logIn,
  signUp,
  clearLoginError
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
