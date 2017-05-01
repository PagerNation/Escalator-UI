import React from "react";
import "./JoinGroupModal.scss";
import { Header, Segment, Button, Message, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
import classNames from 'classnames';

class JoinGroupModal extends React.Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      open: false,
      sent: false
    };
    _.bindAll(this,
      "handleSearch",
      "handleSend",
      "close");
  }

  handleSearch(event, value) {
    this.setState({
      searchValue: value
    });
    if (value !== "") {
      this.props.searchGroups(value);
    }
  }

  handleSend() {
    this.props.joinRequest(this.state.searchValue).then(() => {
      this.setState({searchValue: "", sent: true});
    });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({
      open: false,
      searchValue: ""
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
          <div className="ui input fluid">
            <Autocomplete
              inputProps={{className: "search-input", placeholder: "Search groups"}}
              items={this.props.groupSearchResults}
              getItemValue={(group) => group.name}
              renderItem={(item, isHighlighted) => {
                return <div
                  key={item.abbr}
                  className={classNames("menuItem", {"highlighted": isHighlighted})}
                  id={item.abbr}>
                  {item.name}
                </div>
              }}
              onSelect={(value, item) => {
                this.setState({ searchValue: value });
              }}
              value={this.state.searchValue}
              onChange={this.handleSearch}
            />
          </div>
          <Button className="send-btn" primary onClick={this.handleSend}>Send request</Button>
          {message}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default JoinGroupModal;
