import { withRouter } from 'react-router';
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
  userSearchResults: state.otherUsers.searchResults,
  groupSearchResults: state.groupSearch
});

export default withRouter(RouteContainer(mapStateToProps, mapDispatchToProps, AdminView));
