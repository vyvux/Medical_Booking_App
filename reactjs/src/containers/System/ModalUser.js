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
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="Email adress"
                    autoComplete="off"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    value={this.state.email}
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "password");
                    }}
                    value={this.state.password}
                  />
                  <label htmlFor="floatingPassword">Password</label>
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
                    id="floatingInputFirstName"
                    placeholder="First Name"
                    autoComplete="off"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                    value={this.state.firstName}
                  />
                  <label htmlFor="floatingInputFirstName">First Name</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputLastName"
                    placeholder="Last Name"
                    autoComplete="off"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                  <label htmlFor="floatingInputLastName">Last Name</label>
                </div>
              </div>
            </div>

            {/* 3rd row in modal: role selection*/}
            <div className="col-md-6 col-sm-12">
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="role">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "roleId");
                  }}
                  value={this.state.roleId}
                >
                  <option value="">Choose...</option>
                  <option value="R1">Admin</option>
                  <option value="R2">Doctor</option>
                  <option value="R4">Medical Staff</option>
                  <option value="R3" disabled>
                    Patient
                  </option>
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
