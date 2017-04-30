import { searchByName, updateUserAdmin } from "../../../store/otherUsers";
import { searchGroups } from "../../../store/groupSearch";
import AdminView from "../components/AdminView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  searchByName,
  updateUserAdmin,
  searchGroups
};

const mapStateToProps = (state) => ({
  user: state.user,
  searchResults: state.otherUsers.searchResults
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, AdminView);
