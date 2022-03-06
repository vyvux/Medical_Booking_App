import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  // state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }

  render() {
    let arrUsers = this.state.arrUsers;

    // function render role based on roleId
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
      <div className="users-container">
        <div className="title text-center">Manage users</div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Registered On</th>
              <th>Actions</th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{renderRole(item.roleId)}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <button className="btn-edit">
                        <i class="fas fa-pencil-alt fa-lg"></i>
                      </button>
                      <button className="btn-delete">
                        <i class="fas fa-trash-alt fa-lg"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
