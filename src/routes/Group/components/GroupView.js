import React from "react";
//import "./GroupView.scss";
import { Divider, Label, Grid, Header } from 'semantic-ui-react';

class GroupView extends React.Component {

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
    return this.props.group && (
      <div>
        <Header as="h1">{this.props.group.name}</Header>
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
