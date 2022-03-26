import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Label, Input, Col, Container, InputGroup, InputGroupText } from "reactstrap";
import "./UserManage.scss";
import { getAllUsers } from "../../services/adminService";

// import { values } from "lodash";

class LogManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrLogs: [
        { id: 1, userId: 1, actionType: "create", message: "create new admin role", createdAt: "2022-03-05 14:07:25" },
        { id: 2, userId: 7, actionType: "create", message: "create new patient profile", createdAt: "2022-03-05 14:07:25" },
        { id: 3, userId: 7, actionType: "create", message: "create new appointment", createdAt: "2022-03-05 14:07:25" },
        { id: 4, userId: 14, actionType: "edit", message: "edit available hours", createdAt: "2022-03-05 14:07:25" },
        { id: 5, userId: 20, actionType: "cancel", message: "cancel patient appointment", createdAt: "2022-03-05 14:07:25" },
        { id: 6, userId: 21, actionType: "edit", message: "edit available hours", createdAt: "2022-03-05 14:07:25" },
        { id: 7, userId: 3, actionType: "edit", message: "edit patient user information", createdAt: "2022-03-05 14:07:25" },
        { id: 8, userId: 2, actionType: "edit", message: "edit patient user information", createdAt: "2022-03-05 14:07:25" },
      ],
      filteredLogList: [
        { id: 1, userId: 1, actionType: "create", message: "create new admin role", createdAt: "2022-03-05 14:07:25" },
        { id: 2, userId: 7, actionType: "create", message: "create new patient profile", createdAt: "2022-03-05 14:07:25" },
        { id: 3, userId: 7, actionType: "create", message: "create new appointment", createdAt: "2022-03-05 14:07:25" },
        { id: 4, userId: 14, actionType: "edit", message: "edit available hours", createdAt: "2022-03-05 14:07:25" },
        { id: 5, userId: 20, actionType: "cancel", message: "cancel patient appointment", createdAt: "2022-03-05 14:07:25" },
        { id: 6, userId: 21, actionType: "edit", message: "edit available hours", createdAt: "2022-03-05 14:07:25" },
        { id: 7, userId: 3, actionType: "edit", message: "edit patient user information", createdAt: "2022-03-05 14:07:25" },
        { id: 8, userId: 2, actionType: "edit", message: "edit patient user information", createdAt: "2022-03-05 14:07:25" },
      ],
      query: "",
      actionType: "",
      roleId: "",
      userList: [],
    };
  }

  async componentDidMount() {
    this.getAllLogsFromDB();
    this.getAllUsersFromDB();
  }

  getAllLogsFromDB = async () => {
    // let response = await getAllDoctors("ALL");
    // if (response && response.errCode === 0) {
    //   this.setState({
    //     arrLogs: response.doctors,
    //     filteredLogList: response.doctors,
    //   });
    // }
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

  render() {
    let filteredLogList = this.state.filteredLogList;

    return (
      <div className="users-container mx-1">
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
