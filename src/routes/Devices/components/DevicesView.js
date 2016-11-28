import React from "react";
import { Header, Dropdown } from 'semantic-ui-react';
import "./DevicesView.scss";
import DeviceList from './deviceList/DeviceList';

class HomeView extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <Header as="h1">My Devices</Header>
        {this.props.user && <DeviceList devices={this.props.user.devices} />}

        <div className="add-button">
          {this.props.user &&
          <Dropdown text='Add Device' floating labeled button className='icon green' icon='add circle'>
            <Dropdown.Menu>
              <Dropdown.Item icon='phone' text='Phone' />
              <Dropdown.Item icon='mail' text='SMS' />
              <Dropdown.Item icon='comment' text='Email' />
            </Dropdown.Menu>
          </Dropdown>
          }
        </div>
      </div>
    );
  }
}

export default HomeView;
