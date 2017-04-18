import React from "react";
import "./AdminView.scss";
import { Header, Checkbox, Grid, Button } from 'semantic-ui-react';
import Select from 'react-select';

class AdminView extends React.Component {

  constructor() {
    super();
    this.state = {
      searchValue: "",
      selectedUser: null,
      loading: false,
      sysAdminValue: null,
      valueChanged: false
    };
    _.bindAll(this,
      "handleSearch",
      "getOptions",
      "handleSelectUser",
      "handleChangeSysAdmin",
      "handleUpdateUser"
    );
  }

  handleSelectUser(selection) {
    this.setState({
      selectedUser: selection,
      sysAdminValue: selection && selection.value && selection.value.isSysAdmin,
      valueChanged: false
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

  handleChangeSysAdmin(event, checked) {
    this.setState({
      sysAdminValue: checked.checked,
      valueChanged: true
    });
  }

  handleUpdateUser() {
    this.props.updateUserAdmin(this.state.selectedUser.value._id,
      {isSysAdmin: this.state.sysAdminValue});
    this.setState({
      selectedUser: null
    });
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
    if(this.state.selectedUser && this.state.selectedUser.value) {
      const user = this.state.selectedUser.value;
      return (
        <div>
          <Header as="h3">
            {user.name}
            <Header.Subheader>
              {user.email}
            </Header.Subheader>
          </Header>
          <Header as="h4">Permissions:</Header>
          <Checkbox
            label='Administrator'
            checked={this.state.sysAdminValue}
            onChange={this.handleChangeSysAdmin}
          />
          <Button
            className="update-btn"
            disabled={!this.state.valueChanged}
            color="green"
            onClick={this.handleUpdateUser}>
            Update
          </Button>
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
              multi={false}
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
