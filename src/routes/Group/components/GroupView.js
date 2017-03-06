import React from "react";
import "./GroupView.scss";
import { Divider, Label, Grid, Header, Button, Confirm } from 'semantic-ui-react';
import _ from 'lodash';

class GroupView extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmOpen: false
    };
    _.bindAll(this, "toggleConfirm", "handleLeave");
  }

  toggleConfirm() {
    this.setState({
      confirmOpen: !this.state.confirmOpen
    });
  }

  handleLeave() {
    this.props.leaveGroup(this.props.group.name, this.props.user._id).then(this.toggleConfirm);
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  active() {
   return [,...this.props.group.users].filter((user) =>
    this.props.group.escalationPolicy.subscribers.indexOf(user._id) > -1
   ).map((user, i) =>
     <a className="arrow_box" key={i} href={'/user/' + user._id +'/'}>
      {user.name}
     </a>
    );
  };

  benched() {
   return [,...this.props.group.users].filter((user) =>
     this.props.group.escalationPolicy.subscribers.indexOf(user._id) === -1
   ).map((user, i) =>
      <div key={"benched_" + i}>
        {this.userLink(user)}
      </div>
    )
  };

  onCall() {
    var group = this.props.group;
    var uid = group.escalationPolicy.subscribers[0];
    var user = group.users.filter(u => u._id === uid)[0];
    return <Header as="h4">User on call: {this.userLink(user)}</Header>;
  };

  userLink(user) {
    return user ? <a href={'/user/' + user._id +'/'}>{user.name}</a> : <span>No one</span>;
  };

  escalationInterval() {
    return (
      <span>
        Escalation Interval: <Label color='teal' horizontal>{this.props.group.escalationPolicy.pagingIntervalInDays}</Label> minutes
      </span>
    );
  };

  render() {
    const leaveButton = this.props.group && _.find(this.props.group.users, (user) => user._id === this.props.user._id) && (
      <Button className="action-button" onClick={this.toggleConfirm}>Leave Group</Button>
    );

    const confirm = (
      <Confirm
        open={this.state.confirmOpen}
        content={`Are you sure you want to leave this group?`}
        confirmButton="Leave"
        onCancel={this.toggleConfirm}
        onConfirm={this.handleLeave}
      />
    );

    return this.props.group && (
      <div>
        {confirm}
        <Header as="h1">{this.props.group.name}</Header>
        {leaveButton}
        {this.onCall()}
        {this.escalationInterval()}
        <Divider/>
        <Grid>
          <Grid.Column mobile={16} computer={6}>
            <h3>Escalation Order:</h3>
            {this.active()}
          </Grid.Column>
          <Grid.Column mobile={16} computer={6}>
            <h3>Not On Call:</h3>
            {this.benched()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default GroupView;
