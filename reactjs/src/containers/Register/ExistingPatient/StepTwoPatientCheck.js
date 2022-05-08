import React, { Component } from "react";
import "../Register.scss";

class StepTwoPatientCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* PATIENT ID INPUT*/}
        <div className="col-12 form-group login-input">
          <label htmlFor="patientId">Patient ID</label>
          <input
            type="text"
            id="patientId"
            className="form-control"
            placeholder="Enter a Patient ID"
            value={this.props.getStateInput("patientId")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "patientId");
            }}
          />
        </div>

        {/* PATIENT NAME INPUT*/}

        <div className="col-12 form-group login-input">
          <label htmlFor="patientName">Patient Name</label>
          <input
            type="text"
            id="patientName"
            className="form-control"
            placeholder="Enter Patient Name for security reason"
            value={this.props.getStateInput("patientName")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "patientName");
            }}
          />
        </div>
      </div>
    );
  }
}

export default StepTwoPatientCheck;
