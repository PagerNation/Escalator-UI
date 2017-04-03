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
    var action = ticket.actions[index];
    if (index == 0) {
      return <Table.Row>
        <Table.Cell rowSpan='5'>{title}</Table.Cell>
        <Table.Cell>{"action"}</Table.Cell>
        <Table.Cell>{"timestamp"}</Table.Cell>
        <Table.Cell>{"UserId"}</Table.Cell>
        <Table.Cell>{"device"}</Table.Cell>
      </Table.Row>
    } else {
      return <Table.Row>
        <Table.Cell>{"action"}</Table.Cell>
        <Table.Cell>{"timestamp"}</Table.Cell>
        <Table.Cell>{"UserId"}</Table.Cell>
        <Table.Cell>{"device"}</Table.Cell>
      </Table.Row>
    }
        
  }

  render() {
    var rows = []
    for(var index in this.props.tickets[0].actions) {
      rows.push(this.ticketRow(this.props.tickets[0], index))
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
