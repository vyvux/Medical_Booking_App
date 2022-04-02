import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import BranchManage from "../containers/System/Admin/BranchManage";
import ServiceManage from "../containers/System/Admin/ServiceManage";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import LogManage from "../containers/System/Admin/LogManage";
import PatientManage from "../containers/System/Admin/PatientManage";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/branch-manage" component={BranchManage} />
            <Route path="/system/service-manage" component={ServiceManage} />
            <Route path="/system/doctor-manage" component={DoctorManage} />
            <Route path="/system/log-manage" component={LogManage} />
            <Route path="/system/patient-manage" component={PatientManage} />
            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
