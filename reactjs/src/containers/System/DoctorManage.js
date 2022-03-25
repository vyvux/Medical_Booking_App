import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "./UserManage.scss";
import { getAllDoctors, createNewDoctor, editDoctor, deleteDoctor, getAllBranches, getAllServices } from "../../services/adminService";

// import { values } from "lodash";

class UserManage extends Component {
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
      branchList: [],
      serviceList: [],
    };
  }

  async componentDidMount() {
    this.getAllDoctorsFromDB();
  }

  getAllDoctorsFromDB = async () => {
    let response = await getAllDoctors("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrDoctors: response.doctors,
        filteredDoctorList: response.doctors,
      });
    }

    // retrieve services and branches info for rendering name
    let serviceResponse = await getAllServices("ALL");
    let branchResponse = await getAllBranches("ALL");
    if (serviceResponse && branchResponse && (serviceResponse.errCode === 0) & (branchResponse.errCode === 0)) {
      this.setState({
        serviceList: serviceResponse.services,
        branchList: branchResponse.branches,
      });
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

  createNewUser = async (data) => {
    let success = false;
    try {
      let response = await createNewDoctor(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllDoctorsFromDB();
        this.setState({
          isOpenModalDoctor: false,
        });
        success = true;
      }
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

  handleDeleteDoctor = async (user) => {
    try {
      await deleteDoctor(user.id);
      await this.getAllDoctorsFromDB();
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
      await editDoctor(doctor);
      await this.getAllDoctorsFromDB();
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
      return doctor.serviceId === this.state.service;
    }
    return true;
  };

  checkBranch = (doctor) => {
    let branch = this.state.branch;
    if (branch) {
      return doctor.branchId === this.state.branch;
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
    // let arrDoctors = this.state.arrDoctors;
    let filteredDoctorList = this.state.filteredDoctorList;
    let serviceList = this.state.serviceList;
    let branchList = this.state.branchList;

    const renderGender = (gender) => {
      switch (gender) {
        case 1:
          return "Male";
        default:
          return "Female";
      }
    };

    const renderService = (serviceId) => {
      let service = serviceList.find(({ id }) => id === serviceId);
      if (service) {
        return service.name;
      } else {
        return "";
      }
    };

    const renderBranch = (branchId) => {
      let branch = branchList.find(({ id }) => id === branchId);
      if (branch) {
        return branch.name;
      } else {
        return "";
      }
    };

    return (
      <div className="users-container mx-1">
        {/* <ModalUser isOpen={this.state.isOpenModalDoctor} toggleModalFromParent={this.toggleDoctorModal} createNewUser={this.createNewUser} />

        <ModalDeleteUserConfirm
          isOpen={this.state.isOpenModalDeleteDoctorConfirm}
          toggleModalFromParent={this.toggleModalDeleteDoctorConfirm}
          deleteUserByAdmin={this.handleDeleteDoctor}
          user={this.state.doctorInEffect}
        />

        <ModalEditUser isOpen={this.state.isOpenModalEditDoctor} toggleModalFromParent={this.toggleModalEditDoctor} editUserByAdmin={this.handleEditDoctor} user={this.state.doctorInEffect} /> */}

        <div className="title text-center">Manage doctors</div>

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-end justify-content-md-start">
            <div className="col-5 col-md-3">
              <button className="btn btn-primary px-3 py-1" onClick={() => this.handleAddNewDoctor()}>
                <i className="fas fa-plus"></i> New Doctor
              </button>
            </div>

            <div className="col-7 col-md-6">
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

            {/* <div className="col-5 col-md-3 mx-5 mx-md-0">
              <Container className="d-flex flex-row justify-content-start">
                <Label htmlFor="roleSelect" md={{ size: "auto" }} sm={{ size: "auto" }}>
                  Role
                </Label>
                <Col md={{ offset: 1, size: "auto" }} xs={{ offset: 1, size: "auto" }}>
                  <Input
                    id="roleSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "role");
                    }}
                  >
                    <option value="">All Roles</option>
                    <option value="R1">Admin</option>
                    <option value="R2">Doctor</option>
                    <option value="R4">Medical Staff</option>
                    <option value="R3">Patient</option>
                  </Input>
                </Col>
              </Container>
            </div> */}
          </div>
        </div>

        <div className="users-table mt-1 mt-md-3 mx-1 my-1">
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
                      <td>{renderService(item.serviceId)}</td>
                      <td>{renderBranch(item.branchId)}</td>
                      <td className="limited-word">{item.about}</td>
                      <td>{renderGender(item.gender)}</td>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
