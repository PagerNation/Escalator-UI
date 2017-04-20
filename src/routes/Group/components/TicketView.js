import React from "react";
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router';

const actionFormatting = {
  CREATED: "Created",
  PAGE_SENT: "Page Sent",
  ACKNOWLEDGED: 'Acknowledged',
  REJECTED: 'Rejected',
  CLOSED: 'Closed'
};

class TicketView extends React.Component {

  actionRow(action){
    return (
      <tr>
        <td>{action.actionTaken}</td>
        <td>{action.timestamp}</td>
        <td>{action.userId}</td>
      </tr>
    );
  }

  userLink(user) {
    return user ? <Link to={'/user/' + user._id}>{user.name}</Link> : <span>No one</span>;
  };

  ticketRow(ticket, index){
    var title = (ticket.metadata.title) ? ticket.metadata.title : 'No name';
    var rows = [];
    var id = 'ticket_'+ticket._id+'_'+index;
    if (index == 0) {
      rows.push(<Table.Cell key={'title_'+id} rowSpan={ticket.actions.length}>{title}</Table.Cell>);
    }
    if (ticket.actions) {
      var action = ticket.actions[index];
      rows.push(<Table.Cell key={'actionTaken_'+id}>{actionFormatting[action.actionTaken]}</Table.Cell>);
      rows.push(<Table.Cell key={'date_'+id}>{String(new Date(action.timestamp))}</Table.Cell>);
      rows.push(<Table.Cell key={'user_'+id}>{this.userLink(action.user)}</Table.Cell>);
      rows.push(<Table.Cell key={'device_'+id}>{action.device ? action.device.type : ''}</Table.Cell>);
    }
    return (
      <Table.Row key={id}>
        {rows}
      </Table.Row>
    );
  }

  render() {
    if (!this.props.tickets) {
      return (
        <div></div>
      );
    }

    var rows = []
    if (!this.props.tickets) {
      console.log(this.props);
      return <div></div>;

    }
    for(var ticket of this.props.tickets) {
      for(var index in ticket.actions) {
        rows.push(this.ticketRow(ticket, index));
      }
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
}

export default TicketView;
