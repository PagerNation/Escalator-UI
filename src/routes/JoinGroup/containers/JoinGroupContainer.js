import { searchGroups } from "../../../store/groupSearch";
import { joinRequest } from "../../../store/group";
import JoinGroupView from "../components/JoinGroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  searchGroups,
  joinRequest
};

const mapStateToProps = (state) => ({
  groupSearchResults: state.groupSearch,
  user: state.user
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, JoinGroupView);
