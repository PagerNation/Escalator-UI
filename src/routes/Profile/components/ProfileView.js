import React from "react";
import "./ProfileView.scss";
import { Header, Icon } from 'semantic-ui-react';
import InlineEditable from '../../../components/shared/InlineEditable';

class ProfileView extends React.Component {

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props.user);
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
          <InlineEditable name="Name" value={user.name} />
          <InlineEditable name="Email" value={user.email} />
        </div>
      </div>
    );
  }
}

export default ProfileView;
