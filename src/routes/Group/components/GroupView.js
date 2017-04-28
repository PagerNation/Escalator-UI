import React from "react";
import "./GroupView.scss";
import { Divider, Label, Grid, Header, Button, Confirm, Icon, Segment, Card, Feed, Menu } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import InlineEditable from '../../../components/shared/InlineEditable';
import classNames from 'classnames';
import TicketView from './TicketView';

class GroupView extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmOpen: false,
      showOpenTickets: true,
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
      "handleProcessRequest",
      "handleEditPagingInterval",
      "handleTicketAcknowledgement",
      "handleTabClick");
  }

  toggleSelectOnCall(index) {
    if (this.props.group.admins.includes(this.props.user._id)) {
      this.setState({
        selectedOnCall: _.xor(this.state.selectedOnCall, [index])
      });
    }
  }

  toggleSelectBenched(index) {
    if (this.props.group.admins.includes(this.props.user._id)) {
      this.setState({
        selectedBenched: _.xor(this.state.selectedBenched, [index])
      });
    }
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
    const subs = this.props.group.escalationPolicy.subscribers.map((user) => _.omit(user, "_id"));
    this.state.selectedOnCall.forEach((i) => subs.splice(i, 1));
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
    this.setState({
      selectedOnCall: []
    });
  }

  handleAddSubscribers() {
    const subs = this.props.group.escalationPolicy.subscribers.map((user) => _.omit(user, "_id"));
    const subIds = subs.map((user) => user.user);
    const benched = [,...this.props.group.users].filter((user) =>
      subIds.indexOf(user._id) === -1
    );
    this.state.selectedBenched.forEach((i) => subs.push({
      user: benched[i]._id,
      active: true,
      deactivateDate: null,
      reactivateDate: null
    }));
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
    this.setState({
      selectedBenched: []
    });
  }

  handleEditPagingInterval(values) {
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {pagingIntervalInMinutes: values.pagingIntervalInMinutes});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
  }

  handleProcessRequest(userId, approved) {
    this.props.processRequest(this.props.group.name, userId, approved);
  }

  handleTicketAcknowledgement(ticketId) {
    this.props.acknowledgeTicket(ticketId);
  }

  handleTabClick() {
    this.setState({ showOpenTickets: !this.state.showOpenTickets });
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId);
    this.props.fetchGroupTickets({
      groupNames: this.props.params.groupId
    });
    this.props.fetchOpenGroupTickets({
      groupNames: this.props.params.groupId
    });
  }

  active() {
    const subIds = this.props.group.escalationPolicy.subscribers.map(u => u.user);
    return [,...this.props.group.users].filter((user) =>
      subIds.indexOf(user._id) > -1
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
   const subIds = this.props.group.escalationPolicy.subscribers.map(u => u.user);
   return [,...this.props.group.users].filter((user) =>
     subIds.indexOf(user._id) === -1
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
    const group = this.props.group;
    if (group.escalationPolicy.subscribers.length) {
      const uid = group.escalationPolicy.subscribers[0].user;
      const user = group.users.filter(u => u._id === uid)[0];
      return <Header as="h4">User on call:{this.userLink(user)}</Header>;
    }
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

  escalationIntervalAdmin() {
    return (
      <span>
        Escalation Interval:<Label color='teal' horizontal>
          <InlineEditable
            name="pagingIntervalInMinutes"
            value={this.props.group.escalationPolicy.pagingIntervalInMinutes}
            onChange={this.handleEditPagingInterval} />
        </Label>
        minutes
      </span>
    );
  };

  renderTickets() {
    return !_.isNil(this.props.openTickets) && this.props.openTickets.map((ticket, index) => {
      const timeSinceLastUpdate = moment(
        ticket.updatedAt ?
        ticket.updatedAt :
        ticket.createdAt).fromNow();

      const hasBeenPaged = _.some(ticket.actions, (action) =>
        action.user && action.user._id == this.props.user._id
      );

      return _.isObject(ticket) && (
        <Card key={index} color={hasBeenPaged ? 'red' : 'green'} fluid>
          <Card.Content>
            <Card.Header>
              {ticket.metadata.title}
            </Card.Header>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content={timeSinceLastUpdate} />
                  <Feed.Summary>
                    {ticket.metadata.description}
                  </Feed.Summary>
                  <Button
                    className="action-button"
                    onClick={() => this.handleTicketAcknowledgement(ticket._id)}
                  >
                    Acknowledge Ticket
                  </Button>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      );
    });
  }

  renderAdmin() {
    return this.props.group.joinRequests
          && this.props.group.joinRequests.length > 0
          && this.props.group.admins.includes(this.props.user._id) && (
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

  renderEPControls() {
    return this.props.group.admins.includes(this.props.user._id) && (
      <div>
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
      </div>
    );
  }

  renderMenu() {
    return (
      <Menu attached="top" tabular>
        <Menu.Item name='openTickets' active={this.state.showOpenTickets} onClick={this.handleTabClick} />
        <Menu.Item name='ticketLogs' active={!this.state.showOpenTickets} onClick={this.handleTabClick} />
      </Menu>
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
        {this.props.group.admins.includes(this.props.user._id) ?
          this.escalationIntervalAdmin() :
          this.escalationInterval()
        }
        <Divider/>
        <Grid>
          <Grid.Column mobile={16} computer={7}>
            <h3>Escalation Order:</h3>
            {this.active()}
          </Grid.Column>
          <Grid.Column verticalAlign="middle" mobile={16} computer={1}>
            {this.renderEPControls()}
          </Grid.Column>
          <Grid.Column mobile={16} computer={7}>
            <h3>Not On Call:</h3>
            {this.benched()}
          </Grid.Column>
        </Grid>
        {this.renderAdmin()}
        {this.renderMenu()}

        <Segment attached='bottom'>
          {this.state.showOpenTickets ?
            this.renderTickets() :
            <TicketView tickets={this.props.tickets}/>
          }
        </Segment>
      </div>
    );
  }
}

export default GroupView;
