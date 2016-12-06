import React from "react";
import GroupsInfo from './GroupsInfo';
import "./HomeView.scss";

class HomeView extends React.Component {

  componentWillMount() {
    this.props.fetchUserGroups();
  }

  render() {
    return (
      <div>
        {this.props.user && <GroupsInfo groups={this.props.user.groups} />}
      </div>
    );
  }
}

export default HomeView;
