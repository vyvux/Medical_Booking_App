import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import StaffAppointmentManage from "../containers/System/Staff/StaffAppointmentManage";
import StaffPatientManage from "../containers/System/Staff/StaffPatientManage";
import StaffScheduleManage from "../containers/System/Staff/StaffScheduleManage";
import PatientAppointment from "../containers/System/Patient/PatientAppointment";
import Profile from "../containers/System/Patient/Profile";
import ViewDoctor from "../containers/System/Patient/ViewDoctor";

import Header from "../containers/Header/Header";
class Patient extends Component {
  render() {
    const { isLoggedIn, systemMenuPath, userInfo } = this.props;
    return (
      <Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/patient/appointment-manage" component={PatientAppointment} />
              <Route path="/patient/view-doctor" component={ViewDoctor} />
              <Route path="/patient/profile" component={Profile} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
