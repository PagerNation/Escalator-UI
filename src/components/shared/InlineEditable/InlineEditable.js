import React from 'react';
import _ from 'lodash';
import { Header, Icon, Input } from 'semantic-ui-react';
import './InlineEditable.scss';

export default class InlineEditable extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isHovered: false,
      isEditing: false,
      editorValue: props.value
    };
    _.bindAll(this, 'handleMouseEnter', 'handleMouseLeave', 'toggleEditor', 'handleSave', 'handleChange');
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      editorValue: newProps.value
    });
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
      isEditing: !this.state.isEditing,
      isHovered: false
    });
  }

  handleSave() {
    const data = {};
    data[this.props.name.toLowerCase()] = this.state.editorValue;
    this.props.onChange(data);
    this.toggleEditor();
    this.setState({
      editorValue: this.props.value
    });
  }

  handleChange(event) {
    this.setState({
      editorValue: event.target.value
    });
  }

  renderText() {
    return (
      <span>
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
        <Input
          size="small"
          onChange={this.handleChange}
          action={{color: 'green', icon: 'check', onClick: this.handleSave}}
          defaultValue={this.props.value}
        />
      </span>
    );
  }

  render() {
    return (
      <div className="inlineEditable">
        <Header sub>{this.props.name}</Header>
        {this.state.isEditing ? this.renderEditor() : this.renderText()}
      </div>
    )
  }
}
