import React from "react";
import { Header } from 'semantic-ui-react';
import "./DevicesView.scss";
import DeviceList from './deviceList/DeviceList';

class HomeView extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <Header as="h1">My Devices</Header>
        {this.props.user && <DeviceList devices={this.props.user.devices} />}
      </div>
    );
  }
}

export default HomeView;
