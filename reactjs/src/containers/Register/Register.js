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
import RegisterSuccess from "./RegisterSuccess";
import { registerNewPatient, registerExistingPatient } from "../../services/patientService";
import { sendRegistrationConfirm } from "../../services/emailService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExistingPatient: false,
      isOpenRegisterSuccess: false,
      email: "",
      password: "",
      errMessage: "",
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

  getStateInput = (id) => {
    return this.state[id];
  };

  newPatientvalidateInputs = () => {
    let isValid = true;
    let arrInputs = ["email", "password", "firstName", "lastName", "dob", "gender", "phoneNumber", "address"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        this.setErrMessage(arrInputs[i]);
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
        this.setErrMessage(arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  setErrMessage = (input) => {
    let field = "";
    switch (input) {
      case "email":
        field = "Email";
        break;
      case "password":
        field = "Password";
        break;
      case "firstName":
        field = "First Name";
        break;
      case "lastName":
        field = "Last Name";
        break;
      case "dob":
        field = "Date of Birth";
        break;
      case "gender":
        field = "Gender";
        break;
      case "phoneNumber":
        field = "Phone Number";
        break;
      case "address":
        field = "Address";
        break;
      case "patientId":
        field = "Patient ID";
        break;
      case "patientName":
        field = "Patient First Name";
        break;
    }
    this.setState({
      errMessage: `${field} cannot be empty`,
    });
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

  toggleRegisterSuccess = () => {
    this.setState({
      isOpenRegisterSuccess: true,
    });
  };

  handlePatientRegister = async () => {
    // existing patient sign up
    if (this.state.isExistingPatient && this.existingPatientvalidateInputs()) {
      let patient = {
        email: this.state.email,
        password: this.state.password,
        roleId: "R3",
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        patientId: this.state.patientId,
        patientName: this.state.patientName,
      };

      try {
        let response = await registerExistingPatient(patient);
        if (response && response.errCode !== 0) {
          this.setState({
            errMessage: response.errMessage,
          });
        }

        if (response && response.errCode === 0) {
          let newUser = response.user;
          let existingPatient = response.patient;
          // add log
          let logInfo = {
            userId: newUser.id,
            actionType: "A3",
            message: `User ${newUser.id} - ${newUser.firstName} ${newUser.lastName} register new patient account with existing patient profile (Patient ID: ${existingPatient.id} - ${existingPatient.firstName} ${existingPatient.lastName})`,
          };
          addLog(logInfo);

          // send confirmation email
          let send = await sendRegistrationConfirm(newUser.email);
          if (send.errCode !== 0) {
            console.log("confirmation email:", send);
          }

          this.toggleRegisterSuccess();
        }
      } catch (e) {
        console.log(e);
      }
    }

    // new patient sign up
    if (!this.state.isExistingPatient && this.newPatientvalidateInputs()) {
      let patient = {
        email: this.state.email,
        password: this.state.password,
        roleId: "R3",
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob: this.state.dob,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
      };

      try {
        let response = await registerNewPatient(patient);
        if (response && response.errCode !== 0) {
          this.setState({
            errMessage: response.errMessage,
          });
        }

        if (response && response.errCode === 0) {
          let newUser = response.user;
          let newPatient = response.patient;
          // add log
          let logInfo = {
            userId: newUser.id,
            actionType: "A3",
            message: `User ${newUser.id} - ${newUser.firstName} ${newUser.lastName} register new patient account and new patient profile (Patient ID: ${newPatient.id} - ${newPatient.firstName} ${newPatient.lastName})`,
          };
          addLog(logInfo);

          // send confirmation email
          let send = await sendRegistrationConfirm(newUser.email);
          if (send.errCode !== 0) {
            console.log("confirmation email:", send);
          }

          this.toggleRegisterSuccess();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    return (
      <div className="register-background">
        <RegisterSuccess isOpen={this.state.isOpenRegisterSuccess} isExistingPatient={this.state.isExistingPatient} patientId={this.state.patientId} />

        <div className="register-container">
          <div className="register-content row">
            <Logo className="logo" lightBg={true} smallSize={false} />
            <hr />

            <div className="col-12 text-login">Patient Register</div>

            {/* existing patient checkbox */}
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

            {/* switch form based on patient type  */}
            {this.state.isExistingPatient ? (
              <RegisterExistingPatient handleOnChangeInput={this.handleOnChangeInput} getStateInput={this.getStateInput} />
            ) : (
              <RegisterNewPatient handleOnChangeInput={this.handleOnChangeInput} getStateInput={this.getStateInput} />
            )}

            {/* Error message*/}
            <div className="col-12 text-center mt-2" style={{ color: "red" }}>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
