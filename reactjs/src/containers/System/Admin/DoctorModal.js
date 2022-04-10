import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
class DoctorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      gender: "",
      serviceId: "",
      branchId: "",
      about: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {}

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
        if (id === "id") {
          this.assignDoctorName();
        }
      }
    );
  };

  assignDoctorName = () => {
    let doctors = this.props.doctorList;
    if (doctors) {
      let selectDoctor = doctors.find(({ id }) => id == this.state.id);
      if (selectDoctor) {
        this.setState({
          firstName: selectDoctor.firstName,
          lastName: selectDoctor.lastName,
        });
      }
    }
  };

  validateInputs = () => {
    let isValid = true;
    let arrInputs = ["id", "gender", "firstName", "lastName", "serviceId", "branchId", "about"];
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

  render() {
    let unregisteredDoctors = this.props.doctorList;
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
          Create New Doctor
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
                  <select
                    className="form-select"
                    id="userId"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "id");
                    }}
                    value={this.state.id}
                  >
                    <option value="">Choose...</option>
                    {unregisteredDoctors &&
                      unregisteredDoctors.map((item, index) => {
                        return (
                          <option value={item.id} key={item.id}>
                            ID {item.id} - {item.firstName} {item.lastName}
                          </option>
                        );
                      })}
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
              this.handleAddNewDoctor();
            }}
          >
            Submit Doctor
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorModal);
