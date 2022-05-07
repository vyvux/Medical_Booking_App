import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "./UserManage.scss";
import { getAllUsers, createNewUserByAdmin, deleteUserByAdmin, editUserByAdmin } from "../../services/adminService";
import { addLog } from "../../services/adminService";
import ModalUser from "./ModalUser";
import ModalDeleteUserConfirm from "./ModalDeleteUserConfirm";
import ModalEditUser from "./ModalEditUser";
import { toast } from "react-toastify";
import { renderAllCode } from "./AllCode";
import * as actions from "../../store/actions";
// import { values } from "lodash";

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
      query: "",
      role: "",
      userInfo: this.props.userInfo,
    };
  }

  async componentDidMount() {
    this.getAllUsersFromDB();
    this.props.getRoleStart();
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
        toast.error(response.errMessage);
      } else {
        await this.getAllUsersFromDB();
        this.setState({
          isOpenModalUser: false,
        });
        success = true;
        toast.success(response.message);

        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A3",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} create new user (ID: ${response.newUser.id}) role ${this.renderRole(response.newUser.roleId)}`,
        };
        addLog(logInfo);
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
      let response = await deleteUserByAdmin(user.id);
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage, { autoClose: 10000 });
      } else {
        await this.getAllUsersFromDB();
        toast.success(response.message);

        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A4",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} delete user ID: ${user.id} - ${user.firstName} ${user.lastName} role ${this.renderRole(user.roleId)}`,
        };
        addLog(logInfo);
      }
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
      let response = await editUserByAdmin(user);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromDB();
        toast.success(response.message);

        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A5",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} edit information user ID: ${user.id} role ${this.renderRole(user.roleId)}`,
        };
        addLog(logInfo);
      } else {
        toast.error(response.errMessage);
      }
      this.setState({
        isOpenModalEditUser: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        this.handleFilterUser();
      }
    );
  };

  checkRole = (user) => {
    let role = this.state.role;
    if (role) {
      return user.roleId === this.state.role;
    }
    return true;
  };

  checkTerm = (user) => {
    let term = this.state.query.toLowerCase();
    if (term) {
      return user.email.toLowerCase().includes(term) || user.firstName.toLowerCase().includes(term) || user.lastName.toLowerCase().includes(term);
    }
    return true;
  };

  handleFilterUser = () => {
    this.setState({
      filteredUserList: this.state.arrUsers.filter((user) => {
        return this.checkRole(user) && this.checkTerm(user);
      }),
    });
  };

  render() {
    // let arrUsers = this.state.arrUsers;
    let filteredUserList = this.state.filteredUserList;

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

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-end justify-content-md-start">
            <div className="col-5 col-md-3">
              <button
                className="btn btn-success px-3 py-1"
                onClick={() => {
                  this.handleAddNewUser();
                }}
              >
                <i className="fas fa-plus"></i> New User
              </button>
            </div>

            <div className="col-7 col-md-6">
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "query");
                  }}
                  value={this.state.query}
                />
              </InputGroup>
            </div>

            <div className="col-5 col-md-3 mx-5 mx-md-0">
              <Container className="d-flex flex-row justify-content-start">
                <Label htmlFor="roleSelect" md={{ size: "auto" }} sm={{ size: "auto" }}>
                  Role
                </Label>
                <Col md={{ offset: 1, size: "auto" }} xs={{ offset: 1, size: "auto" }}>
                  <Input
                    id="roleSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "role");
                    }}
                  >
                    <option value="">All Roles</option>
                    {this.props.role &&
                      this.props.role.map((item, index) => {
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

        <div className="list-length-label mt-md-3 mx-3">{filteredUserList.length} users found</div>
        {/* <div className="users-table mt-1 mt-md-3 mx-1 my-1"> */}
        <div className="users-table mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>User ID</th>
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
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{renderAllCode(this.props.role, item.roleId)}</td>
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
  return { userInfo: state.user.userInfo, role: state.code.role };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
