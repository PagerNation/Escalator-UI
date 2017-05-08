import React from "react";
import { Header, Card, Feed, Button } from 'semantic-ui-react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import JoinGroupModal from './JoinGroupModal';

const actionFormatting = {
  CREATED: "Ticket created",
  PAGE_SENT: "Page sent",
  ACKNOWLEDGED: 'Ticket acknowledged',
  REJECTED: 'Ticket rejected',
  CLOSED: 'Ticket closed'
};

class GroupsInfo extends React.Component {

  constructor() {
    super();
    _.bindAll(this,
      'toggleJoinRequestModal');
  }

  componentWillMount() {
    const groupNames = this.props.user.groups.map(group => group.name);
    this.props.fetchRecentGroupsTickets(groupNames);
  }

  onCall(group) {
    if (group.escalationPolicy.subscribers.length
      && this.props.user._id === group.escalationPolicy.subscribers[0].user) {
      return (
        <Header as='h4' className="on-call">
          You are on call
        </Header>
      );
    }
  }

  getFirstActiveSubscriber(group) {
    let firstActiveSub;

    _.forEach(group.escalationPolicy.subscribers, (subscriber) => {
      if (subscriber.active) {
        firstActiveSub = subscriber;
        return false;
      }
    });

    return firstActiveSub;
  }

  sortGroupsByOnCall(groups) {
    let subscriber;
    return _.sortBy(groups, (group) => {
      subscriber = this.getFirstActiveSubscriber(group);
      return subscriber ? subscriber.user !== this.props.user._id : true;
    });
  }

  ticketSummary(ticket, user) {
    let summaryInfo = `${actionFormatting[ticket.actionTaken]}`;

    if (!_.isNil(user) && !_.isNil(user[0])) {
      summaryInfo += ` by ${user[0].name}`;
    }

    return (
      <Feed.Summary>
        <a href="#">{summaryInfo}</a>
      </Feed.Summary>
    );
  }

  toggleJoinRequestModal() {
    this.refs["joinGroupModal"].open();
  }

  lastTicketAction(groupName) {
    const ticket = _.filter(this.props.tickets, { _id: groupName });

    if (_.isNil(ticket) || _.isNil(ticket[0])) {
      return (
        <div></div>
      );
    }

    const timeSinceAction = moment(ticket[0].timestamp).fromNow();

    return (
      <Feed>
        <Feed.Event>
          <Feed.Label image='http://semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Feed.Content>
            <Feed.Date content={timeSinceAction} />
            { this.ticketSummary(ticket[0], ticket[0].user) }
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }

  render() {
    var groupCards = this.sortGroupsByOnCall(this.props.groups).map((group, index) => {
      return _.isObject(group) && (
        <Card key={index} color="green" fluid>
          <Card.Content>
            <Card.Header>
              <Link to={`/group/${group.name}`}>{group.name}</Link>
            </Card.Header>
            { this.onCall(group) }
            { this.lastTicketAction(group.name) }
          </Card.Content>
        </Card>
      );
    });

    if (groupCards.length === 0) { 
      groupCards = <Card fluid><Card.Content>It appears you aren't apart of any groups. To join a group, click 'Join a Group'.</Card.Content></Card> 
    }

    return (
      <div>
        <JoinGroupModal
          ref="joinGroupModal"
          user={this.props.user}
          groupSearchResults={this.props.groupSearchResults}
          searchGroups={this.props.searchGroups}
          joinRequest={this.props.joinRequest}
        />
        <div>
          <Button
            content='Join a Group'
            icon='add circle'
            className='green'
            labelPosition='left'
            floated='right'
            onClick={this.toggleJoinRequestModal}
          />
          <Header as='h1'>My Groups</Header>
        </div>
        <Card.Group>
          {groupCards}
        </Card.Group>
      </div>
    );
  }
}

GroupsInfo.PropTypes = {
  groups: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    users: React.PropTypes.array.isRequired,
    escalationPolicy: React.PropTypes.object.isRequired
  })
};

export default GroupsInfo;
