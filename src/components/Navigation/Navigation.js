import React from "react";
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import "./Navigation.scss";

class Navigation extends React.Component {
  render() {
    const pathname = this.props.location.pathname;
    return  (
        <div>
          <Menu inverted>
            <Menu.Item header>Escalator</Menu.Item>
            <Menu.Item name="home" active={pathname === '/'} onClick={() => this.props.router.push('/')} />
            <Menu.Item name="counter" active={pathname === '/counter'} onClick={() => this.props.router.push('/counter')} />

            <Menu.Item name="user" position="right">
              Logout
            </Menu.Item>
          </Menu>
        </div>
    );
  }
}

Navigation.propTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};

export default withRouter(Navigation);