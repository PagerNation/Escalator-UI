
export default (store) => ({

  getComponent (nextState, next) {
    require.ensure([
      './containers/HomeContainer',
      '../../modules/user'
    ], (require) => {
      const Home = require('./containers/HomeContainer').default

      next(null, Home);
    })
  }
});