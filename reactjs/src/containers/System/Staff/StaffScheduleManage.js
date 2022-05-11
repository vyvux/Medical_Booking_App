import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import "./StaffScheduleManage.scss";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import { bulkCreateDoctorSchedule, getDoctorSchedule } from "../../../services/doctorService";
// import { values } from "lodash";

class StaffScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      date: "",
      arrSchedule: [],
      timeSelect: [],
    };
  }

  async componentDidMount() {
    this.props.getDoctorStart();
    this.props.getTimeStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.timeSelect !== this.props.time) {
      let time = this.props.time;
      if (time && time.length > 0) {
        time = time.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        timeSelect: this.props.time,
      });
    }
  }

  resetTime = () => {
    let time = this.state.timeSelect.map((item) => {
      item.isSelected = false;
    });
    this.setState({
      timeSelect: time,
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleScheduleSearch = async () => {
    try {
      let { doctorId, date } = this.state;

      let fmDate = this.formatDate(date);
      let data = {
        doctorId: doctorId,
        date: fmDate,
      };
      let response = await getDoctorSchedule(data);
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage);
      } else {
        let { timeSelect } = this.state;
        let schedules = response.schedule;
        if (schedules && schedules.length > 0) {
          let setTimeSelect = timeSelect.map((timeItem) => {
            if (schedules && schedules.length > 0) {
              let setSchedule = schedules.map((scheduleItem) => {
                if (scheduleItem.time === timeItem.key) {
                  timeItem.isSelected = true;
                }
                return scheduleItem;
              });
            }
            return timeItem;
          });

          this.setState({
            arrSchedule: schedules,
            timeSelect: setTimeSelect,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
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

  formatDate = (date) => {
    return new Date(date).getTime();
  };

  // handleSaveChangesDoctorSchedule = async () => {
  //   let date = this.formatDate(this.state.date);
  //   let data = {
  //     doctorId: this.state.doctorId,
  //     date: date,
  //     arrSchedule: [
  //       { doctorId: this.state.doctorId, date: date, time: "T1" },
  //       { doctorId: this.state.doctorId, date: date, time: "T2" },
  //       { doctorId: this.state.doctorId, date: date, time: "T3" },
  //       { doctorId: this.state.doctorId, date: date, time: "T6" },
  //       { doctorId: this.state.doctorId, date: date, time: "T7" },
  //     ],
  //   };
  //   let res = await bulkCreateDoctorSchedule(data);
  //   console.log("save changes: ", res);
  // };

  render() {
    let doctorList = this.props.doctors;
    let timeList = this.state.timeSelect;

    return (
      <div className="schedule-manage-container">
        <div className="title text-center mb-4">Doctor Schedule Manage</div>

        <div className="container">
          <div className="row">
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
            <div className="col-md-4 col-sm-9  form-group">
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

            {/* search button */}
            <div className="col-md-2 col-sm-3 d-flex justify-content-center">
              <button
                className="btn btn-info px-3"
                onClick={() => {
                  this.handleScheduleSearch();
                }}
              >
                Search
              </button>
            </div>

            {/* Pick doctor hours */}
            <div className="col-12 pick-hours-container my-4">
              <label>Select available hours</label>
              <div className="hours px-4">
                <div className="row">
                  {timeList &&
                    timeList.map((item, index) => {
                      return (
                        <div className="col-6 col-md-3 p-3" key={item.key}>
                          <button className={item.isSelected ? "btn btn-outline-success btn-select" : "btn btn-outline-success"}>{item.value}</button>
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
                  // this.handleSaveChangesDoctorSchedule();
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
  return { doctors: state.doctor.doctors, time: state.code.time, schedules: state.doctor.schedules };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorStart: () => dispatch(actions.fetchDoctorStart()),
    getTimeStart: () => dispatch(actions.fetchTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffScheduleManage);
