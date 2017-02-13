import {connect} from "react-redux";
import {fetchUser, updateProfile, addDevice, deleteDevice} from "../../../store/user";
import ProfileView from "../components/ProfileView";

const mapDispatchToProps = {
  fetchUser,
  updateProfile,
  addDevice,
  deleteDevice
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
