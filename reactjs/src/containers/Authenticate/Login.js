import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";
import { addLog } from "../../services/adminService";
import Logo from "../Logo/Logo";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.email, this.state.password);
      if (data && data.errCode !== 0) {
        // error while login
        this.setState({
          errMessage: data.message,
        });
      }

      if (data && data.errCode === 0) {
        // login success
        this.props.userLoginSuccess(data.user);
        // session storage
        localStorage.setItem("accessToken", data.accessToken);
        // add log
        let logInfo = {
          userId: data.user.id,
          actionType: "A8",
          message: `User ${data.user.id} - ${data.user.firstName} ${data.user.lastName} (${this.renderRole(data.user.roleId)}) log into system`,
        };
        addLog(logInfo);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  renderRole = (roleId) => {
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

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <Logo className="logo" lightBg={true} smallSize={false} />
            <hr />

            <div className="col-12 text-login">Login</div>

            {/* EMAIL INPUT*/}
            <div className="col-12 form-group login-input">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeUsername(event);
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
                    this.handleOnChangePassword(event);
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
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="col-12 text-center my-1">
              <Link to={"/home"} className="forgot-password">
                Forgot your password?
              </Link>
            </div>

            <div className="col-12 text-center">
              <span className="forgot-password">Don't have an account? </span>
              <Link to="/register" className="signup">
                Sign up
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
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
