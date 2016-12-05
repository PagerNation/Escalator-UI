import {connect} from "react-redux";
import { fetchUser, addDevice, deleteDevice } from '../../../store/user';
import Devices from "../components/DevicesView";

const mapDispatchToProps = {
  fetchUser,
  addDevice,
  deleteDevice
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
