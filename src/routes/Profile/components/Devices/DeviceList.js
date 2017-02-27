import React from 'react';
import DragSortableList from 'react-drag-sortable';
import Device from './Device';

class DeviceList extends React.Component {

  renderDevices() {
    return this.props.devices.map((deviceObject, i, devices) => {
      return {
        content: (<Device key={i} device={deviceObject} onDelete={this.props.onDeleteDevice} isLast={i === devices.length - 1}/>)
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

export default DeviceList;
