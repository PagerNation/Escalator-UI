import React, {Component, PropTypes} from "react";
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";

import Login from '../components/Login';

class AppContainer extends Component {

  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false
  }

  isLoggedIn() {
    return !!localStorage.getItem('escalatorToken');
  }

  render() {
    const {routes, store} = this.props;

    const page = this.isLoggedIn() ? <Router history={browserHistory} children={routes}/> : <Login/>;

    return (
        <Provider store={store}>
          <div style={{height: '100%'}}>
            {page}
          </div>
        </Provider>
    )
  }
}

export default AppContainer
