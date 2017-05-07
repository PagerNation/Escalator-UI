import { fetchUser } from "../../../store/user";
import { fetchRecentGroupsTickets } from '../../../store/ticket';
import { searchGroups } from "../../../store/groupSearch";
import { joinRequest } from "../../../store/group";
import HomeView from "../components/HomeView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchUser,
  fetchRecentGroupsTickets,
  searchGroups,
  joinRequest
};

const mapStateToProps = (state) => ({
  user: state.user,
  tickets: state.ticket.tickets,
  groupSearchResults: state.groupSearch
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, HomeView);
