import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "../UserManage.scss";
import { toast } from "react-toastify";
// import { values } from "lodash";

class ScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <div className="users-container mx-1">
        <div className="manage-schedule-container">
          <div className="title text-center">Schedule Manage</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
