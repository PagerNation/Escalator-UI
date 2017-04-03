import React from "react";
import { connect } from 'react-redux';
import { logOut } from '../../store/user';
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import "./Navigation.scss";
import Logo from  '../../static/escalator.png';

class Navigation extends React.Component {

  render() {
    const pathname = this.props.location.pathname;

    const userMenu = this.props.user && (
      <Menu.Item as={Dropdown} text={this.props.user.name} position="right">
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.props.router.push('/profile')}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={this.props.logOut}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Menu.Item>
    );

    const admin = this.props.user && this.props.user.isSysAdmin && (
      <Menu.Item onClick={() => this.props.router.push('/admin')}>
        Admin
      </Menu.Item>
    );

    return  (
      <div>
        <Menu inverted>
          <Menu.Item header onClick={() => this.props.router.push('/')}>
            <Image src={Logo} className="inverted" size='mini' spaced='right' />
            Escalator
          </Menu.Item>
          {admin}
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
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
