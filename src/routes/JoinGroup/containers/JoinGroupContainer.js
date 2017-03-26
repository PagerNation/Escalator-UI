import {  } from "../../../store/group";
import JoinGroupView from "../components/JoinGroupView";
import RouteContainer from '../../../containers/RouteContainer';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  group: state.group,
  user: state.user
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, JoinGroupView);
