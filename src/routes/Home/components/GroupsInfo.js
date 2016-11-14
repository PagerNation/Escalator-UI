import React from "react";
import { Header, Card, Feed } from 'semantic-ui-react'

class GroupsInfo extends React.Component {

  render() {
    return (
        <div>
          <Header as='h1'>My Groups</Header>
          <Card.Group>
            <Card fluid color="green">
              <Card.Content>
                <Card.Header>
                  <a href="#">My awesome team</a>
                </Card.Header>
                <Card.Meta>
                  This is a group description
                </Card.Meta>
                <Header as='h4'>On call</Header>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image='http://semantic-ui.com/images/avatar/small/jenny.jpg' />
                    <Feed.Content>
                      <Feed.Date content='1 day ago' />
                      <Feed.Summary>
                        <span className="on-call">You are on call</span>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>

            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <a href="#">Some other group</a>
                </Card.Header>
                <Card.Meta>
                  This is a group description
                </Card.Meta>
                <Header as='h4'>On call</Header>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image='http://semantic-ui.com/images/avatar/small/elliot.jpg' />
                    <Feed.Content>
                      <Feed.Date content='5 days ago' />
                      <Feed.Summary>
                        <span>Bobby Smith</span>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
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