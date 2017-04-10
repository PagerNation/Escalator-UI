import { searchByName } from "../../../store/otherUsers";
import AdminView from "../components/AdminView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  searchByName
};

const mapStateToProps = (state) => ({
  user: state.user,
  searchResults: state.otherUsers.searchResults
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, AdminView);
