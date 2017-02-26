import {connect} from "react-redux";
import {fetchGroup} from "../../../store/group";
import GroupView from "../components/GroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {
  fetchGroup
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, GroupView);
