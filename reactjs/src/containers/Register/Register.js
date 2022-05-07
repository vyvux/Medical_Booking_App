import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Register.scss";
import { FormattedMessage } from "react-intl";
import { addLog } from "../../services/adminService";
import Logo from "../Logo/Logo";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExistingPatient: false,
      email: "",
      password: "",
      showPassword: false,
      errMessage: "",
      roleId: "R3",
      firstName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      address: "",
      gender: "",
      patientId: "",
      patientName: "",
    };
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  //   handleLogin = async () => {
  //     this.setState({
  //       errMessage: "",
  //     });

  //     try {
  //       let data = await handleLoginApi(this.state.email, this.state.password);
  //       if (data && data.errCode !== 0) {
  //         // error while login
  //         this.setState({
  //           errMessage: data.message,
  //         });
  //       }

  //       if (data && data.errCode === 0) {
  //         // add log
  //         let logInfo = {
  //           userId: data.user.id,
  //           actionType: "A8",
  //           message: `User ${data.user.id} - ${data.user.firstName} ${data.user.lastName} (${this.renderRole(data.user.roleId)}) log into system`,
  //         };
  //         addLog(logInfo);
  //       }
  //     } catch (e) {
  //       if (e.response) {
  //         if (e.response.data) {
  //           this.setState({
  //             errMessage: e.response.data.message,
  //           });
  //         }
  //       }
  //     }
  //   };

  render() {
    return (
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <Logo className="logo" lightBg={true} smallSize={false} />
            <hr />

            <div className="col-12 text-login">Patient Register</div>

            <div className="form-group form-check d-flex justify-content-center">
              <input type="checkbox" className="form-check-input" id="existingPatientCheck" />
              <label className="form-check-label" htmlFor="existingPatientCheck">
                I'm an existing patient
              </label>
            </div>
            {/* EMAIL INPUT*/}
            <div className="col-12 form-group login-input">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
              />
            </div>

            {/* PASSWORD INPUT*/}
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                />
                {/* SHOW PASSWORD ICON */}
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i className={this.state.showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                </span>
              </div>
            </div>

            {/* Error message*/}
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            {/* LOGIN BUTTON*/}
            <div className="col-12 text-center">
              <button
                className="btn-register"
                // onClick={() => {
                //   this.handleLogin();
                // }}
              >
                Register
              </button>
            </div>

            <div className="col-12 text-center my-2">
              <span className="nav-login">Already have an account? </span>
              <Link to="/login" className="link-text">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
