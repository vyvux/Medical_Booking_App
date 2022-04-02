import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import _ from "lodash";
class PatientEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId: "",
      gender: "",
      firstName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      address: "",
      allergy: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.patient.id !== this.state.id) {
      let patient = this.props.patient;
      if (patient && !_.isEmpty(patient)) {
        this.setState({
          id: patient.id,
          userId: patient.userId,
          gender: patient.gender,
          firstName: patient.firstName,
          lastName: patient.lastName,
          dob: patient.dob,
          phoneNumber: patient.phoneNumber,
          address: patient.address,
          allergy: patient.allergy,
        });
      }
    }
  }

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  validateInputs = () => {
    let isValid = true;
    let arrInputs = ["id", "firstName", "lastName", "dob", "phoneNumber", "address"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (this.state[arrInputs[i]] === "") {
        isValid = false;
        toast.error("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    if (id === "userId") {
      if (parseInt(event.target.value) > 0) {
        copyState["userId"] = parseInt(event.target.value);
      } else {
        copyState["userId"] = null;
      }
    } else {
      copyState[id] = event.target.value;
    }
    this.setState({
      ...copyState,
    });
  };

  handleEditPatient = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      await this.props.editPatient(this.state);
    }
  };

  findUserName = (userId) => {
    if (userId < 1) {
      return "NOT REGISTER WITH A USER";
    }
    let user = this.props.userList.find(({ id }) => id === userId);
    if (user && user.roleId === "R3") {
      return `${user.firstName} ${user.lastName}`;
    }

    return "User Patient not found";
  };

  render() {
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
          Edit Patient Details
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row: patient ID + gender */}
            <div className="row g-2">
              <div className="col-5 col-md-6">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingPatientId" placeholder="Patient ID" value={this.state.id} readOnly />
                  <label htmlFor="floatingPatientId">Patient ID</label>
                </div>
              </div>

              <div className="col-7 col-md-6">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    className="form-select"
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
              </div>
            </div>

            {/* 2nd row in modal: userId*/}
            <div className="row g-2">
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingUserId"
                    placeholder="User ID"
                    autoComplete="off"
                    value={this.state.userId ? this.state.userId : 0}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "userId");
                    }}
                  />
                  <label htmlFor="floatingUserId">Registered User ID</label>
                </div>
              </div>

              {/* warning when userId is null  */}
              <div className="col-6 align-self-center">{this.findUserName(this.state.userId)}</div>
            </div>

            {/* 3rd row in modal: names */}
            <div className="row g-2">
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirstname"
                    placeholder="First Name"
                    autoComplete="off"
                    value={this.state.firstName}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                  />
                  <label htmlFor="floatingFirstname">First Name</label>
                </div>
              </div>

              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingLastname"
                    placeholder="Last Name"
                    autoComplete="off"
                    value={this.state.lastName}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                  />
                  <label htmlFor="floatingFirstname">Last Name</label>
                </div>
              </div>
            </div>

            {/* 4th row in modal: dob + phone*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="floatingDOB"
                    placeholder="DOB"
                    autoComplete="off"
                    value={this.state.dob}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "dob");
                    }}
                  />
                  <label htmlFor="floatingAddress">D.O.B</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPhone"
                    placeholder="Phone number"
                    autoComplete="off"
                    value={this.state.phoneNumber}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "phoneNumber");
                    }}
                  />
                  <label htmlFor="floatingPhone">Phone Number</label>
                </div>
              </div>
            </div>

            {/* 5th row in modal: address*/}
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="floatingAddress"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
                <label htmlFor="floatingAddress">Address</label>
              </div>
            </div>

            {/* 6th row in modal: allergy*/}
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="floatingAllergy"
                  placeholder="Allergy"
                  value={this.props.patient.allergy ? this.state.allergy : "None"}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "allergy");
                  }}
                />
                <label htmlFor="floatingAllergy">Allergy</label>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="warning"
            onClick={() => {
              this.handleEditPatient();
            }}
          >
            Save Changes
          </Button>{" "}
          <Button
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientEditModal);
