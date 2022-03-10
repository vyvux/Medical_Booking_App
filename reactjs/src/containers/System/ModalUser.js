import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      roleId: "",
    };
  }

  componentDidMount() {}

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
    let arrInputs = ["email", "password", "firstName", "lastName", "roleId"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
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
          Create New User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row in modal: email password*/}
            <div class="row g-2">
              <div class="col-md">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Email adress"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    value={this.state.email}
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
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "password");
                    }}
                    value={this.state.password}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: first + last name*/}
            <div class="row g-2">
              <div class="col-md">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="First Name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                    value={this.state.firstName}
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
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                  <label for="floatingInput">Last Name</label>
                </div>
              </div>
            </div>

            {/* 3rd row in modal: role selection*/}
            <div class="col-md-6 col-sm-12">
              <div class="input-group mb-3">
                <label class="input-group-text" for="role">
                  Role
                </label>
                <select
                  class="form-select"
                  id="role"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "roleId");
                  }}
                  value={this.state.roleId}
                >
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
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.handleAddNewUser();
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
