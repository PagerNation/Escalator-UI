import React from "react";
import "./GroupView.scss";

class GroupView extends React.Component {

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  render() {
    console.log(this.props.group);
    return (
      <div>
        {this.props.group.name}
      </div>
    );
  }
}

export default GroupView;
