import React from "react";
import "./AdminView.scss";
import { Header, Checkbox, Grid } from 'semantic-ui-react';
import Select from 'react-select';

class AdminView extends React.Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      selectedUser: null,
      loading: false
    };
    _.bindAll(this, "handleSearch", "getOptions", "handleSelectUser");
  }

  handleSelectUser(value) {
    console.log(value);
    this.setState({
      selectedUser: value || null
    });
  }

  handleSearch(value) {
    this.setState({
      searchValue: value,
      loading: true
    });
    if (value !== "") {
      this.props.searchByName(value).then(() => {
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

  getOptions() {
    return this.props.searchResults.map((user) => {
      return {
        value: user,
        label: user.name
      }
    });
  }

  renderUserEditor() {
    if(this.state.selectedUser) {
      const user = this.state.selectedUser.value;
      return (
        <div>
          <Header as="h3">{user.name}</Header>
          <p>{user.email}</p>
          <Header as="h4">Permissions:</Header>
          <Checkbox label='Administrator' checked={user.isSysAdmin} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Administration</Header>
        <Header as="h2">Edit User Permissions</Header>
        <Grid>
          <Grid.Column mobile={16} computer={8}>
            <Select
              name="user-search"
              placeholder="Search users..."
              isLoading={this.state.loading}
              value={this.state.selectedUser}
              options={this.getOptions()}
              onInputChange={this.handleSearch}
              onChange={this.handleSelectUser}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            {this.renderUserEditor()}

          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AdminView;
