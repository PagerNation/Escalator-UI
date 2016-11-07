import React from "react";
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import "./Header.scss";

class Header extends React.Component {
  render() {
    return  (
        <div>
          <Menu>
            <Menu.Item header>Escalator</Menu.Item>
            <Menu.Item name="home" onClick={() => this.props.router.push('/')} />
            <Menu.Item name="counter" onClick={() => this.props.router.push('/counter')} />
          </Menu>
        </div>
    );
  }
}
export default withRouter(Header);