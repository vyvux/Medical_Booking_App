import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import "./StaffScheduleManage.scss";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
// import { values } from "lodash";

class StaffScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      date: "",
      arrSchedule: [],
    };
  }

  async componentDidMount() {
    this.props.getDoctorStart();
    this.props.getTimeStart();
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
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
    let doctorList = this.props.doctors;
    let timeList = this.props.time;
    console.log(timeList);

    return (
      <div className="schedule-manage-container">
        <div className="title text-center">Doctor Schedule Manage</div>

        <div className="container">
          <div className="row g-2">
            {/* Doctor select */}
            <div className="col-md-6 col-sm-12  form-group">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="doctorSelect">
                  Select Doctor
                </label>
                <select
                  className="form-select"
                  id="doctorSelect"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "doctorId");
                  }}
                  value={this.state.doctorId}
                >
                  <option value="">Choose...</option>
                  {doctorList &&
                    doctorList.map((doctor, index) => {
                      return (
                        <option value={doctor.id} key={doctor.id}>
                          Doctor ID {doctor.id} - {doctor.firstName} {doctor.lastName}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {/* Date select */}
            <div className="col-md-6 col-sm-12  form-group">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="dateSelect">
                  Select Date
                </label>
                <input
                  type="date"
                  className="form-select"
                  min={this.setToday()}
                  id="dateSelect"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "date");
                  }}
                  value={this.state.date}
                />
              </div>
            </div>

            {/* Pick doctor hours */}
            <div className="col-12 pick-hours-container">
              <label>Select available hours</label>
              <div className="hours">
                <div className="row">
                  {timeList &&
                    timeList.map((item, index) => {
                      return (
                        <div className="col-12 col-md-3" key={item.key}>
                          <button className="btn btn-info">{item.value}</button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Save doctor schedule button */}
            <div className="col-12 d-flex justify-content-center">
              <button
                className="btn btn-success px-3"
                onClick={() => {
                  console.log("check schedule state: ", this.state);
                }}
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { doctors: state.doctor.doctors, time: state.code.time };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorStart: () => dispatch(actions.fetchDoctorStart()),
    getTimeStart: () => dispatch(actions.fetchTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffScheduleManage);
