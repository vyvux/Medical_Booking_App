import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllBranches, createNewBranch, editBranch, deleteBranch } from "../../services/adminService";
import BranchModal from "./BranchModal";
import BranchEditModal from "./BranchEditModal";
import "./UserManage.scss";

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
    let succes = false;
    try {
      let response = await createNewBranch(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllBranchesFromDB();
        this.setState({
          isOpenModalBranch: false,
        });
      }
      succes = true;
    } catch (e) {
      console.log(e);
    }
    return succes;
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
      await deleteBranch(branch.id);
      await this.getAllBranchesFromDB();
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
      await editBranch(branch);
      await this.getAllBranchesFromDB();
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

        <div className="title text-center">Manage branches</div>
        {/* Add new button */}
        <div className="mt-1 mt-md-4 container">
          <button className="btn btn-primary px-3 py-1" onClick={() => this.handleAddNewBranch()}>
            <i className="fas fa-plus"></i> New Branch
          </button>
        </div>
        {/* branch table */}
        <div className="users-table mt-1 mt-md-3 mx-1 my-1">
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchManage);
