import React, { PropTypes } from 'react';
import DragSortableList from 'react-drag-sortable';
import Device from './Device';

class DeviceList extends React.Component {

  renderDevices() {
    return this.props.devices.map((deviceObject, i, devices) => {
      return {
        content: (
          <Device
            key={i}
            index={i}
            device={deviceObject}
            onDelete={this.props.onDeleteDevice}
            onUpdate={this.props.onUpdateDevice}
            onUpdateInterval={this.props.onUpdateInterval}
            isLast={i === devices.length - 1}
            delay={i <= devices.length - 1 && this.props.delays[i]}
          />
        )
      };
    });
  }

  render() {
    const dragPlaceholder = (
      <div className="drag-placeholder"></div>
    );

    return (
      <DragSortableList
        type="vertical"
        onSort={this.props.onSort}
        items={this.renderDevices()}
        placeholder={dragPlaceholder}
        moveTransitionDuration={0.3}
      />
    );
  }
}

DeviceList.PropTypes = {
  devices: PropTypes.array.isRequired,
  delays: PropTypes.array.isRequired,
  onDeleteDevice: PropTypes.func.isRequired,
  onUpdateDevice: PropTypes.func.isRequired,
  onUpdateInterval: PropTypes.func.isRequired
};

export default DeviceList;
