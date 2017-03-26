import React from "react";
import "./JoinGroupView.scss";
import { Header } from 'semantic-ui-react';
import _ from 'lodash';

class GroupView extends React.Component {

  constructor() {
    super();
    _.bindAll(this);
  }

  render() {
    return (
      <div>
        <Header as="h1">Join a group</Header>
      </div>
    );
  }
}

export default GroupView;
