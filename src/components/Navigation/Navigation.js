import React from "react";
import { Menu, Dropdown } from 'semantic-ui-react';
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

            <Menu.Item as={Dropdown} text="Kevin Moses" position="right" onBlur={() => {}}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.props.router.push('/devices')}>Devices</Dropdown.Item>
                <Dropdown.Item>Log Out</Dropdown.Item>
              </Dropdown.Menu>
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