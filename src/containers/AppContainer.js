import React, {Component, PropTypes} from "react";
import { connect } from 'react-redux';
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";
import jwtDecode from 'jwt-decode';
import Login from '../components/Login';

class AppContainer extends Component {

  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  isLoggedIn() {
    return !!localStorage.getItem('escalatorToken') && jwtDecode(localStorage.getItem('escalatorToken')).iat < Date.now() / 1000;
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
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(AppContainer);
