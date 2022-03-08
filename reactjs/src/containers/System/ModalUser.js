import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
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
          Create New User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* <div className="col-10 offset-1 input-container">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="col-10 offset-1  input-container">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="col-10 offset-1  input-container">
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className="col-10 offset-1  input-container">
              <label>Last Name</label>
              <input type="text" />
            </div> */}
            <div class="row g-2">
              <div class="col-md">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
              </div>
            </div>

            <div class="row g-2">
              <div class="col-md">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="First Name"
                  />
                  <label for="floatingInput">First Name</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Last Name"
                  />
                  <label for="floatingInput">Last Name</label>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="input-group mb-3">
                <label class="input-group-text" for="role">
                  Role
                </label>
                <select class="form-select" id="role">
                  <option selected>Choose...</option>
                  <option value="R1">Admin</option>
                  <option value="R2">Doctor</option>
                  <option value="R4">Medical Staff</option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.toggle();
            }}
          >
            Submit User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
