import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import { getAllDoctors, createNewDoctor, editDoctor, deleteDoctor, getAllBranches, getAllServices, getAllUsers, addLog } from "../../../services/adminService";
import { renderClinicInfo, renderAllCode } from "../AllCode";
import DoctorModal from "./DoctorModal";
import DoctorEditModal from "./DoctorEditModal";
import DoctorDeleteModal from "./DoctorDeleteModal";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";

// import { values } from "lodash";

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      filteredDoctorList: [],
      isOpenModalDoctor: false,
      isOpenModalDeleteDoctorConfirm: false,
      isOpenModalEditDoctor: false,
      doctorInEffect: {},
      query: "",
      branch: "",
      service: "",
      unregisteredDoctors: [],
      userInfo: this.props.userInfo,
    };
  }

  async componentDidMount() {
    this.getAllDoctorsFromDB();
    this.getUnregisteredDoctors();
    this.props.getGenderStart();
    this.props.getBranchStart();
    this.props.getServiceStart();
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

  getUnregisteredDoctors = async () => {
    let users = await getAllUsers("ALL");
    if (users) {
      let doctors = users.users.filter((user) => {
        return user.roleId === "R2" && this.checkRegister(user);
      });
      if (doctors) {
        this.setState({
          unregisteredDoctors: doctors,
        });
      }
    }
  };

  checkRegister = (doctorToBeChecked) => {
    let doctor = this.state.arrDoctors.find(({ userId }) => userId === doctorToBeChecked.id);
    if (doctor) {
      return false;
    } else {
      return true;
    }
  };

  handleAddNewDoctor = () => {
    this.setState({
      isOpenModalDoctor: true,
    });
  };

  toggleDoctorModal = () => {
    this.setState({
      isOpenModalDoctor: !this.state.isOpenModalDoctor,
    });
  };

  createNewDoctor = async (data) => {
    let success = false;
    try {
      let response = await createNewDoctor(data);
      if (response && response.errCode === 0) {
        await this.getAllDoctorsFromDB();
        await this.getUnregisteredDoctors();
        toast.success(response.message);
        success = true;
        // add log
        let userInfo = this.state.userInfo;
        let doctor = response.doctor;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A10",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} create new doctor (Doctor ID: ${doctor.id} - ${doctor.firstName} ${doctor.lastName})`,
        };
        addLog(logInfo);
      } else {
        toast.error(response.errMessage);
      }
      this.setState({
        isOpenModalDoctor: false,
      });
    } catch (e) {
      console.log(e);
    }
    return success;
  };

  toggleModalDeleteDoctorConfirm = () => {
    this.setState({
      isOpenModalDeleteDoctorConfirm: !this.state.isOpenModalDeleteDoctorConfirm,
    });
  };

  openDeleteConfirmModal = (user) => {
    this.setState({
      isOpenModalDeleteDoctorConfirm: true,
      doctorInEffect: user,
    });
  };

  handleDeleteDoctor = async (doctor) => {
    try {
      let response = await deleteDoctor(doctor.userId);
      if (response && response.errCode === 0) {
        await this.getAllDoctorsFromDB();
        await this.getUnregisteredDoctors();
        toast.success(response.message);
        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A12",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} delete doctor (Doctor ID: ${doctor.id} - ${doctor.firstName} ${doctor.lastName})`,
        };
        addLog(logInfo);
      } else {
        toast.error(response.errMessage);
      }
      this.setState({
        isOpenModalDeleteDoctorConfirm: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  toggleModalEditDoctor = () => {
    this.setState({
      isOpenModalEditDoctor: !this.state.isOpenModalEditDoctor,
    });
  };

  openEditDoctorModal = (doctor) => {
    this.setState({
      isOpenModalEditDoctor: true,
      doctorInEffect: doctor,
    });
  };

  handleEditDoctor = async (doctor) => {
    try {
      let response = await editDoctor(doctor);
      if (response && response.errCode === 0) {
        await this.getAllDoctorsFromDB();
        toast.success(response.message);
        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A10",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} edit doctor information (Doctor ID: ${doctor.id} - ${doctor.firstName} ${doctor.lastName})`,
        };
        addLog(logInfo);
      } else {
        toast.error(response.errMessage);
      }
      this.setState({
        isOpenModalEditDoctor: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        this.handleFilterDoctor();
      }
    );
  };

  checkService = (doctor) => {
    let service = this.state.service;
    if (service) {
      return doctor.serviceId == this.state.service;
    }
    return true;
  };

  checkBranch = (doctor) => {
    let branch = this.state.branch;
    if (branch) {
      return doctor.branchId == this.state.branch;
    }
    return true;
  };

  checkTerm = (doctor) => {
    let term = this.state.query.toLowerCase();
    if (term) {
      return doctor.firstName.toLowerCase().includes(term) || doctor.lastName.toLowerCase().includes(term);
    }
    return true;
  };

  handleFilterDoctor = () => {
    this.setState({
      filteredDoctorList: this.state.arrDoctors.filter((doctor) => {
        return this.checkTerm(doctor) && this.checkService(doctor) && this.checkBranch(doctor);
      }),
    });
  };

  render() {
    let filteredDoctorList = this.state.filteredDoctorList;

    return (
      <div className="users-container mx-1">
        <DoctorModal isOpen={this.state.isOpenModalDoctor} toggleModalFromParent={this.toggleDoctorModal} createNewDoctor={this.createNewDoctor} doctorList={this.state.unregisteredDoctors} />

        <DoctorDeleteModal
          isOpen={this.state.isOpenModalDeleteDoctorConfirm}
          toggleModalFromParent={this.toggleModalDeleteDoctorConfirm}
          deleteDoctor={this.handleDeleteDoctor}
          doctor={this.state.doctorInEffect}
        />

        <DoctorEditModal isOpen={this.state.isOpenModalEditDoctor} toggleModalFromParent={this.toggleModalEditDoctor} editDoctor={this.handleEditDoctor} doctor={this.state.doctorInEffect} />

        <div className="title text-center">Manage doctors</div>

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-end justify-content-md-start">
            {/* add new button */}
            <div className="col-5 col-md-3">
              <button className="btn btn-success px-3 py-1 " onClick={() => this.handleAddNewDoctor()}>
                <i className="fas fa-plus"></i> New Doctor
              </button>
            </div>

            {/* Doctor's name search*/}
            <div className="col-7 col-md-3">
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "query");
                  }}
                  value={this.state.query}
                />
              </InputGroup>
            </div>

            {/* Service filter */}
            {/* <div className="col-5 col-md-2 mx-5 mx-md-0"> */}
            <div className="col-6 col-md-3">
              <Container className="d-flex flex-row justify-content-start drop-down">
                {/* <Label htmlFor="serviceSelect" md={{ size: 2 }} xs={{ size: 3 }}> */}
                <Label htmlFor="serviceSelect" lg={{ offset: 1, size: 2 }} md={{ size: 3 }} sm={{ size: "auto" }}>
                  Service
                </Label>
                <Col md={{ offset: 1, size: 9 }} xs={{ offset: 1, size: 9 }}>
                  <Input
                    id="serviceSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "service");
                    }}
                  >
                    <option value="">All Services</option>
                    {this.props.services &&
                      this.props.services.map((item, index) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </Container>
            </div>
            {/* Branch filter */}
            <div className="col-6 col-md-3">
              <Container className="d-flex flex-row justify-content-start drop-down">
                <Label htmlFor="branchSelect" lg={{ offset: 1, size: 2 }} md={{ size: 3 }} sm={{ size: "auto" }}>
                  Branch
                </Label>
                <Col md={{ offset: 1, size: 9 }} xs={{ offset: 1, size: 9 }}>
                  <Input
                    id="branchSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "branch");
                    }}
                  >
                    <option value="">All Branches</option>
                    {this.props.branches &&
                      this.props.branches.map((item, index) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </Container>
            </div>
          </div>
        </div>

        <div className="list-length-label mt-md-3 mx-3">{filteredDoctorList.length} doctors found</div>
        <div className="users-table mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Service</th>
                <th>Branch</th>
                <th>About</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctorList &&
                filteredDoctorList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.userId}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{renderClinicInfo(this.props.services, item.serviceId)}</td>
                      <td>{renderClinicInfo(this.props.branches, item.branchId)}</td>
                      <td className="limited-word">{item.about}</td>
                      <td>{renderAllCode(this.props.gender, item.gender)}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.openEditDoctorModal(item)}>
                          <i className="fas fa-pencil-alt fa-lg"></i>
                        </button>
                        <button className="btn-delete" onClick={() => this.openDeleteConfirmModal(item)}>
                          <i className="fas fa-trash-alt fa-lg"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    gender: state.code.gender,
    branches: state.clinicInfo.branches,
    services: state.clinicInfo.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getBranchStart: () => dispatch(actions.fetchBranchStart()),
    getServiceStart: () => dispatch(actions.fetchServiceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
