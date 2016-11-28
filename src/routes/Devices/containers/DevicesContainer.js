import {connect} from "react-redux";
import { fetchUser } from '../../../store/user';
import Devices from "../components/DevicesView";

const mapDispatchToProps = {
  fetchUser
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
