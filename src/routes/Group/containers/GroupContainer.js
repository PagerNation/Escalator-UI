import { fetchGroup, leaveGroup, updateEscalationPolicy, processRequest, addAdmin, deleteAdmin } from "../../../store/group";
import { fetchGroupTickets, fetchOpenGroupTickets, acknowledgeTicket } from "../../../store/ticket";
import GroupView from "../components/GroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchGroup,
  leaveGroup,
  updateEscalationPolicy,
  fetchGroupTickets,
  fetchOpenGroupTickets,
  acknowledgeTicket,
  processRequest,
  addAdmin,
  deleteAdmin
};

const mapStateToProps = (state) => ({
  group: state.group,
  user: state.user,
  tickets: state.ticket.tickets,
  openTickets: state.ticket.openTickets
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, GroupView);
