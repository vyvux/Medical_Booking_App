import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class DoctorDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  render() {
    let doctor = this.props.doctor;
    const renderGender = (gender) => {
      switch (gender) {
        case 1:
          return "Male";
        default:
          return "Female";
      }
    };

    const renderService = (serviceId) => {
      let service = this.props.serviceList.find(({ id }) => id === serviceId);
      if (service) {
        return service.name;
      } else {
        return "";
      }
    };

    const renderBranch = (branchId) => {
      let branch = this.props.branchList.find(({ id }) => id === branchId);
      if (branch) {
        return branch.name;
      } else {
        return "";
      }
    };

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
          Delete Doctor
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="warning-message text-center">
              <i className="fas fa-exclamation-triangle fa-lg"></i>
              <h2>Are you sure to delete this doctor?</h2>
            </div>
            {/* first row in modal: id + gender*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="userId">
                    User
                  </label>
                  <select className="form-select" id="userId" value={doctor.userId} readOnly>
                    <option value={doctor.userId}>
                      ID {doctor.userId} - {doctor.firstName} {doctor.lastName}
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="gender">
                    Gender
                  </label>
                  <select className="form-select" id="gender" value={doctor.gender} readOnly>
                    <option value={doctor.gender}>{renderGender(doctor.gender)}</option>
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
                <select className="form-select" id="service" value={doctor.serviceId} readOnly>
                  <option value={doctor.serviceId}>{renderService(doctor.serviceId)}.</option>
                </select>
              </div>
            </div>
            {/* 3rd row in modal: branch*/}
            <div className="col-12">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="branch">
                  Branch
                </label>
                <select className="form-select" id="branch" value={doctor.branchId} readOnly>
                  <option value={doctor.branchId}>{renderBranch(doctor.branchId)}</option>
                </select>
              </div>
            </div>

            {/* 4th row in modal: about*/}
            <div className="row">
              <div className="col">
                <div className="form-floating my-3">
                  <textarea className="form-control" placeholder="About" id="floatingAbout" value={doctor.about} readOnly></textarea>
                  <label htmlFor="floatingAbout">About</label>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="danger"
            onClick={() => {
              this.props.deleteDoctor(this.props.doctor);
            }}
          >
            Delete
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDeleteModal);
