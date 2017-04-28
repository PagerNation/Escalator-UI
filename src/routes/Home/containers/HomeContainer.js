import { fetchUser } from "../../../store/user";
import { fetchRecentGroupsTickets } from '../../../store/ticket';
import HomeView from "../components/HomeView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchUser,
  fetchRecentGroupsTickets
};

const mapStateToProps = (state) => ({
  user: state.user,
  tickets: state.ticket.tickets
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, HomeView);
