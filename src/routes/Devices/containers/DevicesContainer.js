import {connect} from "react-redux";
import { fetchUser, addDevice } from '../../../store/user';
import Devices from "../components/DevicesView";

const mapDispatchToProps = {
  fetchUser,
  addDevice
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
