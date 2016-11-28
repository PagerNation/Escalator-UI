import React from "react";
import Navigation from "../../components/Navigation";
import "./CoreLayout.scss";
import "../../styles/core.scss";

class CoreLayout extends React.Component {

  render() {
    const {children, location} = this.props;
    return (
      <div className='container text-center'>
        <Navigation location={location} />
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout
