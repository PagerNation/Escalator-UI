import { fetchUser } from "../../../store/user";
import HomeView from "../components/HomeView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchUser
};

const mapStateToProps = (state) => ({
  user: state.user,
  globalError: state.api.globalError
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, HomeView);
