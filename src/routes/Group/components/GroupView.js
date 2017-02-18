import React from "react";
import "./GroupView.scss";
import { Icon, Divider, Label, Grid } from 'semantic-ui-react';

class GroupView extends React.Component {

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  active() {
   return [,...this.props.group.users].filter((user) =>
    this.props.group.escalationPolicy.subscribers.indexOf(user._id) > -1
   ).map((user, i) =>
      <div key={"active_"+i}>
      {this.arrow(i)}
      {this.userLink(user)}
      </div>
    )
  };

  arrow(index) {
    if (index != 0) {
      return <div>
        <Icon name='arrow circle outline down'/>
      </div>
    }
  };

  benched() {
   return [,...this.props.group.users].filter((user) =>
    this.props.group.escalationPolicy.subscribers.indexOf(user._id) === -1
   ).map((user, i) =>
      <div key={"benched_"+i}>
      {this.userLink(user)}
      </div>
    )
  };

  onCall() {
    var group = this.props.group
    var uid = group.escalationPolicy.subscribers[0]
    var user = group.users.filter( u => u._id === uid)[0]
    return <h4>User on call: {this.userLink(user)}</h4>
  };

  userLink(user_object) {
    return <a href={'/user/' + user_object._id +'/'}>{user_object.name}</a>
  };


  escalationInterval() {
    return <div>Escalation Interval:&nbsp;
      <Label color='teal' horizontal>{this.props.group.escalationPolicy.pagingIntervalInDays}</Label>
    minutes</div>
  };
  render() {
    return this.props.group && (
      <div>
        <h1>{this.props.group.name}</h1>
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
