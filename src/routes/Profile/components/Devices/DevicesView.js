import React from "react";
import _ from "lodash";
import { Header, Dropdown, Modal, Form, Button, Icon } from 'semantic-ui-react';
import "./DevicesView.scss";
import DeviceList from './DeviceList';

class DevicesView extends React.Component {

  static DEVICE_TYPES() {
    return {SMS: 'SMS', PHONE: 'Phone', EMAIL: 'Email'};
  }

  static getIconForDevice(type) {
    switch(type) {
      case DevicesView.DEVICE_TYPES().SMS: return 'comment';
      case DevicesView.DEVICE_TYPES().PHONE: return 'phone';
      case DevicesView.DEVICE_TYPES().EMAIL: return 'mail';
    }
  }

  constructor() {
    super();
    _.bindAll(this, "handleAddDevice", "handleClose", "handleSubmit", "handleDeleteDevice", "handleSort", "handleUpdateInterval");
    this.state = {
      modalOpen: false,
      creatingType: null
    };
  }

  handleSort(sorted) {
    const ids = sorted.map((item) => item.content.props.device._id);
    this.props.reorderDevices(ids);
  }

  handleUpdateInterval(index, value) {
    const profile = _.pick(this.props.user, "delays");
    profile.delays[index] = value;
    this.props.updateProfile(profile);
  }

  handleAddDevice(type) {
    this.setState({
      modalOpen: true,
      creatingType: type
    })
  }

  handleDeleteDevice(id) {
    this.props.deleteDevice(id);
  }

  handleClose() {
    this.setState({
      modalOpen: false,
      creatingType: null
    });
  }

  handleSubmit(e, serializedForm) {
    e.preventDefault();
    this.props.addDevice({
      device: {
        name: serializedForm.name,
        type: _.lowerCase(this.state.creatingType),
        contactInformation: serializedForm.contactInformation
      },
      index: this.props.user.devices.length
    });
    this.handleClose();
  }

  renderAddModal() {
    console.log(this.props);
    return (
      <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='small'
      >
        <Modal.Header>Add new device</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>{this.state.creatingType} Details</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input name="name" type="text" required />
              </Form.Field>
              <Form.Field>
                <label>
                  {this.state.creatingType === DevicesView.DEVICE_TYPES().EMAIL ? "Email Address" : "Phone Number"}
                </label>
                <input name="contactInformation" type={this.state.creatingType === DevicesView.DEVICE_TYPES().EMAIL ? "email" : "tel"} required />
              </Form.Field>
              <Button onClick={this.handleClose} type="button">Cancel</Button>
              <Button className="green" type='submit'>Create</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <Header as='h1'>
          <Icon name='setting' />
          <Header.Content>
            My Devices
            <Header.Subheader>
              Manage your devices
            </Header.Subheader>
          </Header.Content>
        </Header>

        <div className="add-button">
          <Dropdown text='Add Device' floating labeled button className='icon green' icon='add circle'>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.handleAddDevice(DevicesView.DEVICE_TYPES().PHONE)}
                icon={DevicesView.getIconForDevice(DevicesView.DEVICE_TYPES().PHONE)}
                text='Phone' />
              <Dropdown.Item
                onClick={() => this.handleAddDevice(DevicesView.DEVICE_TYPES().SMS)}
                icon={DevicesView.getIconForDevice(DevicesView.DEVICE_TYPES().SMS)}
                text='SMS' />
              <Dropdown.Item
                onClick={() => this.handleAddDevice(DevicesView.DEVICE_TYPES().EMAIL)}
                icon={DevicesView.getIconForDevice(DevicesView.DEVICE_TYPES().EMAIL)}
                text='Email' />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <DeviceList
          devices={this.props.user.devices}
          delays={this.props.user.delays}
          onDeleteDevice={this.handleDeleteDevice}
          onSort={this.handleSort}
          onUpdateDevice={this.props.updateDevice}
          onUpdateInterval={this.handleUpdateInterval}
        />

        {this.renderAddModal()}
      </div>
    );
  }
}

export default DevicesView;
