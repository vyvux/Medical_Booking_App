import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllBranches, createNewBranch, editBranch, deleteBranch } from "../../../services/adminService";
import BranchModal from "./BranchModal";
import BranchEditModal from "./BranchEditModal";
import "../UserManage.scss";
import BranchDeleteModal from "./BranchDeleteModal";
import { toast } from "react-toastify";
import { addLog } from "../../../services/adminService";

class BranchManage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      arrBranches: [],
      isOpenModalBranch: false,
      isOpenModalDeleteBranchConfirm: false,
      isOpenModalEditBranch: false,
      branchInEffect: {},
      userInfo: this.props.userInfo,
    };
  }

  async componentDidMount() {
    this.getAllBranchesFromDB();
  }

  getAllBranchesFromDB = async () => {
    let response = await getAllBranches("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrBranches: response.branches,
      });
    }
  };

  handleAddNewBranch = () => {
    this.setState({
      isOpenModalBranch: true,
    });
  };

  toggleBranchModal = () => {
    this.setState({
      isOpenModalBranch: !this.state.isOpenModalBranch,
    });
  };

  createNewBranch = async (data) => {
    let success = false;
    try {
      let response = await createNewBranch(data);
      await this.getAllBranchesFromDB();
      this.setState({
        isOpenModalBranch: false,
      });
      toast.success(response.message);
      success = true;
      // add log
      let userInfo = this.state.userInfo;
      let branch = response.branch;
      let logInfo = {
        userId: userInfo.id,
        actionType: "A13",
        message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} add new branch (Branch ID: ${branch.id} - ${branch.name})`,
      };
      addLog(logInfo);
    } catch (e) {
      console.log(e);
    }
    return success;
  };

  toggleModalDeleteBranchConfirm = () => {
    this.setState({
      isOpenModalDeleteBranchConfirm: !this.state.isOpenModalDeleteBranchConfirm,
    });
  };

  openDeleteConfirmModal = (branch) => {
    this.setState({
      isOpenModalDeleteBranchConfirm: true,
      branchInEffect: branch,
    });
  };

  handleDeleteBranch = async (branch) => {
    try {
      let response = await deleteBranch(branch.id);
      if (response && response.errCode === 0) {
        await this.getAllBranchesFromDB();
        toast.success(response.message);
        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A15",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} delete branch (Branch ID: ${branch.id} - ${branch.name})`,
        };
        addLog(logInfo);
      } else {
        toast.error(response.errMessage, { autoClose: 8000 });
      }
      this.setState({
        isOpenModalDeleteBranchConfirm: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  toggleModelEditBranch = () => {
    this.setState({
      isOpenModalEditBranch: !this.state.isOpenModalEditBranch,
    });
  };

  openEditBranchModal = (branch) => {
    this.setState({
      isOpenModalEditBranch: true,
      branchInEffect: branch,
    });
  };

  handleEditBranch = async (branch) => {
    try {
      let response = await editBranch(branch);
      if (response && response.errCode === 0) {
        await this.getAllBranchesFromDB();
        toast.success(response.message);
        // add log
        let userInfo = this.state.userInfo;
        let logInfo = {
          userId: userInfo.id,
          actionType: "A15",
          message: `User ${userInfo.id} - ${userInfo.firstName} ${userInfo.lastName} edit branch information (Branch ID: ${branch.id} - ${branch.name})`,
        };
        addLog(logInfo);
      } else {
        toast.error(response.errMessage);
      }
      this.setState({
        isOpenModalEditBranch: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrBranches = this.state.arrBranches;
    return (
      <div className="users-container mx-1">
        <BranchModal isOpen={this.state.isOpenModalBranch} toggleModalFromParent={this.toggleBranchModal} createNewBranch={this.createNewBranch} />

        <BranchEditModal isOpen={this.state.isOpenModalEditBranch} toggleModalFromParent={this.toggleModelEditBranch} editBranch={this.handleEditBranch} branch={this.state.branchInEffect} />

        <BranchDeleteModal
          isOpen={this.state.isOpenModalDeleteBranchConfirm}
          toggleModalFromParent={this.toggleModalDeleteBranchConfirm}
          deleteBranch={this.handleDeleteBranch}
          branch={this.state.branchInEffect}
        />
        <div className="title text-center">Manage branches</div>
        {/* Add new button */}
        <div className="mt-1 mt-md-4 container">
          <button className="btn btn-success px-3 py-1" onClick={() => this.handleAddNewBranch()}>
            <i className="fas fa-plus"></i> New Branch
          </button>
        </div>

        <div className="list-length-label mt-md-3 mx-3">{arrBranches.length} branches found</div>

        {/* branch table */}
        <div className="users-table mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Description</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {arrBranches &&
                arrBranches.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="limited-word-small">{item.address}</td>
                      <td>{item.phoneNumber}</td>
                      <td className="limited-word">{item.description}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.openEditBranchModal(item)}>
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
  return { userInfo: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchManage);
