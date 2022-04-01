import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { renderGender } from "./AllCode";
class PatientViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  render() {
    let patient = this.props.patient;

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
          View Patient Details
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row: patient ID + name */}
            <div className="col-12">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="userId">
                  Patient
                </label>
                <select className="form-select" id="userId" value={patient.id} readOnly>
                  <option value={patient.userId}>
                    ID {patient.id} - {patient.firstName} {patient.lastName}
                  </option>
                </select>
              </div>
            </div>

            {/* 2nd row in modal: userId + gender*/}
            <div className="row g-2">
              <div className="col-5 col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingUserId"
                    placeholder="User ID"
                    autoComplete="off"
                    value={this.props.patient.userId ? this.props.patient.userId : "N/A"}
                    readOnly
                  />
                  <label htmlFor="floatingAddress">User ID</label>
                </div>
              </div>

              <div className="col-7 col-md-6">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="gender">
                    Gender
                  </label>
                  <select className="form-select" id="gender" value={patient.gender} readOnly>
                    <option value={patient.gender}>{renderGender(patient.gender)}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3rd row in modal: dob + phone*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingDOB" placeholder="DOB" autoComplete="off" value={this.props.patient.dob} readOnly />
                  <label htmlFor="floatingAddress">D.O.B</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingPhone" placeholder="Address" autoComplete="off" value={this.props.patient.phoneNumber} readOnly />
                  <label htmlFor="floatingAddress">Phone Number</label>
                </div>
              </div>
            </div>

            {/* 4th row in modal: address*/}
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingAddress" placeholder="Address" autoComplete="off" value={this.props.patient.address} readOnly />
                <label htmlFor="floatingAddress">Address</label>
              </div>
            </div>

            {/* 5th row in modal: allergy*/}
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingAllergy"
                  placeholder="Allergy"
                  autoComplete="off"
                  value={this.props.patient.allergy ? this.props.patient.allergy : "None"}
                  readOnly
                />
                <label htmlFor="floatingAllergy">Allergy</label>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientViewModal);
