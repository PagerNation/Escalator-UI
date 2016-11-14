import {connect} from "react-redux";
import {fetchUser} from "../../../modules/user";
import HomeView from "../components/HomeView";

const mapDispatchToProps = {
  fetchUser
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
