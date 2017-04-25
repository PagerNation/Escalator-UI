import React from "react";
import { Modal, Button } from 'semantic-ui-react';
import _ from 'lodash';

class RemoveSubscriberModal extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      subsToRemove: []
    };
    _.bindAll(this, "open", "close", "confirm");
  }

  close() {
    this.setState({
      open: false
    });
  }

  open(subsToRemove) {
    this.setState({
      open: true,
      subsToRemove
    });
  }

  confirm() {
    this.props.onConfirm(this.state.subsToRemove);
    this.close();
  }

  renderUsers() {
    return this.state.subsToRemove.map((user, index) => {
      return <li key={index}>{user.name}</li>;
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
          <ul>
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
