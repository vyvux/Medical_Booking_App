import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "../UserManage.scss";
import { getAllUsers, getAllLogs } from "../../../services/adminService";
import LogViewModal from "./LogViewModal";

// import { values } from "lodash";

class LogManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrLogs: [],
      filteredLogList: [],
      query: "",
      actionType: "",
      roleId: "",
      userList: [],
      isOpenModalViewLog: false,
      logInEffect: {},
    };
  }

  async componentDidMount() {
    this.getAllLogsFromDB();
    this.getAllUsersFromDB();
  }

  getAllLogsFromDB = async () => {
    let response = await getAllLogs();
    if (response && response.errCode === 0) {
      this.setState({
        arrLogs: response.logs,
        filteredLogList: response.logs,
      });
    }
  };

  getAllUsersFromDB = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        userList: response.users,
      });
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
        this.handleFilterLog();
      }
    );
  };

  checkActionType = (log) => {
    let action = this.state.actionType;
    if (action) {
      return log.actionType === action;
    }
    return true;
  };

  checkRole = (log) => {
    let selectedRoleId = this.state.roleId;
    if (selectedRoleId) {
      // find userID in user list
      let user = this.state.userList.find(({ id }) => id === log.userId);
      // found valid user with searched id
      if (user) {
        return user.roleId === selectedRoleId;
      }
      // not found valid user => user has been deleted
      else {
        if (selectedRoleId === "unknown") {
          return true;
        }
        return false;
      }
    }

    return true;
  };

  checkSearchId = (log) => {
    let searchId = this.state.query.toLowerCase();
    if (searchId) {
      return log.userId == searchId;
    }
    return true;
  };

  handleFilterLog = () => {
    this.setState({
      filteredLogList: this.state.arrLogs.filter((log) => {
        return this.checkSearchId(log) && this.checkRole(log) && this.checkActionType(log);
      }),
    });
  };

  openViewLogModal = (log) => {
    this.setState({
      isOpenModalViewLog: true,
      logInEffect: log,
    });
  };

  toggleModalViewLog = () => {
    this.setState({
      isOpenModalViewLog: !this.state.isOpenModalViewLog,
    });
  };

  render() {
    let filteredLogList = this.state.filteredLogList;

    return (
      <div className="users-container mx-1">
        <LogViewModal isOpen={this.state.isOpenModalViewLog} toggleModalFromParent={this.toggleModalViewLog} log={this.state.logInEffect} />
        <div className="title text-center">Manage Logs</div>

        <div className="mt-1 mt-md-4 container">
          <div className="row justify-content-center justify-content-md-start">
            {/* Doctor's name search*/}
            <div className="col-8 col-md-3 ">
              <InputGroup>
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search ID"
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "query");
                  }}
                  value={this.state.query}
                />
              </InputGroup>
            </div>

            {/* Action type filter */}
            {/* <div className="col-5 col-md-2 mx-5 mx-md-0"> */}
            <div className="col-7 col-md-4">
              <Container className="d-flex flex-row justify-content-start drop-down">
                <Label htmlFor="serviceSelect" lg={{ offset: 2, size: 3 }} md={{ size: 4 }} sm={{ size: 2 }} xs={{ size: "auto" }}>
                  Action Type
                </Label>
                <Col md={{ offset: 1, size: 8 }} xs={{ size: 9 }} lg={{ size: 7 }}>
                  <Input
                    id="serviceSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "actionType");
                    }}
                  >
                    <option value="">All Action</option>
                    <option value="A1">Add appointment</option>
                    <option value="A2">Cancel appointment</option>
                    <option value="A3">Create user</option>
                    <option value="A4">Delete user</option>
                    <option value="A5">Edit user information</option>
                    <option value="A6">Edit patient profile</option>
                    <option value="A7">Edit doctor available hours</option>
                    <option value="A8">User login</option>
                  </Input>
                </Col>
              </Container>
            </div>
            {/* Role filter */}
            <div className="col-5 col-md-4">
              <Container className="d-flex flex-row justify-content-start drop-down">
                <Label htmlFor="roleSelect" lg={{ offset: 2, size: 1 }} md={{ offset: 2, size: 2 }} sm={{ size: "auto" }}>
                  Role
                </Label>
                <Col md={{ size: 8 }} xs={{ offset: 1, size: 9 }}>
                  <Input
                    id="roleSelect"
                    name="select"
                    type="select"
                    className="text-left"
                    onChange={(e) => {
                      this.handleOnChangeInput(e, "roleId");
                    }}
                  >
                    <option value="">All Roles</option>
                    <option value="R1">Admin</option>
                    <option value="R2">Doctor</option>
                    <option value="R4">Medical Staff</option>
                    <option value="R3">Patient</option>
                    <option value="unknown">Unknown User</option>
                  </Input>
                </Col>
              </Container>
            </div>
          </div>
        </div>

        <div className="list-length-label mt-md-3 mx-3">{filteredLogList.length} logs retrieved</div>
        <div className="users-table mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Action</th>
                <th>Details</th>
                <th>Time Record</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogList &&
                filteredLogList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.userId}</td>
                      <td>{item.actionType}</td>
                      <td className="limited-word">{item.message}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <button className="btn-view" onClick={() => this.openViewLogModal(item)}>
                          <i className="fas fa-eye"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogManage);
