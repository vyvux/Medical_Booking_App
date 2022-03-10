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

  handleAddNewUser = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      let success = await this.props.createNewUser(this.state);
      console.log("success is ", success);
      if (success) {
        this.setState({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          roleId: "",
        });
      }
    }
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
              <i class="fas fa-exclamation-triangle fa-lg"></i>
              <h2>Are you sure to delete this system user?</h2>
            </div>
            {/* first row in modal: email role*/}
            <div class="row g-2">
              <div class="col-md">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingInput" placeholder="Email adress" readonly value={this.props.user.email} />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>

              <div class="col-md">
                <div class="input-group mb-3">
                  <label class="input-group-text" for="role">
                    Role
                  </label>
                  <select class="form-select" id="role" readonly disabled value={this.props.user.roleId}>
                    <option selected value="">
                      Choose...
                    </option>
                    <option value="R1">Admin</option>
                    <option value="R2">Doctor</option>
                    <option value="R4">Medical Staff</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: first + last name*/}
            <div class="row g-2">
              <div class="col-md">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="First Name" value={this.props.user.firstName} />
                  <label for="floatingInput">First Name</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="Last Name" value={this.props.user.lastName} />
                  <label for="floatingInput">Last Name</label>
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
