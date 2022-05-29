import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import "../UserManage.scss";
import "../Staff/StaffScheduleManage.scss";
import { getAllDoctors } from "../../../services/adminService";
import * as actions from "../../../store/actions";
class CreateAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: "",
      doctorId: "",
      reason: "",
      date: "",
      time: "",
      status: "S1",
      branchId: "",
      serviceId: "",
      arrDoctors: [],
      filteredDoctorList: [],
      branches: [],
      services: [],
    };
  }

  componentDidMount() {
    this.props.getBranchStart();
    this.props.getServiceStart();
    this.getAllDoctorsFromDB();
    this.getAllBranchAndService();
  }

  getAllDoctorsFromDB = async () => {
    let response = await getAllDoctors("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrDoctors: response.doctors,
        filteredDoctorList: response.doctors,
      });
    }
  };

  getAllBranchAndService = () => {
    let { branches, services } = this.props;
    if (branches && services) {
      this.setState({
        branches: branches,
        services: services,
      });
    }
  };

  filterDoctor = () => {
    console.log("call filter doctor");
    let { branchId, serviceId, arrDoctors } = this.state;
    if (branchId && serviceId) {
      this.setState({
        filteredDoctorList: arrDoctors.filter((doctor) => {
          return doctor.branchId === branchId && doctor.serviceId === serviceId;
        }),
      });
    }
    if (branchId) {
      console.log("branch selected:", branchId);
      this.setState({
        filteredDoctorList: arrDoctors.filter((doctor) => {
          return doctor.branchId === branchId;
        }),
      });
    }
    if (serviceId) {
      console.log("service selected:", serviceId);
      this.setState({
        filteredDoctorList: arrDoctors.filter((doctor) => {
          return doctor.serviceId === serviceId;
        }),
      });
    }
    return true;
  };

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        if (id === "branchId" || id === "serviceId") {
          this.filterDoctor();
          console.log("filter doctors:", this.state.filteredDoctorList);
        }
      }
    );
  };

  validateInputs = () => {
    let isValid = true;
    let arrInputs = ["patientId", "doctorId", "reason", "date", "time"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        toast.warning("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewDoctor = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      let success = await this.props.createNewDoctor(this.state);
      if (success) {
        this.setState({
          id: "",
          gender: "",
          serviceId: "",
          branchId: "",
          about: "",
          firstName: "",
          lastName: "",
        });
      }
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

  render() {
    let { branches, services, filteredDoctorList } = this.state;
    console.log("services", services);
    console.log("branches", branches);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create Appointment
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row in modal: branch + service*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="branchId">
                    Location
                  </label>
                  <select
                    className="form-select"
                    id="branch"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "branchId");
                    }}
                    value={this.state.branchId}
                  >
                    <option value="">Choose...</option>
                    {branches &&
                      branches.map((item, index) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="service">
                    Service
                  </label>
                  <select
                    className="form-select"
                    id="service"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "serviceId");
                    }}
                    value={this.state.serviceId}
                  >
                    <option value="">Choose...</option>
                    {services &&
                      services.length > 0 &&
                      services.map((service) => {
                        return (
                          <option value={service.id} key={service.id}>
                            {service.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: doctor + date*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="doctor">
                    Doctor
                  </label>
                  <select
                    className="form-select"
                    id="doctor"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "doctorId");
                    }}
                    value={this.state.doctorId}
                  >
                    <option value="">Choose...</option>
                    {filteredDoctorList &&
                      filteredDoctorList.length > 0 &&
                      filteredDoctorList.map((doctor) => {
                        return <option value={doctor.id} key={doctor.id}>{`Doctor Id ${doctor.id} - ${doctor.firstName} ${doctor.lastName}`}</option>;
                      })}
                  </select>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-select"
                    min={this.setToday()}
                    id="date"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "date");
                    }}
                    value={this.state.date}
                  />
                </div>
              </div>
            </div>

            {/* 3th row in modal: time selection*/}
            {/* Pick doctor hours */}
            <div className="schedule-manage-container">
              <div className="col-12 pick-hours-container my-1">
                <label>Doctor Schedule</label>
                <div className="hours px-4">
                  <div className="row">
                    <div className="col-6 col-md-3 p-2">
                      <button className="btn btn-outline-success btn-select">8.00 - 9.00 AM</button>
                    </div>
                    <div className="col-6 col-md-3 p-2">
                      <button className="btn btn-outline-success">9.00 - 10.00 AM</button>
                    </div>
                    <div className="col-6 col-md-3 p-2">
                      <button className="btn btn-outline-success">10.00 - 11.00 AM</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4th row in modal: reason*/}
            <div className="row">
              <div className="col">
                <div className="form-floating my-3">
                  <textarea
                    className="form-control reason-input"
                    placeholder="Reason"
                    id="floatingReason"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "about");
                    }}
                    value={this.state.about}
                  ></textarea>
                  <label htmlFor="floatingReason">Reason</label>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              //   this.handleAddNewDoctor();
            }}
          >
            Book Appointment
          </Button>{" "}
          <Button
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branches: state.clinicInfo.branches,
    services: state.clinicInfo.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchStart: () => dispatch(actions.fetchBranchStart()),
    getServiceStart: () => dispatch(actions.fetchServiceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointmentModal);
