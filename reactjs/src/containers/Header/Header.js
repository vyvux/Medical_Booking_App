import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu, medicalStaffMenu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";
import { USER_ROLE } from "../../utils/constant";
import Logo from "../Logo/Logo";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      if (role === USER_ROLE.MEDICAL_STAFF) {
        menu = medicalStaffMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }

  render() {
    const { processLogout, userInfo } = this.props;
    const renderRole = (roleId) => {
      switch (roleId) {
        case "R1":
          return "Admin";
        case "R2":
          return "Doctor";
        case "R3":
          return "Patient";
        case "R4":
          return "Medical Staff";
        default:
          return "Unknown role";
      }
    };

    return (
      <div className="header-container">
        {/* navigator bar */}
        <div>
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="d-flex align-items-center">
          <Logo lightBg={false} smallSize={true} className="logo" />
        </div>

        <div className="container">
          <div className="row justify-content-end align-items-center">
            <div className="col-3 col-sm-1 text-right d-none d-sm-block">
              <i className="fas fa-user-circle fa-2x"></i>
            </div>
            <div className="col-8 offset-1 col-sm-2 offset-sm-0 text-left">
              <div className="column">
                <div className="row name-title">
                  {userInfo.firstName} {userInfo.lastName}
                </div>
                <div className="row role-title">{renderRole(userInfo.roleId)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* logout button */}
        <div className="btn btn-logout" onClick={processLogout}>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
