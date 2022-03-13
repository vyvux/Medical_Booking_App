import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FormGroup, Label, Input, Col } from "reactstrap";
import "./UserManage.scss";
import { getAllUsers, createNewUserByAdmin, deleteUserByAdmin, editUserByAdmin } from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalDeleteUserConfirm from "./ModalDeleteUserConfirm";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
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
    };
  }

  async componentDidMount() {
    this.getAllUsersFromDB();
  }

  getAllUsersFromDB = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
        filteredUserList: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewUser = async (data) => {
    let success = false;
    try {
      let response = await createNewUserByAdmin(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromDB();
        this.setState({
          isOpenModalUser: false,
        });
        success = true;
      }
    } catch (e) {
      console.log(e);
    }
    return success;
  };

  toggleModalDeleteUserConfirm = () => {
    this.setState({
      isOpenModalDeleteUserConfirm: !this.state.isOpenModalDeleteUserConfirm,
    });
  };

  openDeleteConfirmModal = (user) => {
    this.setState({
      isOpenModalDeleteUserConfirm: true,
      userInEffect: user,
    });
  };

  handleDeleteUser = async (user) => {
    try {
      await deleteUserByAdmin(user.id);
      await this.getAllUsersFromDB();
      this.setState({
        isOpenModalDeleteUserConfirm: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  toggleModalEditUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  openEditUserModal = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userInEffect: user,
    });
  };

  handleEditUser = async (user) => {
    try {
      await editUserByAdmin(user);
      await this.getAllUsersFromDB();
      this.setState({
        isOpenModalEditUser: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleFilterUserByRole = (role) => {
    if (role) {
      this.setState({
        filteredUserList: this.state.arrUsers.filter((user) => {
          return user.roleId === role;
        }),
      });
    } else {
      this.setState({
        filteredUserList: [...this.state.arrUsers],
      });
      console.log("no role recorded");
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
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
      }
    };

    return (
      <div className="users-container mx-1">
        <ModalUser isOpen={this.state.isOpenModalUser} toggleModalFromParent={this.toggleUserModal} createNewUser={this.createNewUser} />

        <ModalDeleteUserConfirm
          isOpen={this.state.isOpenModalDeleteUserConfirm}
          toggleModalFromParent={this.toggleModalDeleteUserConfirm}
          deleteUserByAdmin={this.handleDeleteUser}
          user={this.state.userInEffect}
        />

        <ModalEditUser isOpen={this.state.isOpenModalEditUser} toggleModalFromParent={this.toggleModalEditUser} editUserByAdmin={this.handleEditUser} user={this.state.userInEffect} />

        <div className="title text-center">Manage users</div>

        <div className="mx-1 container">
          <div className="row">
            <div className="col-4">
              <button className="btn btn-primary px-3 py-1" onClick={() => this.handleAddNewUser()}>
                <i className="fas fa-plus"></i> New User
              </button>
            </div>

            <div className="col-8">
              <FormGroup row>
                <Label htmlFor="exampleSelect" sm={1}>
                  Role
                </Label>
                <Col sm={3}>
                  <Input id="exampleSelect" name="select" type="select">
                    <option onClick={() => this.handleFilterUserByRole()}>All Roles</option>
                    <option onClick={() => this.handleFilterUserByRole("R1")}>Admin</option>
                    <option onClick={() => this.handleFilterUserByRole("R2")}>Doctor</option>
                    <option onClick={() => this.handleFilterUserByRole("R4")}>Medical Staff</option>
                    <option onClick={() => this.handleFilterUserByRole("R3")}>Patient</option>
                  </Input>
                </Col>
              </FormGroup>
            </div>
          </div>
        </div>

        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUserList &&
                filteredUserList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{renderRole(item.roleId)}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.openEditUserModal(item)}>
                          <i className="fas fa-pencil-alt fa-lg"></i>
                        </button>
                        <button className="btn-delete" onClick={() => this.openDeleteConfirmModal(item)}>
                          <i className="fas fa-trash-alt fa-lg"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
