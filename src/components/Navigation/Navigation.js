import React from "react";
import { connect } from 'react-redux';
import { fetchUser, logOut } from '../../store/user';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import "./Navigation.scss";

class Navigation extends React.Component {

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const pathname = this.props.location.pathname;

    const userMenu = this.props.user && (
      <Menu.Item as={Dropdown} text={<span><Icon name="user" />{this.props.user.name}</span>} position="right">
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.props.router.push('/profile')}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => this.props.router.push('/devices')}>Devices</Dropdown.Item>
          <Dropdown.Item onClick={this.props.logOut}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Menu.Item>
    );

    return  (
      <div>
        <Menu inverted>
          <Menu.Item header>Escalator</Menu.Item>
          <Menu.Item name="home" active={pathname === '/'} onClick={() => this.props.router.push('/')} />
          {userMenu}
        </Menu>
      </div>
    );
  }
}

Navigation.propTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  fetchUser,
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
