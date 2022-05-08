import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../Register.scss";
import { toast } from "react-toastify";

class StepOneRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

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
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={this.props.getStateInput("email")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "email");
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
              value={this.props.getStateInput("password")}
              onChange={(event) => {
                this.props.handleOnChangeInput(event, "password");
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

        {/* FIRSTNAME INPUT*/}
        <div className="col-12 form-group login-input">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            className="form-control"
            placeholder="Enter your first name"
            value={this.props.getStateInput("firstName")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "firstName");
            }}
          />
        </div>

        {/* LASTNAME INPUT*/}

        <div className="col-12 form-group login-input">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            className="form-control"
            placeholder="Enter your last name"
            value={this.props.getStateInput("lastName")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "lastName");
            }}
          />
        </div>
      </div>
    );
  }
}

export default StepOneRegister;
