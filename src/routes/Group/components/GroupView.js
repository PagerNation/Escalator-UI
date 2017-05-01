import React from "react";
import "./GroupView.scss";
import { Divider, Label, Grid, Header, Button, Confirm, Icon, Segment, Popup } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import InlineEditable from '../../../components/shared/InlineEditable';
import DragSortableList from 'react-drag-sortable';
import classNames from 'classnames';
import RemoveSubscriberModal from './RemoveSubscriberModal';
import TicketView from './TicketView';
import AdminView from './admin/AdminView';

class GroupView extends React.Component {

  constructor() {
    super();
    this.state = {
      confirmOpen: false,
      showOpenTickets: true,
      selectedOnCall: [],
      selectedBenched: []
    };
    _.bindAll(this,
      "toggleConfirm",
      "handleLeave",
      "toggleSelectOnCall",
      "toggleSelectBenched",
      "handleRemoveSubscribers",
      "handleAddSubscribers",
      "handleEditPagingInterval",
      "toggleRemoveModal",
      "handleTicketAcknowledgement",
      "handleScheduleSubscribers",
      "handleEPSort"
    );
  }

  componentWillMount() {
    this.props.fetchGroup(this.props.params.groupId);
    this.props.fetchGroupTickets({
      groupNames: this.props.params.groupId
    });
    this.props.fetchOpenGroupTickets({
      groupNames: this.props.params.groupId
    });
  }

  toggleRemoveModal() {
    const subs = _.extend({}, this.props.group.escalationPolicy.subscribers);
    const subsToRemove = [];
    this.state.selectedOnCall.forEach((i) => {
      subsToRemove.push(subs[i]);
    });
    _.forEach(subsToRemove, (sub) => {
      sub.name = _.find(this.props.group.users, (user) => user._id === sub.user).name;
    });
    this.refs["removeSubModal"].open(subsToRemove);

  }

  toggleSelectOnCall(index) {
    if (this.props.group.admins.includes(this.props.user._id)) {
      this.setState({
        selectedOnCall: _.xor(this.state.selectedOnCall, [index])
      });
    }
  }

  toggleSelectBenched(index) {
    if (this.props.group.admins.includes(this.props.user._id)) {
      this.setState({
        selectedBenched: _.xor(this.state.selectedBenched, [index])
      });
    }
  }

  toggleConfirm() {
    this.setState({
      confirmOpen: !this.state.confirmOpen
    });
  }

  handleLeave() {
    this.props.leaveGroup(this.props.group.name, this.props.user._id).then(this.toggleConfirm);
  }

