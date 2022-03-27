import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
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
          Delete User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="warning-message text-center">
              <i className="fas fa-exclamation-triangle fa-lg"></i>
              <h2>Are you sure to delete this system user?</h2>
            </div>
            {/* first row in modal: email role*/}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="Email adress" readOnly value={this.props.user.email} />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              </div>

              <div className="col-md">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="role">
                    Role
                  </label>
                  <select className="form-select" id="role" readOnly disabled value={this.props.user.roleId}>
                    <option value="">Choose...</option>
                    <option value="R1">Admin</option>
                    <option value="R2">Doctor</option>
                    <option value="R4">Medical Staff</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: first + last name*/}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" readOnly placeholder="First Name" value={this.props.user.firstName} />
                  <label htmlFor="floatingInput">First Name</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" readOnly placeholder="Last Name" value={this.props.user.lastName} />
                  <label htmlFor="floatingInput">Last Name</label>
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
              this.props.deleteUserByAdmin(this.props.user);
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
