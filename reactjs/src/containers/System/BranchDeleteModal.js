import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalDeleteUserConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleModalFromParent();
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
          Delete Branch
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="warning-message text-center">
              <i className="fas fa-exclamation-triangle fa-lg"></i>
              <h2>Are you sure to delete this branch?</h2>
            </div>
            {/* first row in modal: email role*/}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingName" placeholder="Branch Name" autoComplete="off" value={this.props.branch.name} readOnly />
                  <label htmlFor="floatingName">Branch Name</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingPhonenumber" placeholder="First Name" autoComplete="off" value={this.props.branch.phoneNumber} readOnly />
                  <label htmlFor="floatingPhonenumber">Phone number</label>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: address*/}
            <div className="row">
              <div className="col-md">
                <div className="form-floating">
                  <input type="text" className="form-control" id="floatingAddress" placeholder="Address" value={this.props.branch.address} readOnly />
                  <label htmlFor="floatingAddress">Address</label>
                </div>
              </div>
            </div>

            {/* 3rd row in modal: description*/}
            <div className="row">
              <div className="col">
                <div className="form-floating my-3">
                  <textarea className="form-control" placeholder="Description" id="floatingDesc" value={this.props.branch.description} readOnly></textarea>
                  <label htmlFor="floatingDesc">Description</label>
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
              this.props.deleteBranch(this.props.branch);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUserConfirm);
