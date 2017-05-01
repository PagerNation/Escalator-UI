import React from 'react'
import { Icon, Divider, Header, Grid, Segment, Button } from 'semantic-ui-react'
import _ from 'lodash'
import PropTypes from 'prop-types'

class AdminView extends React.Component {
  constructor () {
    super()
    _.bindAll(this,
      'handleProcessRequest',
      'handleAddAdmin')
  }

  handleProcessRequest (userId, approved) {
    this.props.processRequest(this.props.group.name, userId, approved)
  }

  handleAddAdmin (userId) {
    this.props.addAdmin(this.props.group.name, userId)
  }

  handleDowngradeUser (userId) {
    this.props.deleteAdmin(this.props.group.name, userId)
  }

  renderJoinRequests () {
    if (this.props.group.joinRequests && this.props.group.joinRequests.length > 0) {
      return (<Grid className='group-requests'>
        <Grid.Column mobile={16} computer={8}>
          <Header as='h4'>Pending membership requests:</Header>
          <div>
            {this.props.group.joinRequests.map((user, i) =>
              <Segment key={i} raised>
                <Header as='h5'>{user.name}</Header>
                <span>{user.email}</span>
                <Button
                  style={{ marginTop: '-20px' }}
                  floated='right'
                  color='green'
                  onClick={() => this.handleProcessRequest(user._id, true)}>
                    Approve
                  </Button>
                <Button
                  style={{ marginTop: '-20px' }}
                  className='section-btn'
                  floated='right'
                  color='red'
                  onClick={() => this.handleProcessRequest(user._id, false)}>
                    Deny
                  </Button>
              </Segment>
              )}
          </div>
        </Grid.Column>
      </Grid>)
    } else {
      return (<b>No pending join requests</b>)
    }
  }

  userUpgradeButtons (upgrade) {
    const display = {
      'upgrade': {
        icon: 'arrow up',
        color: 'green',
        compare (user, admins) { return admins.indexOf(user._id) === -1 },
        changefunc (comp, user) { return comp.handleAddAdmin(user._id) }
      },
      'downgrade': {
        icon: 'arrow down',
        color: 'red',
        compare (user, admins) { return admins.indexOf(user._id) !== -1 },
        changefunc (comp, user) { return comp.handleDowngradeUser(user._id) }
      }
    }
    return [...this.props.group.users].filter((user) =>
        display[upgrade].compare(user, this.props.group.admins, this.props.user._id)
    ).map((user, i) =>
      <Segment key={i} raised>
        <span as='h5'>{user.name}</span>
        <Button icon
          size='mini'
          style={{ marginTop: '-5px' }}
          floated='right'
          color={display[upgrade].color}
          disabled={user._id === this.props.user._id}
          onClick={() => display[upgrade].changefunc(this, user)}>
          <Icon name={display[upgrade].icon} />
        </Button>
      </Segment>
    )
  }

  renderUpgradeTable () {
    return (<Grid columns={2} divided className='user-upgrade'>
      <Grid.Column mobile={16} computer={8}>
        <Header as='h4'>Members:</Header>
        <div>
          <Segment.Group>
            {this.userUpgradeButtons('upgrade')}
          </Segment.Group>
        </div>
      </Grid.Column>
      <Grid.Column mobile={16} computer={8}>
        <Header as='h4'>Admins:</Header>
        <Segment.Group>
          {this.userUpgradeButtons('downgrade')}
        </Segment.Group>
      </Grid.Column>
    </Grid>)
  }

  render () {
    if (this.props.group.admins.includes(this.props.user._id)) {
      return (<div>
        <Divider />
        <Header as='h3'>Administration</Header>
        {this.renderJoinRequests()}
        <Divider hidden />
        {this.renderUpgradeTable()}
        <Divider />
      </div>)
    } else {
      return null
    }
  }

}

AdminView.propTypes = {
  processRequest: PropTypes.func,
  group: PropTypes.object,
  user: PropTypes.object,
  addAdmin: PropTypes.func,
  deleteAdmin: PropTypes.func
}

export default AdminView
