import React from "react";
import { Divider, Header, Grid, Segment, Button } from 'semantic-ui-react';
import _ from 'lodash';

class AdminView extends React.Component {
  constructor() {
    super();
    _.bindAll(this,
      "handleProcessRequest");
  }

  handleProcessRequest(userId, approved) {
    this.props.processRequest(this.props.group.name, userId, approved);
  }

  renderJoinRequests() {
    if (this.props.group.joinRequests && this.props.group.joinRequests.length > 0) {
      return (<Grid className="group-requests">
          <Grid.Column mobile={16} computer={8}>
            <Header as="h4">Pending membership requests:</Header>
            <div>
              {this.props.group.joinRequests.map((user, i) =>
                <Segment key={i} raised>
                  <Header as="h5">{user.name}</Header>
                  <span>{user.email}</span>
                  <Button style={{marginTop: "-20px"}} floated="right" color="green" onClick={() => this.handleProcessRequest(user._id, true)}>Approve</Button>
                  <Button style={{marginTop: "-20px"}} className="section-btn" floated="right" color="red" onClick={() => this.handleProcessRequest(user._id, false)}>Deny</Button>
                </Segment>
              )}
            </div>
          </Grid.Column>
        </Grid>);
    } else {
      return (<b>No pending join requests</b>);
    }
  }

  userDowngradeButtons() {
    return [,...this.props.group.users].filter((user) =>
        this.props.group.admins.indexOf(user._id) !== -1
    ).map((user, i) =>
      <Segment key={i} raised>
        <Header as="h5">{user.name}</Header>
        <span>{user.name}</span>
        <Button style={{marginTop: "-20px"}} floated="right" color="red" onClick={() => this.handleProcessRequest(user._id, true)}>Downgrade to Normal User</Button>
      </Segment>
    )
  }
  userUpgradeButtons() {
    return [,...this.props.group.users].filter((user) =>
        this.props.group.admins.indexOf(user._id) === -1
    ).map((user, i) =>
      <Segment key={i} raised>
        <Header as="h5">{user.name}</Header>
        <span>{user.name}</span>
        <Button style={{marginTop: "-20px"}} floated="right" color="green" onClick={() => this.handleProcessRequest(user._id, true)}>Upgrade to Admin</Button>
      </Segment>
    )
  }

  renderUpgradeTable() {
    return (<Grid className='user-upgrade'>
      <Grid.Column mobile={16} computer={8}>
        <Header as="h4">Upgrade users to admin:</Header>
          <div>
            {this.userUpgradeButtons()}
          </div>
        <Header as="h4">Downgrade admins to regular user:</Header>
          <div>
            {this.userDowngradeButtons()}
          </div>
      </Grid.Column>
    </Grid>);
  }

  render() {
    console.log(this.props.group)
    if (this.props.group.admins.includes(this.props.user._id)){
      return (<div>
        <Divider/>
        <Header as="h3">Administration</Header>
        {this.renderJoinRequests()}
        <Divider hidden/>
        {this.renderUpgradeTable()}
        <Divider/>
      </div>);
    } else {
      return null;
    }
  }
}

export default AdminView;
