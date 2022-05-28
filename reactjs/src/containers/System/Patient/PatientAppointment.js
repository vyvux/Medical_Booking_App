import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import { toast } from "react-toastify";
import { getAllDoctors, createNewDoctor, editDoctor, deleteDoctor, getAllBranches, getAllServices, getAllUsers, addLog } from "../../../services/adminService";
import { renderPatient, renderDoctor, renderClinicInfo } from "../AllCode";
import { getAllPatients } from "../../../services/userService";
import * as actions from "../../../store/actions";
import CreateAppointmentModal from "./CreateAppointmentModal";
// import { values } from "lodash";

class PatientAppointment extends Component {
  // state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrAppointments: [],
      filteredAppointments: [],
      isOpenModalBookAppointment: false,
      isOpenModalCancelAppointment: false,
      appointmentInEffect: {},
      status: "",
      doctorList: [],
      patientList: [],
    };
  }

  async componentDidMount() {
    this.getAllDoctorFromDB();
    this.props.getStatusStart();
    this.props.getBranchStart();
    this.props.getServiceStart();
  }

  getAllDoctorFromDB = async () => {
    let response = await getAllDoctors("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        doctorList: response.doctors,
      });
    }
  };

  getPatientsFromDB = async () => {
    let response = await getAllPatients("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        patientList: response.patients,
      });
    }
  };

  //   handleAddNewAppointment = () => {
  //     this.setState({
  //       isOpenModalUser: true,
  //     });
  //   };

  toggleAppointmentModal = () => {
    this.setState({
      isOpenModalBookAppointment: !this.state.isOpenModalBookAppointment,
    });
  };

  openAddNewDoctorModal = () => {
    this.setState({
      isOpenModalBookAppointment: true,
    });
  };

  //   createNewAppointment = async (data) => {
  //     let success = false;
  //     try {
  //       let response = await createNewUserByAdmin(data);
  //       if (response && response.errCode !== 0) {
  //         toast.error(response.errMessage);
  //       } else {
  //         await this.getAllUsersFromDB();
  //         this.setState({
  //           isOpenModalUser: false,
  //         });
  //         success = true;
  //         toast.success(response.message);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return success;
  //   };

  //   toggleModalCancelAppointmentConfirm = () => {
  //     this.setState({
  //       isOpenModalDeleteUserConfirm: !this.state.isOpenModalDeleteUserConfirm,
  //     });
  //   };

  //   openCancelConfirmModal = (user) => {
  //     this.setState({
  //       isOpenModalDeleteUserConfirm: true,
  //       userInEffect: user,
  //     });
  //   };

  //   handleCancelAppointment = async (user) => {
  //     try {
  //       let response = await deleteUserByAdmin(user.id);
  //       if (response && response.errCode !== 0) {
  //         toast.error(response.errMessage, { autoClose: 10000 });
  //       } else {
  //         await this.getAllUsersFromDB();
  //         toast.success(response.message);
  //       }
  //       this.setState({
  //         isOpenModalDeleteUserConfirm: false,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        this.handleFilterAppointment();
      }
    );
  };

  checkStatus = (appointment) => {
    let { status } = this.state;
    if (status) {
      return appointment.status == status;
    }
    return true;
  };
  handleFilterAppointment = () => {
    this.setState({
      filteredAppointments: this.state.arrAppointments.filter((appointment) => {
        return this.checkStatus(appointment);
      }),
    });
  };

  render() {
    let { filteredAppointments, patientList, doctorList } = this.state;

    return (
      <div className="users-container mx-1">
        <CreateAppointmentModal isOpen={this.state.isOpenModalBookAppointment} toggleModalFromParent={this.toggleAppointmentModal} />

        <div className="title text-center">Appointment Manage</div>

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-center ">
            {/* book appointment button */}
            <div className="col-6">
              <button
                className="btn btn-success px-3 py-1 book-app"
                onClick={() => {
                  this.openAddNewDoctorModal();
                }}
              >
                Book Appointment
              </button>
            </div>

            <div className="col-6 col-md-3">
              <Container className="d-flex flex-row justify-content-start drop-down">
                {/* <Label htmlFor="serviceSelect" md={{ size: 2 }} xs={{ size: 3 }}> */}
                <Label htmlFor="statusSelect" lg={{ offset: 1, size: 2 }} md={{ size: 3 }} sm={{ size: "auto" }}>
                  Status
                </Label>
                <Col md={{ offset: 1, size: 9 }} xs={{ offset: 1, size: 9 }}>
                  <Input
                    id="statusSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "status");
                    }}
                  >
                    <option value="">All Status</option>
                    {this.props.status &&
                      this.props.status.map((item, index) => {
                        return (
                          <option value={item.key} key={item.key}>
                            {item.value}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </Container>
            </div>
          </div>

          <div className="list-length-label mt-md-3 mx-3">{filteredAppointments.length} appointments found</div>

          <div className="users-table mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient ID-Name</th>
                  <th>Doctor ID-Name</th>
                  <th>Service</th>
                  <th>Branch</th>
                  <th>Reason</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments &&
                  filteredAppointments.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{renderPatient(patientList, item.patientId)}</td>
                        <td>{renderDoctor(doctorList, item.doctorId)}</td>
                        <td>service</td>
                        <td>branch</td>
                        <td className="limited-word">{item.reason}</td>
                        <td className="limited-word">{item.reason}</td>
                        <td>
                          {/* <button className="btn-edit" onClick={() => this.openEditDoctorModal(item)}>
                            <i className="fas fa-pencil-alt fa-lg"></i>
                          </button> */}
                          {(this.state.status === "S1" || this.state.status === "S1") && (
                            <button className="btn-delete">
                              <i className="fas fa-trash-alt fa-lg"></i> Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { status: state.code.status, branches: state.clinicInfo.branches, services: state.clinicInfo.services };
};

const mapDispatchToProps = (dispatch) => {
  return { getStatusStart: () => dispatch(actions.fetchStatusStart()), getBranchStart: () => dispatch(actions.fetchBranchStart()), getServiceStart: () => dispatch(actions.fetchServiceStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointment);
