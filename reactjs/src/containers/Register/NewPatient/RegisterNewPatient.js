import React, { Component } from "react";
import Multistep from "react-multistep";
import ReactDOM from "react-dom";
import "../RegisterComponents.scss";
import StepOneRegister from "./StepOneRegister";
import StepTwoRegister from "./StepTwoRegister";

class RegisterNewPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const steps = [
      { name: "1", component: <StepOneRegister handleOnChangeInput={this.props.handleOnChangeInput} getStateInput={this.props.getStateInput} /> },
      { name: "2", component: <StepTwoRegister handleOnChangeInput={this.props.handleOnChangeInput} getStateInput={this.props.getStateInput} /> },
    ];
    return (
      <div className="multi-step">
        <Multistep activeStep={0} showNavigation={true} steps={steps} />
      </div>
    );
  }
}

export default RegisterNewPatient;
