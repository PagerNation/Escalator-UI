import {fetchGroup} from "../../../store/group";
import GroupView from "../components/GroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchGroup
};

const mapStateToProps = (state) => ({
  group: state.group,
  globalError: state.api.globalError
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, GroupView);
