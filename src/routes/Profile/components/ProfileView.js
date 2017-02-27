import React from "react";
import _ from 'lodash';
import "./ProfileView.scss";
import { Header, Icon, Grid } from 'semantic-ui-react';
import InlineEditable from '../../../components/shared/InlineEditable';
import Devices from './Devices';

class ProfileView extends React.Component {

  constructor() {
    super();
    _.bindAll(this, 'handleChange');
  }

  handleChange(data) {
    let profile = {name: this.props.user.name, email: this.props.user.email};
    _.extend(profile, data);
    this.props.updateProfile(profile);
  }

  renderProfile(user) {
    return (
      <div className="profile">
        <Header as='h1'>
          <Icon name='user' />
          <Header.Content>
            My Profile
            <Header.Subheader>
              Manage your preferences
            </Header.Subheader>
          </Header.Content>
        </Header>

        <div className="section">
          <InlineEditable header="Name" name="name" value={user.name} onChange={this.handleChange} />
        </div>
        <div className="section">
          <InlineEditable header="Email" name="email" value={user.email}  onChange={this.handleChange} />
        </div>
      </div>
    );
  }

  render() {
    const user = this.props.user;
    return user && (
      <Grid columns='equal'>
        <Grid.Column mobile={16} computer={6}>
          {this.renderProfile(user)}
        </Grid.Column>
        <Grid.Column mobile={16} computer={10}>
          <Devices {...this.props} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProfileView;
