import React from "react";
import "./GroupView.scss";
import { Divider, Label, Grid, Header, Button, Confirm, Icon, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import classNames from 'classnames';

class GroupView extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmOpen: false,
      selectedOnCall: [],
      selectedBenched: []
    };
    _.bindAll(this,
      "toggleConfirm",
      "handleLeave",
      "toggleSelectOnCall",
      "toggleSelectBenched",
      "handleRemoveSubscribers",
      "handleAddSubscribers",
      "handleProcessRequest");
  }

  toggleSelectOnCall(index) {
    this.setState({
      selectedOnCall: _.xor(this.state.selectedOnCall, [index])
    });
  }

  toggleSelectBenched(index) {
    this.setState({
      selectedBenched: _.xor(this.state.selectedBenched, [index])
    });
  }

  toggleConfirm() {
    this.setState({
      confirmOpen: !this.state.confirmOpen
    });
  }

  handleLeave() {
    this.props.leaveGroup(this.props.group.name, this.props.user._id).then(this.toggleConfirm);
  }

  handleRemoveSubscribers() {
    const subs = this.props.group.escalationPolicy.subscribers;
    this.state.selectedOnCall.forEach((i) => subs.splice(i, 1));
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
    this.setState({
      selectedOnCall: []
    });
  }

  handleAddSubscribers() {
    const subs = this.props.group.escalationPolicy.subscribers;
    const benched = [,...this.props.group.users].filter((user) =>
      this.props.group.escalationPolicy.subscribers.indexOf(user._id) === -1
    );
    this.state.selectedBenched.forEach((i) => subs.push(benched[i]._id));
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
    this.setState({
      selectedBenched: []
    });
  }

  handleProcessRequest(userId, approved) {
    this.props.processRequest(this.props.group.name, userId, approved);
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  active() {
   return [,...this.props.group.users].filter((user) =>
    this.props.group.escalationPolicy.subscribers.indexOf(user._id) > -1
   ).map((user, i) =>
     <a
       className={classNames("box arrow_box", {"selected": this.state.selectedOnCall.includes(i)})}
       onClick={() => this.toggleSelectOnCall(i)}
       key={i}>
      {user.name}
     </a>
    );
  };

  benched() {
   return [,...this.props.group.users].filter((user) =>
     this.props.group.escalationPolicy.subscribers.indexOf(user._id) === -1
   ).map((user, i) =>
      <a
        className={classNames("box", {"selected": this.state.selectedBenched.includes(i)})}
        onClick={() => this.toggleSelectBenched(i)}
        key={i}>
        {user.name}
      </a>
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
        Escalation Interval: <Label color='teal' horizontal>{this.props.group.escalationPolicy.pagingIntervalInMinutes}</Label> minutes
      </span>
    );
  };

  renderAdmin() {
    return this.props.group.admins.includes(this.props.user._id) && (
      <div>
        <Divider/>
        <Header as="h3">Administration</Header>
        <Grid>
          <Grid.Column mobile={16} computer={8}>
            <Header as="h4">Pending membership requests:</Header>
            {this.props.group.joinRequests.length > 0 ?
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
              : <em>No requests</em>
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }

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
          <Grid.Column mobile={16} computer={7}>
            <h3>Escalation Order:</h3>
            {this.active()}
          </Grid.Column>
          <Grid.Column verticalAlign="middle" mobile={16} computer={1}>
            <Button
              className="move-btn"
              size="mini"
              disabled={this.state.selectedBenched.length == 0}
              onClick={this.handleAddSubscribers}
            >
                <Icon name="chevron left" />
            </Button>
            <Button
              className="move-btn"
              size="mini"
              disabled={this.state.selectedOnCall.length == 0}
              onClick={this.handleRemoveSubscribers}
            >
                <Icon name="chevron right" />
            </Button>
          </Grid.Column>
          <Grid.Column mobile={16} computer={7}>
            <h3>Not On Call:</h3>
            {this.benched()}
          </Grid.Column>
        </Grid>
        {this.renderAdmin()}
      </div>
    );
  }
}

export default GroupView;
