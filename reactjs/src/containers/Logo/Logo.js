import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Logo.scss";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let lightBg = this.props.lightBg;
    let small = this.props.smallSize;
    return (
      <Link to="/home" className={lightBg ? "link-home light" : "link-home dark"}>
        <div className={small ? "logo small" : "logo normal"}>
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
