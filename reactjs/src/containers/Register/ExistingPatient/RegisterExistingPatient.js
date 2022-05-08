import React, { Component } from "react";
import Multistep from "react-multistep";
import ReactDOM from "react-dom";
import "../Register.scss";

class RegisterExistingPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const steps = [
      { name: "1", component: <div>StepOne</div> },
      { name: "2", component: <div>StepTwo</div> },
    ];
    return (
      <div className="multi-step">
        <Multistep activeStep={1} showNavigation={true} steps={steps} />
      </div>
    );
  }
}

export default RegisterExistingPatient;
