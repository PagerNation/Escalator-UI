import React from "react";
import _ from 'lodash';
import "./ProfileView.scss";
import { Header, Icon } from 'semantic-ui-react';
import InlineEditable from '../../../components/shared/InlineEditable';

class ProfileView extends React.Component {

  constructor() {
    super();
    _.bindAll(this, 'handleChange');
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  handleChange(data) {
    let profile = {name: this.props.user.name, email: this.props.user.email};
    _.extend(profile, data);
    this.props.updateProfile(profile);
  }

  render() {
    const user = this.props.user;
    return user && (
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

        <div>
          <InlineEditable name="Name" value={user.name} onChange={this.handleChange} />
          <InlineEditable name="Email" value={user.email}  onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default ProfileView;
