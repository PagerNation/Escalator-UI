import {connect} from "react-redux";
import {fetchUser, updateProfile} from "../../../store/user";
import ProfileView from "../components/ProfileView";

const mapDispatchToProps = {
  fetchUser,
  updateProfile
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
