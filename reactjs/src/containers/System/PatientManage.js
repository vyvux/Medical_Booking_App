import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "./UserManage.scss";
import { getAllPatients } from "../../services/userService";
import { renderGender } from "./AllCode";
// import { values } from "lodash";

class PatientManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPatients: [],
      filteredPatientList: [],
      isOpenModalViewPatient: false,
      patientInEffect: {},
      query: "",
      registeredUser: "",
    };
  }

  async componentDidMount() {
    this.getAllPatientsFromDB();
  }

  getAllPatientsFromDB = async () => {
    let response = await getAllPatients("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrPatients: response.patients,
        filteredPatientList: response.patients,
      });
    }
  };

  toggleModalViewPatient = () => {
    this.setState({
      isOpenModalViewPatient: !this.state.isOpenModalViewPatient,
    });
  };

  openViewDoctorModal = (patient) => {
    this.setState({
      isOpenModalViewPatient: true,
      patientInEffect: patient,
    });
  };

  //   handleEditDoctor = async (doctor) => {
  //     try {
  //       let response = await editDoctor(doctor);
  //       if (response && response.errCode === 0) {
  //         await this.getAllDoctorsFromDB();
  //         toast.success(response.message);
  //       } else {
  //         toast.error(response.errMessage);
  //       }
  //       this.setState({
  //         isOpenModalViewPatient: false,
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
        this.handleFilterPatient();
      }
    );
  };

  checkTerm = (patient) => {
    let term = this.state.query.toLowerCase();
    if (term) {
      return patient.firstName.toLowerCase().includes(term) || patient.lastName.toLowerCase().includes(term) || patient.id == term;
    }
    return true;
  };

  checkUserRegistered = (patient) => {
    let state = this.state.registeredUser;
    if (state) {
      if (state == 1) {
        return patient.userId !== null;
      }
      return patient.userId === null;
    }
    return true;
  };

  handleFilterPatient = () => {
    this.setState({
      filteredPatientList: this.state.arrPatients.filter((patient) => {
        return this.checkTerm(patient) && this.checkUserRegistered(patient);
      }),
    });
  };

  render() {
    let filteredPatientList = this.state.filteredPatientList;
    return (
      <div className="users-container mx-1">
        {/* <PatientViewModal isOpen={this.state.isOpenModalViewPatient} toggleModalFromParent={this.toggleModalViewPatient} patient={this.state.patientInEffect} /> */}

        <div className="title text-center">Manage patients</div>

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-center">
            {/* patient's name search*/}
            <div className="col-6 col-md-4 col-lg-3">
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name or patient ID"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "query");
                  }}
                  value={this.state.query}
                />
              </InputGroup>
            </div>

            {/* have registered user filter */}
            <div className="col-6 col-md-3">
              <Container className="d-flex flex-row justify-content-start drop-down">
                <Label htmlFor="regSelect" lg={{ offset: 1, size: 5 }} md={{ size: 8 }} sm={{ size: "auto" }}>
                  Register status
                </Label>
                <Col md={{ size: 9 }} xs={{ offset: 1, size: 9 }}>
                  <Input
                    id="regSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "registeredUser");
                    }}
                  >
                    <option value="">All state</option>
                    <option value="1">Registered User</option>
                    <option value="0">No Registered User</option>
                  </Input>
                </Col>
              </Container>
            </div>
          </div>
        </div>

        <div className="list-length-label mt-md-3 mx-3">{filteredPatientList.length} patients found</div>
        <div className="users-table mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Reg User</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Allergy</th>
                <th>Registered On</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatientList &&
                filteredPatientList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.userId ? item.userId : "N/A"}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{renderGender(item.gender)}</td>
                      <td className="limited-word-small">{item.dob}</td>
                      <td>{item.phoneNumber}</td>
                      <td className="limited-word-small">{item.address}</td>
                      <td className="limited-word-small">{item.allergy}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.openViewDoctorModal(item)}>
                          <i className="fas fa-eye"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);