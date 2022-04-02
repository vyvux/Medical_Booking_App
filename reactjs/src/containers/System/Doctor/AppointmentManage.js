import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import { toast } from "react-toastify";
// import { values } from "lodash";

class AppointmentManage extends Component {
  // state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      filteredUserList: [],
      isOpenModalUser: false,
      isOpenModalDeleteUserConfirm: false,
      isOpenModalEditUser: false,
      userInEffect: {},
      query: "",
      role: "",
    };
  }

  async componentDidMount() {
    // this.getAllUsersFromDB();
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

  //   handleOnChangeInput = (event, id) => {
  //     let copyState = { ...this.state };
  //     copyState[id] = event.target.value;
  //     this.setState(
  //       {
  //         ...copyState,
  //       },
  //       () => {
  //         this.handleFilterUser();
  //       }
  //     );
  //   };

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
    // let arrUsers = this.state.arrUsers;
    let filteredUserList = this.state.filteredUserList;

    const renderRole = (roleId) => {
      switch (roleId) {
        case "R1":
          return "Admin";
        case "R2":
          return "Doctor";
        case "R3":
          return "Patient";
        case "R4":
          return "Medical Staff";
        default:
          return "Unknown role";
      }
    };

    return (
      <div className="users-container mx-1">
        {/* <ModalUser isOpen={this.state.isOpenModalUser} toggleModalFromParent={this.toggleUserModal} createNewUser={this.createNewUser} />

        <ModalDeleteUserConfirm
          isOpen={this.state.isOpenModalDeleteUserConfirm}
          toggleModalFromParent={this.toggleModalDeleteUserConfirm}
          deleteUserByAdmin={this.handleDeleteUser}
          user={this.state.userInEffect}
        />

        <ModalEditUser isOpen={this.state.isOpenModalEditUser} toggleModalFromParent={this.toggleModalEditUser} editUserByAdmin={this.handleEditUser} user={this.state.userInEffect} /> */}

        <div className="title text-center">Appointment List</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentManage);
