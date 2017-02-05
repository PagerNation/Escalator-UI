import React from "react";
import "./GroupView.scss";

class GroupView extends React.Component {

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId).then( () => {
      this.props.fetchOtherUser(this.props.group.users[0])
    });
  }

  render() {
    console.log(this.props.group);
    console.log(this.props.otherUsers);
    return this.props.group && (
      <div>
        <h1>{this.props.group.name}</h1>
        <h3>Users:</h3>
        {[,...this.props.group.users].map((x, i) =>
          <div>
            <a href={'/user/' + x +'/'}>{x}</a>
          </div>
        )}
      </div>
    );
  }
}

export default GroupView;
