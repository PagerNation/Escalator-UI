import { fetchGroup, leaveGroup, updateEscalationPolicy, processRequest } from "../../../store/group";
import { fetchGroupTickets } from "../../../store/ticket";
import GroupView from "../components/GroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchGroup,
  leaveGroup,
  updateEscalationPolicy,
  fetchGroupTickets,
  processRequest
};

const mapStateToProps = (state) => ({
  group: state.group,
  user: state.user,
  tickets: state.ticket
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, GroupView);
