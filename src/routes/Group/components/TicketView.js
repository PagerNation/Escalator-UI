import React from "react";
import { Table, Menu, Segment, Card, Feed, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import dateFormat from 'dateFormat';

const actionFormatting = {
  CREATED: "Created",
  PAGE_SENT: "Page Sent",
  ACKNOWLEDGED: 'Acknowledged',
  REJECTED: 'Rejected',
  CLOSED: 'Closed'
};

class TicketView extends React.Component {

  constructor(props) {
    super(props);

    let showOpenTickets = true;
    if (!_.isNil(this.props.openTickets) && this.props.openTickets) {
      showOpenTickets = false;
    }

    this.state = {
      showOpenTickets
    };
    _.bindAll(this,
      'handleTabClick');
  }

  handleTabClick() {
    this.setState({ showOpenTickets: !this.state.showOpenTickets });
  }

  formatDate(date) {
    return dateFormat(new Date(date), 'mmmm dS, yyyy, h:MM:ss TT');
  }



  eventHelper(index, timestamp, summary) {
    return (
      <Feed.Event key={index}>
        <Feed.Content>
          <Feed.Date content={String(this.formatDate(timestamp))} />
          <Feed.Extra>
            {summary}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }

  ticketRow(ticket, index){
    const events = []
    const id = 'ticket_'+ticket._id+'_'+index;
    if (ticket.actions) {
      const action = ticket.actions[index];
      let summary;
      switch(action.actionTaken) {
        case 'CREATED':
          summary = `${this.capitalize(ticket.metadata.title)} created.`;
          events.push(this.eventHelper(index, action.timestamp, summary));
          break;
        case 'PAGE_SENT':
          summary = `${actionFormatting[action.actionTaken]} to ${action.user.name} via ${this.capitalize(action.device.type)}`;
          events.push(this.eventHelper(index, action.timestamp, summary));
          break;
        default:
          summary = `${actionFormatting[action.actionTaken]} by ${action.user.name}`;
          events.push(this.eventHelper(index, action.timestamp, summary));
      }
    }
    return (
      <Feed key={index}>
        {events}
      </Feed>
    );
  }

  renderLogs() {
    if (!this.props.tickets) {
      return <div><Header as="h3">No Ticket History</Header></div>;
    }

    return this.props.tickets.map((ticket, index) => {
      const rows = [];
      for (let i in ticket.actions) {
        rows.push(this.ticketRow(ticket, i));
      }

      return (
        <Card key={index} fluid>
          <Card.Content>
            <Card.Header>
              {this.capitalize(ticket.metadata.title)}
            </Card.Header>
            {rows}
          </Card.Content>
        </Card>
      );
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  renderTickets() {
    if (_.isNil(this.props.openTickets) || !this.props.openTickets.length) {
      return (
        <Header as="h3">
          No Open Tickets
        </Header>
      );
    }
    return this.props.openTickets.map((ticket, index) => {
      const timeSinceLastUpdate = moment(
        ticket.updatedAt ?
        ticket.updatedAt :
        ticket.createdAt).fromNow();

      const hasBeenPaged = _.some(ticket.actions, (action) =>
        !_.isNil(action.user) && action.user._id == this.props.user._id
      );

      return !_.isNil(ticket) && (
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
                    onClick={() => this.props.handleTicketAcknowledgement(ticket._id)}
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

  render() {
    return (
      <div>
        <Header as="h3">Tickets</Header>
        <Menu attached="top" tabular>
          <Menu.Item name='openTickets' active={this.state.showOpenTickets} onClick={this.handleTabClick} />
          <Menu.Item name='ticketLogs' active={!this.state.showOpenTickets} onClick={this.handleTabClick} />
        </Menu>
        <Segment attached='bottom'>
          {this.state.showOpenTickets ?
            this.renderTickets() :
            this.renderLogs()
          }
        </Segment>
      </div>
    );
  }
}

export default TicketView;
