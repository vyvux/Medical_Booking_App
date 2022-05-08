import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../Register.scss";
import { toast } from "react-toastify";

class StepTwoRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setToday = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  };

  render() {
    let today = this.setToday();

    return (
      <div>
        {/* DOB INPUT*/}
        <div className="col-12 form-group login-input">
          <label>Date of Birth</label>
          <input
            type="date"
            max={today}
            className="form-control"
            placeholder="Enter your email"
            value={this.props.getStateInput("dob")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "dob");
            }}
          />
        </div>

        {/* GENDER INPUT*/}

        <div className="col-12 form-group login-input">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "gender");
            }}
            value={this.props.getStateInput("gender")}
          >
            <option value="">Choose...</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

        {/* PHONE INPUT*/}
        <div className="col-12 form-group login-input">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            placeholder="Enter your phone number"
            value={this.props.getStateInput("phoneNumber")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "phoneNumber");
            }}
          />
        </div>

        {/* ADDRESS INPUT*/}

        <div className="col-12 form-group login-input">
          <label htmlFor="phone">Address</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            placeholder="Enter your address"
            value={this.props.getStateInput("address")}
            onChange={(event) => {
              this.props.handleOnChangeInput(event, "address");
            }}
          />
        </div>
      </div>
    );
  }
}

export default StepTwoRegister;
