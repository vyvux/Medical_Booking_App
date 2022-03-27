import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      roleId: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {}

  // change state when new data row is selected
  componentDidUpdate() {
    if (this.props.user.id !== this.state.id) {
      let user = this.props.user;
      if (user && !_.isEmpty(user)) {
        this.setState({
          id: user.id,
          email: user.email,
          roleId: user.roleId,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    }
  }

  toggle = () => {
    this.props.toggleModalFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  validateInputs = () => {
    let isValid = true;
    let arrInputs = ["email", "firstName", "lastName", "roleId"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUser = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      await this.props.editUserByAdmin(this.state);
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
          Edit User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row in modal: email role*/}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email adress"
                    autoComplete="off"
                    value={this.state.email}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              </div>

              <div className="col-md">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="role">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    value={this.state.roleId}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "roleId");
                    }}
                  >
                    <option value="R1">Admin</option>
                    <option value="R2">Doctor</option>
                    <option value="R4">Medical Staff</option>
                    <option value="R3">Patient</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: first + last name*/}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="First Name"
                    autoComplete="off"
                    value={this.state.firstName}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                  />
                  <label htmlFor="floatingInput">First Name</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Last Name"
                    autoComplete="off"
                    value={this.state.lastName}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                  />
                  <label htmlFor="floatingInput">Last Name</label>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="warning"
            onClick={() => {
              this.handleEditUser();
            }}
          >
            Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