  handleRemoveSubscribers(subsToRemove) {
    if (!subsToRemove.length) return;

    const ep = {};
    let subs = _.differenceBy(this.props.group.escalationPolicy.subscribers, subsToRemove, (user) => user._id);
    subs = _.map(subs, (sub) => _.omit(sub, "_id", "name"));
    _.extend(ep, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
    this.setState({
      selectedOnCall: []
    });
  }

  handleScheduleSubscribers(subsToSchedule) {
    if (!subsToSchedule.length) return;

    let subs = _.extend([], this.props.group.escalationPolicy.subscribers);
    _.forEach(subsToSchedule, (sub) => {
      const match = _.find(subs, (s) => s.user === sub.user);
      match.deactivateDate = sub.deactivateDate;
      match.reactivateDate = sub.reactivateDate;
    });
    subs = _.map(subs, (sub) => _.omit(sub, "_id", "name"));
    const ep = _.extend({}, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
  }

  handleAddSubscribers() {
    const subs = this.props.group.escalationPolicy.subscribers.map((user) => _.omit(user, "_id", "name"));
    const subIds = subs.map((user) => user.user);
    const benched = [,...this.props.group.users].filter((user) =>
      subIds.indexOf(user._id) === -1
    );
    this.state.selectedBenched.forEach((i) => subs.push({
      user: benched[i]._id,
      active: true,
      deactivateDate: null,
      reactivateDate: null
    }));
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
    this.setState({
      selectedBenched: []
    });
  }

  handleEditPagingInterval(values) {
    const ep = {};
    _.extend(ep, this.props.group.escalationPolicy, {pagingIntervalInMinutes: values.pagingIntervalInMinutes});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
  }

  handleTicketAcknowledgement(ticketId) {
    this.props.acknowledgeTicket(ticketId);
  }

  handleEPSort(sorted) {
    const subs = sorted.map((item) => _.omit(item.user, "_id", "name"));
    const ep = _.extend({}, this.props.group.escalationPolicy, {subscribers: subs});
    this.props.updateEscalationPolicy(this.props.group.name, _.omit(ep, "_id"));
  }

  renderSchedulePopup(subscriber) {
    if (subscriber.deactivateDate || subscriber.reactivateDate) {
      const remove = subscriber.deactivateDate &&
        moment(subscriber.deactivateDate).isAfter(moment()) && (
        <p>
          User to be deactivated on <strong>{moment(subscriber.deactivateDate).format("dddd MMMM Do, h:mm A")}</strong>
        </p>
      );
      const replace = subscriber.reactivateDate &&
        moment(subscriber.reactivateDate).isAfter(moment()) && (
        <p>
          User to be reactivated on <strong>{moment(subscriber.reactivateDate).format("dddd MMMM Do, h:mm A")}</strong>
        </p>
      );
      return (
        <span>
          <Popup wide="very" trigger={<Icon name='time' className="help-icon" size="large" />}>
            {remove}
            {replace}
          </Popup>
        </span>
      );
    }
  }

  getSubList(subs) {
    return subs.map((user, i) => {
      return {
        user,
        content: (
          <a
            className={classNames(
              "box arrow_box",
              {"selected": this.state.selectedOnCall.includes(i)},
              {"last": i === subs.length - 1}
            )}
            onClick={() => this.toggleSelectOnCall(i)}
            key={i}>
            {user.name}
            {this.renderSchedulePopup(user)}
          </a>
        )
      }
    });
  }

  active() {
    const subs = [...this.props.group.escalationPolicy.subscribers];
    _.forEach(subs, (sub) => {
      sub.name = _.find(this.props.group.users, (user) => user._id === sub.user).name;
    });

    return (
      <DragSortableList
        type="vertical"
        onSort={this.handleEPSort}
        items={this.getSubList(subs)}
        placeholder={<div className="drag-placeholder"></div>}
        moveTransitionDuration={0.3}
      />
    );
  };

  benched() {
   const subIds = this.props.group.escalationPolicy.subscribers.map(u => u.user);
   return [,...this.props.group.users].filter((user) =>
     subIds.indexOf(user._id) === -1
   ).map((user, i) =>
      <a
        className={classNames("box", {"selected": this.state.selectedBenched.includes(i)})}
        onClick={() => this.toggleSelectBenched(i)}
        key={i}>
        {user.name}
        {this.renderSchedulePopup(user)}
      </a>
    )
  };

  onCall() {
    const group = this.props.group;
    if (group.escalationPolicy.subscribers.length) {
      const uid = group.escalationPolicy.subscribers[0].user;
      const user = group.users.filter(u => u._id === uid)[0];
      return <Header as="h4">User on call:{this.userLink(user)}</Header>;
    }
  };

  userLink(user) {
    return user ? <a href={'/user/' + user._id +'/'}>{user.name}</a> : <span>No one</span>;
  };

  escalationInterval() {
    return (
      <span>
        Escalation Interval: <Label color='teal' horizontal>{this.props.group.escalationPolicy.pagingIntervalInMinutes}</Label> minutes
      </span>
    );
  };

  escalationIntervalAdmin() {
    return (
      <span>
        Escalation Interval:<Label color='teal' horizontal>
          <InlineEditable
            name="pagingIntervalInMinutes"
            value={this.props.group.escalationPolicy.pagingIntervalInMinutes}
            onChange={this.handleEditPagingInterval} />
        </Label>
        minutes
      </span>
    );
  };

  renderEPControls() {
    return this.props.group.admins.includes(this.props.user._id) && (
      <div>
        <Button
          className="move-btn"
          size="mini"
          disabled={this.state.selectedBenched.length == 0}
          onClick={this.handleAddSubscribers}
        >
          <Icon name="chevron left" />
        </Button>
        <Button
          className="move-btn"
          size="mini"
          disabled={this.state.selectedOnCall.length == 0}
          onClick={this.toggleRemoveModal}
        >
          <Icon name="chevron right" />
        </Button>
      </div>
    );
  }

  render() {
    const leaveButton = this.props.group && _.find(this.props.group.users, (user) => user._id === this.props.user._id) && (
      <Button className="action-button" onClick={this.toggleConfirm}>Leave Group</Button>
    );

    const confirm = (
      <Confirm
        open={this.state.confirmOpen}
        content={`Are you sure you want to leave this group?`}
        confirmButton="Leave"
        onCancel={this.toggleConfirm}
        onConfirm={this.handleLeave}
      />
    );

    return this.props.group && (
      <div>
        {confirm}
        <RemoveSubscriberModal
          ref="removeSubModal"
          onRemove={this.handleRemoveSubscribers}
          onSchedule={this.handleScheduleSubscribers}
        />
        <Header as="h1">{this.props.group.name}</Header>
        {leaveButton}
        {this.onCall()}
        {this.props.group.admins.includes(this.props.user._id) ?
          this.escalationIntervalAdmin() :
          this.escalationInterval()
        }
        <Divider/>
        <Grid>
          <Grid.Column mobile={16} computer={7}>
            <h3>Escalation Order:</h3>
            {this.active()}
          </Grid.Column>
          <Grid.Column verticalAlign="middle" mobile={16} computer={1}>
            {this.renderEPControls()}
          </Grid.Column>
          <Grid.Column mobile={16} computer={7}>
            <h3>Not On Call:</h3>
            {this.benched()}
          </Grid.Column>
        </Grid>
        <AdminView
          user={this.props.user}
          group={this.props.group}
          processRequest={this.props.processRequest}
          addAdmin={this.props.addAdmin}
          deleteAdmin={this.props.deleteAdmin}
        />
        <TicketView
          user={this.props.user}
          tickets={this.props.tickets}
          openTickets={this.props.openTickets}
          handleTicketAcknowledgement={this.handleTicketAcknowledgement}
        />
      </div>
    );
  }
}

export default GroupView;
