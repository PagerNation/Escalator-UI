import React from "react";
import GroupsInfo from './GroupsInfo';
import "./HomeView.scss";

class HomeView extends React.Component {

  render() {
    return (
      <div>
        <GroupsInfo user={this.props.user} groups={this.props.user.groups} />
      </div>
    );
  }
}

export default HomeView;
