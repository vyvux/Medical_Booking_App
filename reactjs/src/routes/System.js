import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import BranchManage from "../containers/System/Admin/BranchManage";
import ServiceManage from "../containers/System/Admin/ServiceManage";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import LogManage from "../containers/System/Admin/LogManage";
import PatientManage from "../containers/System/Admin/PatientManage";
import Header from "../containers/Header/Header";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn, userInfo } = this.props;
    return (
      <Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/admin/user-manage" component={UserManage} />
              <Route path="/admin/branch-manage" component={BranchManage} />
              <Route path="/admin/service-manage" component={ServiceManage} />
              <Route path="/admin/doctor-manage" component={DoctorManage} />
              <Route path="/admin/log-manage" component={LogManage} />
              <Route path="/admin/patient-manage" component={PatientManage} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
