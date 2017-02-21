import React, { PropTypes } from 'react';
import Logo from  '../../static/escalator.png';
import { Header, Form, Input, Button, Segment, Image, Message } from 'semantic-ui-react';

class SignupForm extends React.Component {

  render() {
    return (
      <div>
        <Image src={Logo} size='tiny' />
        <Header as='h2'>
          Create an Account
        </Header>
        <Form error={!!this.props.error} onSubmit={this.props.onSubmit}>
          <Segment stacked>
              <Form.Field>
                <Input
                  name="name"
                  placeholder='Name'
                  required />
              </Form.Field>
              <Form.Field>
                <Input
                  name="email"
                  placeholder='Email'
                  type="email"
                  required />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  placeholder='Password'
                  type="password"
                  required />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password2"
                  placeholder='Confirm Password'
                  type="password"
                  required />
              </Form.Field>
              <Button primary fluid type='submit'>Submit</Button>
          </Segment>
          <Message
            error
            content={this.props.error}
          />
        </Form>
      </div>
    );
  }
}

SignupForm.PropTypes = {
  error: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignupForm;
