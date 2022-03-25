import adminService from "../services/adminService";

// Manage Users
let createNewUserByAdmin = async (req, res) => {
  let message = await adminService.createNewUserByAdmin(req.body);
  return res.status(200).json(message);
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL ,or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }

  let users = await adminService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let editSystemUser = async (req, res) => {
  let data = req.body;
  let message = await adminService.editSystemUserByAdmin(data);
  return res.status(200).json(message);
};

let deleteSystemUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await adminService.deleteUserByAdmin(req.body.id);
  return res.status(200).json(message);
};

// Manage Branches
let createNewBranch = async (req, res) => {
  let message = await adminService.createNewBranch(req.body);
  return res.status(200).json(message);
};

let handleGetAllBranches = async (req, res) => {
  let id = req.query.id; //ALL ,or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      branches: [],
    });
  }

  let branches = await adminService.getAllBranches(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    branches,
  });
};

let editBranch = async (req, res) => {
  let data = req.body;
  let message = await adminService.editBranch(data);
  return res.status(200).json(message);
};

let deleteBranch = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await adminService.deleteBranch(req.body.id);
  return res.status(200).json(message);
};

// Manage Services
let createNewService = async (req, res) => {
  let message = await adminService.createNewService(req.body);
  return res.status(200).json(message);
};

let handleGetAllServices = async (req, res) => {
  let id = req.query.id; //ALL ,or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      services: [],
    });
  }

  let services = await adminService.getAllServices(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    services,
  });
};

let editService = async (req, res) => {
  let data = req.body;
  let message = await adminService.editService(data);
  return res.status(200).json(message);
};

let deleteService = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await adminService.deleteService(req.body.id);
  return res.status(200).json(message);
};

// Manage Doctors
let createNewDoctor = async (req, res) => {
  let message = await adminService.createDoctor(req.body);
  return res.status(200).json(message);
};

let getAllDoctors = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      services: [],
    });
  }

  let doctors = await adminService.getAllDoctors(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    doctors,
  });
};

let editDoctorInfo = async (req, res) => {
  let data = req.body;
  let message = await adminService.editDoctor(data);
  return res.status(200).json(message);
};

let deleteDoctor = async (req, res) => {
  if (!req.body.userId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await adminService.deleteDoctor(req.body.userId);
  return res.status(200).json(message);
};

module.exports = {
  createNewUserByAdmin: createNewUserByAdmin,
  handleGetAllUsers: handleGetAllUsers,
  editSystemUser: editSystemUser,
  deleteSystemUser: deleteSystemUser,

  createNewBranch: createNewBranch,
  handleGetAllBranches: handleGetAllBranches,
  editBranch: editBranch,
  deleteBranch: deleteBranch,

  createNewService: createNewService,
  handleGetAllServices: handleGetAllServices,
  editService: editService,
  deleteService: deleteService,

  createNewDoctor: createNewDoctor,
  getAllDoctors: getAllDoctors,
  editDoctorInfo: editDoctorInfo,
  deleteDoctor: deleteDoctor,
};
