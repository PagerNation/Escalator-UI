import React from "react";
import "./JoinGroupView.scss";
import { Header, Segment, Button, Message } from 'semantic-ui-react';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
import classNames from 'classnames';

class GroupView extends React.Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      sent: false
    };
    _.bindAll(this, "handleSearch", "handleSend");
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

  render() {
    const message = this.state.sent && (
      <Message positive>
        Your request has been sent! You will be added to the group once its leader approves your request.
      </Message>
    );

    return (
      <div>
        <Header as="h1">Join a group</Header>

        <Segment className="join-group-segment">
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
        </Segment>
      </div>
    );
  }
}

export default GroupView;
