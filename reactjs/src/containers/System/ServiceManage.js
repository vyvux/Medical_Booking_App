import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllServices, createNewService, editService, deleteService } from "../../services/adminService";
import "./UserManage.scss";
import ServiceModal from "./ServiceModal";
import ServiceEditModal from "./ServiceEditModal";
import ServiceDeleteModal from "./ServiceDeleteModal";

class ServiceManage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      arrServices: [],
      isOpenModalService: false,
      isOpenModalDeleteServiceConfirm: false,
      isOpenModalEditService: false,
      serviceInEffect: {},
    };
  }

  async componentDidMount() {
    this.getAllServicesFromDB();
  }

  getAllServicesFromDB = async () => {
    let response = await getAllServices("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrServices: response.services,
      });
    }
  };

  handleAddNewService = () => {
    this.setState({
      isOpenModalService: true,
    });
  };

  toggleServiceModal = () => {
    this.setState({
      isOpenModalService: !this.state.isOpenModalService,
    });
  };

  createNewService = async (data) => {
    let succes = false;
    try {
      let response = await createNewService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllServicesFromDB();
        this.setState({
          isOpenModalService: false,
        });
      }
      succes = true;
    } catch (e) {
      console.log(e);
    }
    return succes;
  };

  toggleModalDeleteServiceConfirm = () => {
    this.setState({
      isOpenModalDeleteServiceConfirm: !this.state.isOpenModalDeleteServiceConfirm,
    });
  };

  openDeleteConfirmModal = (service) => {
    this.setState({
      isOpenModalDeleteServiceConfirm: true,
      serviceInEffect: service,
    });
  };

  handleDeleteService = async (service) => {
    try {
      await deleteService(service.id);
      await this.getAllServicesFromDB();
      this.setState({
        isOpenModalDeleteServiceConfirm: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  toggleModelEditService = () => {
    this.setState({
      isOpenModalEditService: !this.state.isOpenModalEditService,
    });
  };

  openEditServiceModal = (service) => {
    this.setState({
      isOpenModalEditService: true,
      serviceInEffect: service,
    });
  };

  handleEditService = async (service) => {
    try {
      await editService(service);
      await this.getAllServicesFromDB();
      this.setState({
        isOpenModalEditService: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrServices = this.state.arrServices;
    return (
      <div className="users-container mx-1">
        <ServiceModal isOpen={this.state.isOpenModalService} toggleModalFromParent={this.toggleServiceModal} createNewService={this.createNewService} />

        <ServiceEditModal isOpen={this.state.isOpenModalEditService} toggleModalFromParent={this.toggleModelEditService} editService={this.handleEditService} service={this.state.serviceInEffect} />

        <ServiceDeleteModal
          isOpen={this.state.isOpenModalDeleteServiceConfirm}
          toggleModalFromParent={this.toggleModalDeleteServiceConfirm}
          deleteService={this.handleDeleteService}
          service={this.state.serviceInEffect}
        />

        <div className="title text-center">Manage services</div>
        {/* Add new button */}
        <div className="mt-1 mt-md-4 container">
          <button className="btn btn-primary px-3 py-1" onClick={() => this.handleAddNewService()}>
            <i className="fas fa-plus"></i> New Service
          </button>
        </div>

        <div className="list-length-label mt-md-3 mx-3">{arrServices.length} services found</div>

        {/* branch table */}
        <div className="users-table mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {arrServices &&
                arrServices.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="limited-word">{item.description}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.openEditServiceModal(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceManage);
