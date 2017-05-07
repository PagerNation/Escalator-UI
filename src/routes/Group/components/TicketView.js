import React from "react";
import { Table, Menu, Segment, Card, Feed, Button, Header } from 'semantic-ui-react';
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
      showOpenTickets
    };
    _.bindAll(this,
      'handleTabClick');
  }

  handleTabClick() {
    this.setState({ showOpenTickets: !this.state.showOpenTickets });
  }

  ticketRow(ticket, index){
    const title = (ticket.metadata.title) ? ticket.metadata.title : 'No name';
    const rows = [];
    const id = 'ticket_'+ticket._id+'_'+index;
    if (index == 0) {
      rows.push(<Table.Cell key={'title_'+id} rowSpan={ticket.actions.length}>{title}</Table.Cell>);
    }
    if (ticket.actions) {
      const action = ticket.actions[index];
      rows.push(<Table.Cell key={'actionTaken_'+id}>{actionFormatting[action.actionTaken]}</Table.Cell>);
      rows.push(<Table.Cell key={'date_'+id}>{String(new Date(action.timestamp))}</Table.Cell>);
      rows.push(<Table.Cell key={'user_'+id}>{action.user ? action.user.name : ''}</Table.Cell>);
      rows.push(<Table.Cell key={'device_'+id}>{action.device ? action.device.type : ''}</Table.Cell>);
    }
    return (
      <Table.Row key={id}>
        {rows}
      </Table.Row>
    );
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

  renderLogs() {
    if (!this.props.tickets) {
      return <div></div>;
    }

    const rows = []
    for (let ticket of this.props.tickets) {
      for (let index in ticket.actions) {
        rows.push(this.ticketRow(ticket, index));
      }
    }

    if (!rows.length) {
      return (
        <Header as="h3">
          No Ticket History
        </Header>
      );
    }

    return (
      <div>
        <Table striped celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ticket</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Time of Action</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Device</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </div>
    );
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
