import React from "react";
import { Table, Menu, Segment, Card, Feed, Button, Header, Accordion } from 'semantic-ui-react';
import { Link } from 'react-router';
import moment from 'moment';
import _ from 'lodash';

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
    if (!_.isNil(this.props.openTickets) && this.props.openTickets.length) {
      showOpenTickets = false;
    }

    this.state = {
      showOpenTickets,
      activeIndex: 0
    };
    _.bindAll(this,
      'handleTabClick',
      'handleAccordionTitleClick');
  }

  handleTabClick() {
    this.setState({ showOpenTickets: !this.state.showOpenTickets });
  }

  handleAccordionTitleClick(e, i) {
    this.setState({ activeIndex: this.state.activeIndex === i ? -1 : i })
  }

  formatDate(date) {
    return moment(date).format('MMMM D YYYY, h:mm:ss a');
  }

  eventHelper(index, timestamp, summary) {
    return (
      <Feed.Event key={index}>
        <Feed.Content>
          <Feed.Date content={this.formatDate(timestamp)} />
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
    if (!ticket.actions) {
      return (<p>No ticket actions</p>);
    }

    const action = ticket.actions[index];
    let summary;
    switch(action.actionTaken) {
      case 'CREATED':
        summary = `${_.capitalize(ticket.metadata.title)} created.`;
        break;
      case 'PAGE_SENT':
        summary = `${actionFormatting[action.actionTaken]} to ${action.user.name} via ${_.capitalize(action.device.type)}`;
        break;
      default:
        summary = `${actionFormatting[action.actionTaken]} by ${action.user.name}`;
    }
    events.push(this.eventHelper(index, action.timestamp, summary));
    return (
      <Feed key={index}>
        {events}
      </Feed>
    );
  }

  renderLogs() {
    if (!this.props.tickets) {
      return <Header as="h3">No Ticket History</Header>;
    }

    const panels = this.props.tickets.map((ticket, index) => {
      let rows = [];
      for (let i in ticket.actions) {
        rows.push(this.ticketRow(ticket, i));
      }
      if (rows.length === 0) {
        rows = 'No ticket actions';
      }
      return {
        key: `ticket_${index}`,
        title: !_.isNil(ticket.metadata) ? _.capitalize(ticket.metadata.title): '',
        content: rows
      };
    });

    return (
      <Accordion
        activeIndex={this.state.activeIndex}
        panels={panels}
        onTitleClick={this.handleAccordionTitleClick}
        fluid
        styled
      />
    )
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
