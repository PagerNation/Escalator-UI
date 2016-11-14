import { injectReducer } from '../../store/reducers'

export default (store) => ({

  getComponent (nextState, next) {
    require.ensure([
      './containers/HomeContainer',
      '../../modules/user'
    ], (require) => {
      const Home = require('./containers/HomeContainer').default;
      const userReducer = require('../../modules/user').default;

      injectReducer(store, {
        key: 'user',
        reducer: userReducer
      });

      next(null, Home);
    })
  }
})