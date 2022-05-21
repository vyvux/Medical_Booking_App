import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
// import { values } from "lodash";

class PatientAppointment extends Component {
  // state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrAppointments: [],
      filteredAppointments: [],
      isOpenModalBookAppointment: false,
      isOpenModalCancelAppointment: false,
      appointmentInEffect: {},
      status: "",
    };
  }

  async componentDidMount() {
    this.props.getStatusStart();
  }

  //   getAllUsersFromDB = async () => {
  //     let response = await getAllUsers("ALL");
  //     if (response && response.errCode === 0) {
  //       this.setState({
  //         arrUsers: response.users,
  //         filteredUserList: response.users,
  //       });
  //     }
  //   };

  //   handleAddNewUser = () => {
  //     this.setState({
  //       isOpenModalUser: true,
  //     });
  //   };

  //   toggleUserModal = () => {
  //     this.setState({
  //       isOpenModalUser: !this.state.isOpenModalUser,
  //     });
  //   };

  //   createNewUser = async (data) => {
  //     let success = false;
  //     try {
  //       let response = await createNewUserByAdmin(data);
  //       if (response && response.errCode !== 0) {
  //         toast.error(response.errMessage);
  //       } else {
  //         await this.getAllUsersFromDB();
  //         this.setState({
  //           isOpenModalUser: false,
  //         });
  //         success = true;
  //         toast.success(response.message);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return success;
  //   };

  //   toggleModalDeleteUserConfirm = () => {
  //     this.setState({
  //       isOpenModalDeleteUserConfirm: !this.state.isOpenModalDeleteUserConfirm,
  //     });
  //   };

  //   openDeleteConfirmModal = (user) => {
  //     this.setState({
  //       isOpenModalDeleteUserConfirm: true,
  //       userInEffect: user,
  //     });
  //   };

  //   handleDeleteUser = async (user) => {
  //     try {
  //       let response = await deleteUserByAdmin(user.id);
  //       if (response && response.errCode !== 0) {
  //         toast.error(response.errMessage, { autoClose: 10000 });
  //       } else {
  //         await this.getAllUsersFromDB();
  //         toast.success(response.message);
  //       }
  //       this.setState({
  //         isOpenModalDeleteUserConfirm: false,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   toggleModalEditUser = () => {
  //     this.setState({
  //       isOpenModalEditUser: !this.state.isOpenModalEditUser,
  //     });
  //   };

  //   openEditUserModal = (user) => {
  //     this.setState({
  //       isOpenModalEditUser: true,
  //       userInEffect: user,
  //     });
  //   };

  //   handleEditUser = async (user) => {
  //     try {
  //       let response = await editUserByAdmin(user);
  //       if (response && response.errCode === 0) {
  //         await this.getAllUsersFromDB();
  //         toast.success(response.message);
  //       } else {
  //         toast.error(response.errMessage);
  //       }
  //       this.setState({
  //         isOpenModalEditUser: false,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      }
      //   () => {
      //     this.handleFilterUser();
      //   }
    );
  };

  //   checkRole = (user) => {
  //     let role = this.state.role;
  //     if (role) {
  //       return user.roleId === this.state.role;
  //     }
  //     return true;
  //   };

  //   checkTerm = (user) => {
  //     let term = this.state.query.toLowerCase();
  //     if (term) {
  //       return user.email.toLowerCase().includes(term) || user.firstName.toLowerCase().includes(term) || user.lastName.toLowerCase().includes(term);
  //     }
  //     return true;
  //   };

  //   handleFilterUser = () => {
  //     this.setState({
  //       filteredUserList: this.state.arrUsers.filter((user) => {
  //         return this.checkRole(user) && this.checkTerm(user);
  //       }),
  //     });
  //   };

  render() {
    // let filteredUserList = this.state.filteredUserList;

    return (
      <div className="users-container mx-1">
        <div className="title text-center">Appointment Manage</div>

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-center ">
            {/* book appointment button */}
            <div className="col-6">
              <button className="btn btn-success px-3 py-1 book-app">Book Appointment</button>
            </div>

            <div className="col-6 col-md-3">
              <Container className="d-flex flex-row justify-content-start drop-down">
                {/* <Label htmlFor="serviceSelect" md={{ size: 2 }} xs={{ size: 3 }}> */}
                <Label htmlFor="statusSelect" lg={{ offset: 1, size: 2 }} md={{ size: 3 }} sm={{ size: "auto" }}>
                  Status
                </Label>
                <Col md={{ offset: 1, size: 9 }} xs={{ offset: 1, size: 9 }}>
                  <Input
                    id="statusSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "status");
                    }}
                  >
                    <option value="">All Status</option>
                    {this.props.status &&
                      this.props.status.map((item, index) => {
                        return (
                          <option value={item.key} key={item.key}>
                            {item.value}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { status: state.code.status };
};

const mapDispatchToProps = (dispatch) => {
  return { getStatusStart: () => dispatch(actions.fetchStatusStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointment);
