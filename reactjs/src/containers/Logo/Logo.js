import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Logo.scss";

class Logo extends Component {
  render() {
    return (
      <Link to="/home" className="link-home">
        <div className="logo">
          MedCare<span>.</span>
        </div>
      </Link>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
