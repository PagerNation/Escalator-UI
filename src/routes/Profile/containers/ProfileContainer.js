import {connect} from "react-redux";
import {fetchUser} from "../../../store/user";
import ProfileView from "../components/ProfileView";

const mapDispatchToProps = {
  fetchUser
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
