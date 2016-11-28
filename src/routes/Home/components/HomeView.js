import React from "react";
import GroupsInfo from './GroupsInfo';
import "./HomeView.scss";

class HomeView extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user && <GroupsInfo groups={this.props.user.groups} />}
      </div>
    );
  }
}

export default HomeView;
