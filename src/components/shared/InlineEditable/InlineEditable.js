import React from 'react';
import { Header, Icon, Input } from 'semantic-ui-react';
import './InlineEditable.scss';

export default class InlineEditable extends React.Component {

  constructor() {
    super();
    this.state = {
      isHovered: false,
      isEditing: false
    };
    _.bindAll(this, 'handleMouseEnter', 'handleMouseLeave', 'toggleEditor', 'handleSave');
  }

  handleMouseEnter() {
    this.setState({
      isHovered: true
    });
  }

  handleMouseLeave() {
    this.setState({
      isHovered: false
    });
  }

  toggleEditor() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleSave() {
    console.log(this.refs.editor);
    this.toggleEditor();
  }

  renderText() {
    return (
      <span>
        <Header sub>{this.props.name}</Header>
        <a onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.toggleEditor}>
          {this.props.value}
          <Icon name="edit" className={!this.state.isHovered ? 'hidden' : ''} />
        </a>
      </span>
    );
  }

  renderEditor() {
    return (
      <span>
        <Header sub>{this.props.name}</Header>
        <Input
          action={{color: 'green', icon: 'check', onClick: this.handleSave}}
          defaultValue={this.props.value}
        />
      </span>
    );
  }

  render() {
    return (
      <div className="inlineEditable">
        {this.state.isEditing ? this.renderEditor() : this.renderText()}
      </div>
    )
  }
}
