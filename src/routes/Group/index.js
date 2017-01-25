
export default (store) => ({
  path: 'group/:groupId',

  getComponent (nextState, next) {
    require.ensure([
      './containers/GroupContainer'
    ], (require) => {
      const Group = require('./containers/GroupContainer').default;

      next(null, Group);
    });
  }
});
