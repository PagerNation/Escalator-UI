import { fetchUser, fetchUserGroups } from "../../../store/user";
import HomeView from "../components/HomeView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchUser,
  fetchUserGroups
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, HomeView, ["fetchUserGroups"]);
