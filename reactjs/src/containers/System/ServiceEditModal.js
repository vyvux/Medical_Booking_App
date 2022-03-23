import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ServiceEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
    };
  }

  componentDidMount() {}

  // change state when new data row is selected
  componentDidUpdate() {
    if (this.props.service.id !== this.state.id) {
      let service = this.props.service;
      if (service && !_.isEmpty(service)) {
        this.setState({
          id: service.id,
          name: service.name,
          description: service.description,
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
    let arrInputs = ["name", "description"];
    for (let i = 0; i < arrInputs.length; i++) {
      if (!this.state[arrInputs[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInputs[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditService = async () => {
    let isValid = this.validateInputs();
    if (isValid === true) {
      // call api
      await this.props.editService(this.state);
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
          Edit Service Information
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            {/* first row in modal: name*/}
            <div className="row g-2">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="Service Name"
                  autoComplete="off"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                  value={this.state.name}
                />
                <label htmlFor="floatingName">Service Name</label>
              </div>
            </div>

            {/* 2nd row in modal: description*/}
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
              this.handleEditService();
            }}
          >
            Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEditModal);
