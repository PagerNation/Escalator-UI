import React, { PropTypes } from 'react';
import Logo from  '../../static/escalator.png';
import { Header, Form, Input, Button, Segment, Image, Message } from 'semantic-ui-react';

class LoginForm extends React.Component {

  render() {
    return (
      <div>
        <Image src={Logo} size='tiny' />
        <Header as='h2'>
          Escalator Login
        </Header>
          <Form error={this.props.loginError} onSubmit={this.props.onSubmit}>
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
          content='Your login information is incorrect.' />
        </Form>
      </div>
    );
  }
}

LoginForm.PropTypes = {
  loginError: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
