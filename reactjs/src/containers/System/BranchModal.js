import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class BranchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
      description: "",
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
    let arrInputs = ["name", "address", "phoneNumber", "description"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewBranch = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      let success = await this.props.createNewBranch(this.state);
      if (success) {
        this.setState({
          name: "",
          address: "",
          phoneNumber: "",
          description: "",
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
          Create New Branch
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row in modal: name + phone*/}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Branch Name"
                    autoComplete="off"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "name");
                    }}
                    value={this.state.name}
                  />
                  <label htmlFor="floatingName">Branch Name</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPhonenumber"
                    placeholder="First Name"
                    autoComplete="off"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "phoneNumber");
                    }}
                    value={this.state.phoneNumber}
                  />
                  <label htmlFor="floatingPhonenumber">Phone number</label>
                </div>
              </div>
            </div>

            {/* 2nd row in modal: address*/}
            <div className="row">
              <div className="col-md">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingAddress"
                    placeholder="Address"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "address");
                    }}
                    value={this.state.address}
                  />
                  <label htmlFor="floatingAddress">Address</label>
                </div>
              </div>
            </div>

            {/* 3rd row in modal: description*/}
            <div className="row">
              <div className="col">
                <div className="form-floating my-3">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    id="floatingDesc"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "description");
                    }}
                    value={this.state.description}
                  ></textarea>
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
              this.handleAddNewBranch();
            }}
          >
            Submit Branch
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

export default connect(mapStateToProps, mapDispatchToProps)(BranchModal);
