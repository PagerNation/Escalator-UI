import { updateProfile, addDevice, deleteDevice, updateDevice, reorderDevices } from "../../../store/user";
import ProfileView from "../components/ProfileView";
import RouteContainer from "../../../containers/RouteContainer";

const mapDispatchToProps = {
  updateProfile,
  addDevice,
  deleteDevice,
  updateDevice,
  reorderDevices
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, ProfileView);
