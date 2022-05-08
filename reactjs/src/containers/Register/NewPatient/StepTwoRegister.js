import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../Register.scss";

class StepTwoRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: "",
      gender: "",
      phoneNumber: "",
      address: "",
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
            value={this.state.dob}
            onChange={(event) => {
              this.handleOnChangeInput(event, "dob");
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
              this.handleOnChangeInput(event, "gender");
            }}
            value={this.state.gender}
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
            value={this.state.phoneNumber}
            onChange={(event) => {
              this.handleOnChangeInput(event, "phoneNumber");
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
            value={this.state.address}
            onChange={(event) => {
              this.handleOnChangeInput(event, "address");
            }}
          />
        </div>
      </div>
    );
  }
}

export default StepTwoRegister;
