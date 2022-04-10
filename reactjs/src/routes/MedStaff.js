import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import StaffAppointmentManage from "../containers/System/Staff/StaffAppointmentManage";
import StaffPatientManage from "../containers/System/Staff/StaffPatientManage";
import StaffScheduleManage from "../containers/System/Staff/StaffScheduleManage";

import Header from "../containers/Header/Header";
class Doctor extends Component {
  render() {
    const { isLoggedIn, systemMenuPath, userInfo } = this.props;
    return (
      <Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/staff/appointment-manage" component={StaffAppointmentManage} />
              <Route path="/staff/patient-manage" component={StaffPatientManage} />
              <Route path="/staff/schedule-manage" component={StaffScheduleManage} />
            </Switch>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    systemMenuPath: state.app.systemMenuPath,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
