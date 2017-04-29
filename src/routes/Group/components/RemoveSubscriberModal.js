import React from "react";
import { Modal, Button, Form, Radio } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import _ from 'lodash';

class RemoveSubscriberModal extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      subsToRemove: [],
      scheduled: {}
    };
    _.bindAll(this, "open", "close", "confirm", "handleScheduleChange");
  }

  close() {
    this.setState({
      open: false
    });
  }

  open(subsToRemove) {
    const scheduled = {};
    _.map(subsToRemove, (sub) => {
      scheduled[sub.user] = false;
    });
    this.setState({
      open: true,
      subsToRemove,
      scheduled
    });
  }

  handleScheduleChange(event, value) {
    event.preventDefault();
    this.setState({
      scheduled: _.extend(this.state.scheduled, {[value.value]: value.name === 'scheduled'})
    });
  }

  confirm() {
    this.props.onConfirm(this.state.subsToRemove);
    this.close();
  }

  renderSchedule(user) {
    return this.state.scheduled[user.user] && (
      <Form.Field>
        <DateTime className="date-field" />
      </Form.Field>
    );
  }

  renderUsers() {
    return this.state.subsToRemove.map((user, index) => {
      return (
        <li key={index}>
          <strong>{user.name}</strong>
          <Form>
            <Form.Field>
              <Radio
                label='Remove immediately'
                name='immediate'
                value={user.user}
                checked={!this.state.scheduled[user.user]}
                onChange={this.handleScheduleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Scheduled'
                name='scheduled'
                value={user.user}
                checked={this.state.scheduled[user.user]}
                onChange={this.handleScheduleChange}
              />
            </Form.Field>
            {this.renderSchedule(user)}
          </Form>
        </li>
      );
    });
  }

  render() {
    return (
      <Modal open={this.state.open} onClose={this.close}>
        <Modal.Header>
          Remove Subscribers
        </Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to remove these subscribers?</p>
          <ul className="sub-list">
            {this.renderUsers()}
          </ul>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close}>
            Cancel
          </Button>
          <Button negative onClick={this.confirm}>
            Remove
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

RemoveSubscriberModal.propTypes = {
  onConfirm: React.PropTypes.func
};

export default RemoveSubscriberModal;
