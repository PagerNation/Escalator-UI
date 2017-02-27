import {updateProfile, addDevice, deleteDevice} from "../../../store/user";
import ProfileView from "../components/ProfileView";
import RouteContainer from "../../../containers/RouteContainer";

const mapDispatchToProps = {
  updateProfile,
  addDevice,
  deleteDevice
};

const mapStateToProps = (state) => ({
  user: state.user,
  globalError: state.api.globalError
});

export default RouteContainer(mapStateToProps, mapDispatchToProps, ProfileView);
