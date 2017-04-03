// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout/CoreLayout";
import Home from "./Home";

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    require('./Group').default(store),
    require('./Profile').default(store),
    require('./Admin').default(store),
    require('./JoinGroup').default(store)
  ]
});

export default createRoutes;
