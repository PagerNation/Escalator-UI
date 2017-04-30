import React from "react";
import { Modal, Button, Form, Radio, Popup, Icon } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import _ from 'lodash';
import moment from 'moment';

class RemoveSubscriberModal extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      subsToRemove: [],
      scheduled: {}
    };
    _.bindAll(this,
      "open",
      "close",
      "confirm",
      "handleScheduleChange",
      "isValidEndDate",
      "handleTimeChange"
    );
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

  handleTimeChange(user, field, date) {
    const subs = _.extend([], this.state.subsToRemove);
    _.find(subs, (sub) => sub.user === user)[field] = date.valueOf();
    this.setState({
      subsToRemove: subs
    });
  }

  confirm() {
    this.props.onConfirm(this.state.subsToRemove);
    this.close();
  }

  isValidStartDate(date) {
    return date.isAfter(moment());
  }

  isValidEndDate(date, user) {
    return date.isAfter(moment()) &&
      user.deactivateDate &&
      date.isAfter(moment(user.deactivateDate));
  }

  renderSchedule(user) {
    return this.state.scheduled[user.user] && (
      <Form.Group>
        <Form.Field width={6}>
          <label>Deactivate On</label>
          <DateTime
            isValidDate={this.isValidStartDate}
            value={user.deactivateDate}
            onChange={(date) => this.handleTimeChange(user.user, "deactivateDate", date)} />
       </Form.Field>
        <Form.Field width={6}>
          <label>Reactivate On</label>
          <DateTime
            isValidDate={(date) => this.isValidEndDate(date, user)}
            value={user.reactivateDate}
            onChange={(date) => this.handleTimeChange(user.user, "reactivateDate", date)} />
        </Form.Field>
      </Form.Group>
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
              <Popup trigger={<Icon name='question circle' className="help-icon" />}>
                Team members may be removed from the escalation at a later time and
                optionally returned afterwards.
              </Popup>
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
