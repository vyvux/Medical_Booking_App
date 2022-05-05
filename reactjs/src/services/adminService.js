import axios from "../axios";

/** Manage Users */
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserByAdmin = (data) => {
  return axios.post("/api/create-system-user", data);
};

const deleteUserByAdmin = (userId) => {
  return axios.delete("/api/delete-system-user", { data: { id: userId } });
};

const editUserByAdmin = (data) => {
  return axios.put("/api/edit-system-user", data);
};

/** Manage Branches */
const getAllBranches = (inputId) => {
  return axios.get(`/api/get-all-branches?id=${inputId}`);
};

const createNewBranch = (data) => {
  return axios.post("/api/create-branch", data);
};

const editBranch = (data) => {
  return axios.put("/api/edit-branch", data);
};

const deleteBranch = (branchId) => {
  return axios.delete("/api/delete-branch", { data: { id: branchId } });
};

/** Manage Service */
const getAllServices = (inputId) => {
  return axios.get(`/api/get-all-services?id=${inputId}`);
};

const createNewService = (data) => {
  return axios.post("/api/create-service", data);
};

const editService = (data) => {
  return axios.put("/api/edit-service", data);
};

const deleteService = (serviceId) => {
  return axios.delete("/api/delete-service", { data: { id: serviceId } });
};

/** Manage Doctor */

const getAllDoctors = (inputId) => {
  return axios.get(`/api/get-all-doctors?id=${inputId}`);
};

const createNewDoctor = (data) => {
  return axios.post("/api/create-doctor", data);
};

const editDoctor = (data) => {
  return axios.put("/api/edit-doctor", data);
};

const deleteDoctor = (doctorUserId) => {
  return axios.delete("/api/delete-doctor", { data: { userId: doctorUserId } });
};

/** Manage Log */
const addLog = (data) => {
  return axios.post("/api/add-log", data);
};

const getAllLogs = () => {
  return axios.get("/api/get-all-logs");
};

export {
  getAllUsers,
  createNewUserByAdmin,
  deleteUserByAdmin,
  editUserByAdmin,
  getAllBranches,
  createNewBranch,
  editBranch,
  deleteBranch,
  createNewService,
  getAllServices,
  editService,
  deleteService,
  getAllDoctors,
  createNewDoctor,
  editDoctor,
  deleteDoctor,
  addLog,
  getAllLogs,
};
