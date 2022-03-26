import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import BranchManage from "../containers/System/BranchManage";
import ServiceManage from "../containers/System/ServiceManage";
import DoctorManage from "../containers/System/DoctorManage";
import LogManage from "../containers/System/LogManage";

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
