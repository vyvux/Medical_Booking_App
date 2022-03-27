import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ServiceDeleteModal extends Component {
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
          Delete Service
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="warning-message text-center">
              <i className="fas fa-exclamation-triangle fa-lg"></i>
              <h2>Are you sure to delete this service?</h2>
            </div>
            {/* first row in modal: name*/}
            <div className="row g-2">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingName" placeholder="Service Name" autoComplete="off" value={this.props.service.name} readOnly />
                <label htmlFor="floatingName">Service Name</label>
              </div>
            </div>

            {/* 2nd row in modal: description*/}
            <div className="row">
              <div className="col">
                <div className="form-floating my-3">
                  <textarea className="form-control" placeholder="Description" id="floatingDesc" value={this.props.service.description} readOnly></textarea>
                  <label htmlFor="floatingDesc">Description</label>
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
              this.props.deleteService(this.props.service);
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDeleteModal);
