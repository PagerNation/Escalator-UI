import {connect} from "react-redux";
import {fetchUser} from "../../../modules/user";
import Home from "../components/HomeView";

const mapDispatchToProps = {
  fetchUser: fetchUser
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);