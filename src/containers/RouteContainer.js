import React from 'react';
import { connect } from "react-redux";
import { Icon, Message } from 'semantic-ui-react';
import { fetchUser } from '../store/user';
import _ from 'lodash';

const RouteContainer = (mapStateToProps, mapDispatchToProps, WrappedContainer, requiredFetches = []) => {

  _.extend(mapDispatchToProps, {fetchUser});

  return connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

    constructor() {
      super();
      this.state = {
        pageLoaded: false
      };
    }

    componentWillMount() {
      requiredFetches.push("fetchUser");

      const promises = [];
      _.forEach(requiredFetches, (methodName) => {
        promises.push(this.props[methodName]());
      });

      Promise.all(promises).then(() => {
        this.setState({
          pageLoaded: true
        });
      });
    }

    renderPage() {
      console.log(this.props.globalError);
      const error = this.props.globalError && <Message
        className="error-message"
        negative
        onDismiss={_.noop}
        header='Something went wrong...'
        content={this.props.globalError.message}
      />;

      return (
        <div>
          {error || <WrappedContainer {...this.props}/>}
        </div>
      )
    }

    render() {
      return this.state.pageLoaded ?
        this.renderPage() :
        <Icon className="loading-icon" loading name="circle notched" size="huge" />;
    }
  });
};

export default RouteContainer;
