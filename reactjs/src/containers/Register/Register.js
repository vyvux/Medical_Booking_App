import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Register.scss";
import { FormattedMessage } from "react-intl";
import { addLog } from "../../services/adminService";
import Logo from "../Logo/Logo";
import RegisterNewPatient from "./NewPatient/RegisterNewPatient";
import RegisterExistingPatient from "./ExistingPatient/RegisterExistingPatient";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExistingPatient: false,
      email: "",
      password: "",
      // showPassword: false,
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
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check state: ", this.state);
      }
    );
  };

  getStateInput = (id) => {
    return this.state[id];
  };

  newPatientvalidateInputs = () => {
    console.log("check valid new patient fields");
    let isValid = true;
    let arrInputs = ["email", "password", "firstName", "lastName", "dob", "phoneNumber", "address", "gender"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        this.setState({
          errMessage: "Missing field: " + arrInputs[i],
        });
        break;
      }
    }
    return isValid;
  };

  existingPatientvalidateInputs = () => {
    console.log("check valid existing patient fields");
    let isValid = true;
    let arrInputs = ["email", "password", "firstName", "lastName", "patientId", "patientName"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        this.setState({
          errMessage: "Missing field: " + arrInputs[i],
        });
        break;
      }
    }
    return isValid;
  };

  resetState = () => {
    this.setState({
      firstName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      address: "",
      gender: "",
      patientId: "",
      patientName: "",
      errMessage: "",
    });
  };

  togglePatientForm = () => {
    this.setState(
      {
        isExistingPatient: !this.state.isExistingPatient,
      },
      () => {
        this.resetState();
      }
    );
  };

  handlePatientRegister = () => {
    if (this.isExistingPatient && this.existingPatientvalidateInputs()) {
      console.log("proceed register existing patient");
    }
    if (!this.isExistingPatient && this.newPatientvalidateInputs()) {
      console.log("proceed register new patient");
    }
  };

  render() {
    return (
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <Logo className="logo" lightBg={true} smallSize={false} />
            <hr />

            <div className="col-12 text-login">Patient Register</div>

            <div className="form-group form-check d-flex justify-content-center">
              <input
                type="checkbox"
                className="form-check-input"
                id="existingPatientCheck"
                onChange={() => {
                  this.togglePatientForm();
                }}
              />
              <label className="form-check-label" htmlFor="existingPatientCheck">
                I'm an existing patient
              </label>
            </div>

            {this.state.isExistingPatient ? (
              <RegisterExistingPatient handleOnChangeInput={this.handleOnChangeInput} getStateInput={this.getStateInput} />
            ) : (
              <RegisterNewPatient handleOnChangeInput={this.handleOnChangeInput} getStateInput={this.getStateInput} />
            )}

            {/* Error message*/}
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            {/* REGISTER BUTTON*/}
            <div className="col-12 text-center">
              <button
                className="btn-register"
                onClick={() => {
                  this.handlePatientRegister();
                }}
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
