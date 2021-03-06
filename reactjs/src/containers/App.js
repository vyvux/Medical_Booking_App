import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from '../routes/Login';
import Login from "./Authenticate/Login";
import System from "../routes/System";
import Doctor from "../routes/Doctor";
import MedStaff from "../routes/MedStaff";
import Patient from "../routes/Patient";

import HomePage from "./HomePage/HomePage";
import Register from "./Register/Register";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import CustomScrollbars from "../components/CustomScrollbars";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* <ConfirmModal /> */}

            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                  <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                  <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                  <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                  <Route path={path.MEDICAL_STAFF} component={userIsAuthenticated(MedStaff)} />
                  <Route path={path.PATIENT} component={userIsAuthenticated(Patient)} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
