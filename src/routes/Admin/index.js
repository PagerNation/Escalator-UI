export default (store) => ({
  path: 'admin',

  getComponent (nextState, next) {
    require.ensure([
      './containers/AdminContainer'
    ], (require) => {
      const Admin = require('./containers/AdminContainer').default;

      next(null, Admin);
    });
  }
});
