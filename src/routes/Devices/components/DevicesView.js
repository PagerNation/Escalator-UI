import React from "react";
import { Header } from 'semantic-ui-react';
import "./DevicesView.scss";

class HomeView extends React.Component {

  render() {
    console.log(this.props);
    return (
        <div>
          <Header as="h1">Devices</Header>
        </div>
    );
  }
}

export default HomeView;
