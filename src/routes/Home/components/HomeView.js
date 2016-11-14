import React from "react";
import GroupsInfo from './GroupsInfo';
import "./HomeView.scss";

class HomeView extends React.Component {

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <GroupsInfo />
      </div>
    );
  }
}

export default HomeView;
