import {connect} from "react-redux";
import {fetchUser, fetchUserGroups} from "../../../store/user";
import HomeView from "../components/HomeView";

const mapDispatchToProps = {
  fetchUser,
  fetchUserGroups
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
