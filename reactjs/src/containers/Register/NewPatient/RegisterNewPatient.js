import React, { Component } from "react";
import Multistep from "react-multistep";
import ReactDOM from "react-dom";
import "../RegisterComponents.scss";
import StepOneRegister from "./StepOneRegister";

class RegisterNewPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const steps = [
      { name: "1", component: <StepOneRegister /> },
      { name: "2", component: <div>StepTwo</div> },
    ];
    return (
      <div className="multi-step">
        <Multistep activeStep={0} showNavigation={true} steps={steps} />
      </div>
    );
  }
}

export default RegisterNewPatient;
