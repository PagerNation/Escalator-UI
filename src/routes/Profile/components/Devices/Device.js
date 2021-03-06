import React, { Component, PropTypes } from 'react';
import { Card, Icon, Input, Label, Confirm } from 'semantic-ui-react';
import _ from 'lodash';
import InlineEditable from '../../../../components/shared/InlineEditable';

class Device extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmOpen: false,
      delay: props.delay
    };
    _.bindAll(this,
      "toggleConfirm",
      "handleChange",
      "handleIntervalChange");

    this.debounceSend = _.debounce(this.updateInterval, 800);
  }

  toggleConfirm() {
    this.setState({
      confirmOpen: !this.state.confirmOpen
    });
  }

  handleChange(data) {
    this.props.onUpdate(this.props.device._id, data);
  }

  handleIntervalChange(event) {
    this.setState({ delay: parseInt(event.target.value) });
    this.debounceSend();
  }

  updateInterval(event) {
    if (!this.state.delay || this.state.delay === '') {
      return;
    }
    this.props.onUpdateInterval(this.props.index, this.state.delay);
  }

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
      <div className="device-interval">
        <Input
          type="number"
          label={{ basic: true, content: 'minutes' }}
          labelPosition='right'
          placeholder=''
          value={this.state.delay}
          onChange={this.handleIntervalChange}
       />
      </div>
    );

    const confirm = (
      <Confirm
        open={this.state.confirmOpen}
        content={`Are you sure you want to delete ${device.name}?`}
        confirmButton="Delete"
        onCancel={this.toggleConfirm}
        onConfirm={() => this.props.onDelete(device._id)}
      />
    );

    return (
      <div className="draggable">
        {confirm}
        <Card color="green" fluid>
          <Card.Content>
            <Icon name={this.getIcon(device.type)} />
            <InlineEditable name="name" value={device.name} onChange={this.handleChange} header={false} />
            <Icon onClick={this.toggleConfirm} className="action-icon" name="x" link />
          </Card.Content>
          <Card.Content extra>
            <InlineEditable name="contactInformation" value={device.contactInformation} onChange={this.handleChange} header={false} />
          </Card.Content>
        </Card>
        {time}
      </div>
    );
  }
}

export default Device;
