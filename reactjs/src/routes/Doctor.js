import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AppointmentManage from "../containers/System/Doctor/AppointmentManage";
import ScheduleManage from "../containers/System/Doctor/ScheduleManage";
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
              <Route path="/doctor/appointment-manage" component={AppointmentManage} />
              <Route path="/doctor/schedule-manage" component={ScheduleManage} />
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
