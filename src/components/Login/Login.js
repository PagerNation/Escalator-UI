import React from "react";
import { connect } from 'react-redux';
import { logIn } from '../../store/user';
import { clearLoginError } from '../../store/api';
import { Grid, Header, Form, Input, Button, Segment, Image, Message } from 'semantic-ui-react';
import "./Login.scss";
import Logo from  '../../static/escalator.png';

class Login extends React.Component {

  componentWillMount() {
    _.bindAll(this, 'onSubmit');
  }

  componentWillUnmount() {
    this.props.clearLoginError();
  }

  render() {
    return (
      <Grid verticalAlign='middle' centered>
        <Grid.Column>
          <Image src={Logo} size='tiny' />
          <Header as='h2'>
            Escalator Login
          </Header>
          <Form error={!!this.props.loginError} onSubmit={this.onSubmit}>
            <Segment stacked>
                <Form.Field>
                  <Input
                    name="email"
                    placeholder='Email'
                    icon='user'
                    iconPosition='left'
                    type="email"
                    required />
                </Form.Field>
                <Form.Field>
                  <Input
                    name="password"
                    placeholder='Password'
                    icon='lock'
                    iconPosition='left'
                    type="password"
                    required />
                </Form.Field>
                <Button primary fluid type='submit'>Submit</Button>
            </Segment>
            <Message
              error
              content='Your login information is incorrect.'
            />
            <Message
              content={<span>New to us? <a href="#">Sign Up</a></span>}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }

  onSubmit(event, data) {
    event.preventDefault();
    this.props.logIn(data.email, data.password);
  }
}

const mapStateToProps = (state) => ({
  loginError: state.api.loginError
});

const mapDispatchToProps = {
  logIn,
  clearLoginError
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
