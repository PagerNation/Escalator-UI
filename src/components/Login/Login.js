import React from "react";
import { connect } from 'react-redux';
import { fetchUser } from '../../store/user';
import { Grid, Header, Form, Input, Button, Segment, Image } from 'semantic-ui-react';
import "./Login.scss";
import '../../static/escalator.png';

class Login extends React.Component {

  render() {
    return (
      <Grid verticalAlign='middle' centered>
        <Grid.Column>
          <Image src='escalator.png' size='tiny' />
          <Header as='h2'>
            Escalator Login
          </Header>
          <Segment stacked>
            <Form>
              <Form.Field>
                <Input placeholder='Email'  icon='user' iconPosition='left' type="email" />
              </Form.Field>
              <Form.Field>
                <Input placeholder='Password' icon='lock' iconPosition='left' type="password" />
              </Form.Field>
              <Button primary fluid type='submit'>Submit</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  fetchUser
};

export default connect(null, mapDispatchToProps)(Login);
