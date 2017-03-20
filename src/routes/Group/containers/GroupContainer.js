import { fetchGroup, leaveGroup, updateEscalationPolicy } from "../../../store/group";
import GroupView from "../components/GroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchGroup,
  leaveGroup,
  updateEscalationPolicy
};

const mapStateToProps = (state) => ({
  group: state.group,
  user: state.user
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, GroupView);
