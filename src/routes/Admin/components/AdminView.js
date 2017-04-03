import React from "react";
import "./AdminView.scss";
import { Header, Input, Grid } from 'semantic-ui-react';

class AdminView extends React.Component {

  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
    _.bindAll(this, "handleSearch");
  }

  handleSearch(event, value) {
    this.setState({
      searchValue: value
    });
    if (value !== "") {
      this.props.searchGroups(value);
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Administration</Header>
        <Header as="h2">Edit User Permissions</Header>
        <Grid>
          <Grid.Column mobile={16} computer={8}>
            <Input
              fluid
              placeholder="User name"
              value={this.state.searchValue}
              onChange={this.handleSearch} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AdminView;
