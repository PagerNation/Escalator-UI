import React from "react";
import "./JoinGroupModal.scss";
import { Header, Segment, Button, Message, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
import classNames from 'classnames';
import Select from 'react-select';

class JoinGroupModal extends React.Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      selectedGroup: null,
      open: false,
      sent: false,
      loading: false
    };
    _.bindAll(this,
      "handleSearch",
      "handleSend",
      "handleSelectGroup",
      "close");
  }

  handleSearch(event, value) {
    this.setState({
      searchValue: value,
      loading: true
    });
    if (value !== "") {
      this.props.searchGroups(value).then(() => {
        this.setState({
          loading: false
        });
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleSend() {
    this.props.joinRequest(this.state.selectedGroup.label).then(() => {
      this.setState({
        searchValue: "",
        sent: true,
        selectedGroup: null
      });
    });
  }

  handleSelectGroup(groupItem) {
    this.setState({
      selectedGroup: groupItem
    });
  }

  getOptions() {
    return this.props.groupSearchResults.map((group) => {
      return {
        value: group,
        label: group.name
      }
    });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({
      open: false,
      searchValue: "",
      loading: false,
      selectedGroup: null
    });
  }

  render() {
    const message = this.state.sent && (
      <Message positive>
        Your request has been sent! You will be added to the group once its leader approves your request.
      </Message>
    );

    return (
      <Modal className="join-request" open={this.state.open} onClose={this.close}>
        <Modal.Header>
          Make a Join Request
        </Modal.Header>
        <Modal.Content>
          <Select
            name="group-search"
            multi={false}
            placeholder="Search groups..."
            isLoading={this.state.loading}
            value={this.state.selectedGroup}
            options={this.getOptions()}
            onInputChange={this.handleSearch}
            onChange={this.handleSelectGroup}
          />
          {message}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close}>Cancel</Button>
          <Button className="send-btn green" onClick={this.handleSend}>Send request</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default JoinGroupModal;
