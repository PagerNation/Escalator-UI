import {connect} from "react-redux";
import {fetchGroup} from "../../../store/group";
import {fetchOtherUser} from "../../../store/other_users";
import GroupView from "../components/GroupView";

const mapDispatchToProps = {
  fetchGroup,
  fetchOtherUser
};

const mapStateToProps = (state) => ({
  group: state.group,
  otherUsers: state.otherUsers
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
