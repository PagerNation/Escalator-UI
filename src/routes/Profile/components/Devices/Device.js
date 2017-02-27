import React, { Component, PropTypes } from 'react';
import { Card, Icon, Input, Label } from 'semantic-ui-react';

class Device extends Component {

  getIcon(type) {
    switch(type) {
      case 'phone': return 'phone';
      case 'email': return 'mail';
      case 'sms': return 'comment';
      default: return 'user';
    }
  }

  render() {
    const device = this.props.device;

    const time = !this.props.isLast && (
      <div style={{textAlign: 'center', paddingBottom: '15px'}}>
        <Input
            type="number"
            label={{ basic: true, content: 'minutes' }}
            labelPosition='right'
            placeholder=''
            defaultValue={5}
        />
      </div>
    );

    return (
      <div className="draggable">
        <Card color="green" fluid>
          <Label attached="bottom right">
            <Icon name="check" color="green" />
            Verified
          </Label>
          <Card.Content>
            <Icon name={this.getIcon(device.type)} />
            {device.name}

            <Icon onClick={() => this.props.onDelete(device._id)} className="action-icon" name="x" link />
          </Card.Content>
          <Card.Content extra>
            {device.contactInformation}
          </Card.Content>
        </Card>
        {time}
      </div>
    );
  }
}

export default Device;
