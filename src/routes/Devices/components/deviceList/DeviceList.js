import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Device from './Device';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import _ from 'lodash';
import './deviceList.scss';

const cardTarget = {
  drop() {}
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    devices: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);

    // TODO: Rely just on props and updating via Redux
    this.state = {};
    this.state.cards = _.map(this.props.devices, (device) => {
      return {
        id: device._id,
        text: device.name,
        type: device.type,
        contactInformation: device.contactInformation
      }
    });
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      }
    }));
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    return connectDropTarget(
      <div>
        {cards.map((card, index) => {
          return (
            <Device key={card.id}
                id={card.id}
                text={card.text}
                type={card.type}
                contactInformation={card.contactInformation}
                isLast={index != cards.length - 1}
                moveCard={this.moveCard}
                findCard={this.findCard}
                onDelete={this.props.onDeleteDevice} />
          );
        })}
      </div>
    );
  }
}