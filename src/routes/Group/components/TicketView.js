import React from "react";
import { Table } from 'semantic-ui-react';

class TicketView extends React.Component {

  actionRow(action){
    return (
      <tr>
      <td>{action.actionTaken}</td>
      <td>{action.timestamp}</td>
      <td>{action.userId}</td>
      </tr>
    )
  }

  ticketRow(ticket, index){
    var title = (typeof ticket.metadata.title != undefined) ? ticket.metadata.title : 'No name';
    var rows = [];
    if (index == 0) {
      rows.push(<Table.Cell rowSpan='5'>{title}</Table.Cell>)
    }
    if (typeof ticket.actions != 'undefined'){
      var action = ticket.actions[index];
      rows.push(<Table.Cell>{action.actionTaken}</Table.Cell>)
      rows.push(<Table.Cell>{String(new Date(action.timestamp))}</Table.Cell>)
      rows.push(<Table.Cell>{action.userId}</Table.Cell>)
      if (typeof action.device != 'undefined' ) {
        rows.push(<Table.Cell>{action.device.type}</Table.Cell>)
      }
    }
    return <Table.Row>
      {rows}
    </Table.Row>
  }

  render() {
    var rows = []
    for(var ticket of this.props.tickets) {
      for(var index in ticket.actions) {
        rows.push(this.ticketRow(ticket, index))
      }
    }
    console.log(rows)
    return <div>
      <Table celled structured>
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
  }
}

export default TicketView;
