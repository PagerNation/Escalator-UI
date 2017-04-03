import React from 'react';
import { connect } from "react-redux";
import { Loader } from 'semantic-ui-react';
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

    render() {
      return this.state.pageLoaded ?
        <WrappedContainer {...this.props}/> :
        <Loader active />
    }
  });
};

export default RouteContainer;
