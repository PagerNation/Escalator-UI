import React from 'react';
import DragSortableList from 'react-drag-sortable';
import Device from './Device';

class DeviceList extends React.Component {

  renderDevices() {
    return this.props.devices.map((deviceObject, i, devices) =>
      <Device key={i} device={deviceObject} onDelete={this.props.onDeleteDevice} isLast={i === devices.length - 1} />
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.renderDevices()}
      </div>
    );
  }
}

export default DeviceList;
