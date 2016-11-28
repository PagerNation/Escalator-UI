import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { Card, Icon, Input } from 'semantic-ui-react';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Device extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
  };

  getIcon(type) {
    switch(type) {
      case 'phone': return 'phone';
      case 'email': return 'mail';
      case 'sms': return 'comment';
      default: return 'user';
    }
  }

  render() {
    const { text, type, contactInformation, isLast, isDragging, connectDragSource, connectDropTarget } = this.props;
    const time = isLast && (
      <div style={{textAlign: 'center', paddingBottom: '15px'}}>
        <Input
            label={{ basic: true, content: 'min' }}
            labelPosition='right'
            placeholder=''
        />
      </div>
    );
    return connectDragSource(connectDropTarget(
      <div>
        <Card fluid>
          <Card.Content>
            <Icon name={this.getIcon(type)} />
            {text}
          </Card.Content>
          <Card.Content extra>
            {contactInformation}
          </Card.Content>
        </Card>
        {time}
      </div>
    ));
  }
}