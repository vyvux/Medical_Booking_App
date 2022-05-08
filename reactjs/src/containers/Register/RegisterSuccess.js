import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class RegisterSuccess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let newPatient = "You have successfully register a patient account. Please log into MedCare system for making medical appointment.";

    let existingPatient = `You have successfully register a patient account with Patient ID ${this.props.patientId}. Please log into MedCare system for making medical appointment.`;

    return (
      <div className="patient-register-success">
        <Modal centered isOpen={this.props.isOpen} returnFocusAfterClose={false}>
          <ModalBody>{this.props.isExistingPatient ? existingPatient : newPatient}</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              Log in
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(RegisterSuccess);
