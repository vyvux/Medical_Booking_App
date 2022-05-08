import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../Register.scss";

class StepOneRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
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

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default StepOneRegister;
