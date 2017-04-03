import { fetchGroup, leaveGroup, updateEscalationPolicy } from "../../../store/group";
import AdminView from "../components/AdminView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  user: state.user
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, AdminView);
