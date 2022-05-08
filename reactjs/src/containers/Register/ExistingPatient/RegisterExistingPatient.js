import React, { Component } from "react";
import Multistep from "react-multistep";
import "../Register.scss";
import StepOneRegister from "../NewPatient/StepOneRegister";
import StepTwoPatientCheck from "./StepTwoPatientCheck";

class RegisterExistingPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const steps = [
      { name: "1", component: <StepOneRegister handleOnChangeInput={this.props.handleOnChangeInput} getStateInput={this.props.getStateInput} /> },
      { name: "2", component: <StepTwoPatientCheck handleOnChangeInput={this.props.handleOnChangeInput} getStateInput={this.props.getStateInput} /> },
    ];
    return (
      <div className="multi-step">
        <Multistep activeStep={0} showNavigation={true} steps={steps} />
      </div>
    );
  }
}

export default RegisterExistingPatient;
