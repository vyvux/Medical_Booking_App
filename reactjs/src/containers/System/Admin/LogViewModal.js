import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { renderAllCode } from "../AllCode";
import * as actions from "../../../store/actions";

class LogViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getActionStart();
  }

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  render() {
    let log = this.props.log;

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
          View Log Details
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* 1rst row in modal: dob + phone*/}
            <div className="row g-2">
              <div className="col-md-6 col-sm-12">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingDOB" placeholder="DOB" autoComplete="off" value={this.props.log.userId} readOnly />
                  <label htmlFor="floatingAddress">Actor</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPhone"
                    placeholder="Address"
                    autoComplete="off"
                    value={renderAllCode(this.props.action, this.props.log.actionType)}
                    readOnly
                  />
                  <label htmlFor="floatingAddress">Action Type</label>
                </div>
              </div>
            </div>

            {/* 2th row in modal: message*/}
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingAddress" placeholder="Address" autoComplete="off" value={this.props.log.message} readOnly />
                <label htmlFor="floatingAddress">Details</label>
              </div>
            </div>

            {/* 3th row in modal: time*/}
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingAllergy" placeholder="Allergy" autoComplete="off" value={this.props.log.createdAt} readOnly />
                <label htmlFor="floatingTime">Time Record</label>
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
  return { action: state.code.action };
};

const mapDispatchToProps = (dispatch) => {
  return { getActionStart: () => dispatch(actions.fetchActionStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogViewModal);
