import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Header, Icon, Input } from 'semantic-ui-react';
import './InlineEditable.scss';

class InlineEditable extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isHovered: false,
      isEditing: false,
      editorValue: props.value
    };
    _.bindAll(this,
      'handleMouseEnter',
      'handleMouseLeave',
      'handleKeyPress',
      'toggleEditor',
      'handleSave',
      'handleChange',
      'handleBlur');
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

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.handleSave();
    }
  }

  toggleEditor() {
    this.setState({
      isEditing: !this.state.isEditing,
      isHovered: false
    });
  }

  handleSave() {
    const data = {};
    data[this.props.name] = this.state.editorValue;
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

  handleBlur() {
    this.setState({
      editorValue: this.props.value,
      isEditing: false
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
          autoFocus
          size="small"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyPress={this.handleKeyPress}
          action={{color: 'green', icon: 'check', onClick: this.handleSave}}
          defaultValue={this.props.value}
        />
      </span>
    );
  }

  render() {
    return (
      <div className="inlineEditable">
        {this.props.header && <Header sub>{this.props.header}</Header>}
        {this.state.isEditing ? this.renderEditor() : this.renderText()}
      </div>
    )
  }
}

InlineEditable.PropTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  header: PropTypes.string
};

export default InlineEditable;
