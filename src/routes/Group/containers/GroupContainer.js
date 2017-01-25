import {connect} from "react-redux";
import {fetchGroup} from "../../../store/group";
import GroupView from "../components/GroupView";

const mapDispatchToProps = {
  fetchGroup
};

const mapStateToProps = (state) => ({
  group: state.group
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
