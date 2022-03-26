import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class DoctorEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      gender: "",
      serviceId: "",
      branchId: "",
      about: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {}

  // change state when new data row is selected
  componentDidUpdate() {
    if (this.props.doctor.userId !== this.state.userId) {
      let doctor = this.props.doctor;
      if (doctor && !_.isEmpty(doctor)) {
        this.setState({
          userId: doctor.userId,
          gender: doctor.gender,
          serviceId: doctor.serviceId,
          branchId: doctor.branchId,
          about: doctor.about,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
        });
      }
    }
  }

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  validateInputs = () => {
    let isValid = true;
    let arrInputs = ["userId", "gender", "serviceId", "branchId", "about"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditDoctor = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      await this.props.editDoctor(this.state);
    }
  };

  render() {
    let services = this.props.serviceList;
    let branches = this.props.branchList;
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
          Edit Doctor Information
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row in modal: id + gender*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="userId">
                    User
                  </label>
                  <select className="form-select" id="userId" value={this.state.id}>
                    <option value={this.state.userId}>
                      ID {this.state.userId} - {this.state.firstName} {this.state.lastName}
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
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

            {/* 2nd row in modal: service*/}
            <div className="col-12">
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
                    services.map((service, index) => {
                      return (
                        <option value={service.id} key={service.id}>
                          {service.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            {/* 3rd row in modal: branch*/}
            <div className="col-12">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="branch">
                  Branch
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
                    branches.map((branch, index) => {
                      return (
                        <option value={branch.id} key={branch.id}>
                          {branch.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {/* 4th row in modal: about*/}
            <div className="row">
              <div className="col">
                <div className="form-floating my-3">
                  <textarea
                    className="form-control"
                    placeholder="About"
                    id="floatingAbout"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "about");
                    }}
                    value={this.state.about}
                  ></textarea>
                  <label htmlFor="floatingAbout">About</label>
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
              this.handleEditDoctor();
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
            Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorEditModal);
