import React from "react";
import { Header, Card, Feed } from 'semantic-ui-react'
import __ from 'lodash';

class GroupsInfo extends React.Component {

  render() {
    console.log(this.props.groups);
    const groupCards = this.props.groups.map((group, index) => {
      const name = _.isString(group) ? group : group.name;
      return (
          <Card key={index} color="green" fluid>
            <Card.Content>
              <Card.Header>
                <a href="#">{name}</a>
              </Card.Header>
              <Header as='h4' className="on-call">You are on call</Header>
              <Feed>
                <Feed.Event>
                  <Feed.Label image='http://semantic-ui.com/images/avatar/small/jenny.jpg' />
                  <Feed.Content>
                    <Feed.Date content='2 days ago' />
                    <Feed.Summary>
                      <a href="#">Page acknowledged by Jarryd Lee</a>
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
      );
    });

    return (
        <div>
          <Header as='h1'>My Groups</Header>
          <Card.Group>
            {groupCards}
          </Card.Group>
        </div>
    );
  }
}

GroupsInfo.PropTypes = {
  groups: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    users: React.PropTypes.array.isRequired,
    escalationPolicy: React.PropTypes.object.isRequired
  })
};

export default GroupsInfo;