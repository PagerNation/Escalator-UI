import React from "react";
import { Header, Card, Feed } from 'semantic-ui-react'

class GroupsInfo extends React.Component {

  render() {
    const groupCards = this.props.groups.map((group, index) =>
        <Card key={index} fluid>
          <Card.Content>
            <Card.Header>
              <a href="#">{group.ref}</a>
            </Card.Header>
            <Header as='h4'>**on call**</Header>
            <Feed>
              <Feed.Event>
                <Feed.Label image='http://semantic-ui.com/images/avatar/small/jenny.jpg' />
                <Feed.Content>
                  <Feed.Date content='1 day ago' />
                  <Feed.Summary>
                    <span>**event**</span>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
    );

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