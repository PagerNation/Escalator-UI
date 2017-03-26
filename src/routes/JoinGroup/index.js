export default (store) => ({
  path: 'joingroup',

  getComponent (nextState, next) {
    require.ensure([
      './containers/JoinGroupContainer'
    ], (require) => {
      const JoinGroup = require('./containers/JoinGroupContainer').default;

      next(null, JoinGroup);
    });
  }
});
